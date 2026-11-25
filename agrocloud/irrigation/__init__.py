"""
AgroCloud AI - Irrigation & Agrometeorology Package
"""

from agrocloud.irrigation.fao56 import calculate_daily_et0, get_crop_stage_and_parameters
from agrocloud.irrigation.soil import SoilTextureClass, get_soil_properties
from agrocloud.irrigation.water_balance import (
    generate_irrigation_advisory,
    simulate_water_balance,
    IrrigationMethod,
    DailyWeatherRecord,
    IrrigationAdvisoryResponse
)
from agrocloud.irrigation.weather_client import weather_client
