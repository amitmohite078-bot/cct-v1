"""
Unit tests for 1 km x 1 km geodesic grid calculations and coordinates.
"""
import sys
import os
import math
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.geospatial.grid import calculate_analysis_grid, haversine_distance

def test_1km_grid_dimensions():
    # Test at Nashik, Maharashtra (Latitude 20.0, Longitude 73.8)
    lat = 20.0
    lon = 73.8
    grid = calculate_analysis_grid(center_lat=lat, center_lon=lon, grid_size_meters=1000.0, sub_divisions=5)
    
    # 1. Verify area is approximately 1.0 km²
    assert 0.98 <= grid["area_km2"] <= 1.02, f"Area expected ~1.0 km2, got {grid['area_km2']}"
    assert 98.0 <= grid["area_hectares"] <= 102.0
    
    # 2. Verify North-South and East-West distances are ~1000m
    ns_dist = grid["dimensions"]["north_south_meters"]
    ew_dist = grid["dimensions"]["east_west_meters"]
    assert 990.0 <= ns_dist <= 1010.0, f"NS distance expected ~1000m, got {ns_dist}"
    assert 990.0 <= ew_dist <= 1010.0, f"EW distance expected ~1000m, got {ew_dist}"
    
    # 3. Verify corners exist and are properly ordered
    corners = grid["corners"]
    assert "north_west" in corners
    assert "north_east" in corners
    assert "south_east" in corners
    assert "south_west" in corners
    
    assert corners["north_west"]["lat"] > corners["south_west"]["lat"]
    assert corners["north_east"]["lon"] > corners["north_west"]["lon"]
    
    # 4. Verify subgrid decomposition (5x5 = 25 cells)
    assert grid["subgrid_count"] == 25
    assert len(grid["subgrid_cells"]) == 25
    
    # Check individual sub-cell area
    first_cell = grid["subgrid_cells"][0]
    assert "center" in first_cell
    assert "bounds" in first_cell
    assert "geojson" in first_cell

def test_equator_and_high_latitude_scaling():
    # Equator
    grid_eq = calculate_analysis_grid(0.0, 0.0, 1000.0)
    assert 0.99 <= grid_eq["area_km2"] <= 1.01
    
    # High latitude (60 degrees North)
    grid_60 = calculate_analysis_grid(60.0, 10.0, 1000.0)
    assert 0.98 <= grid_60["area_km2"] <= 1.02
    # At 60 deg, delta_lon should be twice as wide in degrees as at equator
    d_lon_eq = grid_eq["bbox"]["max_lon"] - grid_eq["bbox"]["min_lon"]
    d_lon_60 = grid_60["bbox"]["max_lon"] - grid_60["bbox"]["min_lon"]
    assert math.isclose(d_lon_60, d_lon_eq * 2.0, rel_tol=0.05)

if __name__ == "__main__":
    test_1km_grid_dimensions()
    test_equator_and_high_latitude_scaling()
    print("All geospatial grid tests passed successfully!")

