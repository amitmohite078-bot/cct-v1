"""
Unit and Endpoint Tests for AgroNexus Crop Disease Screening Module
Covers image quality gates, non-leaf soil abstention, crop-scoped foliar
differential classification, and multipart FastAPI /api/integration/disease/screen.
"""
from io import BytesIO
import os
import sys
import numpy as np
from PIL import Image
from fastapi.testclient import TestClient

os.environ["AGRO_OFFLINE_MODE"] = "1"
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.main import app
from app.integration.disease_detection import get_crop_diseases
from app.integration.leaf_screening import analyze_crop_leaf_image, MAX_UPLOAD_BYTES

client = TestClient(app)


def _encode_png(rgb_array: np.ndarray) -> bytes:
    buf = BytesIO()
    Image.fromarray(rgb_array.astype(np.uint8), mode="RGB").save(buf, format="PNG")
    return buf.getvalue()


def _make_textured_leaf(
    width: int = 256,
    height: int = 256,
    base_rgb=(44, 138, 46),
    lesion_rgb=None,
    lesion_fraction: float = 0.0,
) -> bytes:
    """Synthesizes a sharp leaf frame with natural venation texture and optional lesions."""
    rng = np.random.default_rng(42)
    img = np.zeros((height, width, 3), dtype=np.int16)
    img[:, :, 0] = base_rgb[0]
    img[:, :, 1] = base_rgb[1]
    img[:, :, 2] = base_rgb[2]

    # Add crisp high-frequency leaf vein texture so Laplacian variance is realistic (> 4.0)
    grid_x, grid_y = np.meshgrid(np.arange(width), np.arange(height))
    vein = ((np.sin(grid_x * 0.35) + np.cos(grid_y * 0.25)) * 12).astype(np.int16)
    noise = rng.integers(-8, 9, size=(height, width), dtype=np.int16)
    img[:, :, 0] = np.clip(img[:, :, 0] + vein // 2 + noise, 0, 255)
    img[:, :, 1] = np.clip(img[:, :, 1] + vein + noise, 0, 255)
    img[:, :, 2] = np.clip(img[:, :, 2] + vein // 3 + noise, 0, 255)

    if lesion_rgb is not None and lesion_fraction > 0:
        # Draw discrete circular/patch lesions across leaf interior
        total_patches = max(4, int(lesion_fraction * 32))
        radius = max(8, int(min(width, height) * 0.085))
        for i in range(total_patches):
            cx = int(((i * 53 + 29) % (width - 2 * radius)) + radius)
            cy = int(((i * 71 + 37) % (height - 2 * radius)) + radius)
            mask = ((grid_x - cx) ** 2 + (grid_y - cy) ** 2) <= radius ** 2
            img[mask, 0] = np.clip(lesion_rgb[0] + noise[mask] // 2, 0, 255)
            img[mask, 1] = np.clip(lesion_rgb[1] + noise[mask] // 2, 0, 255)
            img[mask, 2] = np.clip(lesion_rgb[2] + noise[mask] // 2, 0, 255)

    return _encode_png(img)


def test_quality_rejections():
    # 1. Undersized resolution (< 224 px)
    tiny = _make_textured_leaf(width=128, height=128)
    res_tiny = analyze_crop_leaf_image(tiny, crop_id="tomato")
    assert res_tiny["status"] == "QUALITY_REJECTED"
    assert res_tiny["abstained"] is True
    assert "resolution" in res_tiny["abstention_reason"].lower()

    # 2. Blurry flat image (Laplacian variance < 4.0)
    flat = np.full((256, 256, 3), [50, 140, 50], dtype=np.uint8)
    res_blur = analyze_crop_leaf_image(_encode_png(flat), crop_id="tomato")
    assert res_blur["status"] == "QUALITY_REJECTED"
    assert res_blur["abstained"] is True
    assert "blurry" in res_blur["abstention_reason"].lower()

    # 3. Underexposed dark image
    dark = _make_textured_leaf(base_rgb=(8, 12, 8))
    res_dark = analyze_crop_leaf_image(dark, crop_id="tomato")
    assert res_dark["status"] == "QUALITY_REJECTED"
    assert res_dark["abstained"] is True


def test_non_leaf_soil_abstention():
    # Soil / asphalt textured brownish-gray frame with < 2.5% green/chlorotic foliage
    rng = np.random.default_rng(7)
    soil = np.zeros((256, 256, 3), dtype=np.int16)
    soil[:, :, 0] = 128
    soil[:, :, 1] = 98
    soil[:, :, 2] = 82
    noise = rng.integers(-18, 19, size=(256, 256, 3), dtype=np.int16)
    soil = np.clip(soil + noise, 0, 255)

    res = analyze_crop_leaf_image(_encode_png(soil), crop_id="maize")
    assert res["status"] == "ABSTAINED_NON_LEAF"
    assert res["abstained"] is True
    assert res["image_quality"]["foliar_coverage_pct"] < 2.5


def test_healthy_leaf_classification():
    healthy_bytes = _make_textured_leaf(base_rgb=(42, 145, 48))
    res = analyze_crop_leaf_image(healthy_bytes, crop_id="tomato")
    assert res["status"] == "SCREENING_COMPLETE"
    assert res["abstained"] is False
    assert res["is_healthy"] is True
    assert "Healthy" in res["predicted_condition"]
    assert res["confidence"] > 0.55
    assert res["image_quality"]["passed"] is True
    assert res["model_provenance"]["software_only"] is True


def test_diseased_rust_and_blight_screening():
    # Orange cinnamon rust pustules on Maize should score Maize Common Rust highest
    maize_rust = _make_textured_leaf(
        base_rgb=(46, 136, 48),
        lesion_rgb=(215, 115, 32),
        lesion_fraction=0.45,
    )
    res_rust = analyze_crop_leaf_image(maize_rust, crop_id="maize")
    assert res_rust["image_quality"]["passed"] is True
    assert res_rust["image_quality"]["rust_pct"] > 5.0
    assert res_rust["class_probabilities"][0]["id"] == "maize_common_rust"
    assert res_rust["is_healthy"] is False

    # Bright chlorotic yellowing on Soybean should align with Yellow Mosaic Virus
    soy_mosaic = _make_textured_leaf(
        base_rgb=(50, 140, 52),
        lesion_rgb=(210, 200, 55),
        lesion_fraction=0.50,
    )
    res_soy = analyze_crop_leaf_image(soy_mosaic, crop_id="soybean")
    assert res_soy["image_quality"]["chlorosis_pct"] > 5.0
    assert res_soy["class_probabilities"][0]["id"] == "soybean_yellow_mosaic"

    # Dark water-soaked blight patches on Potato should favor Late Blight over Healthy
    potato_blight = _make_textured_leaf(
        base_rgb=(46, 134, 48),
        lesion_rgb=(58, 44, 34),
        lesion_fraction=0.55,
    )
    res_pot = analyze_crop_leaf_image(potato_blight, crop_id="potato")
    assert res_pot["image_quality"]["dark_necrosis_pct"] > 5.0
    assert res_pot["class_probabilities"][0]["id"] == "potato_late_blight"
    assert res_pot["recommended_actions"] is not None


def test_crop_disease_catalog_coverage():
    for crop in ["tomato", "potato", "maize", "rice", "wheat", "cotton", "onion"]:
        diseases = get_crop_diseases(crop)
        assert len(diseases) >= 2, f"Expected >=2 disease entries for {crop}"


def test_disease_screening_api_endpoint_and_static_asset():
    leaf_png = _make_textured_leaf(base_rgb=(44, 146, 50))
    resp = client.post(
        "/api/integration/disease/screen",
        files={"image": ("healthy_tomato.png", leaf_png, "image/png")},
        data={"crop_id": "tomato", "latitude": "12.9571", "longitude": "77.5325"},
    )
    assert resp.status_code == 200
    body = resp.json()
    assert body["crop_id"] == "tomato"
    assert body["is_healthy"] is True
    assert body["location"]["latitude"] == 12.9571

    # Invalid image bytes should return HTTP 422
    bad_resp = client.post(
        "/api/integration/disease/screen",
        files={"image": ("corrupt.png", b"not-an-image-bytes", "image/png")},
        data={"crop_id": "tomato"},
    )
    assert bad_resp.status_code == 422

    # Verify new JS module is served by FastAPI static mount
    js_resp = client.get("/js/disease_scanner.js")
    assert js_resp.status_code == 200
    assert b"DiseaseScannerManager" in js_resp.content
