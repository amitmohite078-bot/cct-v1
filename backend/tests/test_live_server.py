"""
End-to-End Test Suite using FastAPI TestClient and endpoint verification.
"""
import sys
import os
import pytest
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.main import app

client = TestClient(app)

def make_request(name, url, method='GET', data=None):
    if method.upper() == 'GET':
        resp = client.get(url)
    elif method.upper() == 'POST':
        resp = client.post(url, json=data)
    else:
        resp = client.request(method, url, json=data)

    assert resp.status_code == 200, f"[FAIL] {name}: HTTP {resp.status_code}"
    print(f"[PASS] {name}: HTTP {resp.status_code}")
    ct = resp.headers.get('content-type', '')
    if 'application/json' in ct:
        return resp.json()
    return resp.content

def test_frontend_static_assets():
    print("\n=== 1. TESTING STATIC ASSETS & FRONTEND ===")
    make_request("Home Page (index.html)", "/")
    make_request("Main CSS (css/style.css)", "/css/style.css")
    make_request("Client Engine (js/api.js)", "/js/api.js")
    make_request("Map Manager (js/map.js)", "/js/map.js")
    make_request("KBV Controller (js/kbv_ui.js)", "/js/kbv_ui.js")
    make_request("Voice Assistant (js/voice_assistant.js)", "/js/voice_assistant.js")
    make_request("Integrated Modules (js/modules.js)", "/js/modules.js")
    make_request("Vector Icons (js/icons.js)", "/js/icons.js")
    make_request("Suitability Engine (js/suitability.js)", "/js/suitability.js")
    make_request("Core i18n Engine (js/i18n.js)", "/js/i18n.js")
    make_request("Pathology i18n Pack (js/i18n_pathology.js)", "/js/i18n_pathology.js")
    make_request("Disease Scanner (js/disease_scanner.js)", "/js/disease_scanner.js")
    make_request("PDF Report Generator (js/report_generator.js)", "/js/report_generator.js")

def test_api_endpoints():
    print("\n=== 2. TESTING API ENDPOINTS ===")
    health = make_request("Health Check", "/api/health")
    assert health.get('status') == 'healthy'
    assert 'mode' in health

    rev = make_request("Reverse Geocode (Bengaluru coords)", "/api/geospatial/reverse-geocode?lat=12.9571&lon=77.5325")
    assert rev is not None
    assert 'location_name' in rev

    analyze = make_request("1 km² Geo-Spatial Analysis", "/api/geospatial/analyze", method='POST', data={'latitude': 12.9571, 'longitude': 77.5325, 'season': 'Kharif (Monsoon)'})
    assert analyze is not None
    assert 'grid' in analyze
    grid = analyze.get('grid', {})
    assert grid.get('subgrid_count') == 25

    modules = make_request("Crop Modules (Disease & Irrigation)", "/api/integration/crop-modules", method='POST', data={'crop_id': 'tomato', 'latitude': 12.9571, 'longitude': 77.5325, 'growth_stage': 'vegetative'})
    assert modules is not None
    assert 'disease_detection_module' in modules
    assert 'irrigation_prediction_module' in modules

    chat = make_request("AI Crop Doctor Chat", "/api/integration/crop-doctor/chat", method='POST', data={'crop_name': 'Tomato', 'question': 'How much urea should I apply for early vegetative growth?'})
    assert chat is not None
    assert 'answer' in chat

    plantation = make_request("Plantation Lab", "/api/integration/plantation-lab", method='POST', data={'plant_query': 'Mango', 'latitude': 12.9571, 'longitude': 77.5325, 'farm_size_acres': 2.5})
    assert plantation is not None
    assert plantation.get('plant_name') == 'Mango'
    assert 'recommended_breeds' in plantation
    assert 'irrigation_plan' in plantation

    compare = make_request("Crop Comparison", "/api/crops/compare", method='POST', data={'crop_ids': ['tomato', 'onion', 'maize'], 'latitude': 12.9571, 'longitude': 77.5325})
    assert compare is not None
    assert len(compare.get('crops_compared', [])) == 3

    compare_alt = make_request("Crop Comparison (Integration Route)", "/api/integration/crop-comparison", method='POST', data={'crop_ids': ['tomato', 'onion', 'maize'], 'latitude': 12.9571, 'longitude': 77.5325})
    assert compare_alt is not None
    assert len(compare_alt.get('crops_compared', [])) == 3

    mkt = make_request("Market Profitability", "/api/market/profitability", method='POST', data={'latitude': 12.9571, 'longitude': 77.5325, 'farm_size_acres': 3.0})
    assert mkt is not None
    assert len(mkt.get('ranked_profitability', [])) >= 10

