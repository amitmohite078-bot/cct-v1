"""
Root-Zone Soil Water Balance & Irrigation Advisory Engine
Reference: FAO-56 (Allen et al., 1998, Chapter 6: Daily soil water balance of the root zone)
"""

from typing import List, Dict, Optional, Tuple
from datetime import date, timedelta
from pydantic import BaseModel, Field
from enum import Enum

from agrocloud.irrigation.fao56 import calculate_daily_et0, get_crop_stage_and_parameters
from agrocloud.irrigation.soil import SoilTextureClass, get_soil_properties, SoilHydraulicProperties


class IrrigationMethod(str, Enum):
    DRIP = "drip"
    SPRINKLER = "sprinkler"
    SURFACE_FURROW = "surface_furrow"


IRRIGATION_EFFICIENCY: Dict[IrrigationMethod, float] = {
    IrrigationMethod.DRIP: 0.90,           # High-efficiency localized drip
    IrrigationMethod.SPRINKLER: 0.75,     # Overhead pressurized sprinkler
    IrrigationMethod.SURFACE_FURROW: 0.60 # Traditional surface basin / furrow
}


class DailyWeatherRecord(BaseModel):
    record_date: date
    t_max_c: float
    t_min_c: float
    solar_radiation_mj: float
    wind_speed_2m_ms: float
    rh_mean: Optional[float] = None
    rh_max: Optional[float] = None
    rh_min: Optional[float] = None
    precipitation_mm: float = 0.0
    irrigation_applied_mm: float = 0.0
    is_forecast: bool = False


class DailyWaterBalanceStep(BaseModel):
    record_date: date
    is_forecast: bool
    dap: int
    stage: str
    et0_mm: float
    kc: float
    etc_mm: float
    precipitation_mm: float
    effective_rain_mm: float
    irrigation_applied_mm: float
    root_depth_m: float
    taw_mm: float
    raw_mm: float
    root_zone_depletion_mm: float
    deep_percolation_mm: float
    stress_status: str


class IrrigationAdvisoryResponse(BaseModel):
    current_date: date
    crop: str
    growth_stage: str
    dap: int
    current_root_depth_m: float
    soil_texture: str
    irrigation_method: str
    system_efficiency: float
    
    # Hydraulic state
    taw_mm: float = Field(..., description="Total Available Water in root zone")
    raw_mm: float = Field(..., description="Readily Available Water before water stress starts")
    current_depletion_mm: float = Field(..., description="Current water deficit in root zone")
    depletion_percent_of_raw: float = Field(..., description="Depletion relative to RAW (>100% means crop is experiencing water stress)")
    
    # Recommendation
    urgency: str = Field(..., description="[NO_STRESS | MONITOR | IRRIGATE_SOON | CRITICAL_STRESS]")
    action_summary: str
    recommended_net_irrigation_mm: float
    recommended_gross_irrigation_mm: float
    
    # Uncertainty / Sensitivity Interval
    uncertainty_bounds: Dict[str, float] = Field(..., description="Estimated depletion under +/- 15% soil hydraulic variability")
    
    # Projected look-ahead
    forecast_days_until_stress: Optional[int]
    daily_timeline: List[DailyWaterBalanceStep]
    assumptions_and_warnings: List[str]


def estimate_effective_rainfall(p_mm: float) -> float:
    """
    Estimates effective rainfall Peff from gross precipitation.
    FAO-56 empirical standard: small rains (<3mm) evaporate directly from canopy/soil surface.
    Larger rains have runoff losses (~20%).
    """
    if p_mm <= 3.0:
        return 0.0
    return max(0.0, 0.8 * (p_mm - 3.0))


def simulate_water_balance(
    crop: str,
    sowing_date: date,
    soil_type: SoilTextureClass,
    irrigation_method: IrrigationMethod,
    weather_history_and_forecast: List[DailyWeatherRecord],
    latitude_deg: float,
    elevation_m: float = 0.0,
    initial_depletion_mm: Optional[float] = None,
    soil_variability_multiplier: float = 1.0
) -> Tuple[List[DailyWaterBalanceStep], Dict[str, float]]:
    """
    Performs a day-by-day continuous root-zone soil water balance simulation.
    Returns:
        timeline: list of daily simulation steps
        uncertainty: min/max depletion range
    """
    soil = get_soil_properties(soil_type)
    theta_fc = soil.theta_fc * soil_variability_multiplier
    theta_wp = soil.theta_wp
    awc = max(20.0, (theta_fc - theta_wp) * 1000.0)  # mm/m

    sorted_records = sorted(weather_history_and_forecast, key=lambda x: x.record_date)
    timeline: List[DailyWaterBalanceStep] = []

    # If initial depletion is not specified, assume root zone was at field capacity (Dr = 0)
    # or moderately dry (Dr = 0.2 * TAW) at sowing.
    current_dr = initial_depletion_mm if initial_depletion_mm is not None else 0.0

    for record in sorted_records:
        doy = record.record_date.timetuple().tm_yday
        dap = max(1, (record.record_date - sowing_date).days)
        stage, kc, z_r, p = get_crop_stage_and_parameters(crop, dap)

        # ET0
        et0 = calculate_daily_et0(
            latitude_deg=latitude_deg,
            day_of_year=doy,
            t_max_c=record.t_max_c,
            t_min_c=record.t_min_c,
            solar_radiation_rs=record.solar_radiation_mj,
            wind_speed_2m_ms=record.wind_speed_2m_ms,
            rh_mean=record.rh_mean,
            rh_max=record.rh_max,
            rh_min=record.rh_min,
            elevation_m=elevation_m
        )

        etc = round(kc * et0, 2)
        taw = round(awc * z_r, 2)
        raw = round(p * taw, 2)

        # Soil water balance step
        p_eff = estimate_effective_rainfall(record.precipitation_mm)
        irrigation_in = record.irrigation_applied_mm

        # New depletion before bounding
        new_dr = current_dr - p_eff - irrigation_in + etc

        # Deep percolation occurs when water inputs exceed storage deficit (Dr < 0)
        if new_dr < 0:
            dp = abs(new_dr)
            current_dr = 0.0
        else:
            dp = 0.0
            current_dr = min(taw, new_dr)

        # Determine stress level
        if current_dr < 0.70 * raw:
            stress = "NO_STRESS"
        elif current_dr < raw:
            stress = "MONITOR"
        elif current_dr < 1.15 * raw:
            stress = "IRRIGATE_SOON"
        else:
            stress = "CRITICAL_STRESS"

        timeline.append(DailyWaterBalanceStep(
            record_date=record.record_date,
            is_forecast=record.is_forecast,
            dap=dap,
            stage=stage,
            et0_mm=et0,
            kc=kc,
            etc_mm=etc,
            precipitation_mm=record.precipitation_mm,
            effective_rain_mm=round(p_eff, 2),
            irrigation_applied_mm=irrigation_in,
            root_depth_m=z_r,
            taw_mm=taw,
            raw_mm=raw,
            root_zone_depletion_mm=round(current_dr, 2),
            deep_percolation_mm=round(dp, 2),
            stress_status=stress
        ))

    return timeline


def generate_irrigation_advisory(
    crop: str,
    sowing_date: date,
    soil_type: SoilTextureClass,
    irrigation_method: IrrigationMethod,
    weather_history_and_forecast: List[DailyWeatherRecord],
    latitude_deg: float,
    elevation_m: float = 0.0,
    current_date: Optional[date] = None
) -> IrrigationAdvisoryResponse:
    """
    Main entry point for generating complete irrigation advisory with uncertainty bounds.
    """
    if not weather_history_and_forecast:
        raise ValueError("Weather records cannot be empty.")

    # 1. Base simulation (nominal soil)
    timeline = simulate_water_balance(
        crop=crop,
        sowing_date=sowing_date,
        soil_type=soil_type,
        irrigation_method=irrigation_method,
        weather_history_and_forecast=weather_history_and_forecast,
        latitude_deg=latitude_deg,
        elevation_m=elevation_m,
        soil_variability_multiplier=1.0
    )

    # 2. Sensitivity analysis (+/- 15% available soil water)
    timeline_low = simulate_water_balance(
        crop=crop,
        sowing_date=sowing_date,
        soil_type=soil_type,
        irrigation_method=irrigation_method,
        weather_history_and_forecast=weather_history_and_forecast,
        latitude_deg=latitude_deg,
        elevation_m=elevation_m,
        soil_variability_multiplier=0.85
    )
    timeline_high = simulate_water_balance(
        crop=crop,
        sowing_date=sowing_date,
        soil_type=soil_type,
        irrigation_method=irrigation_method,
        weather_history_and_forecast=weather_history_and_forecast,
        latitude_deg=latitude_deg,
        elevation_m=elevation_m,
        soil_variability_multiplier=1.15
    )

    # Select target evaluation date (latest non-forecast or specified date)
    if current_date is None:
        non_forecast = [t for t in timeline if not t.is_forecast]
        current_step = non_forecast[-1] if non_forecast else timeline[0]
    else:
        matching = [t for t in timeline if t.record_date == current_date]
        current_step = matching[0] if matching else timeline[-1]

    idx = timeline.index(current_step)
    dr_curr = current_step.root_zone_depletion_mm
    raw_curr = current_step.raw_mm
    taw_curr = current_step.taw_mm
    eff = IRRIGATION_EFFICIENCY[irrigation_method]

    # Uncertainty bounds on current depletion
    uncertainty = {
        "depletion_nominal_mm": dr_curr,
        "depletion_pessimistic_coarser_soil_mm": timeline_low[idx].root_zone_depletion_mm,
        "depletion_optimistic_retentive_soil_mm": timeline_high[idx].root_zone_depletion_mm,
        "sensitivity_spread_mm": round(abs(timeline_low[idx].root_zone_depletion_mm - timeline_high[idx].root_zone_depletion_mm), 2)
    }

    # Depletion percentage
    depl_pct = round((dr_curr / raw_curr) * 100.0, 1) if raw_curr > 0 else 0.0

    # Advisory recommendation logic
    if dr_curr < 0.70 * raw_curr:
        urgency = "NO_STRESS"
        action_summary = "Soil moisture is ample in the active root zone. No irrigation required today."
        rec_net = 0.0
        rec_gross = 0.0
    elif dr_curr < raw_curr:
        urgency = "MONITOR"
        action_summary = "Soil moisture is decreasing but remains above the water stress threshold. Monitor forecast for upcoming rain."
        rec_net = 0.0
        rec_gross = 0.0
    elif dr_curr < 1.15 * raw_curr:
        urgency = "IRRIGATE_SOON"
        action_summary = "Root-zone moisture has reached the management depletion limit. Schedule an irrigation event within 24-48 hours."
        rec_net = round(dr_curr, 1)
        rec_gross = round(rec_net / eff, 1)
    else:
        urgency = "CRITICAL_STRESS"
        action_summary = "Crop root zone is experiencing water stress. Apply irrigation as soon as possible to prevent stomatal closure and yield penalty."
        rec_net = round(dr_curr, 1)
        rec_gross = round(rec_net / eff, 1)

    # Forecast look-ahead: Find when stress will occur if no irrigation is applied
    future_steps = timeline[idx + 1:]
    days_until_stress = None
    for step_i, f_step in enumerate(future_steps, start=1):
        if f_step.root_zone_depletion_mm >= f_step.raw_mm:
            days_until_stress = step_i
            break

    warnings = [
        "Estimates are simulated using FAO-56 agrometeorological equations and public weather data, NOT physical soil probe measurements.",
        "Local microclimates, shallow water tables, or subsoil hardpans may cause actual soil moisture to deviate from simulation.",
        "No water savings or yield gains are claimed or guaranteed without controlled on-farm randomized trials."
    ]

    return IrrigationAdvisoryResponse(
        current_date=current_step.record_date,
        crop=crop.capitalize(),
        growth_stage=current_step.stage,
        dap=current_step.dap,
        current_root_depth_m=current_step.root_depth_m,
        soil_texture=soil_type.value.replace("_", " ").title(),
        irrigation_method=irrigation_method.value.replace("_", " ").title(),
        system_efficiency=eff,
        taw_mm=taw_curr,
        raw_mm=raw_curr,
        current_depletion_mm=dr_curr,
        depletion_percent_of_raw=depl_pct,
        urgency=urgency,
        action_summary=action_summary,
        recommended_net_irrigation_mm=rec_net,
        recommended_gross_irrigation_mm=rec_gross,
        uncertainty_bounds=uncertainty,
        forecast_days_until_stress=days_until_stress,
        daily_timeline=timeline,
        assumptions_and_warnings=warnings
    )
