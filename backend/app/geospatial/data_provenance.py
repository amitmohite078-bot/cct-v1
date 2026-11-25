"""
AgroCloud AI - Data Provenance & Uncertainty Registry
Strict scientific audit trail for all retrieved geospatial, soil, and climate parameters.
Tracks data source, spatial resolution, acquisition date, confidence, and missing flags.
"""
from typing import Dict, Any, Optional
from datetime import datetime

class ParameterProvenance:
    def __init__(
        self,
        name: str,
        value: Any,
        unit: str,
        source: str,
        spatial_resolution: str,
        observation_date: str,
        confidence_pct: int,
        status: str = "Retrieved",
        subgrid_variance_detected: bool = False,
        limitations: Optional[str] = None
    ):
        self.name = name
        self.value = value
        self.unit = unit
        self.source = source
        self.spatial_resolution = spatial_resolution
        self.observation_date = observation_date
        self.confidence_pct = confidence_pct
        self.status = status
        self.subgrid_variance_detected = subgrid_variance_detected
        self.limitations = limitations or "Standard remote sensing / numerical reanalysis model tolerance"

    def to_dict(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "value": self.value,
            "unit": self.unit,
            "source": self.source,
            "spatial_resolution": self.spatial_resolution,
            "observation_date": self.observation_date,
            "confidence_pct": self.confidence_pct,
            "status": self.status,
            "subgrid_variance_detected": self.subgrid_variance_detected,
            "limitations": self.limitations
        }

class ProvenanceReport:
    """Manages full provenance registry for a 1 km x 1 km analysis query."""
    
    def __init__(self, lat: float, lon: float):
        self.lat = lat
        self.lon = lon
        self.timestamp = datetime.now().isoformat()
        self.registry: Dict[str, Dict[str, Any]] = {}
        
    def add(
        self,
        key: str,
        name: str,
        value: Any,
        unit: str,
        source: str,
        spatial_resolution: str,
        observation_date: str,
        confidence_pct: int,
        status: str = "Retrieved",
        subgrid_variance: bool = False,
        limitations: Optional[str] = None
    ):
        prov = ParameterProvenance(
            name=name,
            value=value,
            unit=unit,
            source=source,
            spatial_resolution=spatial_resolution,
            observation_date=observation_date,
            confidence_pct=confidence_pct,
            status=status,
            subgrid_variance_detected=subgrid_variance,
            limitations=limitations
        )
        self.registry[key] = prov.to_dict()

    def get_summary(self) -> Dict[str, Any]:
        total_params = len(self.registry)
        if total_params == 0:
            return {"overall_confidence": 0, "parameters_tracked": 0, "provenance": {}}
            
        avg_conf = sum(p["confidence_pct"] for p in self.registry.values()) / total_params
        missing_count = sum(1 for p in self.registry.values() if p["status"] == "Missing" or p["value"] is None)
        
        return {
            "query_coordinates": {"lat": self.lat, "lon": self.lon},
            "timestamp": self.timestamp,
            "overall_data_confidence_pct": round(avg_conf, 1),
            "parameters_tracked": total_params,
            "missing_or_interpolated_parameters": missing_count,
            "provenance_registry": self.registry
        }

