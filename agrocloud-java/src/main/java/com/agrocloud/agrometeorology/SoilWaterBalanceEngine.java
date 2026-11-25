package com.agrocloud.agrometeorology;

import com.agrocloud.model.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

/**
 * Root-Zone Soil Water Balance Engine with Sensitivity Analysis & FAO-56 Modeling
 */
@Service
public class SoilWaterBalanceEngine {

    private final Fao56Calculator fao56;

    public SoilWaterBalanceEngine(Fao56Calculator fao56) {
        this.fao56 = fao56;
    }

    public static final Map<String, Double> IRRIGATION_EFFICIENCIES = Map.of(
        "drip", 0.90,
        "sprinkler", 0.75,
        "surface_furrow", 0.60
    );

    public double estimateEffectiveRainfall(double rainMm) {
        if (rainMm <= 3.0) return 0.0;
        return Math.max(0.0, 0.8 * (rainMm - 3.0));
    }

    public List<WaterBalanceStep> simulate(
        CropProfile crop,
        LocalDate sowingDate,
        SoilTexture soil,
        List<WeatherRecord> records,
        double latitudeDeg,
        double elevationM,
        double soilVariabilityMultiplier
    ) {
        double thetaFc = soil.getThetaFc() * soilVariabilityMultiplier;
        double thetaWp = soil.getThetaWp();
        double awc = Math.max(20.0, (thetaFc - thetaWp) * 1000.0); // mm/m

        List<WeatherRecord> sorted = records.stream()
            .sorted(Comparator.comparing(WeatherRecord::date))
            .toList();

        List<WaterBalanceStep> steps = new ArrayList<>();
        double currentDr = 0.0; // Start at field capacity

        for (WeatherRecord rec : sorted) {
            int doy = rec.date().getDayOfYear();
            int dap = Math.max(1, (int) ChronoUnit.DAYS.between(sowingDate, rec.date()));
            Fao56Calculator.CropGrowthState growth = fao56.evaluateCropStage(crop, dap);

            double et0 = fao56.calculateDailyEt0(
                latitudeDeg,
                doy,
                rec.tMaxC(),
                rec.tMinC(),
                rec.solarRadiationMj(),
                rec.windSpeed2mMs(),
                rec.rhMean(),
                elevationM
            );

            double etc = Math.round(growth.kc() * et0 * 100.0) / 100.0;
            double taw = Math.round(awc * growth.rootDepthM() * 100.0) / 100.0;
            double raw = Math.round(growth.pFraction() * taw * 100.0) / 100.0;

            double pEff = Math.round(estimateEffectiveRainfall(rec.precipitationMm()) * 100.0) / 100.0;
            double irrIn = rec.irrigationAppliedMm();

            double newDr = currentDr - pEff - irrIn + etc;
            double dp = 0.0;
            if (newDr < 0) {
                dp = Math.abs(newDr);
                currentDr = 0.0;
            } else {
                currentDr = Math.min(taw, newDr);
            }

            String stress;
            if (currentDr < 0.70 * raw) {
                stress = "NO_STRESS";
            } else if (currentDr < raw) {
                stress = "MONITOR";
            } else if (currentDr < 1.15 * raw) {
                stress = "IRRIGATE_SOON";
            } else {
                stress = "CRITICAL_STRESS";
            }

            steps.add(new WaterBalanceStep(
                rec.date(),
                rec.isForecast(),
                dap,
                growth.stageName(),
                et0,
                growth.kc(),
                etc,
                rec.precipitationMm(),
                pEff,
                irrIn,
                growth.rootDepthM(),
                taw,
                raw,
                Math.round(currentDr * 100.0) / 100.0,
                Math.round(dp * 100.0) / 100.0,
                stress
            ));
        }

        return steps;
    }

    public IrrigationAdvisory generateAdvisory(
        String cropName,
        LocalDate sowingDate,
        SoilTexture soil,
        String irrigationMethod,
        List<WeatherRecord> records,
        double latitudeDeg,
        double elevationM,
        LocalDate evaluationDate,
        Map<String, Object> weatherProvenance
    ) {
        CropProfile crop = CropProfile.get(cropName);
        String methodKey = irrigationMethod != null ? irrigationMethod.toLowerCase() : "drip";
        double efficiency = IRRIGATION_EFFICIENCIES.getOrDefault(methodKey, 0.80);

        List<WaterBalanceStep> nominal = simulate(crop, sowingDate, soil, records, latitudeDeg, elevationM, 1.0);
        List<WaterBalanceStep> lowSoil = simulate(crop, sowingDate, soil, records, latitudeDeg, elevationM, 0.85);
        List<WaterBalanceStep> highSoil = simulate(crop, sowingDate, soil, records, latitudeDeg, elevationM, 1.15);

        WaterBalanceStep currentStep = nominal.stream()
            .filter(s -> s.date().equals(evaluationDate))
            .findFirst()
            .orElseGet(() -> {
                return nominal.stream().filter(s -> !s.isForecast()).reduce((first, second) -> second)
                    .orElse(nominal.get(0));
            });

        int idx = nominal.indexOf(currentStep);
        double drCurr = currentStep.rootZoneDepletionMm();
        double rawCurr = currentStep.rawMm();
        double tawCurr = currentStep.tawMm();

        Map<String, Double> uncertainty = Map.of(
            "depletion_nominal_mm", drCurr,
            "depletion_coarser_soil_mm", lowSoil.get(idx).rootZoneDepletionMm(),
            "depletion_retentive_soil_mm", highSoil.get(idx).rootZoneDepletionMm(),
            "sensitivity_spread_mm", Math.round(Math.abs(lowSoil.get(idx).rootZoneDepletionMm() - highSoil.get(idx).rootZoneDepletionMm()) * 100.0) / 100.0
        );

        double deplPct = rawCurr > 0 ? Math.round((drCurr / rawCurr) * 1000.0) / 10.0 : 0.0;

        String urgency;
        String actionSummary;
        double recNet;
        double recGross;

        if (drCurr < 0.70 * rawCurr) {
            urgency = "NO_STRESS";
            actionSummary = "Soil moisture is ample in the active root zone. No irrigation required today.";
            recNet = 0.0;
            recGross = 0.0;
        } else if (drCurr < rawCurr) {
            urgency = "MONITOR";
            actionSummary = "Soil moisture is decreasing but remains above the water stress threshold. Monitor forecast for upcoming rain.";
            recNet = 0.0;
            recGross = 0.0;
        } else if (drCurr < 1.15 * rawCurr) {
            urgency = "IRRIGATE_SOON";
            actionSummary = "Root-zone moisture has reached the management depletion limit. Schedule an irrigation event within 24-48 hours.";
            recNet = Math.round(drCurr * 10.0) / 10.0;
            recGross = Math.round((recNet / efficiency) * 10.0) / 10.0;
        } else {
            urgency = "CRITICAL_STRESS";
            actionSummary = "Crop root zone is experiencing water stress. Apply irrigation as soon as possible to prevent stomatal closure and yield penalty.";
            recNet = Math.round(drCurr * 10.0) / 10.0;
            recGross = Math.round((recNet / efficiency) * 10.0) / 10.0;
        }

        Integer daysUntilStress = null;
        for (int i = idx + 1; i < nominal.size(); i++) {
            if (nominal.get(i).rootZoneDepletionMm() >= nominal.get(i).rawMm()) {
                daysUntilStress = i - idx;
                break;
            }
        }

        List<String> warnings = List.of(
            "Estimates are simulated using FAO-56 agrometeorological equations and public weather data, NOT physical soil probe measurements.",
            "Local microclimates, shallow water tables, or subsoil hardpans may cause actual soil moisture to deviate from simulation.",
            "No water savings or yield gains are claimed or guaranteed without controlled on-farm randomized trials."
        );

        return new IrrigationAdvisory(
            currentStep.date(),
            crop.cropName(),
            currentStep.stage(),
            currentStep.dap(),
            currentStep.rootDepthM(),
            soil.getDisplayName(),
            methodKey.replace("_", " ").toUpperCase(),
            efficiency,
            tawCurr,
            rawCurr,
            drCurr,
            deplPct,
            urgency,
            actionSummary,
            recNet,
            recGross,
            uncertainty,
            daysUntilStress,
            nominal,
            warnings,
            weatherProvenance
        );
    }
}

