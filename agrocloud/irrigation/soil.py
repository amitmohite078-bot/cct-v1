"""
Soil Texture Classification & Hydraulic Properties
Values based on FAO-56 (Allen et al., 1998, Chapter 3, Table 19)
"""

from enum import Enum
from pydantic import BaseModel, Field
from typing import Dict


class SoilTextureClass(str, Enum):
    SAND = "sand"
    LOAMY_SAND = "loamy_sand"
    SANDY_LOAM = "sandy_loam"
    LOAM = "loam"
    SILT_LOAM = "silt_loam"
    CLAY_LOAM = "clay_loam"
    SILTY_CLAY = "silty_clay"
    CLAY = "clay"


class SoilHydraulicProperties(BaseModel):
    texture_name: str
    theta_fc: float = Field(..., description="Volumetric water content at Field Capacity [m3/m3]")
    theta_wp: float = Field(..., description="Volumetric water content at Wilting Point [m3/m3]")
    awc_mm_per_m: float = Field(..., description="Available Water Capacity in mm of water per meter of soil depth")


# Standard FAO-56 hydraulic values for general textural classes
SOIL_DATABASE: Dict[SoilTextureClass, SoilHydraulicProperties] = {
    SoilTextureClass.SAND: SoilHydraulicProperties(
        texture_name="Sand",
        theta_fc=0.10,
        theta_wp=0.04,
        awc_mm_per_m=60.0
    ),
    SoilTextureClass.LOAMY_SAND: SoilHydraulicProperties(
        texture_name="Loamy Sand",
        theta_fc=0.14,
        theta_wp=0.06,
        awc_mm_per_m=80.0
    ),
    SoilTextureClass.SANDY_LOAM: SoilHydraulicProperties(
        texture_name="Sandy Loam",
        theta_fc=0.20,
        theta_wp=0.09,
        awc_mm_per_m=110.0
    ),
    SoilTextureClass.LOAM: SoilHydraulicProperties(
        texture_name="Loam",
        theta_fc=0.27,
        theta_wp=0.12,
        awc_mm_per_m=150.0
    ),
    SoilTextureClass.SILT_LOAM: SoilHydraulicProperties(
        texture_name="Silt Loam",
        theta_fc=0.30,
        theta_wp=0.13,
        awc_mm_per_m=170.0
    ),
    SoilTextureClass.CLAY_LOAM: SoilHydraulicProperties(
        texture_name="Clay Loam",
        theta_fc=0.32,
        theta_wp=0.17,
        awc_mm_per_m=150.0
    ),
    SoilTextureClass.SILTY_CLAY: SoilHydraulicProperties(
        texture_name="Silty Clay",
        theta_fc=0.35,
        theta_wp=0.20,
        awc_mm_per_m=150.0
    ),
    SoilTextureClass.CLAY: SoilHydraulicProperties(
        texture_name="Clay",
        theta_fc=0.38,
        theta_wp=0.24,
        awc_mm_per_m=140.0
    )
}


def get_soil_properties(soil_type: SoilTextureClass) -> SoilHydraulicProperties:
    """Retrieve hydraulic parameters for a specified soil textural class."""
    if isinstance(soil_type, str):
        soil_type = SoilTextureClass(soil_type.lower())
    return SOIL_DATABASE[soil_type]
