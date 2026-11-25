"""
FAO-56 Penman-Monteith Agrometeorological Equations & Crop Parameter Engine
Reference: Allen, R. G., Pereira, L. S., Raes, D., & Smith, M. (1998).
Crop evapotranspiration - Guidelines for computing crop water requirements.
FAO Irrigation and drainage paper 56. Food and Agriculture Organization, Rome.
"""

import math
from typing import Dict, Tuple, Optional
from pydantic import BaseModel, Field
from datetime import date


STEFAN_BOLTZMANN_CONSTANT = 4.903e-9  # MJ K^-4 m^-2 day^-1
SOLAR_CONSTANT = 0.0820  # MJ m^-2 min^-1


def atmospheric_pressure(elevation_m: float) -> float:
    """
    Computes atmospheric pressure [kPa] from elevation above sea level [m].
    FAO-56 Eq. 7.
    """
    return 101.3 * math.pow((293.0 - 0.0065 * elevation_m) / 293.0, 5.26)


def psychrometric_constant(pressure_kpa: float) -> float:
    """
    Computes psychrometric constant gamma [kPa / °C] for a given atmospheric pressure.
    FAO-56 Eq. 8.
    """
    return 0.665e-3 * pressure_kpa


def saturation_vapor_pressure(temp_c: float) -> float:
    """
    Computes saturation vapor pressure e°(T) [kPa] at temperature T [°C].
    FAO-56 Eq. 11.
    """
    return 0.6108 * math.exp((17.27 * temp_c) / (temp_c + 237.3))


def mean_saturation_vapor_pressure(t_max_c: float, t_min_c: float) -> float:
    """
    Computes mean saturation vapor pressure es [kPa] from daily T_max and T_min.
    FAO-56 Eq. 12.
    """
    return (saturation_vapor_pressure(t_max_c) + saturation_vapor_pressure(t_min_c)) / 2.0


def actual_vapor_pressure_from_rh(
    t_max_c: float,
    t_min_c: float,
    rh_max: Optional[float] = None,
    rh_min: Optional[float] = None,
    rh_mean: Optional[float] = None
) -> float:
    """
    Computes actual vapor pressure ea [kPa] from relative humidity.
    If RH_max and RH_min are available: FAO-56 Eq. 17.
    Otherwise, if only RH_mean is available: FAO-56 Eq. 19.
    """
    e_tmin = saturation_vapor_pressure(t_min_c)
    e_tmax = saturation_vapor_pressure(t_max_c)

    if rh_max is not None and rh_min is not None:
        ea = (e_tmin * (rh_max / 100.0) + e_tmax * (rh_min / 100.0)) / 2.0
    elif rh_mean is not None:
        es = (e_tmin + e_tmax) / 2.0
        ea = es * (rh_mean / 100.0)
    else:
        # Fallback assuming dew point temperature approximately equals T_min (FAO-56 Eq. 48)
        ea = e_tmin

    return max(0.001, ea)


def slope_vapor_pressure_curve(temp_c: float) -> float:
    """
    Computes slope of saturation vapor pressure curve Delta [kPa / °C] at temperature T [°C].
    FAO-56 Eq. 13.
    """
    temp_term = temp_c + 237.3
    return (4098.0 * (0.6108 * math.exp((17.27 * temp_c) / temp_term))) / (temp_term ** 2)


def extraterrestrial_radiation(latitude_deg: float, day_of_year: int) -> Tuple[float, float, float]:
    """
    Computes extraterrestrial radiation Ra [MJ m^-2 day^-1],
    inverse relative distance Earth-Sun dr, and sunset hour angle omega_s.
    FAO-56 Eqs. 21, 23, 24, 28.
    """
    lat_rad = (math.pi / 180.0) * latitude_deg
    dr = 1.0 + 0.033 * math.cos((2.0 * math.pi / 365.0) * day_of_year)
    solar_declination = 0.409 * math.sin(((2.0 * math.pi / 365.0) * day_of_year) - 1.39)

    tan_term = -math.tan(lat_rad) * math.tan(solar_declination)
    # Sunset hour angle bounded between -1 and 1
    if tan_term >= 1.0:
        omega_s = 0.0  # Polar night
    elif tan_term <= -1.0:
        omega_s = math.pi  # Polar day
    else:
        omega_s = math.acos(tan_term)

    ra = ((24.0 * 60.0) / math.pi) * SOLAR_CONSTANT * dr * (
        omega_s * math.sin(lat_rad) * math.sin(solar_declination)
        + math.cos(lat_rad) * math.cos(solar_declination) * math.sin(omega_s)
    )
    return max(0.0, ra), dr, omega_s


def clear_sky_solar_radiation(ra: float, elevation_m: float) -> float:
    """
    Computes clear-sky solar radiation Rso [MJ m^-2 day^-1].
    FAO-56 Eq. 37.
    """
    return (0.75 + 2e-5 * elevation_m) * ra


def net_solar_radiation(
    solar_radiation_rs: float,
    t_max_c: float,
    t_min_c: float,
    ea_kpa: float,
    latitude_deg: float,
    day_of_year: int,
    elevation_m: float = 0.0,
    albedo: float = 0.23
) -> float:
    """
    Computes net radiation Rn [MJ m^-2 day^-1] = Rns - Rnl.
    FAO-56 Eqs. 38, 39, 40.
    """
    # 1. Net shortwave radiation (Eq. 38)
    r_ns = (1.0 - albedo) * solar_radiation_rs

    # 2. Extraterrestrial radiation & Clear-sky radiation
    ra, _, _ = extraterrestrial_radiation(latitude_deg, day_of_year)
    r_so = clear_sky_solar_radiation(ra, elevation_m)

    # Ratio Rs / Rso bounded [0.3, 1.0] to prevent unphysical longwave radiation
    if r_so > 0:
        rel_solar = min(1.0, max(0.3, solar_radiation_rs / r_so))
    else:
        rel_solar = 0.5

    # 3. Net longwave radiation (Eq. 39)
    t_max_k4 = (t_max_c + 273.16) ** 4
    t_min_k4 = (t_min_c + 273.16) ** 4
    mean_temp_k4 = (t_max_k4 + t_min_k4) / 2.0

    r_nl = STEFAN_BOLTZMANN_CONSTANT * mean_temp_k4 * (0.34 - 0.14 * math.sqrt(ea_kpa)) * (1.35 * rel_solar - 0.35)

    return r_ns - r_nl


def calculate_daily_et0(
    latitude_deg: float,
    day_of_year: int,
    t_max_c: float,
    t_min_c: float,
    solar_radiation_rs: float,
    wind_speed_2m_ms: float,
    rh_mean: Optional[float] = None,
    rh_max: Optional[float] = None,
    rh_min: Optional[float] = None,
    elevation_m: float = 0.0,
    soil_heat_flux_g: float = 0.0
) -> float:
    """
    Computes daily FAO-56 Penman-Monteith reference evapotranspiration ET0 [mm/day].
    FAO-56 Eq. 6.
    """
    t_mean_c = (t_max_c + t_min_c) / 2.0
    pressure = atmospheric_pressure(elevation_m)
    gamma = psychrometric_constant(pressure)
    delta = slope_vapor_pressure_curve(t_mean_c)
    es = mean_saturation_vapor_pressure(t_max_c, t_min_c)
    ea = actual_vapor_pressure_from_rh(t_max_c, t_min_c, rh_max=rh_max, rh_min=rh_min, rh_mean=rh_mean)
    rn = net_solar_radiation(solar_radiation_rs, t_max_c, t_min_c, ea, latitude_deg, day_of_year, elevation_m)

    # FAO-56 PM Equation:
    numerator = 0.408 * delta * (rn - soil_heat_flux_g) + gamma * (900.0 / (t_mean_c + 273.0)) * wind_speed_2m_ms * (es - ea)
    denominator = delta + gamma * (1.0 + 0.34 * wind_speed_2m_ms)

    et0 = numerator / denominator
    return max(0.0, round(et0, 2))


# --- Crop Phenology & Crop Coefficients (FAO-56 Table 12 & Table 22) ---

class GrowthStageInfo(BaseModel):
    stage_name: str
    dap_start: int
    dap_end: int
    kc: float
    root_depth_m: float


class CropPhenologyProfile(BaseModel):
    crop_name: str
    kc_ini: float
    kc_mid: float
    kc_end: float
    p_depletion_fraction: float  # FAO-56 Table 22 depletion fraction for no stress
    stage_lengths_days: Dict[str, int]  # {'ini': 30, 'dev': 40, 'mid': 45, 'late': 30}
    root_depth_min_m: float
    root_depth_max_m: float


CROP_PROFILES: Dict[str, CropPhenologyProfile] = {
    "tomato": CropPhenologyProfile(
        crop_name="Tomato",
        kc_ini=0.60,
        kc_mid=1.15,
        kc_end=0.80,
        p_depletion_fraction=0.40,
        stage_lengths_days={"ini": 30, "dev": 40, "mid": 45, "late": 30},
        root_depth_min_m=0.25,
        root_depth_max_m=0.80
    ),
    "potato": CropPhenologyProfile(
        crop_name="Potato",
        kc_ini=0.50,
        kc_mid=1.15,
        kc_end=0.75,
        p_depletion_fraction=0.35,
        stage_lengths_days={"ini": 25, "dev": 30, "mid": 45, "late": 30},
        root_depth_min_m=0.20,
        root_depth_max_m=0.55
    )
}


def get_crop_stage_and_parameters(
    crop_name: str,
    days_after_planting: int
) -> Tuple[str, float, float, float]:
    """
    Returns (stage_name, Kc, current_root_depth_m, p_fraction) for a given crop and DAP.
    Implements linear interpolation for Kc and root depth during development and late stages.
    """
    crop_key = crop_name.lower().strip()
    if crop_key not in CROP_PROFILES:
        raise ValueError(f"Crop '{crop_name}' is not supported in the pilot. Supported crops: {list(CROP_PROFILES.keys())}")

    profile = CROP_PROFILES[crop_key]
    l_ini = profile.stage_lengths_days["ini"]
    l_dev = profile.stage_lengths_days["dev"]
    l_mid = profile.stage_lengths_days["mid"]
    l_late = profile.stage_lengths_days["late"]

    dap = max(1, days_after_planting)

    if dap <= l_ini:
        stage = "Initial"
        kc = profile.kc_ini
        root_depth = profile.root_depth_min_m
    elif dap <= l_ini + l_dev:
        stage = "Development"
        fraction = (dap - l_ini) / float(l_dev)
        kc = profile.kc_ini + fraction * (profile.kc_mid - profile.kc_ini)
        root_depth = profile.root_depth_min_m + fraction * (profile.root_depth_max_m - profile.root_depth_min_m)
    elif dap <= l_ini + l_dev + l_mid:
        stage = "Mid-Season"
        kc = profile.kc_mid
        root_depth = profile.root_depth_max_m
    elif dap <= l_ini + l_dev + l_mid + l_late:
        stage = "Late-Season"
        fraction = (dap - (l_ini + l_dev + l_mid)) / float(l_late)
        kc = profile.kc_mid + fraction * (profile.kc_end - profile.kc_mid)
        root_depth = profile.root_depth_max_m
    else:
        stage = "Maturity / Harvest"
        kc = profile.kc_end
        root_depth = profile.root_depth_max_m

    return stage, round(kc, 2), round(root_depth, 2), profile.p_depletion_fraction
