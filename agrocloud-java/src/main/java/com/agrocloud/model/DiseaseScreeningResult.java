package com.agrocloud.model;

import java.util.List;
import java.util.Map;

/**
 * Probabilistic Visual Disease Screening Result with Calibrated Confidence & Abstention
 */
public record DiseaseScreeningResult(
    String declaredCrop,
    String predictedClass,
    double calibratedConfidence,
    boolean abstained,
    String abstainReason,
    String guidanceSummary,
    List<String> culturalIpmAdvice,
    Map<String, Double> classProbabilities,
    ImageQualityMetrics qualityMetrics,
    Map<String, Object> provenance
) {
    public record ImageQualityMetrics(
        int width,
        int height,
        double laplacianVariance,
        double meanBrightness,
        boolean isAcceptableQuality,
        String rejectionReason
    ) {}
}

