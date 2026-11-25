package com.agrocloud.disease;

import ai.onnxruntime.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.FloatBuffer;
import java.util.*;

/**
 * Embedded ONNX Runtime Java Disease Classifier
 * Executes ONNX model inference with foliage-presence validation, crop logit masking,
 * post-hoc temperature scaling, and selective abstention, with a spectral fallback estimator.
 */
@Component
public class OnnxDiseaseClassifier {

    private static final Logger log = LoggerFactory.getLogger(OnnxDiseaseClassifier.class);

    public static final List<String> CLASS_NAMES = List.of(
        "Tomato___Healthy",
        "Tomato___Early_Blight",
        "Tomato___Late_Blight",
        "Tomato___Septoria_Leaf_Spot",
        "Tomato___Bacterial_Spot",
        "Potato___Healthy",
        "Potato___Early_Blight",
        "Potato___Late_Blight"
    );

    private static final double MIN_FOLIAR_COVERAGE = 0.025;

    private final double abstentionThreshold;
    private final double marginThreshold;
    private final double temperature;
    private final String modelVersion;
    private final String configuredModelPath;

    private OrtEnvironment env;
    private OrtSession session;
    private boolean isModelLoaded = false;
    private String loadedModelPath = null;

    public OnnxDiseaseClassifier(
        double abstentionThreshold,
        double marginThreshold,
        String modelVersion
    ) {
        this(abstentionThreshold, marginThreshold, modelVersion, "models/solanaceae_mobilenetv3.onnx");
    }

    @Autowired
    public OnnxDiseaseClassifier(
        @Value("${agrocloud.disease.abstention-threshold:0.70}") double abstentionThreshold,
        @Value("${agrocloud.disease.margin-threshold:0.15}") double marginThreshold,
        @Value("${agrocloud.disease.model-version:v1.0.0-solanaceae-mobilenetv3}") String modelVersion,
        @Value("${agrocloud.disease.model-path:models/solanaceae_mobilenetv3.onnx}") String modelPath
    ) {
        this.abstentionThreshold = abstentionThreshold;
        this.marginThreshold = marginThreshold;
        this.temperature = 1.35;
        this.modelVersion = modelVersion;
        this.configuredModelPath = modelPath;
        initOnnxModel();
    }

    private void initOnnxModel() {
        List<String> candidates = List.of(
            configuredModelPath,
            "models/solanaceae_mobilenetv3.onnx",
            "agrocloud-java/models/solanaceae_mobilenetv3.onnx",
            "../agrocloud-java/models/solanaceae_mobilenetv3.onnx"
        );
        try {
            this.env = OrtEnvironment.getEnvironment();
            for (String path : candidates) {
                if (path == null || path.isBlank()) continue;
                File modelFile = new File(path);
                if (modelFile.exists() && modelFile.isFile()) {
                    this.session = env.createSession(modelFile.getAbsolutePath(), new OrtSession.SessionOptions());
                    this.isModelLoaded = true;
                    this.loadedModelPath = modelFile.getAbsolutePath();
                    log.info("Loaded ONNX model from {}", this.loadedModelPath);
                    return;
                }
            }
            log.warn("ONNX model file not found in candidate paths {}. Using spectral fallback classifier.", candidates);
        } catch (Exception e) {
            log.warn("Could not initialize embedded ONNX model: {}. Operating in fallback mode.", e.getMessage());
        }
    }

    public record ClassificationOutput(
        String predictedClass,
        double confidence,
        boolean abstained,
        String abstainReason,
        Map<String, Double> allProbabilities,
        String executionEngine
    ) {}

    public ClassificationOutput classify(BufferedImage image, String declaredCrop) {
        BufferedImage resized = resizeImage(image, 224, 224);

        // Guard against non-foliage photos (bare soil, walls, text, solid surfaces)
        double foliarCoverage = estimateFoliarCoverage(resized);
        if (foliarCoverage < MIN_FOLIAR_COVERAGE) {
            return new ClassificationOutput(
                "Unclassifiable_No_Foliage",
                0.0,
                true,
                String.format(Locale.US,
                    "No recognizable green leaf foliage detected (foliar coverage %.1f%% < 2.5%%). Center a tomato or potato leaf in good daylight.",
                    foliarCoverage * 100.0),
                Map.of(),
                "Foliar_Presence_Gate"
            );
        }

        if (isModelLoaded && session != null) {
            try {
                return runOnnxInference(resized, declaredCrop);
            } catch (Exception e) {
                log.warn("ONNX inference failed: {}. Using algorithmic foliar feature estimator.", e.getMessage());
            }
        }
        return runFeatureBasedEstimator(resized, declaredCrop);
    }

    private double estimateFoliarCoverage(BufferedImage img224) {
        int foliarPixels = 0;
        int total = 224 * 224;
        for (int y = 0; y < 224; y++) {
            for (int x = 0; x < 224; x++) {
                int rgb = img224.getRGB(x, y);
                int r = (rgb >> 16) & 0xFF;
                int g = (rgb >> 8) & 0xFF;
                int b = rgb & 0xFF;
                boolean greenLeaf = (g > r * 1.05 && g > b * 1.08 && g > 40);
                boolean chloroticLeaf = (g > 120 && g >= 0.80 * r && b < 0.65 * g && (g - b) > 45);
                if (greenLeaf || chloroticLeaf) {
                    foliarPixels++;
                }
            }
        }
        return (double) foliarPixels / total;
    }

    private ClassificationOutput runOnnxInference(BufferedImage resized, String declaredCrop) throws Exception {
        float[] chwData = extractNormalizedChw(resized);
        long[] shape = new long[]{1, 3, 224, 224};
        String inputName = session.getInputNames().iterator().next();

        try (OnnxTensor tensor = OnnxTensor.createTensor(env, FloatBuffer.wrap(chwData), shape);
             OrtSession.Result result = session.run(Collections.singletonMap(inputName, tensor))) {
            float[][] logits = (float[][]) result.get(0).getValue();
            return processLogits(logits[0], declaredCrop, "Embedded_ONNX_Java");
        }
    }

    private ClassificationOutput processLogits(float[] rawLogits, String declaredCrop, String engineName) {
        String cropNorm = declaredCrop == null ? "" : declaredCrop.trim().toLowerCase(Locale.ROOT);
        boolean filterTomato = cropNorm.equals("tomato");
        boolean filterPotato = cropNorm.equals("potato");

        List<Integer> activeIndices = new ArrayList<>();
        for (int i = 0; i < CLASS_NAMES.size(); i++) {
            String name = CLASS_NAMES.get(i);
            if (filterTomato && !name.startsWith("Tomato___")) continue;
            if (filterPotato && !name.startsWith("Potato___")) continue;
            activeIndices.add(i);
        }
        if (activeIndices.isEmpty()) {
            for (int i = 0; i < CLASS_NAMES.size(); i++) activeIndices.add(i);
        }

        double maxLogit = Double.NEGATIVE_INFINITY;
        for (int idx : activeIndices) {
            double scaled = rawLogits[idx] / temperature;
            if (scaled > maxLogit) maxLogit = scaled;
        }

        double sumExp = 0.0;
        double[] probs = new double[CLASS_NAMES.size()];
        for (int idx : activeIndices) {
            double e = Math.exp((rawLogits[idx] / temperature) - maxLogit);
            probs[idx] = e;
            sumExp += e;
        }
        if (sumExp > 0.0) {
            for (int idx : activeIndices) {
                probs[idx] /= sumExp;
            }
        }

        List<Map.Entry<Integer, Double>> ranked = new ArrayList<>();
        for (int idx : activeIndices) {
            ranked.add(Map.entry(idx, probs[idx]));
        }
        ranked.sort((a, b) -> Double.compare(b.getValue(), a.getValue()));

        int top1Idx = ranked.get(0).getKey();
        double top1Prob = Math.round(ranked.get(0).getValue() * 1000.0) / 1000.0;
        double top2Prob = ranked.size() > 1 ? Math.round(ranked.get(1).getValue() * 1000.0) / 1000.0 : 0.0;
        double margin = Math.round((top1Prob - top2Prob) * 1000.0) / 1000.0;

        String predictedClass = CLASS_NAMES.get(top1Idx);

        Map<String, Double> allProbMap = new LinkedHashMap<>();
        for (var entry : ranked) {
            allProbMap.put(CLASS_NAMES.get(entry.getKey()), Math.round(entry.getValue() * 1000.0) / 1000.0);
        }

        boolean abstained = false;
        String abstainReason = null;

        if (top1Prob < abstentionThreshold) {
            abstained = true;
            abstainReason = String.format(Locale.US,
                "Confidence (%.1f%%) is below the reliable screening threshold (%.0f%%). The system abstains to avoid false certainty.",
                top1Prob * 100.0, abstentionThreshold * 100.0);
        } else if (margin < marginThreshold) {
            abstained = true;
            abstainReason = String.format(Locale.US,
                "Ambiguous screening: difference between top predictions is only %.1f%% (minimum %.0f%% required).",
                margin * 100.0, marginThreshold * 100.0);
        }

        return new ClassificationOutput(predictedClass, top1Prob, abstained, abstainReason, allProbMap, engineName);
    }

    private ClassificationOutput runFeatureBasedEstimator(BufferedImage small, String declaredCrop) {
        int greenHealthyPixels = 0;
        int yellowHaloPixels = 0;
        int brownNecroticPixels = 0;
        int darkWaterSoakedPixels = 0;
        int paleGraySpotPixels = 0;
        int edgeCount = 0;

        // First compute coarse green presence mask so non-leaf soil/table backgrounds aren't misread as lesions
        boolean[][] leafMask = new boolean[224][224];
        for (int y = 0; y < 224; y++) {
            for (int x = 0; x < 224; x++) {
                int rgb = small.getRGB(x, y);
                int r = (rgb >> 16) & 0xFF;
                int g = (rgb >> 8) & 0xFF;
                int b = rgb & 0xFF;
                if (g > 1.12 * r && g > 1.12 * b && g > 48) {
                    for (int dy = -6; dy <= 6; dy += 3) {
                        for (int dx = -6; dx <= 6; dx += 3) {
                            int ny = Math.min(223, Math.max(0, y + dy));
                            int nx = Math.min(223, Math.max(0, x + dx));
                            leafMask[ny][nx] = true;
                        }
                    }
                    leafMask[y][x] = true;
                }
            }
        }

        int foliarTotal = 0;
        int prevLum = 0;
        for (int y = 0; y < 224; y++) {
            for (int x = 0; x < 224; x++) {
                int rgb = small.getRGB(x, y);
                int r = (rgb >> 16) & 0xFF;
                int g = (rgb >> 8) & 0xFF;
                int b = rgb & 0xFF;
                int lum = (r * 3 + g * 6 + b) / 10;

                if (x > 0 && leafMask[y][x] && Math.abs(lum - prevLum) > 22) {
                    edgeCount++;
                }
                prevLum = lum;

                if (!leafMask[y][x]) continue;
                foliarTotal++;

                if (g > 1.12 * r && g > 1.12 * b && g > 48) {
                    greenHealthyPixels++;
                } else if (r > 110 && g > 105 && b < 75 && (r - b) > 40) {
                    yellowHaloPixels++;
                } else if (r > 1.12 * g && r > 1.15 * b && (r + g + b) < 390) {
                    brownNecroticPixels++;
                } else if (lum < 58 && Math.abs(r - g) < 25) {
                    darkWaterSoakedPixels++;
                } else if (b > 115 && lum > 110 && lum < 205 && Math.abs(r - g) < 28) {
                    paleGraySpotPixels++;
                }
            }
        }

        int denom = Math.max(1, foliarTotal);
        double greenRatio = (double) greenHealthyPixels / denom;
        double yellowRatio = (double) yellowHaloPixels / denom;
        double brownRatio = (double) brownNecroticPixels / denom;
        double darkRatio = (double) darkWaterSoakedPixels / denom;
        double paleRatio = (double) paleGraySpotPixels / denom;
        double speckleRatio = (double) edgeCount / denom;

        float[] rawLogits = new float[CLASS_NAMES.size()];
        // Score Tomato (0..4) & Potato (5..7)
        rawLogits[0] = (float) (greenRatio * 7.0 - (brownRatio + darkRatio) * 18.0 - yellowRatio * 8.0 + 0.5);
        rawLogits[1] = (float) (brownRatio * 18.0 + yellowRatio * 12.0 - paleRatio * 8.0);
        rawLogits[2] = (float) (darkRatio * 24.0 + brownRatio * 5.0 - speckleRatio * 12.0 - yellowRatio * 4.0);
        rawLogits[3] = (float) (paleRatio * 30.0 + speckleRatio * 14.0 + darkRatio * 4.0 - yellowRatio * 4.0);
        rawLogits[4] = (float) (speckleRatio * 15.0 + darkRatio * 12.0 + yellowRatio * 8.0 - paleRatio * 10.0);

        rawLogits[5] = rawLogits[0];
        rawLogits[6] = rawLogits[1];
        rawLogits[7] = rawLogits[2];

        return processLogits(rawLogits, declaredCrop, "Spectral_Fallback_Java");
    }

    private BufferedImage resizeImage(BufferedImage original, int targetWidth, int targetHeight) {
        BufferedImage resized = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = resized.createGraphics();
        g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g2d.drawImage(original, 0, 0, targetWidth, targetHeight, null);
        g2d.dispose();
        return resized;
    }

    private float[] extractNormalizedChw(BufferedImage img) {
        int w = img.getWidth();
        int h = img.getHeight();
        float[] chw = new float[3 * w * h];

        float[] mean = new float[]{0.485f, 0.456f, 0.406f};
        float[] std = new float[]{0.229f, 0.224f, 0.225f};

        for (int y = 0; y < h; y++) {
            for (int x = 0; x < w; x++) {
                int rgb = img.getRGB(x, y);
                float r = ((rgb >> 16) & 0xFF) / 255.0f;
                float g = ((rgb >> 8) & 0xFF) / 255.0f;
                float b = (rgb & 0xFF) / 255.0f;

                chw[0 * w * h + y * w + x] = (r - mean[0]) / std[0];
                chw[1 * w * h + y * w + x] = (g - mean[1]) / std[1];
                chw[2 * w * h + y * w + x] = (b - mean[2]) / std[2];
            }
        }
        return chw;
    }

    public boolean isModelLoaded() {
        return isModelLoaded;
    }

    public String getModelVersion() {
        return modelVersion;
    }
}
