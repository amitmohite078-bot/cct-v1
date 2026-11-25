"""
AgroCloud AI - Configuration and Metadata Constants
Defines API endpoints, public dataset provenance registries, and Indian Agro-Climatic Zones.
"""
from pydantic import BaseModel
from typing import Dict, Any

class Settings(BaseModel):
    APP_NAME: str = "AgroCloud AI - Geo-Spatial Crop Suitability Engine"
    VERSION: str = "2.4.0"
    DEBUG: bool = True
    PORT: int = 8000
    HOST: str = "127.0.0.1"
    
    # Public Geospatial Data Sources
    OPEN_METEO_API: str = "https://api.open-meteo.com/v1/forecast"
    OPEN_METEO_ARCHIVE_API: str = "https://archive-api.open-meteo.com/v1/archive"
    OPEN_METEO_ELEVATION_API: str = "https://api.open-meteo.com/v1/elevation"
    SOILGRIDS_API: str = "https://rest.isric.org/soilgrids/v2.0/properties/query"
    NOMINATIM_REVERSE_API: str = "https://nominatim.openstreetmap.org/reverse"
    NOMINATIM_SEARCH_API: str = "https://nominatim.openstreetmap.org/search"
    
    # Grid specifications
    GRID_SIZE_METERS: float = 1000.0   # Exactly 1 km x 1 km analysis grid
    SUBGRID_DIVISIONS: int = 5         # 5x5 sub-cells (200m x 200m each) for micro-spatial variance
    
settings = Settings()

# Indian Agro-Climatic Zones defined by Planning Commission & ICAR
INDIAN_AGRO_CLIMATIC_ZONES: Dict[str, Dict[str, Any]] = {
    "zone_1": {
        "name": "Western Himalayan Region",
        "states": ["Jammu and Kashmir", "Himachal Pradesh", "Uttarakhand"],
        "major_soils": ["Brown Hill", "Sub-montane", "Mountain Meadow"],
        "dominant_crops": ["Wheat", "Maize", "Barley", "Apple", "Potato"]
    },
    "zone_2": {
        "name": "Eastern Himalayan Region",
        "states": ["Assam", "Sikkim", "Arunachal Pradesh", "Meghalaya", "Nagaland", "Manipur", "Mizoram", "Tripura"],
        "major_soils": ["Red Sandy", "Laterite", "Alluvial"],
        "dominant_crops": ["Rice", "Maize", "Jute", "Tea", "Pulses"]
    },
    "zone_3": {
        "name": "Lower Gangetic Plain Region",
        "states": ["West Bengal"],
        "major_soils": ["Deltaic Alluvial", "Saline", "Coastal"],
        "dominant_crops": ["Rice", "Jute", "Potato", "Mustard"]
    },
    "zone_4": {
        "name": "Middle Gangetic Plain Region",
        "states": ["Uttar Pradesh", "Bihar"],
        "major_soils": ["Alluvial (Khadar and Bhangar)", "Sandy Loam", "Clay Loam"],
        "dominant_crops": ["Rice", "Wheat", "Maize", "Sugarcane", "Pulses"]
    },
    "zone_5": {
        "name": "Upper Gangetic Plain Region",
        "states": ["Uttar Pradesh", "Haryana", "Delhi"],
        "major_soils": ["Alluvial", "Sandy Loam", "Silt Loam"],
        "dominant_crops": ["Wheat", "Rice", "Sugarcane", "Mustard", "Maize"]
    },
    "zone_6": {
        "name": "Trans-Gangetic Plain Region",
        "states": ["Punjab", "Haryana", "Rajasthan (Northern)"],
        "major_soils": ["Alluvial", "Arid Desert", "Calcareous"],
        "dominant_crops": ["Wheat", "Rice", "Cotton", "Sugarcane", "Gram"]
    },
    "zone_7": {
        "name": "Eastern Plateau and Hills",
        "states": ["Jharkhand", "Odisha", "Chhattisgarh", "Madhya Pradesh (Eastern)"],
        "major_soils": ["Red and Yellow", "Laterite", "Red Loam"],
        "dominant_crops": ["Rice", "Ragi", "Groundnut", "Pigeonpea", "Maize"]
    },
    "zone_8": {
        "name": "Central Plateau and Hills",
        "states": ["Madhya Pradesh", "Rajasthan (Southern)", "Uttar Pradesh (Bundelkhand)"],
        "major_soils": ["Black (Regur)", "Mixed Red and Black", "Alluvial"],
        "dominant_crops": ["Soybean", "Wheat", "Gram", "Jowar", "Cotton"]
    },
    "zone_9": {
        "name": "Western Plateau and Hills",
        "states": ["Maharashtra", "Madhya Pradesh (South-Western)"],
        "major_soils": ["Medium Black", "Deep Black", "Lateritic"],
        "dominant_crops": ["Cotton", "Jowar", "Soybean", "Sugarcane", "Onion", "Pigeonpea"]
    },
    "zone_10": {
        "name": "Southern Plateau and Hills",
        "states": ["Andhra Pradesh", "Telangana", "Karnataka", "Tamil Nadu (Inland)"],
        "major_soils": ["Red Sandy", "Red Loam", "Black Soil"],
        "dominant_crops": ["Ragi", "Jowar", "Groundnut", "Cotton", "Maize", "Pulses"]
    },
    "zone_11": {
        "name": "East Coast Plains and Hills",
        "states": ["Odisha", "Andhra Pradesh", "Tamil Nadu (Coastal)"],
        "major_soils": ["Alluvial", "Deltaic", "Coastal Sandy"],
        "dominant_crops": ["Rice", "Groundnut", "Sugarcane", "Pulses"]
    },
    "zone_12": {
        "name": "West Coast Plains and Ghats",
        "states": ["Kerala", "Goa", "Karnataka (Coastal)", "Maharashtra (Konkan)"],
        "major_soils": ["Laterite", "Coastal Alluvial", "Red Sandy"],
        "dominant_crops": ["Rice", "Coconut", "Ragi", "Pulses"]
    },
    "zone_13": {
        "name": "Gujarat Plains and Hills",
        "states": ["Gujarat"],
        "major_soils": ["Medium Black", "Alluvial", "Saline", "Sandy"],
        "dominant_crops": ["Cotton", "Groundnut", "Wheat", "Jowar", "Castor"]
    },
    "zone_14": {
        "name": "Western Dry Region",
        "states": ["Rajasthan (Western)"],
        "major_soils": ["Desert Sand", "Gypsiferous", "Calcareous"],
        "dominant_crops": ["Bajra (Pearl Millet)", "Jowar", "Gram", "Guar", "Mustard"]
    },
    "zone_15": {
        "name": "Islands Region",
        "states": ["Andaman and Nicobar", "Lakshadweep"],
        "major_soils": ["Coral Sand", "Red Loam"],
        "dominant_crops": ["Rice", "Coconut", "Maize"]
    }
}

