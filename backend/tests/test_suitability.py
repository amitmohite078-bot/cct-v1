"""
Unit tests for Crop Suitability Scoring Model (MCDA / AHP & Liebig Minimum).
"""
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.models.crop_catalogue import CROPS_DATABASE
from app.models.suitability_engine import analyze_crop_suitability, evaluate_single_crop

def test_suitability_scoring_logic():
    # Test Black Soil / Maharashtra profile
    weather = {
        "current_temperature": 28.0,
        "average_temperature": 27.5,
        "maximum_temperature": 33.0,
        "minimum_temperature": 21.0,
        "humidity": 65.0,
        "solar_radiation": 19.0,
        "annual_rainfall": 820.0
    }
    soil = {
        "ph": 7.6,
        "texture_class": "Clay Loam",
        "organic_carbon_pct": 0.65,
        "nutrients": {"nitrogen_kgha": 260.0, "phosphorus_kgha": 18.0, "potassium_kgha": 340.0},
        "drainage": "Well Drained (Optimal Aeration)"
    }
    terrain = {
        "elevation_m": 560.0,
        "slope_pct": 1.8,
        "flood_risk": {"level": "Low"}
    }
    
    results = analyze_crop_suitability(weather, soil, terrain, selected_season="Kharif (Monsoon)")
    
    # 1. Total crops evaluated
    assert results["total_crops_evaluated"] >= 12
    
    # 2. Top 5 recommendations present
    assert len(results["top_recommendations"]) == 5
    
    # Verify scores are bounded between 0 and 100
    for crop in results["all_ranked_crops"]:
        score = crop["suitability_score"]
        assert 0.0 <= score <= 100.0, f"Score out of range: {score}"
        assert crop["recommendation_category"] in [
            "Highly Suitable",
            "Moderately Suitable",
            "Not Recommended Under Current Conditions"
        ]
        assert "factor_breakdown" in crop
        assert "limiting_factor" in crop
        assert "soil_compatibility" in crop
        assert "climate_compatibility" in crop
        assert "potential_cultivation_challenges" in crop

def test_liebig_minimum_limiting_factor():
    # If pH is extreme (e.g. 4.2 highly acidic), wheat should be severely penalized
    wheat = CROPS_DATABASE["wheat"]
    weather = {"average_temperature": 18.0, "maximum_temperature": 24.0, "solar_radiation": 16.0, "annual_rainfall": 600.0}
    extreme_acidic_soil = {"ph": 4.0, "texture_class": "Loam", "organic_carbon_pct": 0.5, "nutrients": {}, "drainage": "Well Drained"}
    flat_terrain = {"slope_pct": 1.0, "flood_risk": {"level": "Low"}}
    
    result = evaluate_single_crop(wheat, weather, extreme_acidic_soil, flat_terrain, active_season="Rabi (Winter)")
    # Should not be Highly Suitable due to extreme acidic pH
    assert result["suitability_score"] < 50.0
    assert result["limiting_factor"]["score"] <= 40.0

if __name__ == "__main__":
    test_suitability_scoring_logic()
    test_liebig_minimum_limiting_factor()
    print("All crop suitability model tests passed successfully!")

