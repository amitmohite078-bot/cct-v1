package com.agrocloud.disease;

import com.agrocloud.model.DiseaseScreeningResult.ImageQualityMetrics;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.*;

/**
 * HTTP Client to communicate with Python Vision Sidecar (Option 2 Microservice)
 */
@Component
public class PythonSidecarClient {

    private static final Logger log = LoggerFactory.getLogger(PythonSidecarClient.class);

    private final String sidecarUrl;
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public PythonSidecarClient(
        @Value("${agrocloud.disease.python-sidecar-url:http://127.0.0.1:8000}") String sidecarUrl
    ) {
        this.sidecarUrl = sidecarUrl;
        this.httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(3))
            .build();
        this.objectMapper = new ObjectMapper();
    }

    public record SidecarResponse(
        OnnxDiseaseClassifier.ClassificationOutput classification,
        ImageQualityMetrics qualityMetrics
    ) {}

    public boolean isSidecarHealthy() {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(sidecarUrl + "/health"))
                .timeout(Duration.ofSeconds(2))
                .GET()
                .build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            return response.statusCode() == 200;
        } catch (Exception e) {
            return false;
        }
    }

    public Optional<SidecarResponse> classifyFullViaSidecar(byte[] imageBytes, String declaredCrop) {
        try {
            String boundary = "----AgroCloudBoundary" + System.currentTimeMillis();
            byte[] multipartBody = buildMultipart(imageBytes, declaredCrop, boundary);

            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(sidecarUrl + "/api/v1/disease/screen"))
                .header("Content-Type", "multipart/form-data; boundary=" + boundary)
                .timeout(Duration.ofSeconds(10))
                .POST(HttpRequest.BodyPublishers.ofByteArray(multipartBody))
                .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200) {
                JsonNode root = objectMapper.readTree(response.body());
                String pred = root.get("predicted_class").asText();
                double conf = root.get("calibrated_confidence").asDouble();
                boolean abst = root.get("abstained").asBoolean();
                String reason = root.has("abstain_reason") && !root.get("abstain_reason").isNull()
                    ? root.get("abstain_reason").asText() : null;

                Map<String, Double> probs = new LinkedHashMap<>();
                if (root.has("class_probabilities")) {
                    root.get("class_probabilities").fields().forEachRemaining(entry ->
                        probs.put(entry.getKey(), entry.getValue().asDouble())
                    );
                }

                String engine = "Python_Sidecar_Microservice";
                if (root.has("provenance") && root.get("provenance").has("execution_engine")) {
                    engine = "Python_Sidecar (" + root.get("provenance").get("execution_engine").asText() + ")";
                }

                ImageQualityMetrics qualityMetrics = null;
                if (root.has("quality_metrics")) {
                    JsonNode q = root.get("quality_metrics");
                    qualityMetrics = new ImageQualityMetrics(
                        q.get("width").asInt(),
                        q.get("height").asInt(),
                        q.get("laplacian_variance").asDouble(),
                        q.get("mean_brightness").asDouble(),
                        q.get("acceptable").asBoolean(),
                        q.has("rejection_reason") && !q.get("rejection_reason").isNull()
                            ? q.get("rejection_reason").asText() : null
                    );
                }

                return Optional.of(new SidecarResponse(
                    new OnnxDiseaseClassifier.ClassificationOutput(pred, conf, abst, reason, probs, engine),
                    qualityMetrics
                ));
            }
        } catch (Exception e) {
            log.warn("Python sidecar query failed: {}. Reverting to local embedded inference.", e.getMessage());
        }
        return Optional.empty();
    }

    public Optional<OnnxDiseaseClassifier.ClassificationOutput> classifyViaSidecar(byte[] imageBytes, String declaredCrop) {
        return classifyFullViaSidecar(imageBytes, declaredCrop).map(SidecarResponse::classification);
    }

    private byte[] buildMultipart(byte[] imageBytes, String crop, String boundary) throws Exception {
        var baos = new java.io.ByteArrayOutputStream();
        String lineEnd = "\r\n";

        if (crop != null && !crop.isBlank()) {
            baos.write(("--" + boundary + lineEnd).getBytes(StandardCharsets.UTF_8));
            baos.write(("Content-Disposition: form-data; name=\"crop\"" + lineEnd + lineEnd).getBytes(StandardCharsets.UTF_8));
            baos.write((crop + lineEnd).getBytes(StandardCharsets.UTF_8));
        }

        baos.write(("--" + boundary + lineEnd).getBytes(StandardCharsets.UTF_8));
        baos.write(("Content-Disposition: form-data; name=\"file\"; filename=\"leaf.img\"" + lineEnd).getBytes(StandardCharsets.UTF_8));
        baos.write(("Content-Type: application/octet-stream" + lineEnd + lineEnd).getBytes(StandardCharsets.UTF_8));
        baos.write(imageBytes);
        baos.write(lineEnd.getBytes(StandardCharsets.UTF_8));

        baos.write(("--" + boundary + "--" + lineEnd).getBytes(StandardCharsets.UTF_8));
        return baos.toByteArray();
    }
}
