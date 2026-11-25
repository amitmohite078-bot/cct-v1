package com.agrocloud.audit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.Instant;

/**
 * Privacy-Preserving Audit and Provenance Logging Service
 * Guarantees zero raw image storage by hashing input bytes via SHA-256,
 * and rounds GPS coordinates to 2 decimals (~1.1 km) to safeguard farm privacy.
 */
@Service
public class ProvenanceAuditService {

    private static final Logger log = LoggerFactory.getLogger(ProvenanceAuditService.class);
    private final String dbPath;

    public ProvenanceAuditService(@Value("${agrocloud.audit.db-path:data/agrocloud_audit.db}") String dbPath) {
        this.dbPath = dbPath;
        initAuditTables();
    }

    private void initAuditTables() {
        try {
            File parent = new File(dbPath).getParentFile();
            if (parent != null) parent.mkdirs();
            try (Connection conn = DriverManager.getConnection("jdbc:sqlite:" + dbPath);
                 Statement stmt = conn.createStatement()) {
                stmt.execute("""
                    CREATE TABLE IF NOT EXISTS disease_audit_log (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        timestamp TEXT NOT NULL,
                        image_sha256 TEXT NOT NULL,
                        crop_declared TEXT,
                        predicted_class TEXT,
                        confidence REAL,
                        abstained INTEGER,
                        abstain_reason TEXT,
                        model_version TEXT,
                        latency_ms INTEGER
                    )
                """);
                stmt.execute("""
                    CREATE TABLE IF NOT EXISTS irrigation_audit_log (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        timestamp TEXT NOT NULL,
                        fuzzed_lat REAL NOT NULL,
                        fuzzed_lon REAL NOT NULL,
                        crop TEXT NOT NULL,
                        growth_stage TEXT,
                        current_depletion_mm REAL,
                        raw_mm REAL,
                        urgency TEXT,
                        recommended_net_mm REAL
                    )
                """);
            }
        } catch (Exception e) {
            log.warn("Failed to initialize audit database: {}", e.getMessage());
        }
    }

    public static String computeSha256(byte[] data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(data);
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            return "unknown-digest";
        }
    }

    public void logDiseaseScreening(
        byte[] imageBytes,
        String cropDeclared,
        String predictedClass,
        double confidence,
        boolean abstained,
        String abstainReason,
        String modelVersion,
        long latencyMs
    ) {
        String sha256 = computeSha256(imageBytes);
        try (Connection conn = DriverManager.getConnection("jdbc:sqlite:" + dbPath);
             PreparedStatement ps = conn.prepareStatement("""
                 INSERT INTO disease_audit_log (
                     timestamp, image_sha256, crop_declared, predicted_class,
                     confidence, abstained, abstain_reason, model_version, latency_ms
                 ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
             """)) {
            ps.setString(1, Instant.now().toString());
            ps.setString(2, sha256);
            ps.setString(3, cropDeclared);
            ps.setString(4, predictedClass);
            ps.setDouble(5, confidence);
            ps.setInt(6, abstained ? 1 : 0);
            ps.setString(7, abstainReason);
            ps.setString(8, modelVersion);
            ps.setLong(9, latencyMs);
            ps.executeUpdate();
        } catch (Exception e) {
            log.debug("Disease audit write failed: {}", e.getMessage());
        }
    }

    public void logIrrigationGuidance(
        double lat,
        double lon,
        String crop,
        String growthStage,
        double depletionMm,
        double rawMm,
        String urgency,
        double recNetMm
    ) {
        double fuzzedLat = Math.round(lat * 100.0) / 100.0;
        double fuzzedLon = Math.round(lon * 100.0) / 100.0;
        try (Connection conn = DriverManager.getConnection("jdbc:sqlite:" + dbPath);
             PreparedStatement ps = conn.prepareStatement("""
                 INSERT INTO irrigation_audit_log (
                     timestamp, fuzzed_lat, fuzzed_lon, crop, growth_stage,
                     current_depletion_mm, raw_mm, urgency, recommended_net_mm
                 ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
             """)) {
            ps.setString(1, Instant.now().toString());
            ps.setDouble(2, fuzzedLat);
            ps.setDouble(3, fuzzedLon);
            ps.setString(4, crop);
            ps.setString(5, growthStage);
            ps.setDouble(6, depletionMm);
            ps.setDouble(7, rawMm);
            ps.setString(8, urgency);
            ps.setDouble(9, recNetMm);
            ps.executeUpdate();
        } catch (Exception e) {
            log.debug("Irrigation audit write failed: {}", e.getMessage());
        }
    }
}

