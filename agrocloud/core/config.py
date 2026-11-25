"""
AgroCloud AI - Core Configuration Settings
"""

import os
from pydantic import BaseModel, Field


class Settings(BaseModel):
    # Application
    APP_NAME: str = "AgroCloud AI"
    APP_VERSION: str = "0.1.0"
    ENVIRONMENT: str = os.getenv("AGROCLOUD_ENVIRONMENT", "production")
    DEBUG: bool = os.getenv("AGROCLOUD_DEBUG", "false").lower() in ("true", "1")

    # Server
    HOST: str = os.getenv("AGROCLOUD_HOST", "127.0.0.1")
    PORT: int = int(os.getenv("AGROCLOUD_PORT", "8000"))

    # Disease Screening Parameters
    DISEASE_MODEL_VERSION: str = "v1.0.0-solanaceae-mobilenetv3"
    DISEASE_ABSTENTION_THRESHOLD: float = float(os.getenv("AGROCLOUD_DISEASE_ABSTENTION_THRESHOLD", "0.70"))
    DISEASE_MARGIN_THRESHOLD: float = float(os.getenv("AGROCLOUD_DISEASE_MARGIN_THRESHOLD", "0.15"))
    IMAGE_MIN_RESOLUTION: int = 224
    IMAGE_MAX_FILE_SIZE_BYTES: int = 10 * 1024 * 1024  # 10 MB
    BLUR_LAPLACIAN_VAR_THRESHOLD: float = 80.0
    MIN_BRIGHTNESS: float = 25.0
    MAX_BRIGHTNESS: float = 230.0

    # Weather & Irrigation Parameters
    WEATHER_CACHE_TTL_HOURS: int = 1
    WEATHER_API_TIMEOUT_SECONDS: int = 10
    OPEN_METEO_URL: str = "https://api.open-meteo.com/v1/forecast"
    OPEN_METEO_ARCHIVE_URL: str = "https://archive-api.open-meteo.com/v1/archive"

    # Privacy & Audit Settings
    LOG_COORDINATE_PRECISION: int = 2  # Rounds lat/long to 2 decimals (~1.1 km)
    AUDIT_DB_PATH: str = os.getenv("AGROCLOUD_AUDIT_DB_PATH", "data/audit_provenance.db")
    RETAIN_RAW_IMAGES: bool = False  # Zero retention of raw user photos by default


settings = Settings()
