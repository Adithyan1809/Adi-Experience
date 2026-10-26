# Audio Soundtrack Documentation

## Track Information
- **Title**: *The Adi Experience — Ambient Theme*
- **File**: `public/audio/adi-theme.mp3`
- **Format**: MP3 Stereo, 44.1 kHz, 128 kbps, 24-second seamless loop
- **Instrumentation**: Algorithmically synthesized harmonic chord tones (Fmaj9 → Am7 → Dm9 → Cadd9) with soft exponential decay, gentle stereo panning, and subtle low-end resonance.
- **Vibe**: Calming, warm, understated, and contemplative.
- **License**: **Creative Commons Zero (CC0 1.0 Universal) / Public Domain Dedication**.
  - 100% original composition programmatically synthesized via script without third-party samples.
  - Royalty-free, commercial-use allowed, no copyright claims, no external attribution required.

---

## How to Replace with Your Own Music

If you'd like to replace this with your own track (e.g. an acoustic guitar or piano piece you recorded, or a royalty-free track you licensed):

1. Export your audio as an MP3 file (recommended 128 kbps or 192 kbps stereo).
2. Save it directly to:
   ```text
   public/audio/adi-theme.mp3
   ```
3. Update this `README.md` with the track name, artist/creator, and license/permission details.

The website's `MusicPlayer` component automatically detects and loads `public/audio/adi-theme.mp3` with graceful autoplay detection, volume control, and fallback handling.
