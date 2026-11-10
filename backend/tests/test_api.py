"""
Direct Async Integration Tests for FastAPI Endpoints.
Avoids anyio blocking portal threading issues on Windows.
"""
import sys
import os
import asyncio

os.environ["AGRO_OFFLINE_MODE"] = "1"
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.main import (
    health_check,
    analyze_area,
    reverse_geocode,
    search_location,
    get_integrated_crop_modules,
    chat_with_crop_doctor,
    compare_crops,
    get_market_profitability
)
from app.models.schemas import (
    CoordinatesRequest,
    LocationSearchRequest,
    CropSelectionRequest,
    CropDoctorQuestionRequest,
    CropComparisonRequest,
    MarketProfitabilityRequest
)

def test_health_check():
    res = asyncio.run(health_check())
    assert res["status"] == "healthy"
    assert "No IoT" in res["mode"]

def test_geospatial_analyze():
    req = CoordinatesRequest(latitude=19.9975, longitude=73.7898, season="Kharif (Monsoon)")
    res = asyncio.run(analyze_area(req))
    
    assert "grid" in res
    assert res["grid"]["area_km2"] >= 0.98
    assert res["grid"]["subgrid_count"] == 25
    
    env = res["environmental_data"]
    assert "weather" in env
    assert "soil" in env
    assert "terrain" in env
    
    soil = env["soil"]
    assert "ph" in soil
    assert "texture_class" in soil
    assert len(soil["subgrid_analysis"]) == 25
    
    suit = res["crop_suitability"]
    assert len(suit["top_recommendations"]) == 5
    assert suit["total_crops_evaluated"] >= 12
    
    prov = res["data_provenance"]
    assert prov["overall_data_confidence_pct"] > 70
    assert len(prov["provenance_registry"]) >= 10

    mkt = res["market_profitability"]
    assert len(mkt) >= 12
    assert len({m["crop_id"] for m in mkt}) >= 12

def test_reverse_geocode_and_search():
    rev = asyncio.run(reverse_geocode(lat=19.9975, lon=73.7898))
    assert "Nashik" in rev["location_name"] or "India" in rev["location_name"]
    
    s_req = LocationSearchRequest(query="Ludhiana")
    s_res = asyncio.run(search_location(s_req))
    assert len(s_res["results"]) > 0

def test_crop_modules_integration():
    req = CropSelectionRequest(crop_id="maize", latitude=19.9975, longitude=73.7898, growth_stage="mid_season")
    res = asyncio.run(get_integrated_crop_modules(req))
    
    assert res["crop_id"] == "maize"
    assert len(res["disease_detection_module"]["common_diseases_and_pests"]) >= 2
    assert len(res["irrigation_prediction_module"]["daily_forecast_schedule"]) == 7
    assert len(res["crop_doctor_module"]["soil_amendments"]) > 0

def test_crop_doctor_chat():
    req = CropDoctorQuestionRequest(
        crop_name="Maize",
        question="How should I apply urea for maize?",
        field_context={"ph": 7.4, "texture": "Clay Loam", "temperature": 28.0}
    )
    res = asyncio.run(chat_with_crop_doctor(req))
    assert "urea" in res["answer"].lower() or "fertilizer" in res["answer"].lower()

def test_crop_comparison():
    req = CropComparisonRequest(crop_ids=["maize", "soybean", "cotton"], latitude=19.9975, longitude=73.7898)
    res = asyncio.run(compare_crops(req))
    assert len(res["crops_compared"]) == 3

def test_market_profitability_endpoint():
    req_all = MarketProfitabilityRequest(latitude=19.9975, longitude=73.7898, farm_size_acres=3.0)
    res_all = asyncio.run(get_market_profitability(req_all))
    assert len(res_all["ranked_profitability"]) >= 12

    req_one = MarketProfitabilityRequest(crop_id="onion", latitude=19.9975, longitude=73.7898, farm_size_acres=2.0)
    res_one = asyncio.run(get_market_profitability(req_one))
    assert res_one["crop_id"] == "onion"
    assert "Lasalgaon" in res_one["benchmark_mandi"]

if __name__ == "__main__":
    test_health_check()
    test_geospatial_analyze()
    test_reverse_geocode_and_search()
    test_crop_modules_integration()
    test_crop_doctor_chat()
    test_crop_comparison()
    test_market_profitability_endpoint()
    print("ALL 7 DIRECT INTEGRATION TESTS PASSED SUCCESSFULLY!")
