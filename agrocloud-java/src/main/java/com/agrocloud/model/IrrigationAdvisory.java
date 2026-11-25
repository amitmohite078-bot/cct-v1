package com.agrocloud.model;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * Farmer Irrigation Advisory Response with Uncertainty Intervals & Warnings
 */
public record IrrigationAdvisory(
    LocalDate evaluationDate,
    String crop,
    String growthStage,
    int dap,
    double currentRootDepthM,
    String soilTexture,
    String irrigationMethod,
    double systemEfficiency,
    
    // Hydraulic parameters
    double tawMm,
    double rawMm,
    double currentDepletionMm,
    double depletionPercentOfRaw,
    
    // Advisory
    String urgency, // NO_STRESS, MONITOR, IRRIGATE_SOON, CRITICAL_STRESS
    String actionSummary,
    double recommendedNetIrrigationMm,
    double recommendedGrossIrrigationMm,
    
    // Uncertainty & Look-ahead
    Map<String, Double> uncertaintyBounds,
    Integer forecastDaysUntilStress,
    List<WaterBalanceStep> timeline,
    List<String> assumptionsAndWarnings,
    Map<String, Object> provenance
) {}

