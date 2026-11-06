import urllib.request
import json

base_url = 'http://127.0.0.1:8000'

def test_endpoint(name, url, method='GET', data=None):
    req = urllib.request.Request(url, method=method)
    if data:
        req.add_header('Content-Type', 'application/json')
        body = json.dumps(data).encode('utf-8')
    else:
        body = None
    try:
        with urllib.request.urlopen(req, data=body, timeout=8) as resp:
            status = resp.status
            content = resp.read()
            print(f"[PASS] {name}: HTTP {status} (Bytes: {len(content)})")
            ct = resp.headers.get('Content-Type', '')
            if 'application/json' in ct:
                return json.loads(content)
            return content
    except Exception as e:
        print(f"[FAIL] {name}: {e}")
        return None

print("=== 1. TESTING STATIC ASSETS & FRONTEND ===")
test_endpoint("Home Page (index.html)", f"{base_url}/")
test_endpoint("Main CSS (css/style.css)", f"{base_url}/css/style.css")
test_endpoint("Client Engine (js/api.js)", f"{base_url}/js/api.js")
test_endpoint("Map Manager (js/map.js)", f"{base_url}/js/map.js")
test_endpoint("KBV Controller (js/kbv_ui.js)", f"{base_url}/js/kbv_ui.js")

print("\n=== 2. TESTING API ENDPOINTS ===")
health = test_endpoint("Health Check", f"{base_url}/api/health")
if health:
    print("  -> Status:", health.get('status'))
    print("  -> Mode:", health.get('mode'))

rev = test_endpoint("Reverse Geocode (Bengaluru coords)", f"{base_url}/api/geospatial/reverse-geocode?lat=12.9571&lon=77.5325")
if rev:
    print("  -> Detected Location:", rev.get('location_name'))

analyze = test_endpoint("1 km² Geo-Spatial Analysis", f"{base_url}/api/geospatial/analyze", method='POST', data={'latitude': 12.9571, 'longitude': 77.5325, 'season': 'Kharif (Monsoon)'})
if analyze:
    grid = analyze.get('grid', {})
    print(f"  -> Area: {grid.get('area_km2')} km² ({grid.get('area_hectares')} ha, {grid.get('area_acres')} acres)")
    print(f"  -> Dimensions: {grid.get('dimensions')}")
    print(f"  -> Subgrid Matrix: {grid.get('subgrid_count')} micro-cells")
    env = analyze.get('environmental_data', {})
    soil = env.get('soil', {})
    weather = env.get('weather', {})
    terrain = env.get('terrain', {})
    print(f"  -> Soil: {soil.get('soil_classification')} (pH {soil.get('ph')}, Texture {soil.get('texture_class')})")
    print(f"  -> Weather: Temp {weather.get('current_temperature')}°C, Rain {weather.get('annual_rainfall')}mm")
    print(f"  -> Terrain: Elev {terrain.get('elevation_m')}m, Slope {terrain.get('slope_pct')}%")
    top_crops = analyze.get('crop_suitability', {}).get('top_recommendations', [])
    print(f"  -> Top Recommended Crops ({len(top_crops)}):")
    for i, c in enumerate(top_crops[:5]):
        print(f"     {i+1}. {c.get('name')} - Score: {c.get('suitability_score')}/100 ({c.get('recommendation_category')})")

modules = test_endpoint("Crop Modules (Disease & Irrigation)", f"{base_url}/api/integration/crop-modules", method='POST', data={'crop_id': 'tomato', 'latitude': 12.9571, 'longitude': 77.5325, 'growth_stage': 'vegetative'})
if modules:
    dis = modules.get('disease_detection_module', {}).get('common_diseases_and_pests', [])
    print(f"  -> Diseases Monitored ({len(dis)}): {[d.get('name') for d in dis]}")
    irr = modules.get('irrigation_prediction_module', {})
    sched = irr.get('daily_forecast_schedule', [])
    print(f"  -> 7-Day Penman-Monteith ETc Schedule: {len(sched)} days calculated")
    print(f"  -> Next Irrigation Due: {irr.get('next_irrigation_due')}, Total 7d Demand: {irr.get('total_7day_water_demand_mm')} mm")

chat = test_endpoint("AI Crop Doctor Chat", f"{base_url}/api/integration/crop-doctor/chat", method='POST', data={'crop_name': 'Tomato', 'question': 'How much urea should I apply for early vegetative growth?'})
if chat:
    print("  -> Doctor Advisory:", chat.get('answer'))

print("\n=== ALL END-TO-END VERIFICATION CHECKS COMPLETE ===")
