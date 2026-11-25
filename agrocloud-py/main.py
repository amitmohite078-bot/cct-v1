"""
AgroCloud AI - Python Vision Sidecar Microservice (Option 2)
FastAPI service handling disease screening inference with ONNX Runtime.
Spring Boot Java core calls this service at http://127.0.0.1:8000.

Architecture note:
- The ONNX session is initialised lazily on first use (thread-safe).
- No async lifespan context manager -- avoids deadlock in starlette 1.x TestClient.
"""

import os
import io
import logging
import threading
import time
from typing import Optional

import numpy as np
from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image, ImageOps
import onnxruntime as ort

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("agrocloud-sidecar")

# -- Constants ----------------------------------------------------------------
CLASS_NAMES = [
    "Tomato___Healthy",
    "Tomato___Early_Blight",
    "Tomato___Late_Blight",
    "Tomato___Septoria_Leaf_Spot",
    "Tomato___Bacterial_Spot",
    "Potato___Healthy",
    "Potato___Early_Blight",
    "Potato___Late_Blight",
]

IMAGENET_MEAN = np.array([0.485, 0.456, 0.406], dtype=np.float32)
IMAGENET_STD  = np.array([0.229, 0.224, 0.225], dtype=np.float32)

MODEL_PATH = os.getenv(
    "AGROCLOUD_MODEL_PATH",
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "models", "solanaceae_mobilenetv3.onnx"),
)
ABSTENTION_THRESHOLD = float(os.getenv("AGROCLOUD_ABSTENTION_THRESHOLD", "0.70"))
MARGIN_THRESHOLD     = float(os.getenv("AGROCLOUD_MARGIN_THRESHOLD", "0.15"))
TEMPERATURE          = float(os.getenv("AGROCLOUD_TEMPERATURE", "1.35"))

BLUR_THRESHOLD  = float(os.getenv("AGROCLOUD_BLUR_THRESHOLD", "4.0"))
MIN_BRIGHTNESS  = float(os.getenv("AGROCLOUD_MIN_BRIGHTNESS", "25.0"))
MAX_BRIGHTNESS  = float(os.getenv("AGROCLOUD_MAX_BRIGHTNESS", "230.0"))
MAX_BLUR_INSPECT_DIM = 512

# -- ONNX session (lazy init, thread-safe) ------------------------------------
_session: Optional[ort.InferenceSession] = None
_session_lock = threading.Lock()
_session_initialized = False


def _ensure_session() -> None:
    """Load the ONNX model once. Subsequent calls are no-ops."""
    global _session, _session_initialized
    if _session_initialized:
        return
    with _session_lock:
        if _session_initialized:
            return
        _session_initialized = True
        if os.path.exists(MODEL_PATH) and os.path.getsize(MODEL_PATH) > 256:
            try:
                opts = ort.SessionOptions()
                opts.intra_op_num_threads = 2
                _session = ort.InferenceSession(
                    MODEL_PATH, sess_options=opts, providers=["CPUExecutionProvider"]
                )
                logger.info("ONNX model loaded from %s", MODEL_PATH)
            except Exception as exc:
                logger.warning("ONNX model load failed: %s -- colour-fallback active", exc)
        else:
            logger.warning(
                "Model not found at %s -- colour-feature fallback active",
                MODEL_PATH,
            )


# -- FastAPI application ------------------------------------------------------
app = FastAPI(
    title="AgroCloud AI Vision Sidecar",
    description=(
        "Python inference microservice for Solanaceae disease screening. "
        "Advisory only -- not a certified phytosanitary diagnosis."
    ),
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# -- Pydantic schemas ---------------------------------------------------------
class ImageQuality(BaseModel):
    width: int
    height: int
    laplacian_variance: float
    mean_brightness: float
    acceptable: bool
    rejection_reason: Optional[str] = None


class ScreeningResponse(BaseModel):
    declared_crop: Optional[str]
    predicted_class: str
    calibrated_confidence: float
    abstained: bool
    abstain_reason: Optional[str] = None
    guidance_summary: str
    class_probabilities: dict[str, float]
    quality_metrics: ImageQuality
    provenance: dict


# -- Image quality validation --------------------------------------------------
def _laplacian_variance(img_gray: np.ndarray) -> float:
    """Variance of discrete Laplacian as a sharpness metric (higher = sharper)."""
    lap = (
        img_gray[1:-1, 1:-1] * (-4)
        + img_gray[:-2, 1:-1]
        + img_gray[2:,  1:-1]
        + img_gray[1:-1, :-2]
        + img_gray[1:-1,  2:]
    )
    return float(np.var(lap))


def validate_image(img: Image.Image) -> ImageQuality:
    w, h = img.size
    if w < 224 or h < 224:
        return ImageQuality(
            width=w, height=h, laplacian_variance=0.0, mean_brightness=0.0,
            acceptable=False,
            rejection_reason=f"Resolution {w}x{h} too low; need >=224x224.",
        )

    # Normalize large camera photos to <= 512px before blur scoring so sharpness is scale-consistent
    eval_img = img
    if max(w, h) > MAX_BLUR_INSPECT_DIM:
        scale = MAX_BLUR_INSPECT_DIM / float(max(w, h))
        eval_img = img.resize(
            (max(224, int(round(w * scale))), max(224, int(round(h * scale)))),
            Image.LANCZOS,
        )

    gray = np.array(eval_img.convert("L"), dtype=np.float32)
    brightness = float(gray.mean())

    if brightness < MIN_BRIGHTNESS:
        return ImageQuality(
            width=w, height=h, laplacian_variance=0.0,
            mean_brightness=round(brightness, 1), acceptable=False,
            rejection_reason=(
                f"Image too dark (brightness {brightness:.1f} < {MIN_BRIGHTNESS}). "
                "Retake in diffused daylight."
            ),
        )
    if brightness > MAX_BRIGHTNESS:
        return ImageQuality(
            width=w, height=h, laplacian_variance=0.0,
            mean_brightness=round(brightness, 1), acceptable=False,
            rejection_reason=(
                f"Image overexposed (brightness {brightness:.1f} > {MAX_BRIGHTNESS}). "
                "Avoid harsh direct flash or glare."
            ),
        )

    lap_var = _laplacian_variance(gray)
    if lap_var < BLUR_THRESHOLD:
        return ImageQuality(
            width=w, height=h, laplacian_variance=round(lap_var, 2),
            mean_brightness=round(brightness, 1), acceptable=False,
            rejection_reason=(
                f"Image blurry (Laplacian variance {lap_var:.1f} < {BLUR_THRESHOLD}). "
                "Hold camera steady and refocus on the leaf."
            ),
        )

    return ImageQuality(
        width=w, height=h,
        laplacian_variance=round(lap_var, 2),
        mean_brightness=round(brightness, 1),
        acceptable=True,
    )


# -- Preprocessing -------------------------------------------------------------
def preprocess(img: Image.Image) -> np.ndarray:
    """Resize to 224x224, apply ImageNet normalisation, return NCHW float32."""
    resized = img.convert("RGB").resize((224, 224), Image.BILINEAR)
    arr = np.array(resized, dtype=np.float32) / 255.0
    arr = (arr - IMAGENET_MEAN) / IMAGENET_STD
    arr = arr.transpose(2, 0, 1)
    return arr[np.newaxis, ...]


def _estimate_foliar_coverage(img: Image.Image) -> float:
    """Estimate fraction of image containing green chlorophyll or chlorotic foliage."""
    arr = np.array(img.convert("RGB").resize((224, 224)), dtype=np.float32)
    R, G, B = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    green = (G > R * 1.05) & (G > B * 1.08) & (G > 40.0)
    chlorotic = (G > 120.0) & (G >= 0.80 * R) & (B < 0.65 * G) & ((G - B) > 45.0)
    return float(np.mean(green | chlorotic))


def _apply_crop_mask(logits: np.ndarray, declared_crop: Optional[str]) -> np.ndarray:
    """Mask out logits of non-selected crops when the farmer specifies Tomato or Potato."""
    if not declared_crop:
        return logits
    crop_norm = declared_crop.strip().lower()
    if crop_norm not in ("tomato", "potato"):
        return logits
    masked = logits.copy()
    prefix = "Tomato___" if crop_norm == "tomato" else "Potato___"
    for i, cls in enumerate(CLASS_NAMES):
        if not cls.startswith(prefix):
            masked[i] = -1e9
    return masked


# -- Inference -----------------------------------------------------------------
def _softmax_with_temperature(logits: np.ndarray, T: float) -> np.ndarray:
    scaled = logits / T
    scaled -= scaled.max()
    exp = np.exp(scaled)
    total = exp.sum()
    return exp / (total if total > 0 else 1.0)


def _run_onnx(tensor: np.ndarray) -> np.ndarray:
    input_name = _session.get_inputs()[0].name
    return _session.run(None, {input_name: tensor})[0][0].copy()


def _colour_fallback(img: Image.Image, declared_crop: Optional[str]) -> tuple[np.ndarray, str]:
    """Heuristic foliar colour-ratio estimator used when no ONNX model is loaded."""
    arr = np.array(img.convert("RGB").resize((224, 224)), dtype=np.float32)
    R, G, B = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    total = 224 * 224

    green_mask = (G > 1.12 * R) & (G > 1.12 * B) & (G > 50)
    yellow_mask = (R > 110) & (G > 105) & (B < 75) & ((R - B) > 40)
    brown_mask = (R > G * 1.10) & (R > B * 1.15) & ((R + G + B) < 380)
    dark_mask = ((R + G + B) < 165) & (R < 75) & (G < 75) & (B < 75)

    foliar_pixels = max(1, int(np.sum(green_mask | yellow_mask | brown_mask | dark_mask)))
    green_rel = float(np.sum(green_mask)) / foliar_pixels
    brown_rel = float(np.sum(brown_mask)) / foliar_pixels
    yellow_rel = float(np.sum(yellow_mask)) / foliar_pixels
    dark_rel = float(np.sum(dark_mask)) / foliar_pixels

    is_potato = (declared_crop or "").lower() == "potato"
    logits = np.zeros(len(CLASS_NAMES), dtype=np.float32)

    if (brown_rel + dark_rel) < 0.06 and green_rel > 0.50:
        logits[5 if is_potato else 0] = 5.2
    elif brown_rel >= 0.10 or (brown_rel >= 0.06 and yellow_rel >= 0.05):
        logits[6 if is_potato else 1] = 4.8
    elif dark_rel >= 0.08:
        logits[7 if is_potato else 2] = 4.6
    elif not is_potato and (brown_rel + dark_rel) >= 0.04 and yellow_rel >= 0.04:
        logits[4] = 4.2   # Bacterial Spot
    else:
        logits[6 if is_potato else 3] = 2.0

    return _apply_crop_mask(logits, declared_crop), "colour_feature_fallback"


def classify(img: Image.Image, declared_crop: Optional[str]) -> tuple[np.ndarray, str]:
    _ensure_session()
    tensor = preprocess(img)
    if _session is not None:
        try:
            logits = _run_onnx(tensor)
            return _apply_crop_mask(logits, declared_crop), "embedded_onnx"
        except Exception as exc:
            logger.warning("ONNX inference error: %s -- falling back to colour heuristic", exc)
    return _colour_fallback(img, declared_crop)


# -- Endpoints -----------------------------------------------------------------
@app.get("/health")
def health():
    _ensure_session()
    return {
        "status": "ok",
        "model_loaded": _session is not None,
        "classes": len(CLASS_NAMES),
        "version": "0.1.0",
    }


@app.post("/api/v1/disease/screen", response_model=ScreeningResponse)
async def screen(
    file: UploadFile = File(...),
    crop: Optional[str] = Form(None),
    declared_crop: Optional[str] = Form(None),
):
    t0 = time.perf_counter()
    raw = await file.read()
    effective_crop = crop or declared_crop

    if not raw:
        raise HTTPException(400, "Empty file upload.")
    if len(raw) > 20 * 1024 * 1024:
        raise HTTPException(413, "Image exceeds 20 MB limit.")

    try:
        img = ImageOps.exif_transpose(Image.open(io.BytesIO(raw)))
    except Exception:
        raise HTTPException(422, "Cannot decode image. Upload JPEG, PNG, or WEBP.")

    quality = validate_image(img)

    if not quality.acceptable:
        latency = round((time.perf_counter() - t0) * 1000, 1)
        return ScreeningResponse(
            declared_crop=effective_crop,
            predicted_class="Unclassifiable_Low_Quality",
            calibrated_confidence=0.0,
            abstained=True,
            abstain_reason=quality.rejection_reason,
            guidance_summary="Quality gate rejected the image: " + quality.rejection_reason,
            class_probabilities={},
            quality_metrics=quality,
            provenance=_provenance("quality_gate", latency),
        )

    foliar_cov = _estimate_foliar_coverage(img)
    if foliar_cov < 0.025:
        latency = round((time.perf_counter() - t0) * 1000, 1)
        msg = (
            "No recognizable green leaf foliage detected in the uploaded image "
            f"(foliar coverage {foliar_cov * 100:.1f}% < 2.5%). Center a tomato or potato leaf in the frame."
        )
        return ScreeningResponse(
            declared_crop=effective_crop,
            predicted_class="Unclassifiable_No_Foliage",
            calibrated_confidence=0.0,
            abstained=True,
            abstain_reason=msg,
            guidance_summary="Screening abstained: " + msg,
            class_probabilities={},
            quality_metrics=quality,
            provenance=_provenance("foliar_presence_gate", latency),
        )

    logits, engine = classify(img, effective_crop)
    probs = _softmax_with_temperature(logits, TEMPERATURE)
    sorted_idx = np.argsort(probs)[::-1]

    top1_idx  = int(sorted_idx[0])
    top1_prob = float(probs[top1_idx])
    top2_prob = float(probs[sorted_idx[1]]) if len(sorted_idx) > 1 else 0.0
    margin    = top1_prob - top2_prob

    pred_class = CLASS_NAMES[top1_idx]
    all_probs  = {CLASS_NAMES[i]: round(float(probs[i]), 4) for i in range(len(CLASS_NAMES))}

    abstained_flag: bool = False
    abstain_reason: Optional[str] = None

    if top1_prob < ABSTENTION_THRESHOLD:
        abstained_flag = True
        abstain_reason = (
            f"Confidence {top1_prob * 100:.1f}% is below the reliable threshold "
            f"({ABSTENTION_THRESHOLD * 100:.0f}%). System abstains."
        )
    elif margin < MARGIN_THRESHOLD:
        abstained_flag = True
        abstain_reason = (
            f"Top-two margin {margin * 100:.1f}% is too narrow "
            f"(min {MARGIN_THRESHOLD * 100:.0f}%). Ambiguous screening."
        )

    if abstained_flag:
        summary = f"Screening abstained: {abstain_reason}"
    else:
        readable = pred_class.replace("___", " - ").replace("_", " ")
        summary = (
            f"Visual screening indicates features consistent with "
            f"{readable} (calibrated confidence {top1_prob * 100:.1f}%)."
        )

    latency = round((time.perf_counter() - t0) * 1000, 1)
    return ScreeningResponse(
        declared_crop=effective_crop,
        predicted_class=pred_class,
        calibrated_confidence=round(top1_prob, 4),
        abstained=abstained_flag,
        abstain_reason=abstain_reason,
        guidance_summary=summary,
        class_probabilities=all_probs,
        quality_metrics=quality,
        provenance=_provenance(engine, latency),
    )


def _provenance(engine: str, latency_ms: float) -> dict:
    return {
        "model_version": "v1.0.0-solanaceae-mobilenetv3",
        "execution_engine": engine,
        "temperature_scaling_t": TEMPERATURE,
        "abstention_threshold": ABSTENTION_THRESHOLD,
        "inference_latency_ms": latency_ms,
        "regulatory_disclaimer": (
            "Screening advisory only -- not a certified phytosanitary diagnosis. "
            "Consult local agricultural extension authorities for treatment decisions."
        ),
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=False)
