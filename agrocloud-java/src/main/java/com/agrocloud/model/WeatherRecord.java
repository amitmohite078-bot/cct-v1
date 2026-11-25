package com.agrocloud.model;

import java.time.LocalDate;

/**
 * Daily Agrometeorological Weather Record
 */
public record WeatherRecord(
    LocalDate date,
    double tMaxC,
    double tMinC,
    double solarRadiationMj,
    double windSpeed2mMs,
    double rhMean,
    double precipitationMm,
    double irrigationAppliedMm,
    boolean isForecast
) {}

