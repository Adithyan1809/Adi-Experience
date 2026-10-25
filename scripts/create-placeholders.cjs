// Generates base placeholder images with a minimal valid JPEG format and companion SVGs
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Generate companion SVGs that can also be used directly
const images = [
  { name: 'hero', title: 'Adi — Editorial Portrait', subtitle: 'Bangalore, India // Midnight Editorial' },
  { name: 'lifestyle-1', title: 'Everyday Cadence', subtitle: 'Workspace & Quiet Focus' },
  { name: 'lifestyle-2', title: 'Physical Discipline', subtitle: 'Strength, Habit & Clarity' },
  { name: 'lifestyle-3', title: 'Specialty Cafés', subtitle: 'Iced Pour-Overs & Indiranagar' },
  { name: 'lifestyle-4', title: 'Exploring Bangalore', subtitle: 'Church St. & Cubbon Canopy' },
  { name: 'lifestyle-5', title: 'Personal Style', subtitle: 'Muted Earth Tones & Clean Lines' },
  { name: 'lifestyle-6', title: 'Dusk & Acoustics', subtitle: 'Golden Hour Reflections' }
];

images.forEach(img => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <defs>
    <linearGradient id="bg-${img.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1f1f1f"/>
      <stop offset="50%" stop-color="#171717"/>
      <stop offset="100%" stop-color="#121212"/>
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0"/>
    </filter>
  </defs>
  <rect width="800" height="1000" fill="url(#bg-${img.name})"/>
  <rect width="800" height="1000" filter="url(#grain)"/>
  
  <!-- Subtle Editorial Framing -->
  <rect x="30" y="30" width="740" height="940" fill="none" stroke="#F2EBDD" stroke-opacity="0.12" stroke-width="1"/>
  <circle cx="400" cy="420" r="140" fill="none" stroke="#A64B42" stroke-opacity="0.25" stroke-width="1" stroke-dasharray="4 6"/>
  
  <!-- Crosshairs -->
  <path d="M 40 40 L 60 40 M 40 40 L 40 60" stroke="#F2EBDD" stroke-opacity="0.4" stroke-width="1"/>
  <path d="M 760 40 L 740 40 M 760 40 L 760 60" stroke="#F2EBDD" stroke-opacity="0.4" stroke-width="1"/>
  <path d="M 40 960 L 60 960 M 40 960 L 40 940" stroke="#F2EBDD" stroke-opacity="0.4" stroke-width="1"/>
  <path d="M 760 960 L 740 960 M 760 960 L 760 940" stroke="#F2EBDD" stroke-opacity="0.4" stroke-width="1"/>
  
  <!-- Center monogram / typography -->
  <text x="400" y="440" font-family="Georgia, serif" font-size="72" font-style="italic" fill="#F2EBDD" fill-opacity="0.85" text-anchor="middle">A</text>
  
  <text x="400" y="680" font-family="Georgia, serif" font-size="28" fill="#F2EBDD" text-anchor="middle" letter-spacing="1">${img.title}</text>
  <text x="400" y="720" font-family="system-ui, sans-serif" font-size="14" fill="#8C8B83" text-anchor="middle" letter-spacing="3">${img.subtitle.toUpperCase()}</text>
  <text x="400" y="760" font-family="system-ui, sans-serif" font-size="11" fill="#A64B42" text-anchor="middle" letter-spacing="2">PLACEHOLDER // REPLACE IN /public/images/${img.name}.jpg</text>
</svg>`;

  fs.writeFileSync(path.join(targetDir, `${img.name}.svg`), svg);
});

console.log('Generated placeholder SVGs in public/images');
