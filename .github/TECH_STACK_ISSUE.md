# Issue Title:
[Documentation] Comprehensive Technology Stack, Open Source Libraries, and Cloud Infrastructure

---

## Issue Body (Copy & Paste below into GitHub Issues):

### 🌾 Project Overview
**AgroCloud AI** is an AI-powered, location-based crop recommendation and agro-ecological analysis system. It evaluates environmental, geographical, climatic, and soil pedology conditions within an exact **1 km × 1 km geodesic analysis grid (100 hectares / 247.1 acres)** with **5 × 5 (25 micro-cells)** spatial decomposition.

> **100% Software-Based:** Operates completely without hardware sensors (IoT, ESP32, Arduino). All data is synthesized dynamically using satellite remote sensing, global numerical weather models, and open soil databases.

---

### 💻 1. Core Languages & Web Frameworks
- **Backend Language:** Python 3.11+
- **Backend Web Framework:** [FastAPI](https://fastapi.tiangolo.com/) (v0.115.0+) — Async REST API, OpenAPI/Swagger auto-generation.
- **ASGI Server:** [Uvicorn](https://www.uvicorn.org/) (v0.30.0+) — Fast ASGI server implementation.
- **Data Validation & Schemas:** [Pydantic v2](https://docs.pydantic.dev/) (v2.7.0+)
- **Frontend Architecture:** Vanilla JavaScript (ES6+ modular design: `api.js`, `map.js`, `suitability.js`, `modules.js`, `app.js`, `kbv_ui.js`).
- **Styling:** Modern HTML5 + Custom Responsive CSS3 Design System with an Agro-Rustic palette and glassmorphism cards.

---

### 🔬 2. Open-Source Scientific & Data Libraries
- **[NumPy](https://numpy.org/):** Vectorized mathematical computations, 1 km × 1 km WGS84 geodesic boundary generation, matrix manipulation.
- **[SciPy](https://scipy.org/):** Spatial distance calculations, bilinear spatial interpolation for micro-elevation catena.
- **[Pandas](https://pandas.pydata.org/):** Structured crop catalog manipulation, threshold matrix filtering.
- **[Scikit-learn](https://scikit-learn.org/):** Feature normalization, min-max scaling, and crop suitability regression.
- **[HTTPX](https://www.python-httpx.org/):** High-concurrency asynchronous HTTP client for parallel cloud API queries.
- **[Requests](https://requests.readthedocs.io/):** Synchronous HTTP client fallback.
- **[Pytest](https://docs.pytest.org/):** Automated backend testing suite for API endpoints, geospatial calculations, and suitability engines.

---

### 🗺️ 3. Mapping & Geospatial Technologies
- **[Leaflet.js](https://leafletjs.com/) (v1.9.4):** Mobile-friendly interactive geospatial web mapping engine.
- **HTML5 Geolocation API:** GPS location acquisition directly from the user's browser.
- **Basemap Providers:**
  - **OpenStreetMap (OSM):** Open-source global topographic and road basemap.
  - **Esri World Imagery:** Cloud-hosted high-resolution satellite aerial imagery.
- **Interactive Layers:**
  - 1 km × 1 km Geodesic Boundary (WGS84)
  - 5 × 5 Sub-Grid Heatmap (25 micro-cells, 4 ha each)
  - Topographic Elevation & Slope Gradient Layer
  - Soil pH & Texture Layer

---

### ☁️ 4. Cloud Services & Public Remote-Sensing APIs
1. **[Open-Meteo Weather API](https://open-meteo.com/):**
   - Cloud-hosted numerical weather predictions sourced from **ECMWF**, **NOAA GFS**, and **DWD ICON**.
   - Current weather conditions, 14-day forecasts, solar radiation, humidity, and wind speed.
2. **[Open-Meteo Historical Weather Archive API](https://open-meteo.com/en/docs/historical-weather-api):**
   - Long-term 10-year historical weather reanalysis for climatological normal baselines.
3. **[Open-Meteo Elevation API](https://open-meteo.com/en/docs/elevation-api) / NASA SRTM 30m / Copernicus DEM:**
   - Digital elevation models used for calculating slope, aspect, drainage, and flood/drought susceptibility.
4. **[ISRIC SoilGrids 2.0 REST API](https://www.isric.org/explore/soilgrids):**
   - Global automated digital soil mapping at 250m resolution.
   - Standard soil parameters (0–30 cm depth): pH ($H_2O$), Clay (%), Silt (%), Sand (%), Soil Organic Carbon (SOC), and Nitrogen.
5. **[OpenStreetMap Nominatim API](https://nominatim.org/):**
   - Free forward & reverse geocoding for Indian states, districts, taluks, villages, and PIN codes.

---

### 📚 5. Agronomic Standards & Algorithmic Engines
- **MCDA / AHP (Analytic Hierarchy Process):** Weighted multi-criteria evaluation across 5 environmental pillars:
  - Soil Pedology (28%)
  - Climatology (24%)
  - Water Availability & Irrigation (22%)
  - Topography & Terrain (14%)
  - Seasonality & Photoperiod (12%)
- **Liebig’s Law of the Minimum:** Identifies severe physical or chemical bottlenecks (extreme soil pH, heatwaves, waterlogging) to cap suitability scores with limiting-factor penalties.
- **FAO-56 Penman-Monteith:** Daily Reference Evapotranspiration ($ET_0$) and Crop Evapotranspiration ($ET_c = K_c \times ET_0$) for 7-day irrigation scheduling.
- **Soil Test Crop Response (STCR):** Target yield fertilizer recommendations (N-P-K splits and soil amendments: Agricultural Lime & Gypsum).
- **ICAR NBSS&LUP & Planning Commission:** Classification of 15 Indian Agro-Climatic Zones.
