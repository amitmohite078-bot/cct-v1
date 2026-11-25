package com.agrocloud;

import com.agrocloud.agrometeorology.Fao56Calculator;
import com.agrocloud.model.CropProfile;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class Fao56CalculatorTest {

    private final Fao56Calculator fao56 = new Fao56Calculator();

    @Test
    void testAtmosphericPressureAtSeaLevelAndElevation() {
        double pSea = fao56.atmosphericPressure(0.0);
        assertEquals(101.3, pSea, 0.5);

        double p1800 = fao56.atmosphericPressure(1800.0);
        assertTrue(p1800 < pSea);
        assertTrue(p1800 > 80.0 && p1800 < 85.0);
    }

    @Test
    void testSaturationVaporPressureAt25C() {
        double es25 = fao56.saturationVaporPressure(25.0);
        assertEquals(3.17, es25, 0.05);

        double delta25 = fao56.slopeVaporPressureCurve(25.0);
        assertEquals(0.189, delta25, 0.01);
    }

    @Test
    void testFao56BenchmarkExample18Cairo() {
        // FAO-56 Chapter 4 Example 18:
        // Cairo, Egypt: Lat 30.0° N, Elevation 74 m, May 15 (DOY 135)
        // T_max = 34.8 °C, T_min = 17.9 °C, RH_mean = 45%, u2 = 2.0 m/s, Rs = 22.4 MJ/m2/day.
        // Standard FAO tabulated ET0 benchmark is ~5.8 - 6.1 mm/day.
        double et0 = fao56.calculateDailyEt0(
            30.0,
            135,
            34.8,
            17.9,
            22.4,
            2.0,
            45.0,
            74.0
        );

        assertTrue(et0 >= 5.4 && et0 <= 6.3, "Expected ET0 between 5.4 and 6.3, got: " + et0);
    }

    @Test
    void testCropStageProgressionTomato() {
        CropProfile tomato = CropProfile.get("tomato");
        
        // Day 15 -> Initial
        var state15 = fao56.evaluateCropStage(tomato, 15);
        assertEquals("Initial", state15.stageName());
        assertEquals(0.60, state15.kc(), 0.01);
        assertEquals(0.25, state15.rootDepthM(), 0.01);

        // Day 50 -> Development
        var state50 = fao56.evaluateCropStage(tomato, 50);
        assertEquals("Development", state50.stageName());
        assertTrue(state50.kc() > 0.60 && state50.kc() < 1.15);

        // Day 90 -> Mid-Season
        var state90 = fao56.evaluateCropStage(tomato, 90);
        assertEquals("Mid-Season", state90.stageName());
        assertEquals(1.15, state90.kc(), 0.01);
        assertEquals(0.80, state90.rootDepthM(), 0.01);
    }
}
