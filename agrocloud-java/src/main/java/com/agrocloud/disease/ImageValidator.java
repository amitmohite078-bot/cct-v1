package com.agrocloud.disease;

import com.agrocloud.model.DiseaseScreeningResult.ImageQualityMetrics;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;

/**
 * Image Quality and Blur Validation Gate
 * Normalizes oversized camera photos (max side 512px) before blur calculation
 * so Laplacian variance remains scale-consistent across phone and web cameras.
 */
@Component
public class ImageValidator {

    private static final int MAX_INSPECT_DIM = 512;

    private final double blurThreshold;
    private final double minBrightness;
    private final double maxBrightness;

    public ImageValidator(
        @Value("${agrocloud.disease.blur-laplacian-threshold:25.0}") double blurThreshold,
        @Value("${agrocloud.disease.min-brightness:25.0}") double minBrightness,
        @Value("${agrocloud.disease.max-brightness:230.0}") double maxBrightness
    ) {
        this.blurThreshold = blurThreshold;
        this.minBrightness = minBrightness;
        this.maxBrightness = maxBrightness;
    }

    public record ValidationResult(BufferedImage image, ImageQualityMetrics metrics) {}

    public ValidationResult validate(byte[] imageBytes) throws IOException {
        if (imageBytes == null || imageBytes.length == 0) {
            throw new IllegalArgumentException("Image payload is empty.");
        }

        BufferedImage img = ImageIO.read(new ByteArrayInputStream(imageBytes));
        if (img == null) {
            throw new IllegalArgumentException("Unsupported or unreadable image format. Please upload JPEG or PNG.");
        }

        int origWidth = img.getWidth();
        int origHeight = img.getHeight();

        if (origWidth < 224 || origHeight < 224) {
            ImageQualityMetrics metrics = new ImageQualityMetrics(
                origWidth, origHeight, 0.0, 0.0, false,
                "Resolution is too low (" + origWidth + "x" + origHeight + "). Minimum 224x224 pixels required."
            );
            return new ValidationResult(img, metrics);
        }

        // Normalize oversized photos (e.g. 12MP smartphone captures) to <= 512px
        // so edge gradients span ~1-2px reliably for Laplacian blur detection.
        BufferedImage evalImg = normalizeForInspection(img);
        int width = evalImg.getWidth();
        int height = evalImg.getHeight();

        int[] gray = new int[width * height];
        double sumBrightness = 0.0;
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                int rgb = evalImg.getRGB(x, y);
                int r = (rgb >> 16) & 0xFF;
                int g = (rgb >> 8) & 0xFF;
                int b = rgb & 0xFF;
                int lum = (int) (0.299 * r + 0.587 * g + 0.114 * b);
                gray[y * width + x] = lum;
                sumBrightness += lum;
            }
        }
        double meanBrightness = Math.round((sumBrightness / (width * height)) * 10.0) / 10.0;

        if (meanBrightness < minBrightness) {
            ImageQualityMetrics metrics = new ImageQualityMetrics(
                origWidth, origHeight, 0.0, meanBrightness, false,
                "Photo is underexposed/too dark (" + meanBrightness + " < " + minBrightness + "). Please retake in daylight."
            );
            return new ValidationResult(img, metrics);
        }
        if (meanBrightness > maxBrightness) {
            ImageQualityMetrics metrics = new ImageQualityMetrics(
                origWidth, origHeight, 0.0, meanBrightness, false,
                "Photo is overexposed/too bright (" + meanBrightness + " > " + maxBrightness + "). Please retake without direct harsh glare."
            );
            return new ValidationResult(img, metrics);
        }

        // 3x3 Discrete Laplacian Variance: [[0, 1, 0], [1, -4, 1], [0, 1, 0]]
        double laplacianSum = 0.0;
        double laplacianSumSq = 0.0;
        int count = (width - 2) * (height - 2);

        for (int y = 1; y < height - 1; y++) {
            for (int x = 1; x < width - 1; x++) {
                int center = gray[y * width + x];
                int top = gray[(y - 1) * width + x];
                int bottom = gray[(y + 1) * width + x];
                int left = gray[y * width + (x - 1)];
                int right = gray[y * width + (x + 1)];

                int val = top + bottom + left + right - (4 * center);
                laplacianSum += val;
                laplacianSumSq += ((double) val * val);
            }
        }

        double meanLap = laplacianSum / count;
        double lapVariance = (laplacianSumSq / count) - (meanLap * meanLap);
        lapVariance = Math.round(lapVariance * 100.0) / 100.0;

        if (lapVariance < blurThreshold) {
            ImageQualityMetrics metrics = new ImageQualityMetrics(
                origWidth, origHeight, lapVariance, meanBrightness, false,
                "Image is blurry (Laplacian variance " + lapVariance + " < " + blurThreshold + "). Hold camera steady and refocus on the leaf."
            );
            return new ValidationResult(img, metrics);
        }

        ImageQualityMetrics metrics = new ImageQualityMetrics(
            origWidth, origHeight, lapVariance, meanBrightness, true, null
        );
        return new ValidationResult(img, metrics);
    }

    private BufferedImage normalizeForInspection(BufferedImage src) {
        int w = src.getWidth();
        int h = src.getHeight();
        int maxDim = Math.max(w, h);
        if (maxDim <= MAX_INSPECT_DIM) {
            return src;
        }
        double scale = MAX_INSPECT_DIM / (double) maxDim;
        int targetW = Math.max(224, (int) Math.round(w * scale));
        int targetH = Math.max(224, (int) Math.round(h * scale));

        BufferedImage resized = new BufferedImage(targetW, targetH, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = resized.createGraphics();
        g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g2d.drawImage(src, 0, 0, targetW, targetH, null);
        g2d.dispose();
        return resized;
    }
}
