# AgroCloud AI — Technology Stack, Open-Source & Cloud Infrastructure

Comprehensive breakdown of all programming languages, web frameworks, open-source libraries, cloud APIs, satellite remote sensing datasets, and agronomic scientific standards used in developing the **AgroCloud AI Geo-Spatial Engine**.

---

## 1. Architectural Overview & Design Philosophy

AgroCloud AI is a **100% Software-Defined, Sensorless Agricultural Decision Support System (DSS)**. It requires zero on-ground hardware microcontrollers (Arduino/ESP32) or physical soil sensors. All insights are synthesized dynamically through:
- Satellite remote sensing & digital elevation models (DEM)
- Global numerical weather prediction (NWP) reanalysis
- Open pedological (soil) databases & national agronomic benchmarks
- Multi-Criteria Decision Analysis (MCDA) mathematical models

---

## 2. Core Languages & Runtime Environments

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Python** | `3.11+` | Backend application runtime, scientific computing, mathematical modeling, and REST API |
| **JavaScript (ES6+)** | Modern ECMAScript | Client-side reactive UI, Leaflet geospatial visualizations, asynchronous API orchestration |
| **HTML5 & CSS3** | Modern Standards | Responsive web dashboard, mobile-friendly design system with custom agro-rustic CSS palette |

---

## 3. Backend Technologies & Frameworks

| Framework / Library | License | Role in System |
| :--- | :--- | :--- |
| **FastAPI** (`>=0.115.0`) | MIT | High-performance asynchronous REST API framework, automatic OpenAPI (Swagger) documentation, dependency injection |
| **Uvicorn** (`>=0.30.0`) | BSD | High-throughput ASGI server implementation powered by `uvloop` and `httptools` |
| **Pydantic** (`>=2.7.0`) | MIT | Data parsing, type enforcement, schema definitions, and validation for API requests/responses |
| **HTTPX** (`>=0.27.0`) | BSD | Fully asynchronous HTTP client for parallel fetching of remote sensing, soil, and weather APIs |
| **Requests** (`>=2.31.0`) | Apache 2.0 | Synchronous HTTP client for fallback data pipelines |
| **Jinja2** (`>=3.1.3`) | BSD | Template rendering engine for static & dynamic report synthesis |
| **Python-Multipart** (`>=0.0.9`) | Apache 2.0 | Form data and multipart payload parsing |

---

## 4. Scientific, Mathematical & Machine Learning Libraries

| Library | License | Role in System |
| :--- | :--- | :--- |
| **NumPy** (`>=1.26.0`) | BSD | Vectorized multidimensional array operations, 1 km × 1 km geodesic boundary math, 5 × 5 sub-grid matrix generation |
| **SciPy** (`>=1.13.0`) | BSD | Spatial distance calculations, bilinear spatial interpolation across micro-cells, scientific statistical routines |
| **Pandas** (`>=2.2.0`) | BSD | Structured agronomic data frame manipulation, crop parameter lookup, matrix aggregation |
| **Scikit-learn** (`>=1.4.0`) | BSD | Feature scaling, min-max normalization, suitability scoring regression models |

---

## 5. Frontend & Mapping Technologies

| Technology / Tool | Version / Type | Role in System |
| :--- | :--- | :--- |
| **Leaflet.js** | `1.9.4` (Open Source) | Interactive geo-spatial web map rendering, multi-layer switching, vector polygon overlays |
| **Leaflet CSS** | `1.9.4` (Open Source) | Map canvas styling, popups, and micro-cell tooltip styling |
| **HTML5 Geolocation API** | Native Browser API | High-accuracy device GPS coordinates acquisition (latitude, longitude, accuracy radius) |
| **OpenStreetMap Tiles** | Open Data / ODbL | High-resolution street map basemap |
| **Esri World Imagery** | Cloud Raster Tiles | High-resolution satellite aerial imagery for parcel inspection |
| **Vanilla JS Architecture** | Modular ES6 | Modular separation (`api.js`, `map.js`, `suitability.js`, `modules.js`, `app.js`, `kbv_ui.js`) |

---

## 6. Cloud Services, Public APIs & Satellite Datasets

The platform accesses free, open-access, and cloud-hosted planetary datasets:

### A. Meteorological & Atmospheric Data
- **Open-Meteo Weather Forecast API** (`api.open-meteo.com`):
  - Ingests real-time temperature (2m), relative humidity, wind speed, solar radiation, and precipitation.
  - Sourced from global numerical weather models: **ECMWF** (European Centre for Medium-Range Weather Forecasts), **NOAA GFS** (Global Forecast System), and **DWD ICON**.
- **Open-Meteo Historical Archive API** (`archive-api.open-meteo.com`):
  - 10-year historical weather reanalysis for long-term rainfall and temperature normals.

### B. Topography & Elevation (DEM)
- **Open-Meteo Elevation API** & **NASA SRTM 30m / 90m**:
  - Shuttle Radar Topography Mission (SRTM) and Copernicus Digital Elevation Model (DEM).
  - Used to calculate elevation, slope gradient (%), aspect, drainage class, and flood/drought hazard indices.

### C. Soil & Pedology Data
- **ISRIC SoilGrids 2.0 REST API** (`rest.isric.org`):
  - Global digital soil mapping database at 250m spatial resolution produced by automated soil mapping.
  - Extracted properties (0–30 cm topsoil): Soil pH ($H_2O$), Clay (%), Sand (%), Silt (%), Soil Organic Carbon (SOC), and Nitrogen.
- **ICAR NBSS&LUP (National Bureau of Soil Survey and Land Use Planning)**:
  - Benchmark profiles and 15 Indian Agro-Climatic Zones classification (Planning Commission / ICAR).

### D. Geocoding & Search
- **OpenStreetMap Nominatim Geocoding API** (`nominatim.openstreetmap.org`):
  - Reverse geocoding of GPS coordinates to Indian Village, Taluk, District, and State names.
  - Forward address/PIN code search with real-time autocompletion.

---

## 7. Agronomic Frameworks & Algorithmic Models

1. **Analytic Hierarchy Process (AHP) & Multi-Criteria Decision Analysis (MCDA)**:
   - Weights environmental criteria scientifically:
     $$\text{Suitability} = (0.28 \cdot S_{\text{soil}}) + (0.24 \cdot S_{\text{climate}}) + (0.22 \cdot S_{\text{water}}) + (0.14 \cdot S_{\text{terrain}}) + (0.12 \cdot S_{\text{season}})$$
2. **Liebig’s Law of the Minimum**:
   - Implements limiting factor thresholds. If a critical bottleneck (e.g., severe soil sodicity/acidity, extreme heat, or waterlogging) occurs, a deterministic penalty caps the recommendation tier.
3. **FAO-56 Penman-Monteith Evapotranspiration**:
   - Calculates Reference Evapotranspiration ($ET_0$) and Crop Evapotranspiration ($ET_c = K_c \times ET_0$) to generate daily crop water requirements and a 7-day irrigation schedule.
4. **Soil Test Crop Response (STCR)**:
   - Computes targeted yield fertilizer prescriptions (N-P-K splits, micronutrients, Gypsum/Lime amendments).

---

## 8. Development & DevOps Toolchain

- **Version Control:** Git & GitHub (`amitmohite078-bot/cct-v1`)
- **Testing:** `pytest` (unit & integration test suite covering live API fallbacks, geospatial calculations, and suitability logic)
- **Editor / IDE:** Antigravity IDE / VS Code
- **Operating Environment:** Windows / Linux / macOS (Cross-platform Python runtime)
