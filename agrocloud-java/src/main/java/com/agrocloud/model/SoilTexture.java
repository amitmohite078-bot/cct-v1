package com.agrocloud.model;

/**
 * Soil Texture Classes and Hydraulic Properties
 * Source: FAO-56 (Allen et al., 1998, Chapter 3, Table 19)
 */
public enum SoilTexture {
    SAND("Sand", 0.10, 0.04, 60.0),
    LOAMY_SAND("Loamy Sand", 0.14, 0.06, 80.0),
    SANDY_LOAM("Sandy Loam", 0.20, 0.09, 110.0),
    LOAM("Loam", 0.27, 0.12, 150.0),
    SILT_LOAM("Silt Loam", 0.30, 0.13, 170.0),
    CLAY_LOAM("Clay Loam", 0.32, 0.17, 150.0),
    SILTY_CLAY("Silty Clay", 0.35, 0.20, 150.0),
    CLAY("Clay", 0.38, 0.24, 140.0);

    private final String displayName;
    private final double thetaFc;  // Volumetric water content at Field Capacity [m3/m3]
    private final double thetaWp;  // Volumetric water content at Wilting Point [m3/m3]
    private final double awcMmPerM; // Available Water Capacity in mm/m

    SoilTexture(String displayName, double thetaFc, double thetaWp, double awcMmPerM) {
        this.displayName = displayName;
        this.thetaFc = thetaFc;
        this.thetaWp = thetaWp;
        this.awcMmPerM = awcMmPerM;
    }

    public String getDisplayName() { return displayName; }
    public double getThetaFc() { return thetaFc; }
    public double getThetaWp() { return thetaWp; }
    public double getAwcMmPerM() { return awcMmPerM; }

    public static SoilTexture fromString(String text) {
        if (text == null) return LOAM;
        String normalized = text.trim().toUpperCase().replace(" ", "_").replace("-", "_");
        for (SoilTexture b : SoilTexture.values()) {
            if (b.name().equalsIgnoreCase(normalized)) {
                return b;
            }
        }
        return LOAM;
    }
}

