"""
AgroCloud AI - Pydantic Request & Response Data Schemas
"""
from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional

class CoordinatesRequest(BaseModel):
    latitude: float = Field(..., ge=-90.0, le=90.0, description="Latitude in decimal degrees")
    longitude: float = Field(..., ge=-180.0, le=180.0, description="Longitude in decimal degrees")
    season: Optional[str] = Field(None, description="Optional target cropping season: Kharif, Rabi, Zaid")

class LocationSearchRequest(BaseModel):
    query: str = Field(..., min_length=2, description="Village, city, taluk, district or postal PIN code")

class CropSelectionRequest(BaseModel):
    crop_id: str = Field(..., description="Unique identifier of the selected crop")
    latitude: float
    longitude: float
    growth_stage: Optional[str] = "mid_season"
    farm_size_acres: Optional[float] = 2.5

class CropDoctorQuestionRequest(BaseModel):
    crop_name: str
    question: str
    field_context: Optional[Dict[str, Any]] = None
    language: Optional[str] = "en"

class CropComparisonRequest(BaseModel):
    crop_ids: List[str] = Field(..., min_length=2, max_length=4, description="List of 2 to 4 crop IDs to compare")
    latitude: float
    longitude: float

class MarketProfitabilityRequest(BaseModel):
    crop_id: Optional[str] = None
    latitude: float
    longitude: float
    farm_size_acres: float = Field(2.5, ge=0.25, le=500.0)

class PlantationTrialRequest(BaseModel):
    plant_query: str = Field(..., min_length=2, description="Plantation or orchard crop name to evaluate")
    latitude: float = Field(..., ge=-90.0, le=90.0)
    longitude: float = Field(..., ge=-180.0, le=180.0)
    farm_size_acres: float = Field(2.5, ge=0.25, le=500.0)
