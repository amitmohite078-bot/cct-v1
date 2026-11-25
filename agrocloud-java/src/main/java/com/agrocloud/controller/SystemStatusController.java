package com.agrocloud.controller;

import com.agrocloud.disease.OnnxDiseaseClassifier;
import com.agrocloud.disease.PythonSidecarClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class SystemStatusController {

    private final OnnxDiseaseClassifier onnxClassifier;
    private final PythonSidecarClient sidecarClient;

    public SystemStatusController(OnnxDiseaseClassifier onnxClassifier, PythonSidecarClient sidecarClient) {
        this.onnxClassifier = onnxClassifier;
        this.sidecarClient = sidecarClient;
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus() {
        return ResponseEntity.ok(Map.of(
            "system", "AgroCloud AI Enterprise Advisory Core",
            "status", "OPERATIONAL",
            "java_version", System.getProperty("java.version"),
            "jvm_vendor", System.getProperty("java.vendor"),
            "embedded_onnx_loaded", onnxClassifier.isModelLoaded(),
            "model_version", onnxClassifier.getModelVersion(),
            "python_sidecar_connected", sidecarClient.isSidecarHealthy(),
            "timestamp", Instant.now().toString(),
            "iot_free_advisory", true,
            "architecture_mode", "Dual Java Core (Option 1) + Python Vision Sidecar (Option 2)"
        ));
    }
}

