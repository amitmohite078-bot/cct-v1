package com.agrocloud.disease;

import com.agrocloud.model.DiseaseScreeningResult;
import com.agrocloud.model.DiseaseScreeningResult.ImageQualityMetrics;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Unified Disease Screening Service
 * Bridges Quality Validation Gate, Model Execution (Embedded ONNX or Python Sidecar), and IPM Advisory.
 */
@Service
public class DiseaseScreeningService {

    private final ImageValidator imageValidator;
    private final OnnxDiseaseClassifier onnxClassifier;
    private final PythonSidecarClient sidecarClient;
    private final IpmAdvisoryProvider ipmProvider;
    private final boolean preferEmbeddedOnnx;
    private final String modelVersion;

    public DiseaseScreeningService(
        ImageValidator imageValidator,
        OnnxDiseaseClassifier onnxClassifier,
        PythonSidecarClient sidecarClient,
        IpmAdvisoryProvider ipmProvider,
        @Value("${agrocloud.disease.prefer-embedded-onnx:true}") boolean preferEmbeddedOnnx,
        @Value("${agrocloud.disease.model-version:v1.1.0-solanaceae-onnx-proto}") String modelVersion
    ) {
        this.imageValidator = imageValidator;
        this.onnxClassifier = onnxClassifier;
        this.sidecarClient = sidecarClient;
        this.ipmProvider = ipmProvider;
        this.preferEmbeddedOnnx = preferEmbeddedOnnx;
        this.modelVersion = modelVersion;
    }

    public DiseaseScreeningResult screenLeaf(byte[] imageBytes, String declaredCrop) throws IOException {
        long startTime = System.currentTimeMillis();

        ImageValidator.ValidationResult valResult;
        try {
            valResult = imageValidator.validate(imageBytes);
        } catch (IllegalArgumentException decodeErr) {
            // If Java ImageIO cannot natively decode (e.g., WebP/AVIF), delegate to Python sidecar (Pillow) if running
            if (sidecarClient.isSidecarHealthy()) {
                Optional<PythonSidecarClient.SidecarResponse> sidecarRes =
                    sidecarClient.classifyFullViaSidecar(imageBytes, declaredCrop);
                if (sidecarRes.isPresent()) {
                    var sr = sidecarRes.get();
                    ImageQualityMetrics metrics = sr.qualityMetrics() != null
                        ? sr.qualityMetrics()
                        : new ImageQualityMetrics(0, 0, 0, 0, true, null);
                    return buildFinalResult(declaredCrop, sr.classification(), metrics, startTime);
                }
            }
            throw decodeErr;
        }

        ImageQualityMetrics metrics = valResult.metrics();

        if (!metrics.isAcceptableQuality()) {
            return new DiseaseScreeningResult(
                declaredCrop,
                "Unclassifiable_Low_Quality",
                0.0,
                true,
                metrics.rejectionReason(),
                "Image rejected by quality validation filter: " + metrics.rejectionReason(),
                List.of(
                    "Retake the photograph in natural, diffused daylight.",
                    "Ensure the camera is in sharp focus on the foliar lesion with the leaf filling most of the frame.",
                    "Avoid strong direct flash reflection or deep shadows."
                ),
                Map.of(),
                metrics,
                buildProvenance("Quality_Gate_Abstention", System.currentTimeMillis() - startTime)
            );
        }

        OnnxDiseaseClassifier.ClassificationOutput classification = null;

        if (!preferEmbeddedOnnx && sidecarClient.isSidecarHealthy()) {
            Optional<OnnxDiseaseClassifier.ClassificationOutput> sidecarOut =
                sidecarClient.classifyViaSidecar(imageBytes, declaredCrop);
            if (sidecarOut.isPresent()) {
                classification = sidecarOut.get();
            }
        }

        if (classification == null) {
            classification = onnxClassifier.classify(valResult.image(), declaredCrop);
        }

        return buildFinalResult(declaredCrop, classification, metrics, startTime);
    }

    private DiseaseScreeningResult buildFinalResult(
        String declaredCrop,
        OnnxDiseaseClassifier.ClassificationOutput classification,
        ImageQualityMetrics metrics,
        long startTime
    ) {
        String guidanceSummary;
        List<String> ipmAdvice;

        if ("Unclassifiable_No_Foliage".equals(classification.predictedClass())) {
            guidanceSummary = "The system abstained because no recognizable leaf foliage was detected: " + classification.abstainReason();
            ipmAdvice = List.of(
                "Place a single tomato or potato leaf against a plain contrasting background.",
                "Ensure green or symptomatic leaf tissue occupies at least half of the frame.",
                "Hold the camera 20-35 cm away so leaf veins and spots are sharp."
            );
        } else if (classification.abstained()) {
            guidanceSummary = "The system abstained from diagnosing this sample because: " + classification.abstainReason();
            ipmAdvice = List.of(
                "Do not apply synthetic treatments based on uncertain visual impressions.",
                "Capture another clear, close-up photo showing distinct spots or lesions under even daylight.",
                "Take 2-3 leaf samples showing typical symptoms to your district agricultural extension officer or local agronomic university clinic for laboratory confirmation."
            );
        } else {
            String readableName = classification.predictedClass().replace("___", " ").replace("_", " ");
            guidanceSummary = String.format("Visual screening indicates features consistent with %s (Calibrated Confidence: %.1f%%).",
                readableName, classification.confidence() * 100.0);
            ipmAdvice = ipmProvider.getAdvice(classification.predictedClass());
        }

        long latencyMs = System.currentTimeMillis() - startTime;
        String engine = classification.executionEngine() != null ? classification.executionEngine() : "Embedded_ONNX_Java";

        return new DiseaseScreeningResult(
            declaredCrop,
            classification.predictedClass(),
            classification.confidence(),
            classification.abstained(),
            classification.abstainReason(),
            guidanceSummary,
            ipmAdvice,
            classification.allProbabilities(),
            metrics,
            buildProvenance(engine, latencyMs)
        );
    }

    private Map<String, Object> buildProvenance(String engine, long latencyMs) {
        return Map.of(
            "model_version", modelVersion,
            "execution_engine", engine,
            "calibration_method", "temperature_scaling_platt_nll",
            "inference_latency_ms", latencyMs,
            "timestamp_utc", Instant.now().toString(),
            "regulatory_disclaimer", "Screening advisory only; not a chemical prescription. Direct all treatment decisions to local agricultural extension authorities."
        );
    }
}
