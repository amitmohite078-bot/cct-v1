---
name: Tech Stack & Architecture Overview
about: Summary of technologies, open-source libraries, and cloud services used in AgroCloud AI
title: '[Tech Stack] Technologies, Open-Source & Cloud Infrastructure'
labels: ['documentation', 'tech-stack']
assignees: ''
---

## Project Overview
**AgroCloud AI** is a 100% software-defined, sensorless geo-spatial agricultural recommendation engine operating within a 1 km × 1 km geodesic boundary.

## Technologies Used

### 1. Languages & Frameworks
- **Backend:** Python 3.11+, FastAPI (0.115.0+), Uvicorn (0.30.0+), Pydantic (2.7.0+)
- **Frontend:** HTML5, CSS3 (Responsive Design System), Vanilla JavaScript (ES6+ Modules)
- **GIS / Mapping:** Leaflet.js (v1.9.4)

### 2. Open-Source Scientific Libraries
- **NumPy & SciPy:** Geospatial geodesic calculations, bilinear spatial interpolation, subgrid matrix operations.
- **Pandas:** Agronomic lookup databases and data transformations.
- **Scikit-learn:** Suitability scoring algorithms and normalization.
- **HTTPX & Requests:** Asynchronous and synchronous remote-sensing data acquisition.

### 3. Cloud Services & Satellite Remote Sensing Datasets
- **Open-Meteo Cloud API:** Real-time numerical weather forecast (ECMWF, GFS, ICON) & 10-year historical climate normals.
- **ISRIC SoilGrids 2.0 REST API:** 250m global digital soil properties (pH, Clay, Silt, Sand, SOC, Nitrogen).
- **NASA SRTM & Copernicus DEM:** 30m digital elevation and topographic slope analysis.
- **OpenStreetMap Nominatim:** Forward & reverse geocoding for Indian administrative divisions.
- **Esri World Imagery:** High-resolution satellite basemap raster tiles.

### 4. Agronomic Standards & Algorithmic Models
- **FAO-56 Penman-Monteith:** Daily $ET_0$ and Crop Evapotranspiration ($ET_c = K_c \times ET_0$).
- **AHP & MCDA:** Multi-Criteria Decision Analysis weighting soil, climate, water, terrain, and season.
- **Liebig's Law of the Minimum:** Limiting factor bottleneck detection.
- **ICAR NBSS&LUP & Planning Commission:** 15 Indian Agro-Climatic Zones classification.
