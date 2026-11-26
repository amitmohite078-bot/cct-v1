"""Automated 11-language completeness & zero-English-leak verification tests."""

import os
import sys
import shutil
import subprocess
import pytest
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.main import app


REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
FRONTEND_DIR = os.path.join(REPO_ROOT, "frontend")


def test_index_loads_i18n_scripts_before_modules():
    """Verify index.html loads i18n.js and i18n_pathology.js before downstream app scripts."""
    with open(os.path.join(FRONTEND_DIR, "index.html"), "r", encoding="utf-8") as fh:
        html = fh.read()
    pos_i18n = html.find("js/i18n.js")
    pos_patho = html.find("js/i18n_pathology.js")
    pos_suit = html.find("js/suitability.js")
    pos_dis = html.find("js/disease_scanner.js")
    pos_mod = html.find("js/modules.js")
    assert pos_i18n != -1 and pos_patho != -1
    assert pos_i18n < pos_patho < pos_suit < pos_dis < pos_mod


@pytest.mark.parametrize("lang", ["hi", "kn", "te", "ta", "mr", "gu", "bn", "ml", "pa", "or"])
def test_crop_doctor_backend_respects_language(lang):
    """Backend Crop Doctor API responds using requested language script without error."""
    client = TestClient(app)
    resp = client.post(
        "/api/integration/crop-doctor/chat",
        json={
            "crop_name": "Tomato",
            "question": "NPK?",
            "language": lang,
        },
    )
    assert resp.status_code == 200
    body = resp.json()
    assert body.get("answer")
    assert body.get("language") == lang


def test_all_11_languages_complete_and_leak_free():
    """Run Node harness verifying 11-language key parity and zero leaked UI English words."""
    node_exe = shutil.which("node")
    if not node_exe:
        pytest.skip("node executable not available on PATH")

    script = r"""
const fs = require("fs");
const vm = require("vm");
const assert = require("assert");

let captured = {};
let reportHtml = "";
function makeEl(id) {
  let html = "", txt = "";
  return {
    id, style: {}, dataset: {},
    value: id === "kbvDiseaseCropSelect" ? "tomato" : "",
    options: [],
    classList: { add(){}, remove(){}, toggle(){} },
    addEventListener(){}, removeEventListener(){}, setAttribute(){},
    querySelector: () => null, querySelectorAll: () => [],
    getAttribute: () => null, hasAttribute: () => false, appendChild: () => {},
    get innerHTML() { return html; }, set innerHTML(v) { html = v; captured[id] = v; },
    get textContent() { return txt; }, set textContent(v) { txt = v; captured["TEXT:" + id] = v; }
  };
}
const elCache = {};
const sandbox = {
  console, Math, Date, JSON, RegExp, Object, Array, String, Number, Boolean, Set, Map, Error, Promise, parseFloat, parseInt, isNaN,
  setTimeout: () => 0, clearTimeout: () => {},
  open: () => ({ document: { open(){}, write(h){ reportHtml = h; }, close(){} }, focus(){} }),
  window: {},
  document: {
    documentElement: { lang: "en" }, title: "",
    getElementById: (id) => (elCache[id] || (elCache[id] = makeEl(id))),
    querySelector: () => null, querySelectorAll: () => [], addEventListener: () => {}, createElement: () => makeEl("created")
  },
  navigator: { geolocation: null }, fetch: () => Promise.reject(new Error("offline")),
  URL: { createObjectURL: () => "", revokeObjectURL: () => {} }, Blob: function(){}, L: null
};
sandbox.window = sandbox;
vm.createContext(sandbox);

const files = [
  "frontend/js/icons.js",
  "frontend/js/i18n.js",
  "frontend/js/i18n_pathology.js",
  "frontend/js/api.js",
  "frontend/js/suitability.js",
  "frontend/js/modules.js",
  "frontend/js/disease_scanner.js",
  "frontend/js/report_generator.js",
  "frontend/js/app.js",
  "frontend/js/kbv_ui.js"
];
for (const f of files) {
  vm.runInContext(fs.readFileSync(f, "utf8"), sandbox, { filename: f });
}

const A = sandbox.AgroI18n;
const LANGS = ["en", "hi", "kn", "te", "ta", "mr", "gu", "bn", "ml", "pa", "or"];

// 1. Key parity checks
const uiKeys = Object.keys(A.UI.en);
for (const lang of LANGS) {
  assert(A.UI[lang], `Missing UI dict for ${lang}`);
  for (const k of uiKeys) {
    assert(typeof A.UI[lang][k] === "string" && A.UI[lang][k].trim().length > 0, `Missing UI.${lang}.${k}`);
  }
  const dKeys = Object.keys(A.DISEASE_UI.en);
  assert(A.DISEASE_UI[lang], `Missing DISEASE_UI for ${lang}`);
  for (const k of dKeys) {
    assert(typeof A.DISEASE_UI[lang][k] === "string" && A.DISEASE_UI[lang][k].trim().length > 0, `Missing DISEASE_UI.${lang}.${k}`);
  }
  for (const [cropKey, map] of Object.entries(A.CROPS)) {
    assert(typeof map[lang] === "string" && map[lang].trim().length > 0, `Missing CROPS.${cropKey}.${lang}`);
    if (lang !== "en") {
      assert(!/\([A-Za-z]+\)/.test(map[lang]), `English parenthetical in CROPS.${cropKey}.${lang}: ${map[lang]}`);
    }
  }
  for (const [placeKey, map] of Object.entries(A.PLACES)) {
    assert(typeof map[lang] === "string" && map[lang].trim().length > 0, `Missing PLACES.${placeKey}.${lang}`);
  }
  for (const [pKey, map] of Object.entries(A.PATHOGEN_TYPES)) {
    assert(typeof map[lang] === "string" && map[lang].trim().length > 0, `Missing PATHOGEN_TYPES.${pKey}.${lang}`);
  }
  for (const [dKey, map] of Object.entries(A.DISEASE_NAMES)) {
    assert(typeof map[lang] === "string" && map[lang].trim().length > 0, `Missing DISEASE_NAMES.${dKey}.${lang}`);
  }
}

// 2. Render leak checks across all 10 non-English languages
const ALLOW = new Set([
  "AgroNexus","NDVI","NDWI","STCR","NPK","APMC","FAO","SRI","LPH","ET0","ETc","AWC","RAW",
  "KVK","MSP","CACP","ROI","GPS","PDF","SVG","ISRIC","SoilGrids","ICAR","Open","Meteo",
  "SRTM","NASA","POWER","Sentinel","CHIRPS","MODIS","IMERG","Agmarknet","NHB","CaCO3","FYM",
  "CNN","PlantVillage","Laplacian","Dr","FastAPI","AGRO","rgb","px","sans","serif","bold","center"
]);

function checkClean(label, lang, htmlStr) {
  const txt = String(htmlStr || "")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ");
  const leaks = [...new Set((txt.match(/\b[A-Za-z]{3,}\b/g) || []))].filter(w => !ALLOW.has(w));
  assert.strictEqual(leaks.length, 0, `[${lang}][${label}] Unexpected English tokens: ${leaks.join(", ")}`);
}

for (const lang of LANGS.filter(l => l !== "en")) {
  captured = {};
  reportHtml = "";
  A.setLang(lang);
  sandbox.kbvApp = new sandbox.KBVApp();
  sandbox.kbvApp.currentLanguage = lang;
  sandbox.kbvApp.currentLocationName = "Bengaluru Urban, Karnataka, India";

  const app = new sandbox.AgroCloudApp();
  sandbox.app = app;
  app.currentLanguage = lang;
  const fb = sandbox.ApiClient.fallbackAnalyze(12.9571, 77.5325, "Kharif");
  app.analysisData = fb;

  sandbox.suitabilityRenderer = new sandbox.SuitabilityRenderer("cropSuitabilityResults");
  sandbox.suitabilityRenderer.setLanguage(lang);
  sandbox.suitabilityRenderer.render(fb.crop_recommendations, fb.all_crop_evaluations);
  checkClean("suitability", lang, captured.cropSuitabilityResults);

  sandbox.suitabilityRenderer.selectedForComparison = ["tomato", "maize"];
  sandbox.suitabilityRenderer.renderComparisonModal(fb.all_crop_evaluations);
  checkClean("compareModal", lang, captured.comparisonBody);

  const mm = new sandbox.ModulesManager("integratedModulesContainer");
  sandbox.modulesManager = mm;
  mm.currentLanguage = lang;
  mm.modulesData = sandbox.ApiClient.fallbackCropModules("tomato", 12.9571, 77.5325, "mid_season");
  mm.tryErrorResult = sandbox.ApiClient.fallbackPlantationTrial("Mango", 12.9571, 77.5325, 2.5, { locationName: "Bengaluru Urban, Karnataka" });

  checkClean("irrigation", lang, mm.renderIrrigationSection());
  checkClean("market", lang, mm.renderMarketSection());
  checkClean("doctor", lang, mm.renderDoctorSection());

  const ds = sandbox.diseaseScanner;
  ds.lastResult = {
    abstained: false, crop_id: "tomato", predicted_condition: "Early Blight (Alternaria solani)",
    disease_id: "tomato_early_blight", pathogen_type: "Fungal", visual_signature: "fungal_blight_dark",
    confidence_pct: 84, confidence_margin_pct: 22, healthy: false, mode: "client_canvas_screening",
    leaf_coverage_pct: 64.2, lesion_or_chlorosis_pct: 18.4,
    differential_candidates: [{ disease_id: "tomato_early_blight", name: "Early Blight", probability_pct: 84, confidence_pct: 84 }],
    quality_metrics: { width: 640, height: 480, sharpness_laplacian: 120.5, mean_brightness: 142.1, green_foliar_pct: 64.2 },
    active_guidance: { name: "Early Blight", pathogen_type: "Fungal", visual_signature: "fungal_blight_dark", symptoms: "x", favorable_conditions: "x", organic_control: "x", chemical_control: "x", preventive_measures: "x" }
  };
  ds.render();
  checkClean("diseaseMatch", lang, captured.kbvDiseaseScannerContainer);

  app.renderEnvironmentalCards(fb.environmental_data);
  ["soilClassValue","soilPhValue","soilTextureValue","soilDrainageValue","weatherTempValue","terrainElevValue","terrainSlopeValue","terrainRiskValue","geoPrecisionText","kbvSnapSoil","kbvSnapPh","kbvSnapTopCrop","kbvSnapNdvi","kbvSnapRain","kbvSnapElev"].forEach(id => {
    checkClean("env:" + id, lang, captured["TEXT:" + id] || captured[id]);
  });

  app.openProvenanceModal();
  checkClean("provenanceModal", lang, captured.provenanceBody);

  sandbox.farmReportGenerator.generateReport(fb, mm.modulesData);
  checkClean("reportPDF", lang, reportHtml);
}
console.log("ALL_11_LANGUAGES_VERIFIED_OK");
"""
    proc = subprocess.run(
        [node_exe, "-"],
        input=script,
        cwd=REPO_ROOT,
        capture_output=True,
        text=True,
        encoding="utf-8",
        check=False,
    )
    assert proc.returncode == 0, f"i18n completeness verification failed:\n{proc.stdout}\n{proc.stderr}"
    assert "ALL_11_LANGUAGES_VERIFIED_OK" in proc.stdout
