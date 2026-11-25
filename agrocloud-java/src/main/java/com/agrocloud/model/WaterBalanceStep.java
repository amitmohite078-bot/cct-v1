package com.agrocloud.model;

import java.time.LocalDate;

/**
 * Daily State for Soil Root-Zone Water Balance
 */
public record WaterBalanceStep(
    LocalDate date,
    boolean isForecast,
    int dap,
    String stage,
    double et0Mm,
    double kc,
    double etcMm,
    double precipitationMm,
    double effectiveRainMm,
    double irrigationAppliedMm,
    double rootDepthM,
    double tawMm,
    double rawMm,
    double rootZoneDepletionMm,
    double deepPercolationMm,
    String stressStatus
) {}

