"""
AgroCloud AI - Weather-Driven Irrigation Prediction Engine
Calculates FAO-56 Reference Evapotranspiration (ET0), Crop Coefficient (Kc),
daily crop water demand (ETc), and 7-day irrigation scheduling based on local weather and soil physics.
"""
import math
from typing import Dict, Any, List

# FAO-56 Crop Coefficients (Kc) across growth stages: [Initial, Crop Dev, Mid-Season, Late Season]
CROP_KC_VALUES: Dict[str, List[float]] = {
    "rice": [1.05, 1.15, 1.25, 1.00],
    "wheat": [0.35, 0.75, 1.15, 0.45],
    "maize": [0.40, 0.80, 1.20, 0.60],
    "ragi": [0.35, 0.70, 1.05, 0.55],
    "jowar": [0.35, 0.75, 1.10, 0.55],
    "groundnut": [0.40, 0.75, 1.15, 0.60],
    "cotton": [0.45, 0.80, 1.20, 0.65],
    "sugarcane": [0.50, 0.90, 1.25, 0.85],
    "tomato": [0.50, 0.80, 1.15, 0.75],
    "onion": [0.50, 0.75, 1.05, 0.75],
    "soybean": [0.40, 0.80, 1.15, 0.50],
    "pulses_gram": [0.35, 0.70, 1.05, 0.45],
    "pulses_arhar": [0.40, 0.75, 1.10, 0.55],
    "pulses_moong": [0.35, 0.70, 1.05, 0.45],
    "mustard": [0.35, 0.70, 1.10, 0.45]
}

def calculate_irrigation_schedule(
    crop_id: str,
    weather: Dict[str, Any],
    soil: Dict[str, Any],
    growth_stage: str = "mid_season"
) -> Dict[str, Any]:
    """
    Computes daily FAO-56 evapotranspiration, soil moisture depletion, and 7-day irrigation plan.
    """
    avg_temp = weather.get("average_temperature", 26.0)
    humidity = weather.get("humidity", 60.0)
    wind_kmh = weather.get("wind_speed", 12.0)
    solar_rad_mj = weather.get("solar_radiation", 18.0)
    daily_precip = weather.get("daily_precip_forecast", [0.0] * 7)
    soil_texture = soil.get("texture_class", "Loam")

    # 1. FAO-56 Penman-Monteith Simplified Reference ET (ET0 in mm/day)
    wind_m_s = wind_kmh / 3.6
    # Radiation equivalent in mm/day (1 MJ/m2/d ~ 0.408 mm water)
    rad_equiv = solar_rad_mj * 0.408
    # Vapor pressure deficit approximation
    es = 0.6108 * math.exp((17.27 * avg_temp) / (avg_temp + 237.3))
    ea = es * (humidity / 100.0)
    vpd = max(0.1, es - ea)
    
    et0 = round(0.408 * 0.6 * rad_equiv + (900.0 / (avg_temp + 273.0)) * wind_m_s * vpd * 0.25, 2)
    et0 = max(2.5, min(9.5, et0))

    # 2. Select Kc based on growth stage
    kc_list = CROP_KC_VALUES.get(crop_id, [0.4, 0.75, 1.15, 0.6])
    stage_idx = {
        "initial": 0,
        "development": 1,
        "vegetative": 1,
        "mid_season": 2,
        "flowering": 2,
        "fruiting": 2,
        "late_season": 3,
        "maturity": 3
    }.get((growth_stage or "mid_season").lower(), 2)
    kc = kc_list[stage_idx]
    
    # 3. Crop Evapotranspiration (ETc in mm/day)
    etc_daily = round(et0 * kc, 2)

    # 4. Available Water Capacity (AWC in mm/meter of soil depth)
    awc_map = {
        "Sand": 60,
        "Loamy Sand": 85,
        "Sandy Loam": 120,
        "Sandy Clay Loam": 145,
        "Loam": 160,
        "Silt": 165,
        "Silt Loam": 180,
        "Silty Clay Loam": 175,
        "Clay Loam": 170,
        "Sandy Clay": 140,
        "Silty Clay": 160,
        "Clay": 150
    }
    awc = awc_map.get(soil_texture)
    if awc is None:
        tex_lower = (soil_texture or "").lower()
        awc = next((v for k, v in awc_map.items() if k.lower() in tex_lower), 150)
    effective_root_depth_m = 0.6 # average effective rooting depth
    total_available_water_mm = awc * effective_root_depth_m # ~90 mm
    management_allowed_depletion = 0.50 # irrigate when 50% depleted
    readily_available_water_mm = round(total_available_water_mm * management_allowed_depletion, 1)

    # 5. 7-Day Water Balance Simulation
    daily_schedule = []
    current_depletion = min(22.0, round(readily_available_water_mm * 0.55, 1))
    total_irrigation_needed_mm = 0.0

    days_names = ["Day 1 (Today)", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
    for i in range(7):
        p_rain = daily_precip[i] if i < len(daily_precip) else 0.0
        eff_rain = p_rain * 0.8 # 80% effective precipitation
        
        # Depletion increases with ETc, decreases with rainfall
        current_depletion = current_depletion + etc_daily - eff_rain
        current_depletion = max(0.0, current_depletion)
        
        irrigate_today = False
        depth_to_apply = 0.0
        
        if current_depletion >= readily_available_water_mm:
            irrigate_today = True
            depth_to_apply = round(current_depletion, 1)
            total_irrigation_needed_mm += depth_to_apply
            current_depletion = 0.0 # refilled to field capacity

        # Drip irrigation hours (assuming 4 L/hr emitters, 1 emitter per 0.5 m2 ~ 8 mm/hr)
        drip_hours = round(depth_to_apply / 8.0, 1) if irrigate_today else 0.0

        daily_schedule.append({
            "day": days_names[i],
            "reference_et0_mm": et0,
            "crop_etc_mm": etc_daily,
            "forecast_rain_mm": p_rain,
            "effective_rain_mm": round(eff_rain, 1),
            "soil_depletion_mm": round(current_depletion, 1),
            "irrigation_recommended": irrigate_today,
            "irrigation_depth_mm": depth_to_apply,
            "drip_run_hours": drip_hours,
            "status": "Irrigation Due" if irrigate_today else ("Rain Protected" if eff_rain >= etc_daily else "Moisture Adequate")
        })

    first_due = next((d["day"] for d in daily_schedule if d["irrigation_recommended"]), None)
    if first_due:
        next_irrigation_day = first_due
    else:
        remaining_raw = max(0.0, readily_available_water_mm - current_depletion)
        extra_days = max(1, math.ceil(remaining_raw / max(0.5, etc_daily)))
        next_irrigation_day = f"Day {7 + extra_days} (Adequate)"

    return {
        "crop_id": crop_id,
        "growth_stage": growth_stage,
        "crop_coefficient_kc": kc,
        "daily_reference_et0_mm": et0,
        "daily_crop_water_demand_etc_mm": etc_daily,
        "soil_moisture_holding_awc_mm": round(total_available_water_mm, 1),
        "readily_available_water_threshold_mm": readily_available_water_mm,
        "total_7day_water_demand_mm": round(etc_daily * 7, 1),
        "total_7day_irrigation_required_mm": round(total_irrigation_needed_mm, 1),
        "next_irrigation_due": next_irrigation_day,
        "daily_forecast_schedule": daily_schedule,
        "water_saving_tips": [
            "Use micro-drip irrigation during evening hours (5:00 PM - 8:00 PM) to minimize 20-30% evaporative loss",
            "Apply 5-7 cm organic paddy straw or bio-mulch to conserve root-zone capillary moisture",
            "Monitor soil suction: irrigate when tensiometer reads between 30 to 45 kPa"
        ]
    }

