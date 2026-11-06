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
from app.models.crop_catalogue import CROPS_DATABASE
from app.models.suitability_engine import analyze_crop_suitability, evaluate_single_crop
from app.models.schemas import (
    CoordinatesRequest,
    LocationSearchRequest,
    CropSelectionRequest,
    CropDoctorQuestionRequest,
    CropComparisonRequest
)
from app.integration.disease_detection import get_crop_diseases
from app.integration.irrigation_prediction import calculate_irrigation_schedule
from app.integration.crop_doctor import generate_crop_doctor_advisory, answer_crop_doctor_question

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
    3. Analyzes sub-grid variations.
    4. Evaluates multi-criteria crop suitability and Liebig minimum factors.
    5. Returns top 5 suitable crops, sub-grid heatmap, and scientific justifications.
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
    
    # 5. Run Multi-Criteria Crop Suitability Model with Regional Zone & Estimated Produce
    suitability_results = analyze_crop_suitability(
        weather=weather,
        soil=soil,
        terrain=terrain,
        selected_season=season,
        lat=lat,
        lon=lon
    )
    
    # 6. Data provenance and confidence audit summary
    provenance_summary = provenance.get_summary()
    
    res_payload = {
        "analysis_id": f"geo_{int(lat*1000)}_{int(lon*1000)}",
        "grid": grid,
        "environmental_data": {
            "weather": weather,
            "soil": soil,
            "terrain": terrain
        },
        "crop_suitability": suitability_results,
        "data_provenance": provenance_summary
    }
    GEO_ANALYSIS_CACHE[cache_key] = res_payload
    return res_payload

@app.get("/api/geospatial/ip-location")
async def get_ip_location():
    """Detects client approximate location based on public IP address."""
    if os.environ.get("AGRO_OFFLINE_MODE") != "1":
        # Service 1: geojs.io
        try:
            timeout_config = httpx.Timeout(3.0, connect=1.5)
            async with httpx.AsyncClient(timeout=timeout_config) as client:
                resp = await client.get("https://get.geojs.io/v1/ip/geo.json")
                if resp.status_code == 200:
                    data = resp.json()
                    lat = float(data.get("latitude"))
                    lon = float(data.get("longitude"))
                    city = data.get("city", "")
                    region = data.get("region", "")
                    country = data.get("country", "")
                    return {
                        "latitude": lat,
                        "longitude": lon,
                        "city": city,
                        "region": region,
                        "country": country,
                        "location_name": ", ".join(filter(bool, [city, region, country])),
                        "source": "Network IP Geolocation"
                    }
        except Exception:
            pass

        # Service 2: ipapi.co
        try:
            timeout_config = httpx.Timeout(3.0, connect=1.5)
            async with httpx.AsyncClient(timeout=timeout_config) as client:
                resp = await client.get("https://ipapi.co/json/")
                if resp.status_code == 200:
                    data = resp.json()
                    lat = float(data.get("latitude"))
                    lon = float(data.get("longitude"))
                    city = data.get("city", "")
                    region = data.get("region", "")
                    country = data.get("country_name", "")
                    return {
                        "latitude": lat,
                        "longitude": lon,
                        "city": city,
                        "region": region,
                        "country": country,
                        "location_name": ", ".join(filter(bool, [city, region, country])),
                        "source": "Network IP Geolocation"
                    }
        except Exception:
            pass

    # Default fallback location if completely offline
    return {
        "latitude": 19.9975,
        "longitude": 73.7898,
        "city": "Nashik",
        "region": "Maharashtra",
        "country": "India",
        "location_name": "Nashik District, Maharashtra, India",
        "source": "Default Initial Coordinate"
    }

@app.get("/api/geospatial/reverse-geocode")
async def reverse_geocode(lat: float = Query(...), lon: float = Query(...)):
    """Reverse geocodes coordinates to administrative village/city/state name."""
    display_name = None
    if os.environ.get("AGRO_OFFLINE_MODE") != "1":
        # 1. Fast BigDataCloud reverse geocode (highly responsive, gives locality + district + state)
        try:
            url = f"https://api.bigdatacloud.net/data/reverse-geocode-client?latitude={lat}&longitude={lon}&localityLanguage=en"
            timeout_config = httpx.Timeout(3.0, connect=1.5)
            async with httpx.AsyncClient(timeout=timeout_config) as client:
                resp = await client.get(url)
                if resp.status_code == 200:
                    data = resp.json()
                    parts = [
                        data.get("locality"),
                        data.get("city") or data.get("principalSubdivisionDistrict"),
                        data.get("principalSubdivision"),
                        data.get("countryName")
                    ]
                    filtered = [p for p in parts if p]
                    if filtered:
                        display_name = ", ".join(filtered)
        except Exception:
            pass

        # 2. Nominatim OpenStreetMap reverse geocode
        if not display_name:
            try:
                url = "https://nominatim.openstreetmap.org/reverse"
                headers = {"User-Agent": "AgroCloudAI/2.0 (contact@agrocloud.ai)"}
                params = {"lat": lat, "lon": lon, "format": "json"}
                timeout_config = httpx.Timeout(3.0, connect=1.5)
                async with httpx.AsyncClient(timeout=timeout_config) as client:
                    resp = await client.get(url, params=params, headers=headers)
                    if resp.status_code == 200:
                        data = resp.json()
                        display_name = data.get("display_name")
            except Exception:
                pass

    if not display_name:
        display_name = _fallback_reverse_geocode(lat, lon)

    return {
        "latitude": lat,
        "longitude": lon,
        "location_name": display_name
    }

@app.post("/api/geospatial/search-location")
async def search_location(req: LocationSearchRequest):
    """Searches village, city, district or PIN code."""
    query = req.query.strip()
    results = []
    
    if os.environ.get("AGRO_OFFLINE_MODE") != "1":
        try:
            url = "https://nominatim.openstreetmap.org/search"
            headers = {"User-Agent": "AgroCloudAI/2.0 (contact@agrocloud.ai)"}
            params = {"q": query, "format": "json", "limit": 5, "addressdetails": 1}
            timeout_config = httpx.Timeout(3.0, connect=1.5)
            async with httpx.AsyncClient(timeout=timeout_config) as client:
                resp = await client.get(url, params=params, headers=headers)
                if resp.status_code == 200:
                    items = resp.json()
                    for item in items:
                        results.append({
                            "name": item.get("display_name"),
                            "latitude": float(item.get("lat")),
                            "longitude": float(item.get("lon")),
                            "type": item.get("type", "location")
                        })
        except Exception:
            results = []

    if not results:
        results = _fallback_search_locations(query)

    return {"query": query, "results": results}

@app.post("/api/crops/compare")
async def compare_crops(req: CropComparisonRequest):
    """Compares 2 to 4 crops side-by-side across all agro-ecological parameters."""
    lat = req.latitude
    lon = req.longitude
    crop_ids = req.crop_ids
    
    grid = calculate_analysis_grid(lat, lon)
    weather = await fetch_weather_data(lat, lon)
    soil = await fetch_soil_data(lat, lon)
    terrain = await fetch_terrain_data(lat, lon, grid["corners"])
    
    evaluations = []
    for c_id in crop_ids:
        if c_id in CROPS_DATABASE:
            c_ref = CROPS_DATABASE[c_id]
            ev = evaluate_single_crop(c_ref, weather, soil, terrain, active_season="Kharif (Monsoon)")
            evaluations.append(ev)
            
    return {
        "coordinates": {"lat": lat, "lon": lon},
        "crops_compared": evaluations
    }

@app.post("/api/integration/crop-modules")
async def get_integrated_crop_modules(req: CropSelectionRequest):
    """
    Connects the selected suitable crop to:
    1. Crop-specific disease detection & diagnostic protocol.
    2. Weather-driven 7-day irrigation schedule (FAO-56 Penman-Monteith).
    3. AI Crop Doctor tailored agronomic counsel.
    """
    crop_id = req.crop_id.lower()
    lat = req.latitude
    lon = req.longitude
    stage = req.growth_stage or "mid_season"
    
    if crop_id not in CROPS_DATABASE:
        crop_id = "maize"
        
    grid = calculate_analysis_grid(lat, lon)
    weather = await fetch_weather_data(lat, lon)
    soil = await fetch_soil_data(lat, lon)
    terrain = await fetch_terrain_data(lat, lon, grid["corners"])
    
    # 1. Disease detection diagnostics
    diseases = get_crop_diseases(crop_id)
    
    # 2. Irrigation prediction
    irrigation_schedule = calculate_irrigation_schedule(crop_id, weather, soil, growth_stage=stage)
    
    # 3. AI Crop Doctor Advisory
    crop_doctor_advisory = generate_crop_doctor_advisory(crop_id, weather, soil, terrain)
    
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
        "crop_doctor_module": crop_doctor_advisory
    }

@app.post("/api/integration/crop-doctor/chat")
async def chat_with_crop_doctor(req: CropDoctorQuestionRequest):
    """Interactive conversational expert system for farmer questions."""
    answer = answer_crop_doctor_question(
        crop_name=req.crop_name,
        question=req.question,
        field_data=req.field_context or {}
    )
    return {
        "crop_name": req.crop_name,
        "question": req.question,
        "answer": answer
    }

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
    elif 29.5 <= lat <= 32.5 and 73.8 <= lon <= 76.9:
        return "Punjab"
    elif 27.6 <= lat <= 30.9 and 74.4 <= lon <= 77.6:
        return "Haryana"
    elif 21.5 <= lat <= 27.2 and 85.8 <= lon <= 89.9:
        return "West Bengal"
    elif 17.8 <= lat <= 22.6 and 81.4 <= lon <= 87.5:
        return "Odisha"
    elif 17.8 <= lat <= 24.1 and 80.2 <= lon <= 84.4:
        return "Chhattisgarh"
    elif 21.9 <= lat <= 25.3 and 83.3 <= lon <= 87.9:
        return "Jharkhand"
    elif 28.4 <= lat <= 28.9 and 76.8 <= lon <= 77.4:
        return "Delhi NCR"
    elif 30.3 <= lat <= 33.3 and 75.5 <= lon <= 79.1:
        return "Himachal Pradesh"
    elif 28.7 <= lat <= 31.5 and 77.5 <= lon <= 81.1:
        return "Uttarakhand"
    elif 24.0 <= lat <= 29.5 and 89.7 <= lon <= 97.4:
        return "Assam / Northeast India"
    elif 14.9 <= lat <= 15.8 and 73.6 <= lon <= 74.4:
        return "Goa"
    return "India"

def _fallback_reverse_geocode(lat: float, lon: float) -> str:
    """Fallback regional reverse geocoding for Indian & global coordinates."""
    # Specific metro/district clusters
    if 19.90 <= lat <= 20.08 and 73.70 <= lon <= 73.88:
        return f"Nashik City & Agro-Zone, Maharashtra, India ({lat:.4f}°N, {lon:.4f}°E)"
    elif 18.40 <= lat <= 18.65 and 73.75 <= lon <= 74.00:
        return f"Pune Agricultural Zone, Maharashtra, India ({lat:.4f}°N, {lon:.4f}°E)"
    elif 18.90 <= lat <= 19.30 and 72.75 <= lon <= 73.10:
        return f"Mumbai Region, Maharashtra, India ({lat:.4f}°N, {lon:.4f}°E)"
    elif 28.45 <= lat <= 28.85 and 76.95 <= lon <= 77.35:
        return f"Delhi NCR Agricultural Belt, India ({lat:.4f}°N, {lon:.4f}°E)"
    elif 30.80 <= lat <= 31.05 and 75.75 <= lon <= 75.95:
        return f"Ludhiana District, Punjab, India ({lat:.4f}°N, {lon:.4f}°E)"
    elif 12.85 <= lat <= 13.10 and 77.50 <= lon <= 77.70:
        return f"Bengaluru Rural Agro-Zone, Karnataka, India ({lat:.4f}°N, {lon:.4f}°E)"
    elif 12.40 <= lat <= 12.65 and 76.80 <= lon <= 77.05:
        return f"Mandya Cauvery Basin, Karnataka, India ({lat:.4f}°N, {lon:.4f}°E)"
    elif 17.30 <= lat <= 17.50 and 78.35 <= lon <= 78.55:
        return f"Hyderabad Peri-Urban Sector, Telangana, India ({lat:.4f}°N, {lon:.4f}°E)"
    elif 16.20 <= lat <= 16.40 and 80.35 <= lon <= 80.55:
        return f"Guntur Krishna Delta, Andhra Pradesh, India ({lat:.4f}°N, {lon:.4f}°E)"
    elif 25.25 <= lat <= 25.40 and 82.90 <= lon <= 83.05:
        return f"Varanasi Gangetic Plain, Uttar Pradesh, India ({lat:.4f}°N, {lon:.4f}°E)"
    elif 8.0 <= lat <= 37.0 and 68.0 <= lon <= 97.0:
        state = _get_indian_state_by_coords(lat, lon)
        return f"Agricultural Land Sector, {state}, India ({lat:.4f}°N, {lon:.4f}°E)"
    else:
        return f"Agricultural Analysis Grid ({lat:.4f}°N, {lon:.4f}°E)"

def _fallback_search_locations(query: str):
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
    if os.path.exists(css_dir):
        app.mount("/css", StaticFiles(directory=css_dir), name="css")
    if os.path.exists(js_dir):
        app.mount("/js", StaticFiles(directory=js_dir), name="js")
    app.mount("/static", StaticFiles(directory=frontend_dir), name="static")

    @app.get("/")
    async def serve_index():
        return FileResponse(os.path.join(frontend_dir, "index.html"))

