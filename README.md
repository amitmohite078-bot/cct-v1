# AgroCloud AI & AgroNexus — IoT-Free Decision-Support Platform

**AgroCloud AI** is an **IoT-free cloud decision-support workspace** combining two complementary suites without requiring on-farm soil hardware, Arduino/ESP32 controllers, or physical sensors:

1. **AgroNexus Geo-Spatial AI Crop Suitability Engine** (`backend/`, `frontend/`, `run.py` — live frontend deployed at [`https://amitmohite078-bot.github.io/cct-v1/`](https://amitmohite078-bot.github.io/cct-v1/))
2. **AgroCloud AI Disease Screening & FAO-56 Irrigation Core** (`agrocloud-java/`, `agrocloud-py/`, `agrocloud/`, `tests/`)

---

## Part I: AgroCloud AI Enterprise Core (Java 21 + Python ONNX Sidecar)

### 1. Architecture
- **Core Platform (`agrocloud-java/`):** Java 21 / Spring Boot 3 serving the Farmer Web UI (`http://localhost:8080/index.html`), embedded **ONNX Runtime Java (`1.17.1`)**, UN **FAO-56 Penman-Monteith** daily root-zone water balance engine, Open-Meteo client with SQLite cache, and SHA-256 audit logging.
- **Vision Sidecar Microservice (`agrocloud-py/`):** Python FastAPI service (`http://127.0.0.1:8000`) running the shared **IR v9 / Opset 17 ONNX** model (`solanaceae_mobilenetv3.onnx`) and native Pillow image decoding (including WebP/AVIF).

### 2. Behavioral & Safety Guardrails
- **Image Quality Gate:** Scale-normalized blur inspection (max side `512px`, Laplacian variance), brightness bounds (`25–230`), minimum resolution (`224×224`), and foliage-presence gating (`< 2.5%` foliar coverage abstains cleanly).
- **Calibrated Abstention & Crop Scoping:** Temperature scaling ($T = 1.35$), crop-scoped softmax masking (`tomato` vs `potato`), and selective abstention when confidence $< 70\%$ or top-2 margin $< 15\%$.
- **Cultural IPM Only:** Never prescribes synthetic pesticide dosages; provides cultural management guidance and extension referral notices.
- **Supported Solanaceae Pilot Classes:**
  - *Tomato:* Healthy, Early Blight (*Alternaria solani*), Late Blight (*Phytophthora infestans*), Septoria Leaf Spot (*Septoria lycopersici*), Bacterial Spot (*Xanthomonas campestris*)
  - *Potato:* Healthy, Early Blight, Late Blight

### 3. Quickstart (Java Core & Python Sidecar)
- **Run Java Web UI & API:**
  Double-click `start-java.bat` or run:
  ```powershell
  set JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.13.21-hotspot
  cd agrocloud-java
  mvn spring-boot:run
  ```
  Open `http://localhost:8080/index.html`.
- **Run Optional Python Sidecar:**
  Double-click `start-python-sidecar.bat` or run:
  ```powershell
  cd agrocloud-py
  python -m uvicorn main:app --host 127.0.0.1 --port 8000
  ```
- **Run Full Java + Python Test Suite (39 tests: 26 Python + 13 Java):**
  Double-click `run-tests.bat` or run:
  ```powershell
  python -m pytest tests/ -v
  cd agrocloud-java && mvn test
  ```

---

## Part II: AgroNexus — Geo-Spatial AI Crop Suitability Engine

Evaluates environmental, geographical, climatic, and soil pedology conditions within a geodesic **1 km × 1 km analysis grid** (25 sub-grid cells of `200m × 200m`).

### Key Features
- **Location Detection & Geocoding:** Browser Geolocation API, interactive Leaflet map selection, village/city/PIN geocoding, and WGS84 `1 km × 1 km` grid boundaries.
- **Multi-Criteria Crop Suitability (MCDA / AHP + Liebig's Law):** Scores Rice, Wheat, Maize, Ragi, Jowar, Groundnut, Cotton, Sugarcane, Tomato, Onion, Soybean, Pulses, and Mustard into Highly Suitable ($\ge 75$), Moderately Suitable ($50–74$), and Not Recommended ($< 50$).
- **GitHub Pages Deployment:** Automated deployment from `./frontend` via `.github/workflows/pages.yml` on pushes to `main`.

### Quickstart & Testing (Geo-Spatial Suite)
```bash
python run.py
python -m pytest backend/tests/test_geospatial.py backend/tests/test_suitability.py
```

---

## Data Sources, Licenses & Disclaimer

| Source | Role | License / Terms |
|---|---|---|
| **PlantVillage** | Foliar Disease Dataset Plan | CC-BY-SA 4.0 ([arXiv:1511.08060](https://arxiv.org/abs/1511.08060)) |
| **Open-Meteo** | Agrometeorological Weather Forecast | CC-BY 4.0 / ODbL ([open-meteo.com](https://open-meteo.com/en/terms)) |
| **UN FAO-56** | Reference Evapotranspiration Physics | FAO Irrigation & Drainage Paper No. 56 |

> **Notice:** Decision-support research prototype only. Disease predictions use calibrated prototype filters (awaiting full PlantVillage CNN weight training) and are not certified laboratory diagnoses. Irrigation estimates use weather forecasts and FAO-56 crop coefficients rather than in-situ soil probes; no yield gains or water savings are claimed without randomized field trials.
