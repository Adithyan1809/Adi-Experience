const fs = require('fs');
const path = require('path');
const jpeg = require('jpeg-js');

const width = 1200;
const height = 630;
const frameData = Buffer.alloc(width * height * 4);

// Aesthetic: Obsidian #171717 to Charcoal #222222 with subtle warm terracotta gradient
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;

    const normX = x / width;
    const normY = y / height;

    // Base obsidian background
    let r = 23;
    let g = 23;
    let b = 23;

    // Subtle warm glow in bottom-right corner (#A64B42 / Terracotta)
    const distToGlow = Math.sqrt(Math.pow(x - width * 0.85, 2) + Math.pow(y - height * 0.7, 2));
    const glow = Math.max(0, 1 - distToGlow / 500);
    r += glow * 40;
    g += glow * 15;
    b += glow * 12;

    // Subtle border framing at 32px inset
    const inset = 32;
    const isBorder = (
      ((x === inset || x === width - inset) && y >= inset && y <= height - inset) ||
      ((y === inset || y === height - inset) && x >= inset && x <= width - inset)
    );

    if (isBorder) {
      r = 90;
      g = 85;
      b = 80;
    }

    // Film grain
    const noise = (Math.random() - 0.5) * 12;
    r = Math.min(255, Math.max(0, r + noise));
    g = Math.min(255, Math.max(0, g + noise));
    b = Math.min(255, Math.max(0, b + noise));

    frameData[idx] = Math.round(r);
    frameData[idx + 1] = Math.round(g);
    frameData[idx + 2] = Math.round(b);
    frameData[idx + 3] = 255;
  }
}

const jpegBuffer = jpeg.encode({ data: frameData, width, height }, 92).data;
const targetPath = path.join(__dirname, '..', 'public', 'images', 'og-image.jpg');
fs.writeFileSync(targetPath, jpegBuffer);
console.log('Generated polished og-image.jpg');
