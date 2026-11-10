"""
Unit tests for Advanced AgroCloud AI Features:
1. Satellite Remote Sensing (NDVI / NDWI)
2. Mandi Market Intelligence & Profitability Optimizer
3. Multilingual AI Crop Doctor
"""
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.geospatial.remote_sensing import calculate_remote_sensing_indices
from app.integration.mandi_market import calculate_crop_profitability, rank_crops_by_profitability, MANDI_COMMODITY_DATA
from app.integration.crop_doctor import answer_crop_doctor_question

def test_satellite_remote_sensing_indices():
    soil_mock = {"organic_carbon_pct": 0.72}
    weather_mock = {"annual_rainfall": 950.0, "average_temperature": 27.0, "relative_humidity": 68.0}
    terrain_mock = {"slope_pct": 1.8}
    subgrid_cells = [
        {"id": f"cell_{i}", "center": {"lat": 19.99 + (i*0.001), "lon": 73.78 + (i*0.001)}}
        for i in range(25)
    ]
    
    res = calculate_remote_sensing_indices(
        lat=19.9975,
        lon=73.7898,
        soil_data=soil_mock,
        weather_data=weather_mock,
        terrain_data=terrain_mock,
        subgrid_cells=subgrid_cells
    )
    
    assert "ndvi" in res
    assert "ndwi" in res
    assert "lai" in res
    assert -0.2 <= res["ndvi"] <= 1.0
    assert -0.5 <= res["ndwi"] <= 0.8
    assert len(res["subgrid_ndvi"]) == 25
    assert len(res["subgrid_ndwi"]) == 25
    assert res["vegetation_badge"] in ["Excellent", "Good", "Moderate", "Sparse"]

def test_mandi_market_profitability():
    # Test for Soybean in Maharashtra/MP with a score of 82.0
    res = calculate_crop_profitability("soybean", suitability_score=82.0, farm_size_acres=5.0)
    
    assert res["commodity_name"] == "Soybean (Yellow)"
    assert res["modal_price_qtl"] == 4750
    assert res["projected_yield_per_acre_qtl"] > 5.0
    assert res["gross_revenue_acre_inr"] > res["cost_of_cultivation_acre_inr"]
    assert res["net_profit_acre_inr"] > 0
    assert res["total_net_profit_inr"] == res["net_profit_acre_inr"] * 5.0
    assert res["is_profitable"] is True

def test_mandi_ranking_order():
    suit_list = [
        {"crop_id": "cotton", "suitability_score": 88.0, "crop_name": "Cotton", "tier": "S1"},
        {"crop_id": "ragi", "suitability_score": 65.0, "crop_name": "Ragi", "tier": "S2"},
        {"crop_id": "sugarcane", "suitability_score": 90.0, "crop_name": "Sugarcane", "tier": "S1"}
    ]
    ranked = rank_crops_by_profitability(suit_list, farm_size_acres=2.0)
    assert len(ranked) == 3
    # Check sorted descending by net profit
    assert ranked[0]["net_profit_acre_inr"] >= ranked[1]["net_profit_acre_inr"]
    assert ranked[1]["net_profit_acre_inr"] >= ranked[2]["net_profit_acre_inr"]
    assert ranked[0]["economic_rank"] == 1

def test_multilingual_crop_doctor():
    field_context = {"ph": 6.8, "texture": "Sandy Loam", "temperature": 28.0}
    
    # Test English
    res_en = answer_crop_doctor_question("Maize", "What fertilizer should I apply?", field_context, lang="en")
    assert "N:P:K" in res_en["answer"] or "NPK" in res_en["answer"]
    assert res_en["speech_lang_code"] == "en-IN"
    
    # Test Hindi
    res_hi = answer_crop_doctor_question("मक्का", "खाद कब और कितनी डालनी है?", field_context, lang="hi")
    assert "खाद" in res_hi["answer"] or "यूरिया" in res_hi["answer"]
    assert res_hi["speech_lang_code"] == "hi-IN"
    
    # Test Marathi
    res_mr = answer_crop_doctor_question("सोयाबीन", "पाणी कधी द्यावे?", field_context, lang="mr")
    assert "पाणी" in res_mr["answer"] or "जमीन" in res_mr["answer"]
    assert res_mr["speech_lang_code"] == "mr-IN"
