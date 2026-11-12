"""
AgroCloud AI - Geo-Spatial AI Crop Suitability Analysis Engine
FastAPI Application Entry Point & REST API Router
"""
import os
import sys
from pathlib import Path

# Ensure backend directory is in sys.path
backend_dir = Path(__file__).resolve().parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

import httpx
import asyncio
from typing import Dict, Any, List, Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse

from app.config import settings
from app.geospatial.grid import calculate_analysis_grid
from app.geospatial.data_provenance import ProvenanceReport
from app.geospatial.weather_client import fetch_weather_data
from app.geospatial.soil_client import fetch_soil_data
from app.geospatial.terrain_client import fetch_terrain_data
from app.geospatial.remote_sensing import calculate_remote_sensing_indices
from app.models.crop_catalogue import CROPS_DATABASE
from app.models.suitability_engine import analyze_crop_suitability, evaluate_single_crop
from app.models.schemas import (
    CoordinatesRequest,
    LocationSearchRequest,
    CropSelectionRequest,
    CropDoctorQuestionRequest,
    CropComparisonRequest,
    MarketProfitabilityRequest,
    PlantationTrialRequest
)
from app.integration.disease_detection import get_crop_diseases
from app.integration.irrigation_prediction import calculate_irrigation_schedule
from app.integration.crop_doctor import generate_crop_doctor_advisory, answer_crop_doctor_question
from app.integration.plantation_advisor import analyze_plantation_trial
from app.integration.mandi_market import (
    calculate_crop_profitability,
    rank_crops_by_profitability,
    MANDI_COMMODITY_DATA
)

GEO_ANALYSIS_CACHE = {}

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    description="AI-powered 1 km x 1 km location-based crop suitability analysis, pedology, climatology, and agronomic intelligence."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.VERSION,
        "mode": "100% Software-Based (No IoT / No physical sensors required)"
    }

@app.post("/api/geospatial/analyze")
async def analyze_area(req: CoordinatesRequest):
    """
    Main geo-spatial crop suitability pipeline:
    1. Generates 1 km x 1 km geographic analysis boundary and 5x5 sub-grid.
    2. Collects weather, soil, and terrain parameters with strict data provenance.
    3. Calculates satellite remote sensing vegetation (NDVI) & water stress (NDWI) indices.
    4. Evaluates multi-criteria crop suitability (AHP) and Liebig minimum factors.
    5. Computes Mandi market commodity intelligence & crop profitability ranking.
    """
    lat = req.latitude
    lon = req.longitude
    season = req.season
    
    # 1. Generate 1 km x 1 km analysis grid
    grid = calculate_analysis_grid(
        center_lat=lat,
        center_lon=lon,
        grid_size_meters=settings.GRID_SIZE_METERS,
        sub_divisions=settings.SUBGRID_DIVISIONS
    )
    
    # Initialize provenance registry
    provenance = ProvenanceReport(lat=lat, lon=lon)
    
    cache_key = f"{round(lat, 3)}_{round(lon, 3)}_{season}"
    if cache_key in GEO_ANALYSIS_CACHE:
        return GEO_ANALYSIS_CACHE[cache_key]

    # 2 & 3. Retrieve weather & soil data in parallel for optimal responsiveness
    weather_task = fetch_weather_data(lat=lat, lon=lon, provenance=provenance)
    soil_task = fetch_soil_data(lat=lat, lon=lon, subgrid_cells=grid["subgrid_cells"], provenance=provenance)
    
    weather, soil = await asyncio.gather(weather_task, soil_task)
    
    # 4. Retrieve terrain & topography data
    terrain = await fetch_terrain_data(
        lat=lat,
        lon=lon,
        grid_corners=grid["corners"],
        subgrid_cells=grid["subgrid_cells"],
        annual_rainfall_mm=weather.get("annual_rainfall", 850.0),
        drainage_class=soil.get("drainage", "Well Drained"),
        provenance=provenance
    )

    # 5. Calculate Satellite Remote Sensing (NDVI / NDWI) Indices across micro-cells
    remote_sensing = calculate_remote_sensing_indices(
        lat=lat,
        lon=lon,
        soil_data=soil,
        weather_data=weather,
        terrain_data=terrain,
        subgrid_cells=grid["subgrid_cells"],
        provenance=provenance
    )
    
    # 6. Run Multi-Criteria Crop Suitability Model with Regional Zone & Estimated Produce
    suitability_results = analyze_crop_suitability(
        weather=weather,
        soil=soil,
        terrain=terrain,
        selected_season=season,
        lat=lat,
        lon=lon
    )

    # 7. Mandi Market Intelligence & Crop Profitability Ranking
    market_profitability = rank_crops_by_profitability(
        suitability_results=suitability_results.get("all_ranked_crops", suitability_results.get("top_recommendations", [])),
        farm_size_acres=2.5,
        lat=lat,
        lon=lon
    )
    
    # 8. Data provenance and confidence audit summary
    provenance_summary = provenance.get_summary()
    
    res_payload = {
        "analysis_id": f"geo_{int(lat*1000)}_{int(lon*1000)}",
        "grid": grid,
        "environmental_data": {
            "weather": weather,
            "soil": soil,
            "terrain": terrain,
            "remote_sensing": remote_sensing
        },
        "crop_suitability": suitability_results,
        "market_profitability": market_profitability,
        "data_provenance": provenance_summary
    }
    GEO_ANALYSIS_CACHE[cache_key] = res_payload
    return res_payload

@app.get("/api/geospatial/ip-location")
async def get_ip_location():
    """Detects client approximate location based on public IP address."""
    # Fast path if offline mode is set
    if os.environ.get("AGRO_OFFLINE_MODE") == "1":
        return {
            "latitude": 19.9975,
            "longitude": 73.7898,
            "city": "Nashik",
            "region": "Maharashtra",
            "country": "India",
            "location_name": "Nashik, Maharashtra, India",
            "accuracy_meters": 5000,
            "source": "Offline Baseline Preset (Nashik Agricultural Belt)"
        }
    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            resp = await client.get("https://ipapi.co/json/")
            if resp.status_code == 200:
                data = resp.json()
                lat = data.get("latitude")
                lon = data.get("longitude")
                if lat and lon:
                    city = data.get("city", "Nashik")
                    region = data.get("region", "Maharashtra")
                    country = data.get("country_name", "India")
                    return {
                        "latitude": float(lat),
                        "longitude": float(lon),
                        "city": city,
                        "region": region,
                        "country": country,
                        "location_name": ", ".join([p for p in [city, region, country] if p]),
                        "accuracy_meters": 5000,
                        "source": "IP Geolocation API"
                    }
    except Exception:
        pass
    
    # Fallback to default high-yield agricultural cluster in India (Nashik, Maharashtra)
    return {
        "latitude": 19.9975,
        "longitude": 73.7898,
        "city": "Nashik",
        "region": "Maharashtra",
        "country": "India",
        "location_name": "Nashik, Maharashtra, India",
        "accuracy_meters": 5000,
        "source": "Default Agricultural Center (Nashik Belt)"
    }

@app.get("/api/geospatial/reverse-geocode")
async def reverse_geocode(lat: float = Query(...), lon: float = Query(...)):
    """Resolves GPS coordinates into Village/Town, District, and State."""
    if os.environ.get("AGRO_OFFLINE_MODE") == "1":
        return _fallback_reverse_geocode(lat, lon)
    try:
        # 1. Fast free reverse geocode
        async with httpx.AsyncClient(timeout=3.5) as client:
            url = f"https://api.bigdatacloud.net/data/reverse-geocode-client?latitude={lat}&longitude={lon}&localityLanguage=en"
            resp = await client.get(url)
            if resp.status_code == 200:
                data = resp.json()
                village = data.get("locality") or data.get("city") or "Local Field"
                district = data.get("principalSubdivisionCode") or data.get("principalSubdivision") or ""
                state = data.get("principalSubdivision") or "India"
                country = data.get("countryName") or "India"
                
                parts = [p for p in [village, district, state, country] if p]
                display_name = ", ".join(parts[:3]) if parts else f"{round(lat, 4)}°N, {round(lon, 4)}°E"
                return {
                    "latitude": lat,
                    "longitude": lon,
                    "location_name": display_name,
                    "display_name": display_name,
                    "village": village,
                    "district": district,
                    "state": state,
                    "country": country
                }
    except Exception:
        pass
    
    # 2. Nominatim OpenStreetMap reverse geocode fallback
    try:
        async with httpx.AsyncClient(timeout=3.5) as client:
            url = "https://nominatim.openstreetmap.org/reverse"
            headers = {"User-Agent": "AgroCloud-AI/2.4.0 (contact@agrocloud.local)"}
            params = {"lat": lat, "lon": lon, "format": "json"}
            resp = await client.get(url, headers=headers, params=params)
            if resp.status_code == 200:
                data = resp.json()
                display_name = data.get("display_name", f"{round(lat, 4)}°N, {round(lon, 4)}°E")
                return {
                    "latitude": lat,
                    "longitude": lon,
                    "location_name": display_name,
                    "display_name": display_name,
                    "village": data.get("address", {}).get("village", data.get("address", {}).get("town", "Rural Farm")),
                    "district": data.get("address", {}).get("state_district", ""),
                    "state": data.get("address", {}).get("state", ""),
                    "country": data.get("address", {}).get("country", "India")
                }
    except Exception:
        pass

    return _fallback_reverse_geocode(lat, lon)

@app.post("/api/geospatial/search-location")
async def search_location(req: LocationSearchRequest):
    """Searches Indian villages, taluks, cities or PIN codes."""
    if os.environ.get("AGRO_OFFLINE_MODE") == "1":
        return {"query": req.query, "results": _fallback_location_search(req.query)}
    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            url = "https://nominatim.openstreetmap.org/search"
            headers = {"User-Agent": "AgroCloud-AI/2.4.0 (contact@agrocloud.local)"}
            params = {
                "q": req.query,
                "format": "json",
                "countrycodes": "in",
                "limit": 5
            }
            resp = await client.get(url, headers=headers, params=params)
            if resp.status_code == 200:
                data = resp.json()
                results = []
                for item in data:
                    results.append({
                        "name": item.get("display_name"),
                        "latitude": float(item.get("lat")),
                        "longitude": float(item.get("lon")),
                        "type": item.get("type", "location")
                    })
                if results:
                    return {"query": req.query, "results": results}
    except Exception:
        pass

    return {"query": req.query, "results": _fallback_location_search(req.query)}

@app.post("/api/crops/compare")
async def compare_crops(req: CropComparisonRequest):
    """Side-by-side scientific comparison of 2 to 4 crops."""
    from datetime import datetime
    lat = req.latitude
    lon = req.longitude
    grid = calculate_analysis_grid(lat, lon)
    weather, soil = await asyncio.gather(
        fetch_weather_data(lat, lon),
        fetch_soil_data(lat, lon)
    )
    terrain = await fetch_terrain_data(
        lat,
        lon,
        grid["corners"],
        annual_rainfall_mm=weather.get("annual_rainfall", 850.0),
        drainage_class=soil.get("drainage", "Well Drained")
    )
    month = datetime.now().month
    active_season = (
        "Kharif (Monsoon)" if 6 <= month <= 10
        else ("Rabi (Winter)" if month in [11, 12, 1, 2] else "Zaid (Summer)")
    )
    
    evaluations = []
    for crop_id in req.crop_ids:
        cid = crop_id.lower()
        if cid in CROPS_DATABASE:
            eval_res = evaluate_single_crop(CROPS_DATABASE[cid], weather, soil, terrain, active_season, lat=lat, lon=lon)
            evaluations.append(eval_res)
            
    return {
        "coordinates": {"lat": lat, "lon": lon},
        "crops_compared": evaluations
    }

@app.post("/api/market/profitability")
async def get_market_profitability(req: MarketProfitabilityRequest):
    """
    Computes real-time Mandi market commodity economics, expected harvest yield,
    gross revenue, cost of cultivation, and net profit per acre.
    """
    lat = req.latitude
    lon = req.longitude
    grid = calculate_analysis_grid(lat, lon)
    weather, soil = await asyncio.gather(
        fetch_weather_data(lat, lon),
        fetch_soil_data(lat, lon)
    )
    terrain = await fetch_terrain_data(
        lat,
        lon,
        grid["corners"],
        annual_rainfall_mm=weather.get("annual_rainfall", 850.0),
        drainage_class=soil.get("drainage", "Well Drained")
    )
    
    suitability_results = analyze_crop_suitability(weather, soil, terrain, lat=lat, lon=lon)
    ranked = suitability_results.get("all_ranked_crops", suitability_results.get("top_recommendations", []))
    
    if req.crop_id:
        # Find single crop
        cid = req.crop_id.lower()
        matched = next((c for c in ranked if (c.get("id") or c.get("crop_id")) == cid), None)
        score = matched["suitability_score"] if matched else 75.0
        return calculate_crop_profitability(cid, score, req.farm_size_acres, lat=lat, lon=lon)
    
    return {
        "farm_size_acres": req.farm_size_acres,
        "ranked_profitability": rank_crops_by_profitability(ranked, req.farm_size_acres, lat=lat, lon=lon)
    }

@app.post("/api/integration/crop-modules")
async def get_integrated_crop_modules(req: CropSelectionRequest):
    """
    Connects the selected suitable crop to:
    1. Crop-specific disease detection & diagnostic protocol.
    2. Weather-driven 7-day irrigation schedule (FAO-56 Penman-Monteith).
    3. AI Crop Doctor tailored agronomic counsel.
    4. Mandi market commodity profitability calculation.
    """
    from datetime import datetime
    crop_id = req.crop_id.lower()
    lat = req.latitude
    lon = req.longitude
    stage = req.growth_stage or "mid_season"
    farm_size = req.farm_size_acres or 2.5
    
    if crop_id not in CROPS_DATABASE:
        crop_id = "maize"
        
    grid = calculate_analysis_grid(lat, lon)
    weather, soil = await asyncio.gather(
        fetch_weather_data(lat, lon),
        fetch_soil_data(lat, lon)
    )
    terrain = await fetch_terrain_data(
        lat,
        lon,
        grid["corners"],
        annual_rainfall_mm=weather.get("annual_rainfall", 850.0),
        drainage_class=soil.get("drainage", "Well Drained")
    )
    
    # 1. Disease detection diagnostics
    diseases = get_crop_diseases(crop_id)
    
    # 2. Irrigation prediction
    irrigation_schedule = calculate_irrigation_schedule(crop_id, weather, soil, growth_stage=stage)
    
    # 3. AI Crop Doctor Advisory
    crop_doctor_advisory = generate_crop_doctor_advisory(crop_id, weather, soil, terrain)

    # 4. Mandi Profitability Calculation
    month = datetime.now().month
    active_season = (
        "Kharif (Monsoon)" if 6 <= month <= 10
        else ("Rabi (Winter)" if month in [11, 12, 1, 2] else "Zaid (Summer)")
    )
    eval_res = evaluate_single_crop(CROPS_DATABASE[crop_id], weather, soil, terrain, active_season, lat=lat, lon=lon)
    suitability_score = eval_res.get("suitability_score", 75.0)
    profitability = calculate_crop_profitability(crop_id, suitability_score, farm_size, lat=lat, lon=lon)
    
    return {
        "crop_id": crop_id,
        "crop_name": CROPS_DATABASE[crop_id]["name"],
        "coordinates": {"lat": lat, "lon": lon},
        "disease_detection_module": {
            "monitored_crop": CROPS_DATABASE[crop_id]["name"],
            "disease_count": len(diseases),
            "common_diseases_and_pests": diseases
        },
        "irrigation_prediction_module": irrigation_schedule,
        "crop_doctor_module": crop_doctor_advisory,
        "mandi_profitability_module": profitability
    }

@app.post("/api/integration/crop-doctor/chat")
async def chat_with_crop_doctor(req: CropDoctorQuestionRequest):
    """Interactive conversational expert system for farmer questions with multi-language support."""
    result = answer_crop_doctor_question(
        crop_name=req.crop_name,
        question=req.question,
        field_data=req.field_context or {},
        lang=req.language or "en"
    )
    return result

@app.post("/api/integration/plantation-lab")
async def evaluate_plantation_trial(req: PlantationTrialRequest):
    """Evaluates any searched plantation/orchard crop against local soil & weather and outputs region-matched breeds & irrigation plan."""
    grid = calculate_analysis_grid(req.latitude, req.longitude)
    weather, soil = await asyncio.gather(
        fetch_weather_data(req.latitude, req.longitude),
        fetch_soil_data(req.latitude, req.longitude)
    )
    terrain = await fetch_terrain_data(
        req.latitude,
        req.longitude,
        grid["corners"],
        annual_rainfall_mm=weather.get("annual_rainfall", 850.0),
        drainage_class=soil.get("drainage", "Well Drained")
    )
    return analyze_plantation_trial(
        plant_query=req.plant_query,
        lat=req.latitude,
        lon=req.longitude,
        weather=weather,
        soil=soil,
        terrain=terrain,
        farm_size_acres=req.farm_size_acres
    )

def _get_indian_state_by_coords(lat: float, lon: float) -> str:
    """Estimates the Indian state based on geographical bounding polygons."""
    if 18.0 <= lat <= 22.1 and 72.5 <= lon <= 80.9:
        return "Maharashtra"
    elif 11.5 <= lat <= 18.5 and 74.0 <= lon <= 78.6:
        return "Karnataka"
    elif 8.0 <= lat <= 13.5 and 76.2 <= lon <= 80.4:
        return "Tamil Nadu"
    elif 8.2 <= lat <= 12.8 and 74.8 <= lon <= 77.4:
        return "Kerala"
    elif 12.6 <= lat <= 19.1 and 76.7 <= lon <= 84.8:
        return "Andhra Pradesh"
    elif 15.8 <= lat <= 19.9 and 77.2 <= lon <= 81.8:
        return "Telangana"
    elif 20.0 <= lat <= 24.7 and 68.1 <= lon <= 74.5:
        return "Gujarat"
    elif 23.0 <= lat <= 30.2 and 69.5 <= lon <= 78.3:
        return "Rajasthan"
    elif 21.1 <= lat <= 26.9 and 74.0 <= lon <= 82.8:
        return "Madhya Pradesh"
    elif 23.8 <= lat <= 30.5 and 77.0 <= lon <= 84.7:
        return "Uttar Pradesh"
    elif 24.3 <= lat <= 27.5 and 83.3 <= lon <= 88.3:
        return "Bihar"
    elif 21.5 <= lat <= 27.5 and 85.8 <= lon <= 89.9:
        return "West Bengal"
    elif 29.5 <= lat <= 32.5 and 73.8 <= lon <= 76.9:
        return "Punjab"
    elif 27.6 <= lat <= 30.9 and 74.4 <= lon <= 77.6:
        return "Haryana"
    return "India"

def _fallback_reverse_geocode(lat: float, lon: float) -> Dict[str, Any]:
    state = _get_indian_state_by_coords(lat, lon)
    display_name = (
        f"{state} Agricultural Cluster, India ({round(lat, 3)}°N, {round(lon, 3)}°E)"
        if state != "India"
        else f"Agricultural Cluster, India ({round(lat, 3)}°N, {round(lon, 3)}°E)"
    )
    return {
        "latitude": lat,
        "longitude": lon,
        "location_name": display_name,
        "display_name": display_name,
        "village": "Local Field",
        "district": f"{state} District",
        "state": state,
        "country": "India"
    }

def _fallback_location_search(query: str) -> List[Dict[str, Any]]:
    q = query.lower()
    presets = [
        {"name": "Nashik, Maharashtra, India (Wine capital & Onion hub)", "latitude": 19.9975, "longitude": 73.7898},
        {"name": "Ludhiana, Punjab, India (Indo-Gangetic Wheat/Rice belt)", "latitude": 30.9010, "longitude": 75.8573},
        {"name": "Mandya, Karnataka, India (Sugar bowl & Paddy region)", "latitude": 12.5238, "longitude": 76.8967},
        {"name": "Guntur, Andhra Pradesh, India (Cotton, Chili & Tobacco belt)", "latitude": 16.3067, "longitude": 80.4365},
        {"name": "Varanasi, Uttar Pradesh, India (Gangetic Alluvial Plain)", "latitude": 25.3176, "longitude": 82.9739},
        {"name": "Indore, Madhya Pradesh, India (Malwa Black Soil / Soybean)", "latitude": 22.7196, "longitude": 75.8577},
        {"name": "Nagpur, Maharashtra, India (Vidarbha Cotton & Orange)", "latitude": 21.1458, "longitude": 79.0882},
        {"name": "Anand, Gujarat, India (Charotar Agricultural Plain)", "latitude": 22.5645, "longitude": 72.9289},
        {"name": "Patna, Bihar, India (Middle Gangetic Plain)", "latitude": 25.5941, "longitude": 85.1376},
        {"name": "Coimbatore, Tamil Nadu, India (Kongu Nadu Agro-Ecological Zone)", "latitude": 11.0168, "longitude": 76.9558}
    ]
    matches = [p for p in presets if q in p["name"].lower()]
    return matches if matches else [presets[0]]

# Static file serving: Mount the frontend folders if present
frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "frontend"))
if os.path.exists(frontend_dir):
    css_dir = os.path.join(frontend_dir, "css")
    js_dir = os.path.join(frontend_dir, "js")
    assets_dir = os.path.join(frontend_dir, "assets")
    if os.path.exists(css_dir):
        app.mount("/css", StaticFiles(directory=css_dir), name="css")
    if os.path.exists(js_dir):
        app.mount("/js", StaticFiles(directory=js_dir), name="js")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")
    app.mount("/static", StaticFiles(directory=frontend_dir), name="static")

    @app.get("/")
    async def serve_index():
        return FileResponse(os.path.join(frontend_dir, "index.html"))
