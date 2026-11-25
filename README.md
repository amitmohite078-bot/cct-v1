# AgroCloud AI — IoT-Free Decision-Support Prototype

AgroCloud AI is an **IoT-free cloud advisory prototype** designed to provide smallholder farmers with probabilistic crop disease screening and transparent, physics-based irrigation guidance without requiring in-ground soil moisture sensors, telemetry loggers, or automated valve controllers.

---

## 1. System Architecture

```text
                           [ Farmer Mobile / Web Interface ]
                                      (Port 8080)
                                           │
                        ┌──────────────────┴──────────────────┐
                        │                                     │
             [ Foliar Leaf Photo ]                [ Field Soil / Weather Parameters ]
                        │                                     │
                        ▼                                     ▼
        ┌───────────────────────────────┐     ┌────────────────────────────────┐
        │  Image Quality Gate           │     │ Public Agrometeorology Client  │
        │  - Laplacian variance ≥ 80    │     │ - Open-Meteo API (CC-BY 4.0)   │
        │  - Brightness bounds [25, 230]│     │ - Coordinate fuzzing (~1.1 km) │
        │  - Min resolution 224×224     │     │ - SQLite cache & Fallback      │
        └───────────────┬───────────────┘     └───────────────┬────────────────┘
                        │                                     │
                        ▼                                     ▼
        ┌───────────────────────────────┐     ┌────────────────────────────────┐
        │ Vision Classifier (MobileNet) │     │ FAO-56 Penman-Monteith Engine  │
        │ - Embedded ONNX Runtime Java  │     │ - Net radiation Rn & Slope Δ   │
        │ - Python FastAPI sidecar (Opt)│     │ - Dynamic phenology Kc(DAP)    │
        │ - Temperature Scaling T=1.35  │     │ - Daily root-zone water balance│
        │ - Abstention: Conf<70%, Δ<15% │     │ - Depletion Dr vs RAW / TAW    │
        └───────────────┬───────────────┘     └───────────────┬────────────────┘
                        │                                     │
                        ▼                                     ▼
        ┌───────────────────────────────┐     ┌────────────────────────────────┐
        │ Cultural IPM Advisory         │     │ Irrigation Advisory & Alert    │
        │ - Non-chemical agronomic advice│    │ - Net & gross required depth   │
        │ - No chemical prescriptions   │     │ - Spatial soil sensitivity     │
        │ - Extension referral notice   │     │ - Transparent assumptions      │
        └───────────────────────────────┘     └────────────────────────────────┘
```

The system is implemented as a dual-runtime architecture:
- **Core Platform (Java 21 / Spring Boot 3):** Serves the mobile-friendly web UI, embedded ONNX Runtime Java classifier, agrometeorological water balance engine, Open-Meteo weather client with SQLite caching, and SHA-256 audit log.
- **Vision Sidecar Microservice (Python 3.11 / FastAPI):** Provides an optional microservice endpoint for ONNX inference and Python-native computer vision workflows.

---

## 2. Key Capabilities & Behavioral Guardrails

1. **IoT-Free Advisory:** Eliminates high-cost on-farm telemetry and automated controllers. Operates entirely from user-entered crop phenology and open public weather data.
2. **Quality-Gated Disease Screening:** Images failing resolution (<224×224), sharpness (Laplacian variance < 80), or illumination (brightness < 25 or > 230) are rejected upfront with plain-language retake instructions.
3. **Calibrated Abstention Rule:** When the classifier's top calibrated confidence is < 70% or the margin between the top two classes is < 15%, the system explicitly abstains rather than generating false certainty.
4. **No Pesticide Prescriptions:** Strict IPM protocol. Never prescribes chemical dosages or commercial pesticides; provides cultural management practices (crop rotation, canopy ventilation, drip conversion) and refers farmers to local agricultural extension authorities.
5. **Separation of Classifier & Language Models:** Predictions are generated strictly by deterministic ML classification; no language model modifies the diagnostic probability distribution.
6. **FAO-56 Transparent Water Balance:** Daily root-zone depletion calculation following UN FAO Irrigation and Drainage Paper No. 56. Yields evapotranspiration, Total Available Water (TAW), and Readily Available Water (RAW).
7. **Spatial Sensitivity Analysis:** Reports sensitivity intervals (±15% available water capacity) to reflect natural soil variability without in-situ probes.
8. **Farmer Privacy:** Geolocation coordinates fuzzed to 2 decimal places (~1.1 km). Foliar images are processed in-memory and logged solely by SHA-256 digest; zero user photos are permanently stored.

---

## 3. Supported Crops & Disease Classes (Solanaceae Pilot)

- **Tomato (*Solanum lycopersicum*):**
  - Healthy
  - Early Blight (*Alternaria solani*)
  - Late Blight (*Phytophthora infestans*)
  - Septoria Leaf Spot (*Septoria lycopersici*)
  - Bacterial Spot (*Xanthomonas campestris*)
- **Potato (*Solanum tuberosum*):**
  - Healthy
  - Early Blight (*Alternaria solani*)
  - Late Blight (*Phytophthora infestans*)

---

## 4. Prerequisites

- **Operating System:** Windows 10/11, macOS, or Linux
- **Java:** OpenJDK 21 (`C:\Program Files\Microsoft\jdk-21.0.13.21-hotspot` on Windows)
- **Build Tool:** Apache Maven 3.9+
- **Python:** Python 3.11+ (with `numpy`, `pillow`, `scipy`, `fastapi`, `uvicorn`, `onnxruntime`, `pytest`)

---

## 5. Quickstart

### Launching the Java Spring Boot Core
Double-click `start-java.bat` or run from terminal:
```powershell
set JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.13.21-hotspot
cd agrocloud-java
mvn spring-boot:run
```
Open **`http://localhost:8080/index.html`** in your browser.

### Launching the Python Vision Sidecar (Optional)
Double-click `start-python-sidecar.bat` or run:
```powershell
cd agrocloud-py
python -m uvicorn main:app --host 127.0.0.1 --port 8000
```
Interactive OpenAPI documentation will be accessible at **`http://127.0.0.1:8000/docs`**.

### Running the Full Test Suite
Double-click `run-tests.bat` or run:
```powershell
# Python unit tests (24/24 tests)
python -m pytest tests/ -v

# Java unit tests (10/10 tests)
cd agrocloud-java
mvn test
```

---

## 6. Core REST API Endpoints

### Disease Screening
- **`POST /api/v1/disease/screen`**
  - `multipart/form-data`: `file` (image binary), `crop` (string: `tomato` or `potato`)
  - Returns: Calibrated class, confidence, abstention status, quality metrics, non-chemical IPM advice, and model provenance.

### Irrigation Guidance
- **`POST /api/v1/irrigation/guidance`**
  - `Content-Type: application/json`
  - Body: `{ "crop": "tomato", "latitude": 28.6139, "longitude": 77.2090, "sowingDate": "2026-04-01", "soilTexture": "loam", "irrigationMethod": "drip", "pastDays": 7, "forecastDays": 7 }`
  - Returns: FAO-56 daily water balance timeline, current depletion $D_r$, RAW/TAW limits, net/gross irrigation needed, urgency status, and soil sensitivity bounds.

### System Diagnostics
- **`GET /api/v1/status`**
  - Returns JVM status, active ONNX execution engine, sidecar connectivity, and runtime metrics.

---

## 7. Data Sources, Attribution & Licenses

| Source | Role | License / Terms | Reference / URL |
|---|---|---|---|
| **PlantVillage** | Foliar Disease Image Dataset | CC-BY-SA 4.0 | Hughes & Salathé (2015), [arXiv:1511.08060](https://arxiv.org/abs/1511.08060) |
| **Open-Meteo** | Agrometeorological Weather Forecast | CC-BY 4.0 / ODbL | [open-meteo.com](https://open-meteo.com/en/terms) |
| **UN FAO-56** | Reference Evapotranspiration Standards | Public Domain Reference | Allen et al. (1998), FAO Irrigation & Drainage Paper No. 56 |

---

## 8. Disclaimer & Scope of Evaluation

> **Notice to Farmers and Agronomists:** AgroCloud AI is a research decision-support prototype. Disease predictions are probabilistic screenings, not certified laboratory diagnoses. Water-balance estimates are derived from public numerical weather forecasts and standard FAO-56 crop coefficients, not physical in-situ sensor probes. No water savings, yield gains, or pesticide efficacy claims are asserted without randomized on-farm trials.

