"""
conftest.py — shared pytest fixtures and environment setup for AgroCloud AI tests.

Sets AGROCLOUD_MODEL_PATH so the sidecar's ONNX loader can find the model
file during test collection, even when pytest is run from the workspace root.
"""

import os
import sys

# ── Path setup ──────────────────────────────────────────────────────────────────
# Allow `import agrocloud.*` (Python package tests)
WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if WORKSPACE not in sys.path:
    sys.path.insert(0, WORKSPACE)

# Allow `import main` (agrocloud-py sidecar tests)
SIDECAR_DIR = os.path.join(WORKSPACE, "agrocloud-py")
if SIDECAR_DIR not in sys.path:
    sys.path.insert(0, SIDECAR_DIR)

# ── Environment variables ───────────────────────────────────────────────────────
# Point the sidecar to the canonical ONNX model file.
# The file may be < 1 KB (stub weights) — that is expected for prototype tests;
# the colour-feature fallback activates automatically.
os.environ.setdefault(
    "AGROCLOUD_MODEL_PATH",
    os.path.join(WORKSPACE, "agrocloud-java", "models", "solanaceae_mobilenetv3.onnx"),
)

# Lower abstention threshold so that the colour-fallback logits (which produce
# high-confidence predictions) do NOT get abstained during unit tests.
os.environ.setdefault("AGROCLOUD_ABSTENTION_THRESHOLD", "0.50")
os.environ.setdefault("AGROCLOUD_MARGIN_THRESHOLD", "0.10")

