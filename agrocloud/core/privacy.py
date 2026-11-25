"""
Privacy, Provenance and Data Minimization Utilities
"""

import hashlib
import sqlite3
import os
import json
from datetime import datetime, timezone
from typing import Optional, Dict, Any
from agrocloud.core.config import settings


def hash_image_bytes(image_bytes: bytes) -> str:
    """Computes a SHA-256 cryptographic digest of image bytes for provenance."""
    return hashlib.sha256(image_bytes).hexdigest()


def fuzz_coordinates(lat: float, lon: float, precision: int = None) -> tuple[float, float]:
    """
    Rounds latitude and longitude to reduce spatial resolution.
    2 decimal places gives ~1.1 km accuracy at the equator, safeguarding farm privacy.
    """
    if precision is None:
        precision = settings.LOG_COORDINATE_PRECISION
    return round(lat, precision), round(lon, precision)


class ProvenanceLogger:
    """Audit logger that records model decisions and metadata without storing raw user PII."""

    def __init__(self, db_path: Optional[str] = None):
        self.db_path = db_path or settings.AUDIT_DB_PATH
        os.makedirs(os.path.dirname(self.db_path) or ".", exist_ok=True)
        self._init_db()

    def _init_db(self):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS disease_audit (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TEXT NOT NULL,
                    image_hash TEXT NOT NULL,
                    crop_declared TEXT,
                    predicted_class TEXT,
                    confidence REAL,
                    abstained INTEGER,
                    abstain_reason TEXT,
                    model_version TEXT NOT NULL,
                    execution_time_ms REAL
                )
            """)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS irrigation_audit (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TEXT NOT NULL,
                    fuzzed_lat REAL NOT NULL,
                    fuzzed_lon REAL NOT NULL,
                    crop TEXT NOT NULL,
                    growth_stage TEXT NOT NULL,
                    soil_texture TEXT NOT NULL,
                    current_depletion_mm REAL,
                    raw_mm REAL,
                    taw_mm REAL,
                    irrigation_needed INTEGER,
                    recommended_depth_mm REAL,
                    weather_source TEXT,
                    weather_timestamp TEXT
                )
            """)
            conn.commit()

    def log_disease_screening(
        self,
        image_hash: str,
        crop_declared: Optional[str],
        predicted_class: str,
        confidence: float,
        abstained: bool,
        abstain_reason: Optional[str],
        model_version: str,
        execution_time_ms: float,
    ) -> None:
        try:
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT INTO disease_audit (
                        timestamp, image_hash, crop_declared, predicted_class,
                        confidence, abstained, abstain_reason, model_version, execution_time_ms
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    datetime.now(timezone.utc).isoformat(),
                    image_hash,
                    crop_declared,
                    predicted_class,
                    confidence,
                    1 if abstained else 0,
                    abstain_reason,
                    model_version,
                    execution_time_ms
                ))
                conn.commit()
        except Exception:
            # Audit logging failure must never fail user-facing transaction
            pass

    def log_irrigation_guidance(
        self,
        lat: float,
        lon: float,
        crop: str,
        growth_stage: str,
        soil_texture: str,
        current_depletion_mm: float,
        raw_mm: float,
        taw_mm: float,
        irrigation_needed: bool,
        recommended_depth_mm: float,
        weather_source: str,
        weather_timestamp: str,
    ) -> None:
        try:
            f_lat, f_lon = fuzz_coordinates(lat, lon)
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT INTO irrigation_audit (
                        timestamp, fuzzed_lat, fuzzed_lon, crop, growth_stage,
                        soil_texture, current_depletion_mm, raw_mm, taw_mm,
                        irrigation_needed, recommended_depth_mm, weather_source, weather_timestamp
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    datetime.now(timezone.utc).isoformat(),
                    f_lat,
                    f_lon,
                    crop,
                    growth_stage,
                    soil_texture,
                    current_depletion_mm,
                    raw_mm,
                    taw_mm,
                    1 if irrigation_needed else 0,
                    recommended_depth_mm,
                    weather_source,
                    weather_timestamp
                ))
                conn.commit()
        except Exception:
            pass


provenance_logger = ProvenanceLogger()
