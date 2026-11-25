package com.agrocloud.model;

import java.util.Map;

/**
 * Crop Phenological Parameters based on FAO-56 (Tables 11, 12, and 22)
 */
public record CropProfile(
    String cropName,
    double kcIni,
    double kcMid,
    double kcEnd,
    double pDepletionFraction,
    int stageLengthIni,
    int stageLengthDev,
    int stageLengthMid,
    int stageLengthLate,
    double rootDepthMinM,
    double rootDepthMaxM
) {
    public static final Map<String, CropProfile> SUPPORTED_CROPS = Map.of(
        "tomato", new CropProfile(
            "Tomato",
            0.60, 1.15, 0.80,
            0.40,
            30, 40, 45, 30,
            0.25, 0.80
        ),
        "potato", new CropProfile(
            "Potato",
            0.50, 1.15, 0.75,
            0.35,
            25, 30, 45, 30,
            0.20, 0.55
        )
    );

    public static CropProfile get(String crop) {
        if (crop == null) return SUPPORTED_CROPS.get("tomato");
        CropProfile profile = SUPPORTED_CROPS.get(crop.trim().toLowerCase());
        return profile != null ? profile : SUPPORTED_CROPS.get("tomato");
    }
}

