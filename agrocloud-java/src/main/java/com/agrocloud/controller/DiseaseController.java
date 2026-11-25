package com.agrocloud.controller;

import com.agrocloud.audit.ProvenanceAuditService;
import com.agrocloud.disease.DiseaseScreeningService;
import com.agrocloud.model.DiseaseScreeningResult;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/disease")
@CrossOrigin(origins = "*")
public class DiseaseController {

    private final DiseaseScreeningService screeningService;
    private final ProvenanceAuditService auditService;

    public DiseaseController(
        DiseaseScreeningService screeningService,
        ProvenanceAuditService auditService
    ) {
        this.screeningService = screeningService;
        this.auditService = auditService;
    }

    @PostMapping(value = "/screen", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> screenLeaf(
        @RequestParam("file") MultipartFile file,
        @RequestParam(value = "crop", required = false) String crop
    ) throws IOException {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "No image file provided. Please select a tomato or potato leaf photo."
            ));
        }

        byte[] bytes = file.getBytes();
        DiseaseScreeningResult result = screeningService.screenLeaf(bytes, crop);

        auditService.logDiseaseScreening(
            bytes,
            crop,
            result.predictedClass(),
            result.calibratedConfidence(),
            result.abstained(),
            result.abstainReason(),
            result.provenance().getOrDefault("model_version", "v1.1.0").toString(),
            ((Number) result.provenance().getOrDefault("inference_latency_ms", 0L)).longValue()
        );

        return ResponseEntity.ok(result);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleBadImage(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(Map.of(
            "error", ex.getMessage(),
            "abstained", true,
            "guidanceSummary", ex.getMessage()
        ));
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Map<String, Object>> handleTooLarge(MaxUploadSizeExceededException ex) {
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body(Map.of(
            "error", "Uploaded image exceeds the 20 MB maximum size limit. Please upload a smaller image."
        ));
    }
}
