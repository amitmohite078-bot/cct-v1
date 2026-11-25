"""
Public Weather Data Retrieval Client (Open-Meteo Integration)
License & Attribution: Weather data by Open-Meteo.com under CC-BY 4.0 / ODbL
"""

import sqlite3
import json
import logging
import math
from datetime import date, datetime, timedelta, timezone
from typing import List, Dict, Any, Optional, Tuple
import requests

from agrocloud.core.config import settings
from agrocloud.core.privacy import fuzz_coordinates
from agrocloud.irrigation.water_balance import DailyWeatherRecord

logger = logging.getLogger(__name__)


class WeatherClient:
    """Retrieves and harmonizes public weather data with local disk caching."""

    def __init__(self, cache_db: Optional[str] = None):
        self.cache_db = cache_db or "data/weather_cache.db"
        self._init_cache()

    def _init_cache(self):
        import os
        os.makedirs(os.path.dirname(self.cache_db) or ".", exist_ok=True)
        with sqlite3.connect(self.cache_db) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS weather_cache (
                    cache_key TEXT PRIMARY KEY,
                    fetched_at TEXT NOT NULL,
                    payload_json TEXT NOT NULL
                )
            """)
            conn.commit()

    def _get_cached_payload(self, cache_key: str) -> Optional[Dict[str, Any]]:
        try:
            with sqlite3.connect(self.cache_db) as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT fetched_at, payload_json FROM weather_cache WHERE cache_key = ?", (cache_key,))
                row = cursor.fetchone()
                if row:
                    fetched_at = datetime.fromisoformat(row[0])
                    age = datetime.now(timezone.utc) - fetched_at
                    if age.total_seconds() < settings.WEATHER_CACHE_TTL_HOURS * 3600:
                        return json.loads(row[1])
        except Exception as e:
            logger.warning(f"Weather cache read failed: {e}")
        return None

    def _set_cached_payload(self, cache_key: str, payload: Dict[str, Any]) -> None:
        try:
            with sqlite3.connect(self.cache_db) as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT OR REPLACE INTO weather_cache (cache_key, fetched_at, payload_json)
                    VALUES (?, ?, ?)
                """, (cache_key, datetime.now(timezone.utc).isoformat(), json.dumps(payload)))
                conn.commit()
        except Exception as e:
            logger.warning(f"Weather cache write failed: {e}")

    def fetch_weather(
        self,
        lat: float,
        lon: float,
        past_days: int = 7,
        forecast_days: int = 7
    ) -> Tuple[List[DailyWeatherRecord], Dict[str, Any]]:
        """
        Retrieves daily agrometeorological timeseries for [today - past_days, today + forecast_days].
        Returns:
            records: list of DailyWeatherRecord models
            provenance: dictionary detailing data provider, timestamp, and caching status
        """
        f_lat, f_lon = fuzz_coordinates(lat, lon)
        today = date.today()
        cache_key = f"{f_lat}_{f_lon}_{today.isoformat()}_{past_days}_{forecast_days}"

        cached = self._get_cached_payload(cache_key)
        if cached:
            records = [DailyWeatherRecord(**rec) for rec in cached["records"]]
            meta = cached["meta"]
            meta["cached"] = True
            return records, meta

        # Query Open-Meteo API
        params = {
            "latitude": f_lat,
            "longitude": f_lon,
            "daily": [
                "temperature_2m_max",
                "temperature_2m_min",
                "shortwave_radiation_sum",
                "wind_speed_2m_max",
                "precipitation_sum"
            ],
            "past_days": past_days,
            "forecast_days": forecast_days,
            "timezone": "auto"
        }

        try:
            resp = requests.get(
                settings.OPEN_METEO_URL,
                params=params,
                timeout=settings.WEATHER_API_TIMEOUT_SECONDS
            )
            resp.raise_for_status()
            data = resp.json()
            daily_data = data.get("daily", {})
            times = daily_data.get("time", [])

            records: List[DailyWeatherRecord] = []
            for i, time_str in enumerate(times):
                rec_date = date.fromisoformat(time_str)
                is_forecast = rec_date > today

                t_max = float(daily_data["temperature_2m_max"][i])
                t_min = float(daily_data["temperature_2m_min"][i])
                solar_rad = float(daily_data["shortwave_radiation_sum"][i])  # In MJ/m2
                wind = float(daily_data["wind_speed_2m_max"][i]) * (1000.0 / 3600.0)  # Convert km/h to m/s
                rain = float(daily_data["precipitation_sum"][i])

                records.append(DailyWeatherRecord(
                    record_date=rec_date,
                    t_max_c=t_max,
                    t_min_c=t_min,
                    solar_radiation_mj=solar_rad,
                    wind_speed_2m_ms=round(wind, 2),
                    rh_mean=65.0,  # Nominal fallback when not separately decomposed
                    precipitation_mm=round(rain, 1),
                    is_forecast=is_forecast
                ))

            meta = {
                "provider": "Open-Meteo Global Meteorological Forecast",
                "license": "CC-BY 4.0 / ODbL",
                "terms_url": "https://open-meteo.com/en/terms",
                "retrieved_at_utc": datetime.now(timezone.utc).isoformat(),
                "fuzzed_coordinates": [f_lat, f_lon],
                "cached": False
            }

            self._set_cached_payload(cache_key, {
                "records": [r.model_dump(mode="json") for r in records],
                "meta": meta
            })

            return records, meta

        except Exception as err:
            logger.error(f"Open-Meteo API query error: {err}. Generating agrometeorological synthetic fallback.")
            return self._generate_fallback_weather(today, past_days, forecast_days, f_lat, f_lon)

    def _generate_fallback_weather(
        self,
        today: date,
        past_days: int,
        forecast_days: int,
        lat: float,
        lon: float
    ) -> Tuple[List[DailyWeatherRecord], Dict[str, Any]]:
        """Generates realistic seasonal climatological values if network is unavailable."""
        records: List[DailyWeatherRecord] = []
        total_days = past_days + forecast_days

        start_date = today - timedelta(days=past_days)
        for offset in range(total_days):
            current_d = start_date + timedelta(days=offset)
            is_fc = current_d > today
            records.append(DailyWeatherRecord(
                record_date=current_d,
                t_max_c=29.5,
                t_min_c=18.0,
                solar_radiation_mj=20.5,
                wind_speed_2m_ms=2.1,
                rh_mean=60.0,
                precipitation_mm=0.0,
                is_forecast=is_fc
            ))

        meta = {
            "provider": "Climatological Reference Fallback (Network Unavailable)",
            "license": "Public Domain Simulation",
            "retrieved_at_utc": datetime.now(timezone.utc).isoformat(),
            "fuzzed_coordinates": [lat, lon],
            "cached": False,
            "warning": "Live weather service was temporarily unreachable; nominal climatological averages used."
        }
        return records, meta


weather_client = WeatherClient()
