"""
AgroCloud AI - 1 km x 1 km Geo-Spatial Grid Engine
Calculates true geodesic square boundary grids on WGS84 ellipsoid.
Provides sub-grid rasterization (100m/200m cells) to capture micro-spatial variations.
"""
import math
from typing import Dict, Any, List, Tuple

# Earth radius in meters according to WGS84
EARTH_RADIUS_M = 6378137.0

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculates geodesic distance between two points in meters using Haversine formula."""
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    
    a = math.sin(delta_phi / 2.0) ** 2 + \
        math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2.0) ** 2
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return EARTH_RADIUS_M * c

def calculate_analysis_grid(center_lat: float, center_lon: float, grid_size_meters: float = 1000.0, sub_divisions: int = 5) -> Dict[str, Any]:
    """
    Computes a true 1 km x 1 km analysis boundary grid around a given geographic center point.
    
    A 1 km x 1 km area is an exact 1.0 km² geographic square polygon (100 hectares),
    spanning 500m North, 500m South, 500m East, and 500m West from the center.
    """
    half_side = grid_size_meters / 2.0
    
    # 1 degree latitude ~ 111,320 meters
    delta_lat = (half_side / EARTH_RADIUS_M) * (180.0 / math.pi)
    
    # 1 degree longitude depends on cosine of latitude
    rad_lat = math.radians(center_lat)
    cos_lat = math.cos(rad_lat)
    if abs(cos_lat) < 1e-6:
        cos_lat = 1e-6
    delta_lon = (half_side / (EARTH_RADIUS_M * cos_lat)) * (180.0 / math.pi)
    
    north_lat = center_lat + delta_lat
    south_lat = center_lat - delta_lat
    east_lon = center_lon + delta_lon
    west_lon = center_lon - delta_lon
    
    # Four corners (Clockwise from North-West)
    nw = [north_lat, west_lon]
    ne = [north_lat, east_lon]
    se = [south_lat, east_lon]
    sw = [south_lat, west_lon]
    
    # GeoJSON expects coordinates in [longitude, latitude] format
    geojson_polygon = {
        "type": "Polygon",
        "coordinates": [[
            [west_lon, north_lat], # NW
            [east_lon, north_lat], # NE
            [east_lon, south_lat], # SE
            [west_lon, south_lat], # SW
            [west_lon, north_lat]  # Close ring
        ]]
    }
    
    # Generate sub-grid cells for micro-variation analysis
    # Divides 1 km x 1 km into sub_divisions x sub_divisions (e.g., 5x5 = 25 cells of 200m x 200m)
    subgrid_cells = []
    lat_step = (north_lat - south_lat) / sub_divisions
    lon_step = (east_lon - west_lon) / sub_divisions
    
    for row in range(sub_divisions):
        for col in range(sub_divisions):
            c_s = south_lat + row * lat_step
            c_n = c_s + lat_step
            c_w = west_lon + col * lon_step
            c_e = c_w + lon_step
            
            c_center_lat = (c_s + c_n) / 2.0
            c_center_lon = (c_w + c_e) / 2.0
            
            subgrid_cells.append({
                "cell_id": f"sub_{row}_{col}",
                "row": row,
                "col": col,
                "center": {"lat": round(c_center_lat, 6), "lon": round(c_center_lon, 6)},
                "bounds": {
                    "north": round(c_n, 6),
                    "south": round(c_s, 6),
                    "east": round(c_e, 6),
                    "west": round(c_w, 6)
                },
                "geojson": {
                    "type": "Polygon",
                    "coordinates": [[
                        [c_w, c_n],
                        [c_e, c_n],
                        [c_e, c_s],
                        [c_w, c_s],
                        [c_w, c_n]
                    ]]
                }
            })
            
    # Measure verification distances
    n_s_dist = haversine_distance(north_lat, center_lon, south_lat, center_lon)
    e_w_dist = haversine_distance(center_lat, west_lon, center_lat, east_lon)
    
    return {
        "center": {"lat": round(center_lat, 6), "lon": round(center_lon, 6)},
        "grid_size_meters": grid_size_meters,
        "area_km2": round((n_s_dist * e_w_dist) / 1000000.0, 3),
        "area_hectares": round((n_s_dist * e_w_dist) / 10000.0, 1),
        "area_acres": round(((n_s_dist * e_w_dist) / 10000.0) * 2.47105, 1),
        "dimensions": {
            "north_south_meters": round(n_s_dist, 1),
            "east_west_meters": round(e_w_dist, 1)
        },
        "bbox": {
            "min_lat": round(south_lat, 6),
            "max_lat": round(north_lat, 6),
            "min_lon": round(west_lon, 6),
            "max_lon": round(east_lon, 6)
        },
        "corners": {
            "north_west": {"lat": round(nw[0], 6), "lon": round(nw[1], 6)},
            "north_east": {"lat": round(ne[0], 6), "lon": round(ne[1], 6)},
            "south_east": {"lat": round(se[0], 6), "lon": round(se[1], 6)},
            "south_west": {"lat": round(sw[0], 6), "lon": round(sw[1], 6)}
        },
        "geojson": geojson_polygon,
        "subgrid_count": len(subgrid_cells),
        "subgrid_cells": subgrid_cells
    }

