package com.agrocloud;

import com.agrocloud.disease.DiseaseScreeningService;
import com.agrocloud.disease.ImageValidator;
import com.agrocloud.disease.IpmAdvisoryProvider;
import com.agrocloud.disease.OnnxDiseaseClassifier;
import com.agrocloud.disease.PythonSidecarClient;
import com.agrocloud.model.DiseaseScreeningResult;
import org.junit.jupiter.api.Test;

import javax.imageio.ImageIO;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Verifies embedded ONNX model loading (IR v9), multi-class crop-scoped inference,
 * high-res phone photo blur scaling, soil-background resistance, and non-leaf abstention.
 */
public class OnnxDiseaseClassifierTest {

    private byte[] toJpegBytes(BufferedImage img) throws Exception {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(img, "jpg", baos);
        return baos.toByteArray();
    }

    @Test
    void testOnnxModelLoadsAndScreensHealthyAndBlightLeaves() throws Exception {
        OnnxDiseaseClassifier classifier = new OnnxDiseaseClassifier(0.70, 0.15, "v1.1.0");
        assertTrue(classifier.isModelLoaded(), "IR v9 ONNX model should load cleanly in Java ORT");

        // 1. Healthy tomato leaf centered on brown soil background (textured leaf so blur gate passes)
        BufferedImage healthyOnSoil = new BufferedImage(320, 320, BufferedImage.TYPE_INT_RGB);
        Graphics2D g1 = healthyOnSoil.createGraphics();
        g1.setColor(new Color(115, 92, 75));
        g1.fillRect(0, 0, 320, 320);
        g1.setColor(new Color(45, 135, 45));
        g1.fillOval(45, 35, 220, 240);
        g1.setColor(new Color(60, 155, 55));
        for (int y = 60; y < 250; y += 16) g1.drawLine(70, y, 240, y + 6);
        g1.dispose();

        var healthyRes = classifier.classify(healthyOnSoil, "tomato");
        assertEquals("Tomato___Healthy", healthyRes.predictedClass());
        assertFalse(healthyRes.abstained());
        assertTrue(healthyRes.confidence() >= 0.70);
        assertEquals("Embedded_ONNX_Java", healthyRes.executionEngine());
        // Crop masking should keep all returned class probabilities scoped to Tomato
        assertTrue(healthyRes.allProbabilities().keySet().stream().allMatch(k -> k.startsWith("Tomato___")));

        // 2. Potato Early Blight (brown target lesions with yellow halos)
        BufferedImage earlyBlight = new BufferedImage(320, 320, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2 = earlyBlight.createGraphics();
        g2.setColor(new Color(45, 135, 45));
        g2.fillRect(0, 0, 320, 320);
        int[][] centers = {{90, 90}, {200, 110}, {130, 210}, {225, 215}};
        for (int[] c : centers) {
            g2.setColor(new Color(195, 180, 35));
            g2.fillOval(c[0] - 32, c[1] - 32, 64, 64);
            g2.setColor(new Color(135, 65, 30));
            g2.fillOval(c[0] - 20, c[1] - 20, 40, 40);
        }
        g2.dispose();

        var potatoEbRes = classifier.classify(earlyBlight, "potato");
        assertEquals("Potato___Early_Blight", potatoEbRes.predictedClass());
        assertFalse(potatoEbRes.abstained());
        assertTrue(potatoEbRes.allProbabilities().keySet().stream().allMatch(k -> k.startsWith("Potato___")));
    }

    @Test
    void testNonLeafImageExplicitlyAbstains() {
        OnnxDiseaseClassifier classifier = new OnnxDiseaseClassifier(0.70, 0.15, "v1.1.0");
        BufferedImage pureSoil = new BufferedImage(300, 300, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = pureSoil.createGraphics();
        g.setColor(new Color(115, 92, 75));
        g.fillRect(0, 0, 300, 300);
        g.dispose();

        var res = classifier.classify(pureSoil, "tomato");
        assertTrue(res.abstained(), "Non-leaf brown soil image must abstain instead of predicting Early Blight");
        assertEquals("Unclassifiable_No_Foliage", res.predictedClass());
    }

    @Test
    void testHighResLeafPhotoEndToEndScreening() throws Exception {
        ImageValidator validator = new ImageValidator(4.0, 25.0, 230.0);
        OnnxDiseaseClassifier classifier = new OnnxDiseaseClassifier(0.70, 0.15, "v1.1.0");
        DiseaseScreeningService service = new DiseaseScreeningService(
            validator, classifier, new PythonSidecarClient("http://127.0.0.1:59999"),
            new IpmAdvisoryProvider(), true, "v1.1.0"
        );

        // Simulated sharp high-res 1600x1200 mobile leaf image
        BufferedImage hiResLeaf = new BufferedImage(1600, 1200, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = hiResLeaf.createGraphics();
        g.setColor(new Color(45, 138, 42));
        g.fillRect(0, 0, 1600, 1200);
        g.setColor(new Color(70, 165, 65));
        for (int y = 100; y < 1100; y += 60) {
            g.fillRect(200, y, 1200, 12);
        }
        g.dispose();

        DiseaseScreeningResult res = service.screenLeaf(toJpegBytes(hiResLeaf), "tomato");
        assertTrue(res.qualityMetrics().isAcceptableQuality(), "High-res sharp leaf photo should pass normalized blur check");
        assertEquals(1600, res.qualityMetrics().width());
        assertEquals("Tomato___Healthy", res.predictedClass());
        assertFalse(res.abstained());
    }
}
