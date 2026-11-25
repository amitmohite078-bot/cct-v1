package com.agrocloud.agrometeorology;

import com.agrocloud.model.CropProfile;
import org.springframework.stereotype.Component;

/**
 * FAO-56 Penman-Monteith Agrometeorological Equations & Crop Parameter Engine
 * Reference: Allen, R. G., Pereira, L. S., Raes, D., & Smith, M. (1998).
 * Crop evapotranspiration - Guidelines for computing crop water requirements.
 * FAO Irrigation and drainage paper 56. Food and Agriculture Organization, Rome.
 */
@Component
public class Fao56Calculator {

    public static final double STEFAN_BOLTZMANN = 4.903e-9; // MJ K^-4 m^-2 day^-1
    public static final double SOLAR_CONSTANT = 0.0820;    // MJ m^-2 min^-1

    /**
     * Atmospheric pressure P [kPa] at elevation z [m]. FAO-56 Eq. 7.
     */
    public double atmosphericPressure(double elevationM) {
        return 101.3 * Math.pow((293.0 - 0.0065 * elevationM) / 293.0, 5.26);
    }

    /**
     * Psychrometric constant gamma [kPa / °C]. FAO-56 Eq. 8.
     */
    public double psychrometricConstant(double pressureKpa) {
        return 0.665e-3 * pressureKpa;
    }

    /**
     * Saturation vapor pressure e°(T) [kPa] at temperature T [°C]. FAO-56 Eq. 11.
     */
    public double saturationVaporPressure(double tempC) {
        return 0.6108 * Math.exp((17.27 * tempC) / (tempC + 237.3));
    }

    /**
     * Mean saturation vapor pressure es [kPa] from daily T_max and T_min. FAO-56 Eq. 12.
     */
    public double meanSaturationVaporPressure(double tMaxC, double tMinC) {
        return (saturationVaporPressure(tMaxC) + saturationVaporPressure(tMinC)) / 2.0;
    }

    /**
     * Actual vapor pressure ea [kPa] from relative humidity. FAO-56 Eq. 19.
     */
    public double actualVaporPressure(double tMaxC, double tMinC, double rhMean) {
        double es = meanSaturationVaporPressure(tMaxC, tMinC);
        return Math.max(0.001, es * (rhMean / 100.0));
    }

    /**
     * Slope of saturation vapor pressure curve Delta [kPa / °C]. FAO-56 Eq. 13.
     */
    public double slopeVaporPressureCurve(double tempC) {
        double tempTerm = tempC + 237.3;
        return (4098.0 * (0.6108 * Math.exp((17.27 * tempC) / tempTerm))) / (tempTerm * tempTerm);
    }

    public record ExtraterrestrialRadiationResult(double ra, double dr, double omegaS) {}

    /**
     * Extraterrestrial radiation Ra [MJ m^-2 day^-1], dr, and omega_s. FAO-56 Eqs. 21, 23, 24, 28.
     */
    public ExtraterrestrialRadiationResult extraterrestrialRadiation(double latitudeDeg, int dayOfYear) {
        double latRad = (Math.PI / 180.0) * latitudeDeg;
        double dr = 1.0 + 0.033 * Math.cos((2.0 * Math.PI / 365.0) * dayOfYear);
        double solarDeclination = 0.409 * Math.sin(((2.0 * Math.PI / 365.0) * dayOfYear) - 1.39);

        double tanTerm = -Math.tan(latRad) * Math.tan(solarDeclination);
        double omegaS;
        if (tanTerm >= 1.0) {
            omegaS = 0.0;
        } else if (tanTerm <= -1.0) {
            omegaS = Math.PI;
        } else {
            omegaS = Math.acos(tanTerm);
        }

        double ra = ((24.0 * 60.0) / Math.PI) * SOLAR_CONSTANT * dr * (
            omegaS * Math.sin(latRad) * Math.sin(solarDeclination)
            + Math.cos(latRad) * Math.cos(solarDeclination) * Math.sin(omegaS)
        );

        return new ExtraterrestrialRadiationResult(Math.max(0.0, ra), dr, omegaS);
    }

    /**
     * Net solar radiation Rn [MJ m^-2 day^-1]. FAO-56 Eqs. 38, 39, 40.
     */
    public double netSolarRadiation(
        double solarRadiationRs,
        double tMaxC,
        double tMinC,
        double eaKpa,
        double latitudeDeg,
        int dayOfYear,
        double elevationM,
        double albedo
    ) {
        double rNs = (1.0 - albedo) * solarRadiationRs;
        ExtraterrestrialRadiationResult extra = extraterrestrialRadiation(latitudeDeg, dayOfYear);
        double rSo = (0.75 + 2e-5 * elevationM) * extra.ra();

        double relSolar = rSo > 0 ? Math.min(1.0, Math.max(0.3, solarRadiationRs / rSo)) : 0.5;

        double tMaxK4 = Math.pow(tMaxC + 273.16, 4);
        double tMinK4 = Math.pow(tMinC + 273.16, 4);
        double meanTempK4 = (tMaxK4 + tMinK4) / 2.0;

        double rNl = STEFAN_BOLTZMANN * meanTempK4 * (0.34 - 0.14 * Math.sqrt(eaKpa)) * (1.35 * relSolar - 0.35);

        return rNs - rNl;
    }

    /**
     * Daily FAO-56 Penman-Monteith reference evapotranspiration ET0 [mm/day]. FAO-56 Eq. 6.
     */
    public double calculateDailyEt0(
        double latitudeDeg,
        int dayOfYear,
        double tMaxC,
        double tMinC,
        double solarRadiationRs,
        double windSpeed2mMs,
        double rhMean,
        double elevationM
    ) {
        double tMeanC = (tMaxC + tMinC) / 2.0;
        double pressure = atmosphericPressure(elevationM);
        double gamma = psychrometricConstant(pressure);
        double delta = slopeVaporPressureCurve(tMeanC);
        double es = meanSaturationVaporPressure(tMaxC, tMinC);
        double ea = actualVaporPressure(tMaxC, tMinC, rhMean);
        double rn = netSolarRadiation(solarRadiationRs, tMaxC, tMinC, ea, latitudeDeg, dayOfYear, elevationM, 0.23);

        double numerator = 0.408 * delta * rn + gamma * (900.0 / (tMeanC + 273.0)) * windSpeed2mMs * (es - ea);
        double denominator = delta + gamma * (1.0 + 0.34 * windSpeed2mMs);

        double et0 = numerator / denominator;
        return Math.max(0.0, Math.round(et0 * 100.0) / 100.0);
    }

    public record CropGrowthState(String stageName, double kc, double rootDepthM, double pFraction) {}

    /**
     * Evaluates phenological growth stage, Kc, and root depth for a given DAP.
     */
    public CropGrowthState evaluateCropStage(CropProfile profile, int dap) {
        int d = Math.max(1, dap);
        int lIni = profile.stageLengthIni();
        int lDev = profile.stageLengthDev();
        int lMid = profile.stageLengthMid();
        int lLate = profile.stageLengthLate();

        String stage;
        double kc;
        double rootDepth;

        if (d <= lIni) {
            stage = "Initial";
            kc = profile.kcIni();
            rootDepth = profile.rootDepthMinM();
        } else if (d <= lIni + lDev) {
            stage = "Development";
            double fraction = (d - lIni) / (double) lDev;
            kc = profile.kcIni() + fraction * (profile.kcMid() - profile.kcIni());
            rootDepth = profile.rootDepthMinM() + fraction * (profile.rootDepthMaxM() - profile.rootDepthMinM());
        } else if (d <= lIni + lDev + lMid) {
            stage = "Mid-Season";
            kc = profile.kcMid();
            rootDepth = profile.rootDepthMaxM();
        } else if (d <= lIni + lDev + lMid + lLate) {
            stage = "Late-Season";
            double fraction = (d - (lIni + lDev + lMid)) / (double) lLate;
            kc = profile.kcMid() + fraction * (profile.kcEnd() - profile.kcMid());
            rootDepth = profile.rootDepthMaxM();
        } else {
            stage = "Maturity / Harvest";
            kc = profile.kcEnd();
            rootDepth = profile.rootDepthMaxM();
        }

        return new CropGrowthState(
            stage,
            Math.round(kc * 100.0) / 100.0,
            Math.round(rootDepth * 100.0) / 100.0,
            profile.pDepletionFraction()
        );
    }
}

