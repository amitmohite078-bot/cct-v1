package com.agrocloud;

import com.agrocloud.agrometeorology.Fao56Calculator;
import com.agrocloud.agrometeorology.SoilWaterBalanceEngine;
import com.agrocloud.model.*;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class SoilWaterBalanceEngineTest {

    private final Fao56Calculator fao56 = new Fao56Calculator();
    private final SoilWaterBalanceEngine engine = new SoilWaterBalanceEngine(fao56);

    @Test
    void testRainfallReducesRootZoneDepletion() {
        CropProfile tomato = CropProfile.get("tomato");
        LocalDate sowing = LocalDate.of(2026, 4, 1);
        LocalDate base = LocalDate.of(2026, 5, 1);

        List<WeatherRecord> records = List.of(
            new WeatherRecord(base, 30.0, 18.0, 22.0, 2.0, 50.0, 0.0, 0.0, false),
            new WeatherRecord(base.plusDays(1), 30.0, 18.0, 22.0, 2.0, 50.0, 0.0, 0.0, false),
            new WeatherRecord(base.plusDays(2), 30.0, 18.0, 22.0, 2.0, 50.0, 0.0, 0.0, false),
            new WeatherRecord(base.plusDays(3), 24.0, 15.0, 10.0, 2.0, 85.0, 35.0, 0.0, false) // 35mm heavy rain
        );

        List<WaterBalanceStep> steps = engine.simulate(
            tomato, sowing, SoilTexture.LOAM, records, 25.0, 0.0, 1.0
        );

        assertEquals(4, steps.size());
        // Depletion accumulates on dry days
        assertTrue(steps.get(0).rootZoneDepletionMm() < steps.get(1).rootZoneDepletionMm());
        assertTrue(steps.get(1).rootZoneDepletionMm() < steps.get(2).rootZoneDepletionMm());
        // Heavy rain reduces root zone deficit
        assertTrue(steps.get(3).rootZoneDepletionMm() < steps.get(2).rootZoneDepletionMm());
    }

    @Test
    void testIrrigationAdvisoryTriggerWhenDepletionExceedsRaw() {
        LocalDate sowing = LocalDate.of(2026, 4, 1);
        LocalDate evalDate = LocalDate.of(2026, 5, 20);

        List<WeatherRecord> records = new ArrayList<>();
        // 18 consecutive hot dry days with no rain
        for (int i = 18; i >= 0; i--) {
            records.add(new WeatherRecord(
                evalDate.minusDays(i), 36.0, 24.0, 26.0, 3.2, 35.0, 0.0, 0.0, false
            ));
        }

        IrrigationAdvisory advisory = engine.generateAdvisory(
            "tomato",
            sowing,
            SoilTexture.SANDY_LOAM,
            "drip",
            records,
            28.0,
            100.0,
            evalDate,
            Map.of("source", "Test Mock")
        );

        assertNotNull(advisory);
        assertTrue(advisory.urgency().equals("IRRIGATE_SOON") || advisory.urgency().equals("CRITICAL_STRESS"));
        assertTrue(advisory.recommendedNetIrrigationMm() > 0);
        assertTrue(advisory.recommendedGrossIrrigationMm() > advisory.recommendedNetIrrigationMm());
        assertNotNull(advisory.uncertaintyBounds().get("sensitivity_spread_mm"));
    }
}

