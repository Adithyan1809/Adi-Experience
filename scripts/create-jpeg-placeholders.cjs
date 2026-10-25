const fs = require('fs');
const path = require('path');
const jpeg = require('jpeg-js');

const targetDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const imagesToCreate = [
  { name: 'hero.jpg', width: 800, height: 1000, theme: 'hero' },
  { name: 'lifestyle-1.jpg', width: 600, height: 800, theme: 'everyday' },
  { name: 'lifestyle-2.jpg', width: 600, height: 600, theme: 'gym' },
  { name: 'lifestyle-3.jpg', width: 800, height: 600, theme: 'cafe' },
  { name: 'lifestyle-4.jpg', width: 800, height: 500, theme: 'explore' },
  { name: 'lifestyle-5.jpg', width: 600, height: 800, theme: 'style' },
  { name: 'lifestyle-6.jpg', width: 600, height: 600, theme: 'sunset' },
  { name: 'og-image.jpg', width: 1200, height: 630, theme: 'og' }
];

function generateImage({ width, height, theme }) {
  const frameData = Buffer.alloc(width * height * 4);

  // Colors
  // Obsidian: 23, 23, 23
  // Charcoal: 34, 34, 34
  // Terracotta: 166, 75, 66
  // Warm Ivory: 242, 235, 221
  // Stone: 140, 139, 131

  const cx = width / 2;
  const cy = height / 2;
  const maxDist = Math.sqrt(cx * cx + cy * cy);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      // Distance from center
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const normDist = dist / maxDist;

      // Base gradient: obsidian to deep charcoal
      let r = 24 + (1 - normDist) * 16;
      let g = 24 + (1 - normDist) * 14;
      let b = 26 + (1 - normDist) * 14;

      // Add theme specific subtle tint
      if (theme === 'hero') {
        // Soft warm center spotlight
        const spot = Math.max(0, 1 - (dist / (width * 0.45)));
        r += spot * 25;
        g += spot * 15;
        b += spot * 10;
      } else if (theme === 'sunset') {
        // Terracotta sunset gradient at bottom
        const yNorm = y / height;
        r += yNorm * 38;
        g += yNorm * 14;
        b += yNorm * 12;
      } else if (theme === 'cafe') {
        // Warm amber coffee tones
        const spot = Math.max(0, 1 - (dist / (width * 0.5)));
        r += spot * 30;
        g += spot * 18;
        b += spot * 8;
      } else if (theme === 'gym') {
        // Cool stone contrast
        const spot = Math.max(0, 1 - (dist / (width * 0.5)));
        r += spot * 15;
        g += spot * 16;
        b += spot * 20;
      }

      // Border framing rule (fine hairline border 24px inset)
      const inset = Math.min(width, height) * 0.05;
      const isBorder = (
        (Math.abs(x - inset) < 1 && y >= inset && y <= height - inset) ||
        (Math.abs(x - (width - inset)) < 1 && y >= inset && y <= height - inset) ||
        (Math.abs(y - inset) < 1 && x >= inset && x <= width - inset) ||
        (Math.abs(y - (height - inset)) < 1 && x >= inset && x <= width - inset)
      );

      if (isBorder) {
        r = 180;
        g = 170;
        b = 155;
      }

      // Add film grain texture
      const noise = (Math.random() - 0.5) * 14;
      r = Math.min(255, Math.max(0, r + noise));
      g = Math.min(255, Math.max(0, g + noise));
      b = Math.min(255, Math.max(0, b + noise));

      frameData[idx] = Math.round(r);
      frameData[idx + 1] = Math.round(g);
      frameData[idx + 2] = Math.round(b);
      frameData[idx + 3] = 255;
    }
  }

  const rawImageData = {
    data: frameData,
    width,
    height
  };

  return jpeg.encode(rawImageData, 90).data;
}

imagesToCreate.forEach(img => {
  const filePath = path.join(targetDir, img.name);
  const jpegBuffer = generateImage(img);
  fs.writeFileSync(filePath, jpegBuffer);
  console.log(`Generated valid JPEG: ${img.name} (${img.width}x${img.height})`);
});

console.log('All placeholder JPEGs successfully written to public/images');
