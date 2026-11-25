package com.agrocloud.weather;

import com.agrocloud.model.WeatherRecord;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.sql.*;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.util.*;

/**
 * Public Weather Data Client for Open-Meteo API
 * Attribution & Terms: CC-BY 4.0 / Open Database License (ODbL)
 */
@Service
public class OpenMeteoWeatherService {

    private static final Logger log = LoggerFactory.getLogger(OpenMeteoWeatherService.class);

    private final String openMeteoUrl;
    private final int cacheTtlHours;
    private final int apiTimeoutSeconds;
    private final String dbPath;
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public OpenMeteoWeatherService(
        @Value("${agrocloud.weather.open-meteo-url:https://api.open-meteo.com/v1/forecast}") String openMeteoUrl,
        @Value("${agrocloud.weather.cache-ttl-hours:1}") int cacheTtlHours,
        @Value("${agrocloud.weather.api-timeout-seconds:10}") int apiTimeoutSeconds,
        @Value("${agrocloud.audit.db-path:data/agrocloud_audit.db}") String dbPath
    ) {
        this.openMeteoUrl = openMeteoUrl;
        this.cacheTtlHours = cacheTtlHours;
        this.apiTimeoutSeconds = apiTimeoutSeconds;
        this.dbPath = dbPath;
        this.httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(apiTimeoutSeconds))
            .build();
        this.objectMapper = new ObjectMapper();
        initCacheTable();
    }

    private void initCacheTable() {
        try {
            new File(dbPath).getParentFile().mkdirs();
            try (Connection conn = DriverManager.getConnection("jdbc:sqlite:" + dbPath);
                 Statement stmt = conn.createStatement()) {
                stmt.execute("""
                    CREATE TABLE IF NOT EXISTS weather_cache (
                        cache_key TEXT PRIMARY KEY,
                        fetched_at TEXT NOT NULL,
                        payload_json TEXT NOT NULL
                    )
                """);
            }
        } catch (Exception e) {
            log.warn("Could not initialize weather SQLite cache: {}", e.getMessage());
        }
    }

    public record WeatherFetchResult(List<WeatherRecord> records, Map<String, Object> provenance) {}

    public WeatherFetchResult fetchWeather(double latitude, double longitude, int pastDays, int forecastDays) {
        double fuzzedLat = Math.round(latitude * 100.0) / 100.0;
        double fuzzedLon = Math.round(longitude * 100.0) / 100.0;
        LocalDate today = LocalDate.now();
        String cacheKey = String.format(Locale.US, "%.2f_%.2f_%s_%d_%d", fuzzedLat, fuzzedLon, today, pastDays, forecastDays);

        // Check SQLite cache
        Optional<String> cachedPayload = readCache(cacheKey);
        if (cachedPayload.isPresent()) {
            try {
                return parseOpenMeteoJson(cachedPayload.get(), fuzzedLat, fuzzedLon, true);
            } catch (Exception e) {
                log.warn("Failed to parse cached weather payload: {}", e.getMessage());
            }
        }

        // Fetch from Open-Meteo
        String url = String.format(Locale.US,
            "%s?latitude=%.4f&longitude=%.4f&daily=temperature_2m_max,temperature_2m_min,shortwave_radiation_sum,wind_speed_2m_max,precipitation_sum&past_days=%d&forecast_days=%d&timezone=auto",
            openMeteoUrl, fuzzedLat, fuzzedLon, pastDays, forecastDays);

        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .timeout(Duration.ofSeconds(apiTimeoutSeconds))
                .header("User-Agent", "AgroCloud-AI/0.1.0 (Research Prototype; mailto:info@agrocloud.local)")
                .GET()
                .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200) {
                String body = response.body();
                writeCache(cacheKey, body);
                return parseOpenMeteoJson(body, fuzzedLat, fuzzedLon, false);
            } else {
                log.warn("Open-Meteo returned status {}. Falling back to climatology.", response.statusCode());
            }
        } catch (Exception e) {
            log.warn("Network request to Open-Meteo failed: {}. Generating climatological fallback.", e.getMessage());
        }

        return generateFallback(fuzzedLat, fuzzedLon, today, pastDays, forecastDays);
    }

    private WeatherFetchResult parseOpenMeteoJson(String json, double lat, double lon, boolean fromCache) throws Exception {
        JsonNode root = objectMapper.readTree(json);
        JsonNode daily = root.get("daily");
        JsonNode times = daily.get("time");
        JsonNode tMaxArr = daily.get("temperature_2m_max");
        JsonNode tMinArr = daily.get("temperature_2m_min");
        JsonNode radArr = daily.get("shortwave_radiation_sum");
        JsonNode windArr = daily.get("wind_speed_2m_max");
        JsonNode rainArr = daily.get("precipitation_sum");

        List<WeatherRecord> records = new ArrayList<>();
        LocalDate today = LocalDate.now();

        for (int i = 0; i < times.size(); i++) {
            LocalDate d = LocalDate.parse(times.get(i).asText());
            double tMax = tMaxArr.get(i).asDouble();
            double tMin = tMinArr.get(i).asDouble();
            double rad = radArr.get(i).asDouble(); // MJ/m2
            double wind = windArr.get(i).asDouble() * (1000.0 / 3600.0); // km/h to m/s
            double rain = rainArr.get(i).asDouble();

            records.add(new WeatherRecord(
                d,
                tMax,
                tMin,
                rad,
                Math.round(wind * 100.0) / 100.0,
                65.0, // Mean nominal RH
                Math.round(rain * 10.0) / 10.0,
                0.0,
                d.isAfter(today)
            ));
        }

        Map<String, Object> provenance = Map.of(
            "source", "Open-Meteo Global Agrometeorological Weather Service",
            "license", "CC-BY 4.0 / ODbL",
            "terms_url", "https://open-meteo.com/en/terms",
            "retrieved_at_utc", Instant.now().toString(),
            "fuzzed_coordinates", List.of(lat, lon),
            "cached", fromCache
        );

        return new WeatherFetchResult(records, provenance);
    }

    private Optional<String> readCache(String key) {
        try (Connection conn = DriverManager.getConnection("jdbc:sqlite:" + dbPath);
             PreparedStatement ps = conn.prepareStatement("SELECT fetched_at, payload_json FROM weather_cache WHERE cache_key = ?")) {
            ps.setString(1, key);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    Instant fetchedAt = Instant.parse(rs.getString("fetched_at"));
                    if (Duration.between(fetchedAt, Instant.now()).toHours() < cacheTtlHours) {
                        return Optional.of(rs.getString("payload_json"));
                    }
                }
            }
        } catch (Exception e) {
            log.debug("Weather cache read error: {}", e.getMessage());
        }
        return Optional.empty();
    }

    private void writeCache(String key, String json) {
        try (Connection conn = DriverManager.getConnection("jdbc:sqlite:" + dbPath);
             PreparedStatement ps = conn.prepareStatement("INSERT OR REPLACE INTO weather_cache (cache_key, fetched_at, payload_json) VALUES (?, ?, ?)")) {
            ps.setString(1, key);
            ps.setString(2, Instant.now().toString());
            ps.setString(3, json);
            ps.executeUpdate();
        } catch (Exception e) {
            log.debug("Weather cache write error: {}", e.getMessage());
        }
    }

    private WeatherFetchResult generateFallback(double lat, double lon, LocalDate today, int pastDays, int forecastDays) {
        List<WeatherRecord> records = new ArrayList<>();
        LocalDate start = today.minusDays(pastDays);
        int totalDays = pastDays + forecastDays;

        for (int i = 0; i < totalDays; i++) {
            LocalDate d = start.plusDays(i);
            records.add(new WeatherRecord(
                d,
                29.5,
                18.0,
                20.5,
                2.1,
                60.0,
                0.0,
                0.0,
                d.isAfter(today)
            ));
        }

        Map<String, Object> provenance = Map.of(
            "source", "Climatological Reference Fallback (Network Unavailable)",
            "license", "Public Domain Simulation",
            "retrieved_at_utc", Instant.now().toString(),
            "fuzzed_coordinates", List.of(lat, lon),
            "cached", false,
            "warning", "Public live weather was temporarily unreachable; nominal climatological averages used."
        );

        return new WeatherFetchResult(records, provenance);
    }
}

