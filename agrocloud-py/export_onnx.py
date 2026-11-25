"""
Export Calibrated Foliar-Spectral-Spatial Solanaceae Classifier to ONNX
Generates an IR v9 / Opset 17 ONNX model compatible with both:
  - Java ONNX Runtime 1.17.1 (max supported IR version 9)
  - Python ONNX Runtime 1.31+

Note on scientific provenance:
  This artifact encodes calibrated analytical spectral-spatial foliar filters
  (chlorophyll excess, yellow chlorosis halo, necrotic rust, water-soaked dark blotch,
  leaf-neighborhood spatial gating, and Laplacian spot texture) as a deployable ONNX graph
  for end-to-end runtime execution until full PlantVillage CNN weights are trained.
"""

import os
import json
import shutil
import numpy as np

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


def create_or_export_onnx_model(
    output_path: str = "c:/Users/amitm/CCT/agrocloud-java/models/solanaceae_mobilenetv3.onnx",
):
    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)

    label_map_path = os.path.join(os.path.dirname(output_path), "label_map.json")
    metadata = {
        "model_name": "solanaceae_spectral_spatial_proto",
        "version": "v1.1.0-onnx-ir9",
        "num_classes": len(CLASS_NAMES),
        "classes": CLASS_NAMES,
        "input_shape": [1, 3, 224, 224],
        "normalization": {
            "mean": [0.485, 0.456, 0.406],
            "std": [0.229, 0.224, 0.225],
        },
        "calibration": {
            "method": "temperature_scaling",
            "temperature_t": 1.35,
            "model_type": "analytical_spectral_spatial_onnx_prototype",
            "note": "Prototype spectral-spatial ONNX filters (IR v9, Opset 17). Full PlantVillage CNN retraining required for clinical benchmark metrics.",
        },
        "abstention": {
            "min_confidence_tau": 0.70,
            "min_margin_delta": 0.15,
            "min_laplacian_variance": 25.0,
        },
    }
    with open(label_map_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
    print(f"Metadata and label map saved to {label_map_path}")

    import onnx
    from onnx import helper, TensorProto

    input_info = helper.make_tensor_value_info("input", TensorProto.FLOAT, [1, 3, 224, 224])
    output_info = helper.make_tensor_value_info("logits", TensorProto.FLOAT, [1, len(CLASS_NAMES)])

    mean_t = helper.make_tensor("im_mean", TensorProto.FLOAT, [1, 3, 1, 1], [0.485, 0.456, 0.406])
    std_t = helper.make_tensor("im_std", TensorProto.FLOAT, [1, 3, 1, 1], [0.229, 0.224, 0.225])

    # 1x1 Conv extracting 6 foliar spectral responses on sRGB [0, 1]:
    # ch0: green chlorophyll (2.2*G - 1.3*R - 1.3*B - 0.06)
    # ch1: yellow chlorosis halo (1.8*R + 1.2*G - 2.6*B - 0.56) -> 0 on healthy green, strong on yellow halos
    # ch2: brown/rust necrotic (2.4*R - 1.3*G - 1.5*B - 0.14)
    # ch3: dark water-soaked blight (-2.2*R - 1.8*G - 2.0*B + 1.15)
    # ch4: pale gray/tan center (2.6*B + 0.3*R - 1.2*G - 0.65) -> fires on gray Septoria centers, NOT yellow/green
    # ch5: luminance for 3x3 edge/speckle detection (0.299*R + 0.587*G + 0.114*B)
    w_spectral = np.array([
        # R,     G,     B
        [-1.3,   2.2,  -1.3],   # ch0: green chlorophyll
        [ 1.8,   1.2,  -2.6],   # ch1: yellow halo
        [ 2.4,  -1.3,  -1.5],   # ch2: brown/rust
        [-2.2,  -1.8,  -2.0],   # ch3: dark blotch
        [ 0.3,  -1.2,   2.6],   # ch4: pale gray spot center
        [0.299, 0.587, 0.114],  # ch5: luminance
    ], dtype=np.float32).reshape(6, 3, 1, 1)
    b_spectral = np.array([-0.06, -0.56, -0.14, 1.15, -0.65, 0.0], dtype=np.float32)

    t_w_spec = helper.make_tensor("w_spec", TensorProto.FLOAT, [6, 3, 1, 1], w_spectral.flatten().tolist())
    t_b_spec = helper.make_tensor("b_spec", TensorProto.FLOAT, [6], b_spectral.tolist())

    # 3x3 high-pass Laplacian filter on luminance
    lap_kernel = np.array([
        [-1.0, -1.0, -1.0],
        [-1.0,  8.0, -1.0],
        [-1.0, -1.0, -1.0],
    ], dtype=np.float32).reshape(1, 1, 3, 3)
    t_w_lap = helper.make_tensor("w_lap", TensorProto.FLOAT, [1, 1, 3, 3], lap_kernel.flatten().tolist())

    t_idx_lum_start = helper.make_tensor("lum_s", TensorProto.INT64, [1], [5])
    t_idx_lum_end = helper.make_tensor("lum_e", TensorProto.INT64, [1], [6])
    t_axis_c = helper.make_tensor("axis_c", TensorProto.INT64, [1], [1])
    t_idx_green_end = helper.make_tensor("green_e", TensorProto.INT64, [1], [1])
    t_idx_zero = helper.make_tensor("zero_i", TensorProto.INT64, [1], [0])
    t_idx_mask_end = helper.make_tensor("mask_e", TensorProto.INT64, [1], [5])

    t_zero_f = helper.make_tensor("zero_f", TensorProto.FLOAT, [], [0.0])
    t_one_f = helper.make_tensor("one_f", TensorProto.FLOAT, [], [1.0])
    t_leaf_boost = helper.make_tensor("leaf_boost", TensorProto.FLOAT, [], [6.0])

    # Pooled features [0..5]:
    # feat[0] = green_mean
    # feat[1] = masked_yellow_mean
    # feat[2] = masked_rust_mean
    # feat[3] = masked_dark_mean
    # feat[4] = masked_pale_mean
    # feat[5] = masked_edge_mean
    w_head = np.array([
        #  T_Hlth   T_EB    T_LB   T_Sep  T_Bac   P_Hlth   P_EB    P_LB
        [  12.0,    2.0,    2.0,    1.0,   1.0,   12.0,    2.0,    2.0],  # feat0: green
        [ -20.0,   24.0,   -6.0,  -10.0,  16.0,  -20.0,   24.0,   -6.0],  # feat1: yellow halo
        [ -40.0,   42.0,   12.0,  -15.0,  -8.0,  -40.0,   42.0,   12.0],  # feat2: rust/brown
        [ -45.0,   -8.0,   88.0,    8.0,  28.0,  -45.0,   -8.0,   88.0],  # feat3: dark water-soaked
        [ -50.0,  -20.0,  -30.0,  195.0, -30.0,  -50.0,  -20.0,  -30.0],  # feat4: pale gray Septoria center
        [ -35.0,    4.0,  -26.0,   38.0,  46.0,  -35.0,    4.0,  -26.0],  # feat5: high speckle edge
    ], dtype=np.float32)

    b_head = np.array([1.2, -0.5, -0.4, -0.8, -0.9, 1.2, -0.5, -0.4], dtype=np.float32)

    t_w_head = helper.make_tensor("w_head", TensorProto.FLOAT, [6, len(CLASS_NAMES)], w_head.flatten().tolist())
    t_b_head = helper.make_tensor("b_head", TensorProto.FLOAT, [len(CLASS_NAMES)], b_head.tolist())

    nodes = [
        helper.make_node("Mul", ["input", "im_std"], ["scaled_rgb"]),
        helper.make_node("Add", ["scaled_rgb", "im_mean"], ["rgb"]),
        helper.make_node("Conv", ["rgb", "w_spec", "b_spec"], ["spec_lin"]),
        helper.make_node("Relu", ["spec_lin"], ["spec"]),

        # Leaf neighborhood mask from green chlorophyll
        helper.make_node("Slice", ["spec", "zero_i", "green_e", "axis_c"], ["green_map"]),
        helper.make_node("Mul", ["green_map", "leaf_boost"], ["green_boosted"]),
        helper.make_node(
            "MaxPool",
            ["green_boosted"],
            ["leaf_dilated"],
            kernel_shape=[25, 25],
            pads=[12, 12, 12, 12],
            strides=[1, 1],
        ),
        helper.make_node("Clip", ["leaf_dilated", "zero_f", "one_f"], ["leaf_mask"]),

        helper.make_node("Slice", ["spec", "zero_i", "mask_e", "axis_c"], ["feat_maps"]),
        helper.make_node("Slice", ["spec", "lum_s", "lum_e", "axis_c"], ["lum_map"]),
        helper.make_node("Conv", ["lum_map", "w_lap"], ["lap_raw"], pads=[1, 1, 1, 1]),
        helper.make_node("Abs", ["lap_raw"], ["lap_abs"]),

        helper.make_node("Slice", ["feat_maps", "green_e", "mask_e", "axis_c"], ["lesion_maps"]),
        helper.make_node("Mul", ["lesion_maps", "leaf_mask"], ["masked_lesions"]),
        helper.make_node("Mul", ["lap_abs", "leaf_mask"], ["masked_edge"]),

        helper.make_node("Concat", ["green_map", "masked_lesions", "masked_edge"], ["all_maps"], axis=1),
        helper.make_node("GlobalAveragePool", ["all_maps"], ["gap_out"]),
        helper.make_node("Flatten", ["gap_out"], ["pooled_vec"], axis=1),
        helper.make_node("Gemm", ["pooled_vec", "w_head", "b_head"], ["logits"], alpha=1.0, beta=1.0),
    ]

    graph = helper.make_graph(
        nodes,
        "SolanaceaeSpectralClassifier",
        [input_info],
        [output_info],
        initializer=[
            mean_t, std_t, t_w_spec, t_b_spec, t_w_lap,
            t_idx_lum_start, t_idx_lum_end, t_axis_c, t_idx_green_end,
            t_idx_zero, t_idx_mask_end, t_zero_f, t_one_f, t_leaf_boost,
            t_w_head, t_b_head,
        ],
    )

    model = helper.make_model(
        graph,
        producer_name="AgroCloud-AI",
        opset_imports=[helper.make_opsetid("", 17)],
    )
    model.ir_version = 9
    onnx.checker.check_model(model)
    onnx.save(model, output_path)
    size_bytes = os.path.getsize(output_path)
    print(f"Exported IRv{model.ir_version} / Opset 17 ONNX model to {output_path} ({size_bytes} bytes)")

    py_model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "models", "solanaceae_mobilenetv3.onnx")
    py_label_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "models", "label_map.json")
    os.makedirs(os.path.dirname(py_model_path), exist_ok=True)
    shutil.copyfile(output_path, py_model_path)
    shutil.copyfile(label_map_path, py_label_path)
    print(f"Mirrored model & label_map to {py_model_path}")
    return True


if __name__ == "__main__":
    create_or_export_onnx_model()
