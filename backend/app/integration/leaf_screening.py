"""
AgroCloud AI / AgroNexus - Visual Crop Leaf Screening Engine (Software-Only)
Performs deterministic image quality gates, foliar presence gating, and
spectral-texture differential screening scoped to the selected crop catalog.
"""
from io import BytesIO
from typing import Any, Dict, List, Optional
import math
import numpy as np
from PIL import Image, ImageOps, UnidentifiedImageError

from app.integration.disease_detection import CROP_DISEASES, get_crop_diseases

MAX_UPLOAD_BYTES = 8 * 1024 * 1024  # 8 MB limit
MIN_DIMENSION_PX = 224
ANALYSIS_MAX_SIDE_PX = 256
MIN_BRIGHTNESS = 25.0
MAX_BRIGHTNESS = 235.0
MIN_BLUR_VARIANCE = 4.0
MIN_FOLIAR_PCT = 2.5
CONFIDENCE_ABSTAIN_THRESHOLD = 0.48
MARGIN_ABSTAIN_THRESHOLD = 0.08


def _infer_visual_signature(entry: Dict[str, Any]) -> str:
    """Maps a disease catalog entry to a primary foliar visual pattern."""
    explicit = entry.get("visual_signature")
    if explicit:
        return explicit
    text = f"{entry.get('disease_id', '')} {entry.get('name', '')} {entry.get('symptoms', '')}".lower()
    if any(k in text for k in ("rust", "pustule", "cinnamon")):
        return "rust_pustule"
    if any(k in text for k in ("yellow mosaic", "yellowing", "mosaic", "curl", "chlorosis")):
        return "chlorosis_mosaic"
    if any(k in text for k in ("purple", "blotch")):
        return "purple_blotch"
    if any(k in text for k in ("armyworm", "shoot fly", "bollworm", "holes", "deadheart")):
        return "pest_foliar_damage"
    if any(k in text for k in ("blast", "diamond", "grayish", "elliptical", "tan lesion")):
        return "gray_tan_spot"
    return "fungal_blight_dark"


def _compute_laplacian_variance(gray: np.ndarray) -> float:
    """Scale-normalized 4-neighbor discrete Laplacian variance for blur check."""
    if gray.shape[0] < 3 or gray.shape[1] < 3:
        return 0.0
    lap = (
        -4.0 * gray[1:-1, 1:-1]
        + gray[:-2, 1:-1]
        + gray[2:, 1:-1]
        + gray[1:-1, :-2]
        + gray[1:-1, 2:]
    )
    return float(np.var(lap))


def _extract_spectral_metrics(rgb_small: np.ndarray) -> Dict[str, float]:
    """Computes brightness, sharpness, foliar cover, and lesion color fractions."""
    r = rgb_small[:, :, 0].astype(np.float32)
    g = rgb_small[:, :, 1].astype(np.float32)
    b = rgb_small[:, :, 2].astype(np.float32)

    gray = 0.299 * r + 0.587 * g + 0.114 * b
    mean_brightness = float(np.mean(gray))
    blur_variance = _compute_laplacian_variance(gray)

    # Excess Green + chlorophyll dominance for healthy green leaf tissue
    exg = 2.0 * g - r - b
    green_mask = (exg > 22.0) & (g > r * 1.07) & (g > b * 1.12) & (gray > 22.0)

    # Yellow / chlorotic halo / mosaic tissue (distinct from dry brown soil)
    chlorosis_mask = (
        (~green_mask)
        & (r > 110.0)
        & (g > 110.0)
        & (g >= r * 0.86)
        & ((g - b) > 45.0)
        & (b < g * 0.72)
        & (np.abs(r - g) < 50.0)
    )

    # Orange / cinnamon rust pustules
    rust_mask = (
        (~green_mask)
        & (~chlorosis_mask)
        & (r > 105.0)
        & (r > g * 1.24)
        & (g > b * 1.22)
        & (gray < 205.0)
    )

    # Dark water-soaked / brown-black blight / purple blotch necrosis
    dark_necrosis_mask = (
        (~green_mask)
        & (~chlorosis_mask)
        & (~rust_mask)
        & (gray < 105.0)
        & (gray > 14.0)
        & (r >= b * 1.03)
    )

    # Grayish / pale tan necrotic lesion centers
    gray_tan_mask = (
        (~green_mask)
        & (~chlorosis_mask)
        & (~rust_mask)
        & (~dark_necrosis_mask)
        & (gray >= 105.0)
        & (gray <= 192.0)
        & (np.abs(r - g) < 28.0)
        & (np.abs(g - b) < 32.0)
        & (r >= b * 0.96)
    )

    total_px = float(gray.size) or 1.0
    green_pct = 100.0 * float(np.count_nonzero(green_mask)) / total_px
    chlorosis_pct = 100.0 * float(np.count_nonzero(chlorosis_mask)) / total_px
    rust_pct = 100.0 * float(np.count_nonzero(rust_mask)) / total_px
    dark_necrosis_pct = 100.0 * float(np.count_nonzero(dark_necrosis_mask)) / total_px
    gray_tan_pct = 100.0 * float(np.count_nonzero(gray_tan_mask)) / total_px

    foliar_pct = green_pct + chlorosis_pct

    # Normalize symptom burdens relative to visible plant area (foliar + lesion)
    plant_area = green_pct + chlorosis_pct + rust_pct + dark_necrosis_pct + gray_tan_pct
    denom = max(plant_area, 1.0)
    healthy_ratio = green_pct / denom
    chlorosis_ratio = chlorosis_pct / denom
    rust_ratio = rust_pct / denom
    dark_ratio = dark_necrosis_pct / denom
    gray_tan_ratio = gray_tan_pct / denom
    lesion_ratio = min(1.0, chlorosis_ratio + rust_ratio + dark_ratio + gray_tan_ratio)

    # Spatial lesion-vs-green transition density measures discrete spotting
    lesion_any = (chlorosis_mask | rust_mask | dark_necrosis_mask | gray_tan_mask).astype(np.float32)
    h_diff = np.abs(lesion_any[:, 1:] - lesion_any[:, :-1])
    v_diff = np.abs(lesion_any[1:, :] - lesion_any[:-1, :])
    spot_contrast = float(np.mean(h_diff) + np.mean(v_diff))

    return {
        "mean_brightness": round(mean_brightness, 2),
        "blur_variance": round(blur_variance, 2),
        "foliar_coverage_pct": round(foliar_pct, 2),
        "green_pct": round(green_pct, 2),
        "chlorosis_pct": round(chlorosis_pct, 2),
        "rust_pct": round(rust_pct, 2),
        "dark_necrosis_pct": round(dark_necrosis_pct, 2),
        "gray_tan_pct": round(gray_tan_pct, 2),
        "lesion_burden_pct": round(lesion_ratio * 100.0, 2),
        "healthy_ratio": healthy_ratio,
        "chlorosis_ratio": chlorosis_ratio,
        "rust_ratio": rust_ratio,
        "dark_ratio": dark_ratio,
        "gray_tan_ratio": gray_tan_ratio,
        "lesion_ratio": lesion_ratio,
        "spot_contrast": round(spot_contrast, 4),
    }


def _score_signature(sig: str, m: Dict[str, float]) -> float:
    """Computes unnormalized log-likelihood affinity for a visual signature."""
    h = m["healthy_ratio"]
    ch = m["chlorosis_ratio"]
    ru = m["rust_ratio"]
    dk = m["dark_ratio"]
    gt = m["gray_tan_ratio"]
    les = m["lesion_ratio"]
    sc = m["spot_contrast"]

    if sig == "healthy":
        # Healthy requires overwhelmingly intact green foliage (>85%) and negligible lesions
        excess_green = max(0.0, h - 0.85) / 0.15
        return 3.2 * excess_green - 12.0 * les - 10.0 * min(sc, 0.25)

    # Penalize disease classes when almost no lesion/chlorosis pixels exist
    empty_penalty = 2.0 * max(0.0, 0.07 - les) / 0.07
    if sig == "rust_pustule":
        return 14.0 * ru + 3.0 * ch + 1.5 * dk + 5.0 * min(sc, 0.20) - empty_penalty
    if sig == "chlorosis_mosaic":
        return 12.0 * ch + 2.0 * gt + 3.5 * min(sc, 0.20) - empty_penalty
    if sig == "gray_tan_spot":
        return 12.0 * gt + 4.0 * dk + 2.5 * ch + 6.0 * min(sc, 0.20) - empty_penalty
    if sig == "purple_blotch":
        return 11.0 * dk + 4.0 * ru + 3.0 * ch + 5.0 * min(sc, 0.20) - empty_penalty
    if sig == "pest_foliar_damage":
        return 9.0 * min(sc, 0.25) + 7.5 * gt + 6.5 * dk + 2.5 * ch - empty_penalty
    # fungal_blight_dark / general blight
    return 12.0 * dk + 4.0 * gt + 3.0 * ch + 5.0 * min(sc, 0.20) - empty_penalty


def _softmax(scores: List[float], temperature: float = 0.85) -> List[float]:
    if not scores:
        return []
    scaled = [s / max(temperature, 1e-6) for s in scores]
    max_s = max(scaled)
    exps = [math.exp(s - max_s) for s in scaled]
    total = sum(exps) or 1.0
    return [e / total for e in exps]


def analyze_crop_leaf_image(
    image_bytes: bytes,
    crop_id: Optional[str] = None,
    filename: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Runs full quality gating, foliar gating, and crop-scoped disease screening
    on raw uploaded image bytes. Raises ValueError on unreadable/corrupt input.
    """
    if not image_bytes:
        raise ValueError("Uploaded image file is empty.")

    try:
        with Image.open(BytesIO(image_bytes)) as img_raw:
            img = ImageOps.exif_transpose(img_raw).convert("RGB")
    except (UnidentifiedImageError, OSError, ValueError) as exc:
        raise ValueError(f"Unsupported or corrupted image payload: {exc}") from exc

    width, height = img.size

    # Downscale proportionally for scale-normalized blur & spectral screening
    scale = min(1.0, ANALYSIS_MAX_SIDE_PX / float(max(width, height)))
    new_w = max(1, int(round(width * scale)))
    new_h = max(1, int(round(height * scale)))
    small = img.resize((new_w, new_h), Image.Resampling.BILINEAR)
    metrics = _extract_spectral_metrics(np.asarray(small))

    norm_crop = (crop_id or "tomato").strip().lower() or "tomato"
    display_crop = norm_crop.replace("_", " ").title()

    provenance = {
        "method": "Spectral-Texture & Crop-Scoped Foliar Screening Heuristic (v1.0)",
        "model_type": "Deterministic HSV/ExG + Laplacian sharpness + crop pathology differential",
        "software_only": True,
        "limitations": (
            "Visual screening uses calibrated color, chlorosis, rust, necrosis, and spot-contrast "
            "cues rather than lab PCR/microscopy or locally fine-tuned deep CNN weights. Consult your "
            "nearest Krishi Vigyan Kendra (KVK) or agronomist before applying chemical sprays."
        ),
        "filename": filename or "uploaded_leaf.jpg",
    }

    # Gate 1: Resolution
    if min(width, height) < MIN_DIMENSION_PX:
        reason = (
            f"Image resolution {width}x{height} px is below minimum {MIN_DIMENSION_PX}x{MIN_DIMENSION_PX} px. "
            "Capture a closer, higher-resolution photo."
        )
        return _build_rejected_response(
            "QUALITY_REJECTED", reason, norm_crop, display_crop, width, height, metrics, provenance
        )

    # Gate 2: Exposure
    if metrics["mean_brightness"] < MIN_BRIGHTNESS:
        reason = (
            f"Image is underexposed (brightness {metrics['mean_brightness']:.1f}/255 < {MIN_BRIGHTNESS}). "
            "Retake in natural daylight."
        )
        return _build_rejected_response(
            "QUALITY_REJECTED", reason, norm_crop, display_crop, width, height, metrics, provenance
        )
    if metrics["mean_brightness"] > MAX_BRIGHTNESS:
        reason = (
            f"Image is washed out / overexposed (brightness {metrics['mean_brightness']:.1f}/255 > {MAX_BRIGHTNESS}). "
            "Avoid harsh direct glare."
        )
        return _build_rejected_response(
            "QUALITY_REJECTED", reason, norm_crop, display_crop, width, height, metrics, provenance
        )

    # Gate 3: Blur
    if metrics["blur_variance"] < MIN_BLUR_VARIANCE:
        reason = (
            f"Image appears too blurry (Laplacian variance {metrics['blur_variance']:.2f} < {MIN_BLUR_VARIANCE}). "
            "Hold the camera steady and focus directly on the leaf surface."
        )
        return _build_rejected_response(
            "QUALITY_REJECTED", reason, norm_crop, display_crop, width, height, metrics, provenance
        )

    # Gate 4: Non-leaf / No foliage abstention
    if metrics["foliar_coverage_pct"] < MIN_FOLIAR_PCT:
        reason = (
            f"Abstained: insufficient green/chlorotic plant foliage detected ({metrics['foliar_coverage_pct']:.2f}% < {MIN_FOLIAR_PCT}%). "
            "The frame appears to show soil, background, or non-leaf objects. Frame a crop leaf closeup and retry."
        )
        return _build_rejected_response(
            "ABSTAINED_NON_LEAF", reason, norm_crop, display_crop, width, height, metrics, provenance
        )

    # Build crop-scoped candidate list (Healthy baseline + catalog diseases)
    crop_diseases = get_crop_diseases(norm_crop)
    candidates: List[Dict[str, Any]] = [
        {
            "id": f"{norm_crop}_healthy",
            "name": f"Healthy {display_crop} Foliage",
            "pathogen_type": "Healthy Canopy",
            "visual_signature": "healthy",
            "entry": None,
        }
    ]
    for idx, d in enumerate(crop_diseases):
        candidates.append(
            {
                "id": d.get("disease_id", f"{norm_crop}_disease_{idx}"),
                "name": d.get("name", "Unclassified Foliar Condition"),
                "pathogen_type": d.get("pathogen_type", "Pathogen"),
                "visual_signature": _infer_visual_signature(d),
                "entry": d,
            }
        )

    raw_scores = [_score_signature(c["visual_signature"], metrics) for c in candidates]
    probs = _softmax(raw_scores)

    ranked = sorted(
        [
            {
                "id": c["id"],
                "name": c["name"],
                "pathogen_type": c["pathogen_type"],
                "visual_signature": c["visual_signature"],
                "probability": round(p, 4),
                "probability_pct": round(p * 100.0, 1),
                "entry": c["entry"],
            }
            for c, p in zip(candidates, probs)
        ],
        key=lambda x: x["probability"],
        reverse=True,
    )

    top = ranked[0]
    second_prob = ranked[1]["probability"] if len(ranked) > 1 else 0.0
    margin = round(top["probability"] - second_prob, 4)

    abstained = top["probability"] < CONFIDENCE_ABSTAIN_THRESHOLD or margin < MARGIN_ABSTAIN_THRESHOLD
    status = "ABSTAINED_UNCERTAIN" if abstained else "SCREENING_COMPLETE"
    abstention_reason = None
    if abstained:
        abstention_reason = (
            f"Visual patterns overlap between '{top['name']}' ({top['probability_pct']}%) and "
            f"'{ranked[1]['name']}' ({ranked[1]['probability_pct']}%). Review differential symptoms below "
            "or capture a sharper close-up of an individual lesion."
        )

    is_healthy = top["visual_signature"] == "healthy"
    matched_entry = top["entry"]
    # If healthy or uncertain, surface primary crop disease guide as preventive reference
    reference_entry = matched_entry or (crop_diseases[0] if crop_diseases else None)

    recommended_actions = None
    if reference_entry:
        recommended_actions = {
            "symptoms": reference_entry.get("symptoms", ""),
            "favorable_conditions": reference_entry.get("favorable_conditions", ""),
            "organic_control": reference_entry.get("organic_control", ""),
            "chemical_control": reference_entry.get("chemical_control", ""),
            "preventive_measures": reference_entry.get("preventive_measures", ""),
            "extension_guidance": (
                "Verify symptoms on 5-10 leaves across different parts of the field and confirm dosage "
                "with your local Krishi Vigyan Kendra (KVK) before spraying."
            ),
        }

    return {
        "status": status,
        "abstained": abstained,
        "abstention_reason": abstention_reason,
        "crop_id": norm_crop,
        "crop_name": display_crop,
        "predicted_condition": "Inconclusive Visual Match (Review Differential)" if abstained else top["name"],
        "predicted_disease_id": None if is_healthy or abstained else top["id"],
        "is_healthy": is_healthy and not abstained,
        "confidence": top["probability"],
        "confidence_pct": top["probability_pct"],
        "margin": margin,
        "image_quality": {
            "width": width,
            "height": height,
            "mean_brightness": metrics["mean_brightness"],
            "blur_variance": metrics["blur_variance"],
            "foliar_coverage_pct": metrics["foliar_coverage_pct"],
            "lesion_burden_pct": metrics["lesion_burden_pct"],
            "green_pct": metrics["green_pct"],
            "chlorosis_pct": metrics["chlorosis_pct"],
            "rust_pct": metrics["rust_pct"],
            "dark_necrosis_pct": metrics["dark_necrosis_pct"],
            "gray_tan_pct": metrics["gray_tan_pct"],
            "spot_contrast": metrics["spot_contrast"],
            "passed": True,
            "rejection_reason": None,
        },
        "class_probabilities": [
            {k: v for k, v in item.items() if k != "entry"}
            for item in ranked
        ],
        "recommended_actions": recommended_actions,
        "crop_disease_catalog": crop_diseases,
        "model_provenance": provenance,
    }


def _build_rejected_response(
    status: str,
    reason: str,
    crop_id: str,
    crop_name: str,
    width: int,
    height: int,
    metrics: Dict[str, float],
    provenance: Dict[str, Any],
) -> Dict[str, Any]:
    return {
        "status": status,
        "abstained": True,
        "abstention_reason": reason,
        "crop_id": crop_id,
        "crop_name": crop_name,
        "predicted_condition": "Screening Abstained",
        "predicted_disease_id": None,
        "is_healthy": False,
        "confidence": 0.0,
        "confidence_pct": 0.0,
        "margin": 0.0,
        "image_quality": {
            "width": width,
            "height": height,
            "mean_brightness": metrics["mean_brightness"],
            "blur_variance": metrics["blur_variance"],
            "foliar_coverage_pct": metrics["foliar_coverage_pct"],
            "lesion_burden_pct": metrics["lesion_burden_pct"],
            "green_pct": metrics["green_pct"],
            "chlorosis_pct": metrics["chlorosis_pct"],
            "rust_pct": metrics["rust_pct"],
            "dark_necrosis_pct": metrics["dark_necrosis_pct"],
            "gray_tan_pct": metrics["gray_tan_pct"],
            "spot_contrast": metrics["spot_contrast"],
            "passed": False,
            "rejection_reason": reason,
        },
        "class_probabilities": [],
        "recommended_actions": None,
        "crop_disease_catalog": get_crop_diseases(crop_id),
        "model_provenance": provenance,
    }
