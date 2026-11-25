package com.agrocloud;

import com.agrocloud.disease.ImageValidator;
import org.junit.jupiter.api.Test;

import javax.imageio.ImageIO;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;

import static org.junit.jupiter.api.Assertions.*;

public class ImageValidatorTest {

    private final ImageValidator validator = new ImageValidator(80.0, 25.0, 230.0);

    private byte[] toJpegBytes(BufferedImage img) throws Exception {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(img, "jpg", baos);
        return baos.toByteArray();
    }

    @Test
    void testLowResolutionRejected() throws Exception {
        BufferedImage small = new BufferedImage(100, 100, BufferedImage.TYPE_INT_RGB);
        byte[] bytes = toJpegBytes(small);

        var res = validator.validate(bytes);
        assertFalse(res.metrics().isAcceptableQuality());
        assertTrue(res.metrics().rejectionReason().contains("Resolution is too low"));
    }

    @Test
    void testExtremeDarkImageRejected() throws Exception {
        BufferedImage dark = new BufferedImage(256, 256, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = dark.createGraphics();
        g.setColor(new Color(10, 10, 10)); // Brightness 10 < 25
        g.fillRect(0, 0, 256, 256);
        g.dispose();

        byte[] bytes = toJpegBytes(dark);
        var res = validator.validate(bytes);
        assertFalse(res.metrics().isAcceptableQuality());
        assertTrue(res.metrics().rejectionReason().contains("underexposed"));
    }

    @Test
    void testBlurryFlatImageRejected() throws Exception {
        // Flat gray image has zero Laplacian variance (completely blurry / no edges)
        BufferedImage flat = new BufferedImage(256, 256, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = flat.createGraphics();
        g.setColor(new Color(128, 128, 128));
        g.fillRect(0, 0, 256, 256);
        g.dispose();

        byte[] bytes = toJpegBytes(flat);
        var res = validator.validate(bytes);
        assertFalse(res.metrics().isAcceptableQuality());
        assertTrue(res.metrics().rejectionReason().contains("blurry"));
    }

    @Test
    void testSharpHighContrastImageAccepted() throws Exception {
        // High frequency pattern with high Laplacian variance
        BufferedImage sharp = new BufferedImage(256, 256, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = sharp.createGraphics();
        g.setColor(new Color(140, 140, 140));
        g.fillRect(0, 0, 256, 256);
        g.setColor(new Color(40, 180, 40));
        for (int i = 0; i < 256; i += 8) {
            g.drawLine(i, 0, i, 256);
            g.drawLine(0, i, 256, i);
        }
        g.dispose();

        byte[] bytes = toJpegBytes(sharp);
        var res = validator.validate(bytes);
        assertTrue(res.metrics().isAcceptableQuality());
        assertNull(res.metrics().rejectionReason());
        assertTrue(res.metrics().laplacianVariance() >= 80.0);
    }
}

