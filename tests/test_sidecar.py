
"""
AgroCloud AI - Python Sidecar Unit Tests

Tests the sidecar functions directly (no HTTP layer, no async, no TestClient).
This avoids the asyncio sandbox limitation and the starlette/httpx version
incompatibility.  The HTTP routing is trivial FastAPI boilerplate; what
matters is that validation, classification, and screening logic are correct.
"""
import io
import os
import sys

import numpy as np
import pytest
from PIL import Image, ImageDraw

# -- path setup (also done in conftest.py) ------------------------------------
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "agrocloud-py"))
import main as sidecar  # noqa: E402


# -- Image helpers ------------------------------------------------------------

def make_jpeg(width: int = 320, height: int = 320, pattern: str = "checker") -> Image.Image:
    """Create an in-memory PIL Image (not bytes) for direct function calls.

    The 'checker' pattern uses small 4px blocks and per-pixel noise so
    the Laplacian variance comfortably exceeds the blur threshold (80).
    """
    img = Image.new("RGB", (width, height), (128, 128, 128))
    draw = ImageDraw.Draw(img)
    if pattern == "checker":
        block = 4  # small blocks -> high spatial frequency
        for y in range(0, height, block):
            for x in range(0, width, block):
                color = (
                    (40, 170, 40)
                    if (x // block + y // block) % 2 == 0
                    else (200, 90, 40)
                )
                draw.rectangle([x, y, x + block, y + block], fill=color)
        # Add per-pixel noise for extra sharpness variance
        arr = np.array(img, dtype=np.float32)
        noise = np.random.default_rng(42).integers(-15, 16, size=arr.shape).astype(np.float32)
        arr = np.clip(arr + noise, 0, 255).astype(np.uint8)
        img = Image.fromarray(arr)
    return img


def make_solid(width: int = 256, height: int = 256, rgb: tuple = (128, 128, 128)) -> Image.Image:
    return Image.new("RGB", (width, height), rgb)


# -- _ensure_session / health -------------------------------------------------

def test_session_initialisation():
    """_ensure_session should run without errors (loads model or activates fallback)."""
    sidecar._ensure_session()
    # After calling once, it should be a no-op the second time
    sidecar._ensure_session()
    assert sidecar._session_initialized is True


def test_health_returns_correct_structure():
    """The health endpoint function should return status, model_loaded, classes."""
    result = sidecar.health()
    assert result["status"] == "ok"
    assert "model_loaded" in result
    assert result["classes"] == 8
    assert result["version"] == "0.1.0"


# -- Image quality validation --------------------------------------------------

def test_validate_rejects_dark_image():
    dark = make_solid(rgb=(10, 10, 10))
    q = sidecar.validate_image(dark)
    assert q.acceptable is False
    assert "dark" in q.rejection_reason.lower() or "brightness" in q.rejection_reason.lower()


def test_validate_rejects_overexposed_image():
    bright = make_solid(rgb=(245, 245, 245))
    q = sidecar.validate_image(bright)
    assert q.acceptable is False
    assert "overexposed" in q.rejection_reason.lower() or "brightness" in q.rejection_reason.lower()


def test_validate_rejects_tiny_image():
    tiny = make_solid(width=100, height=100)
    q = sidecar.validate_image(tiny)
    assert q.acceptable is False
    assert "resolution" in q.rejection_reason.lower() or "low" in q.rejection_reason.lower()


def test_validate_rejects_flat_blurry_image():
    flat = make_solid(rgb=(128, 128, 128))  # Zero Laplacian variance
    q = sidecar.validate_image(flat)
    assert q.acceptable is False
    assert "blurry" in q.rejection_reason.lower() or "laplacian" in q.rejection_reason.lower()


def test_validate_accepts_good_checker_image():
    good = make_jpeg(pattern="checker")
    q = sidecar.validate_image(good)
    assert q.acceptable is True
    assert q.rejection_reason is None
    assert q.width == 320
    assert q.height == 320
    assert q.laplacian_variance > 0
    assert 0 < q.mean_brightness < 255


# -- Preprocessing -------------------------------------------------------------

def test_preprocess_returns_correct_shape():
    img = make_jpeg()
    tensor = sidecar.preprocess(img)
    assert tensor.shape == (1, 3, 224, 224)
    assert tensor.dtype == np.float32


# -- Softmax with temperature --------------------------------------------------

def test_softmax_sums_to_one():
    logits = np.array([3.0, 1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.0], dtype=np.float32)
    probs = sidecar._softmax_with_temperature(logits, T=1.35)
    assert abs(probs.sum() - 1.0) < 1e-5
    # Higher logit -> higher probability
    assert probs[0] > probs[1] > probs[2]


def test_softmax_temperature_effect():
    logits = np.array([3.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], dtype=np.float32)
    probs_cold = sidecar._softmax_with_temperature(logits, T=0.5)
    probs_hot  = sidecar._softmax_with_temperature(logits, T=2.0)
    # Colder temperature -> more peaked distribution
    assert probs_cold[0] > probs_hot[0]


# -- Colour fallback classifier -----------------------------------------------

def test_colour_fallback_healthy_tomato():
    """A very green image should be classified as Healthy for tomato."""
    green_img = make_solid(rgb=(40, 170, 40))
    logits, engine = sidecar._colour_fallback(green_img, "tomato")
    assert engine == "colour_feature_fallback"
    assert logits[0] > 0  # Tomato___Healthy has index 0
    assert logits[0] == max(logits)


def test_colour_fallback_healthy_potato():
    """A very green image should be classified as Healthy for potato."""
    green_img = make_solid(rgb=(40, 170, 40))
    logits, engine = sidecar._colour_fallback(green_img, "potato")
    assert engine == "colour_feature_fallback"
    assert logits[5] > 0  # Potato___Healthy has index 5
    assert logits[5] == max(logits)


def test_colour_fallback_necrotic_tomato():
    """A brownish/reddish image should suggest disease for tomato."""
    necrotic = make_solid(rgb=(180, 80, 40))
    logits, engine = sidecar._colour_fallback(necrotic, "tomato")
    assert engine == "colour_feature_fallback"
    # Should pick one of the disease classes
    healthy_logit = logits[0]
    disease_logits = logits[1:5]
    assert max(disease_logits) > healthy_logit


# -- Full classify pipeline ---------------------------------------------------

def test_classify_returns_logits_and_engine():
    img = make_jpeg(pattern="checker")
    logits, engine = sidecar.classify(img, "tomato")
    assert logits.shape == (len(sidecar.CLASS_NAMES),)
    assert engine in ("embedded_onnx", "colour_feature_fallback")


def test_classify_tomato_vs_potato():
    """classify should respect declared_crop in the colour fallback."""
    green = make_solid(rgb=(40, 170, 40))
    logits_t, _ = sidecar.classify(green, "tomato")
    logits_p, _ = sidecar.classify(green, "potato")
    # Tomato healthy = index 0, Potato healthy = index 5
    assert logits_t[0] > logits_t[5]
    assert logits_p[5] > logits_p[0]


# -- Abstention logic ---------------------------------------------------------

def test_abstention_low_confidence():
    """When the top probability is below ABSTENTION_THRESHOLD, system abstains."""
    # Build uniform logits -> low confidence after softmax
    logits = np.ones(8, dtype=np.float32)
    probs = sidecar._softmax_with_temperature(logits, sidecar.TEMPERATURE)
    top1 = float(probs.max())
    assert top1 < sidecar.ABSTENTION_THRESHOLD  # Uniform -> ~12.5% per class


def test_abstention_narrow_margin():
    """When top-two margin is narrow, system should abstain."""
    logits = np.array([2.0, 1.95, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], dtype=np.float32)
    probs = sidecar._softmax_with_temperature(logits, sidecar.TEMPERATURE)
    sorted_probs = np.sort(probs)[::-1]
    margin = sorted_probs[0] - sorted_probs[1]
    assert margin < sidecar.MARGIN_THRESHOLD


# -- Provenance ----------------------------------------------------------------

def test_provenance_structure():
    prov = sidecar._provenance("colour_feature_fallback", 42.5)
    assert prov["model_version"] == "v1.0.0-solanaceae-mobilenetv3"
    assert prov["execution_engine"] == "colour_feature_fallback"
    assert prov["inference_latency_ms"] == 42.5
    assert "advisory" in prov["regulatory_disclaimer"].lower()
    assert "diagnosis" in prov["regulatory_disclaimer"].lower()
    assert prov["temperature_scaling_t"] == sidecar.TEMPERATURE
    assert prov["abstention_threshold"] == sidecar.ABSTENTION_THRESHOLD


def test_onnx_model_loaded_and_validates_high_res_leaf():
    """Verify IR v9 ONNX model loads in sidecar and sharp 1600x1200 images pass blur gate."""
    h = sidecar.health()
    assert h["model_loaded"] is True

    hi_res = Image.new("RGB", (1600, 1200), (45, 138, 42))
    draw = ImageDraw.Draw(hi_res)
    for y in range(100, 1100, 60):
        draw.rectangle([200, y, 1400, y + 12], fill=(70, 165, 65))
    q = sidecar.validate_image(hi_res)
    assert q.acceptable is True
    assert q.width == 1600
    assert q.height == 1200


def test_foliar_presence_rejects_pure_soil():
    soil = make_solid(width=300, height=300, rgb=(115, 92, 75))
    assert sidecar._estimate_foliar_coverage(soil) < 0.025
