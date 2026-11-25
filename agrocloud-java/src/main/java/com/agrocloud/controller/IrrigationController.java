package com.agrocloud.controller;

import com.agrocloud.agrometeorology.SoilWaterBalanceEngine;
import com.agrocloud.audit.ProvenanceAuditService;
import com.agrocloud.model.IrrigationAdvisory;
import com.agrocloud.model.SoilTexture;
import com.agrocloud.weather.OpenMeteoWeatherService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1/irrigation")
@CrossOrigin(origins = "*")
public class IrrigationController {

    private final OpenMeteoWeatherService weatherService;
    private final SoilWaterBalanceEngine waterBalanceEngine;
    private final ProvenanceAuditService auditService;

    public IrrigationController(
        OpenMeteoWeatherService weatherService,
        SoilWaterBalanceEngine waterBalanceEngine,
        ProvenanceAuditService auditService
    ) {
        this.weatherService = weatherService;
        this.waterBalanceEngine = waterBalanceEngine;
        this.auditService = auditService;
    }

    public record IrrigationRequest(
        @NotBlank(message = "Crop type is required (e.g. tomato or potato)")
        String crop,

        @NotNull(message = "Latitude is required")
        @Min(value = -90, message = "Latitude must be >= -90")
        @Max(value = 90, message = "Latitude must be <= 90")
        Double latitude,

        @NotNull(message = "Longitude is required")
        @Min(value = -180, message = "Longitude must be >= -180")
        @Max(value = 180, message = "Longitude must be <= 180")
        Double longitude,

        @NotNull(message = "Sowing or transplanting date is required")
        LocalDate sowingDate,

        String soilTexture,
        String irrigationMethod,
        Double elevationM,
        Integer pastDays,
        Integer forecastDays
    ) {}

    @PostMapping("/guidance")
    public ResponseEntity<IrrigationAdvisory> calculateGuidance(@RequestBody IrrigationRequest req) {
        int past = req.pastDays() != null ? Math.min(14, Math.max(1, req.pastDays())) : 7;
        int forecast = req.forecastDays() != null ? Math.min(14, Math.max(1, req.forecastDays())) : 7;
        double elev = req.elevationM() != null ? req.elevationM() : 0.0;
        SoilTexture soil = SoilTexture.fromString(req.soilTexture());

        var weatherResult = weatherService.fetchWeather(req.latitude(), req.longitude(), past, forecast);

        IrrigationAdvisory advisory = waterBalanceEngine.generateAdvisory(
            req.crop(),
            req.sowingDate(),
            soil,
            req.irrigationMethod(),
            weatherResult.records(),
            req.latitude(),
            elev,
            LocalDate.now(),
            weatherResult.provenance()
        );

        auditService.logIrrigationGuidance(
            req.latitude(),
            req.longitude(),
            req.crop(),
            advisory.growthStage(),
            advisory.currentDepletionMm(),
            advisory.rawMm(),
            advisory.urgency(),
            advisory.recommendedNetIrrigationMm()
        );

        return ResponseEntity.ok(advisory);
    }
}

