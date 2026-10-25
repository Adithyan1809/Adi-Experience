const fs = require('fs');
const path = require('path');

// Fix lamejs browser globals in Node.js
const jsDir = path.join(__dirname, '..', 'node_modules', 'lamejs', 'src', 'js');
fs.readdirSync(jsDir).forEach(f => {
  if (f.endsWith('.js') && f !== 'index.js') {
    const m = f.replace('.js', '');
    try {
      global[m] = require(path.resolve(jsDir, f));
    } catch (e) {
      // ignore circular/deferred
    }
  }
});
const lamejs = require('lamejs');

const sampleRate = 44100;
const totalDuration = 24; // 24 seconds (seamless 4-chord progression)
const numSamples = sampleRate * totalDuration;

const left = new Float32Array(numSamples);
const right = new Float32Array(numSamples);

// Chords progression (timing in seconds, notes with frequency, start delay, pan, volume)
// Key of F / D minor: warm, gentle, contemplative
const chordProgression = [
  // Chord 1: Fmaj9 (0 to 6s)
  {
    start: 0.0,
    notes: [
      { f: 87.31, delay: 0.0, pan: 0.0, vol: 0.28, decay: 4.5 },   // F2 bass
      { f: 174.61, delay: 0.08, pan: -0.2, vol: 0.22, decay: 3.8 }, // F3
      { f: 261.63, delay: 0.22, pan: 0.2, vol: 0.18, decay: 3.5 },  // C4
      { f: 329.63, delay: 0.45, pan: -0.3, vol: 0.16, decay: 3.2 }, // E4
      { f: 392.00, delay: 0.90, pan: 0.3, vol: 0.15, decay: 3.0 },  // G4
      { f: 261.63, delay: 2.40, pan: 0.1, vol: 0.12, decay: 2.5 },
      { f: 329.63, delay: 3.60, pan: -0.15, vol: 0.11, decay: 2.2 }
    ]
  },
  // Chord 2: Am7 (6 to 12s)
  {
    start: 6.0,
    notes: [
      { f: 110.00, delay: 0.0, pan: 0.0, vol: 0.26, decay: 4.5 },   // A2 bass
      { f: 164.81, delay: 0.08, pan: 0.2, vol: 0.20, decay: 3.8 },  // E3
      { f: 261.63, delay: 0.25, pan: -0.2, vol: 0.18, decay: 3.5 }, // C4
      { f: 329.63, delay: 0.50, pan: 0.25, vol: 0.16, decay: 3.2 }, // E4
      { f: 493.88, delay: 1.10, pan: -0.25, vol: 0.13, decay: 2.8 },// B4
      { f: 392.00, delay: 2.50, pan: -0.1, vol: 0.11, decay: 2.5 },
      { f: 261.63, delay: 3.80, pan: 0.15, vol: 0.10, decay: 2.0 }
    ]
  },
  // Chord 3: Dm9 (12 to 18s)
  {
    start: 12.0,
    notes: [
      { f: 73.42, delay: 0.0, pan: 0.0, vol: 0.28, decay: 4.8 },    // D2 bass
      { f: 146.83, delay: 0.08, pan: -0.2, vol: 0.22, decay: 3.8 }, // D3
      { f: 220.00, delay: 0.20, pan: 0.2, vol: 0.18, decay: 3.5 },  // A3
      { f: 349.23, delay: 0.48, pan: -0.3, vol: 0.16, decay: 3.2 }, // F4
      { f: 440.00, delay: 0.95, pan: 0.3, vol: 0.14, decay: 2.9 },  // A4
      { f: 329.63, delay: 2.30, pan: 0.1, vol: 0.11, decay: 2.4 },
      { f: 220.00, delay: 3.50, pan: -0.15, vol: 0.10, decay: 2.0 }
    ]
  },
  // Chord 4: Cadd9 (18 to 24s)
  {
    start: 18.0,
    notes: [
      { f: 65.41, delay: 0.0, pan: 0.0, vol: 0.28, decay: 4.8 },    // C2 bass
      { f: 130.81, delay: 0.08, pan: 0.2, vol: 0.22, decay: 3.8 },  // C3
      { f: 196.00, delay: 0.22, pan: -0.2, vol: 0.18, decay: 3.5 }, // G3
      { f: 293.66, delay: 0.50, pan: 0.25, vol: 0.16, decay: 3.2 }, // D4
      { f: 329.63, delay: 1.00, pan: -0.25, vol: 0.15, decay: 3.0 },// E4
      { f: 293.66, delay: 2.40, pan: -0.1, vol: 0.12, decay: 2.5 },
      { f: 261.63, delay: 3.60, pan: 0.15, vol: 0.11, decay: 2.2 }
    ]
  }
];

// Synthesize each note with warm acoustic harmonics
chordProgression.forEach(chord => {
  chord.notes.forEach(note => {
    const noteStartSample = Math.floor((chord.start + note.delay) * sampleRate);
    const noteDurationSamples = Math.floor(note.decay * 1.5 * sampleRate);

    for (let i = 0; i < noteDurationSamples; i++) {
      const sampleIdx = (noteStartSample + i) % numSamples;
      const t = i / sampleRate;

      // Amplitude envelope: gentle 15ms attack + exponential decay
      const attack = Math.min(1.0, t / 0.015);
      const decay = Math.exp(-t / note.decay);
      const env = attack * decay;

      if (env < 0.0001) continue;

      // Soft harmonic spectrum: fundamental + gentle 2nd, 3rd, 4th harmonics
      const phase = 2 * Math.PI * note.f * t;
      let val = Math.sin(phase) * 1.0;
      val += Math.sin(phase * 2) * 0.32 * Math.exp(-t / (note.decay * 0.6));
      val += Math.sin(phase * 3) * 0.14 * Math.exp(-t / (note.decay * 0.4));
      val += Math.sin(phase * 4) * 0.05 * Math.exp(-t / (note.decay * 0.3));

      const sampleVal = val * env * note.vol * 0.35;

      // Panning
      const pan = Math.max(-1, Math.min(1, note.pan));
      const leftGain = Math.cos((pan + 1) * Math.PI / 4);
      const rightGain = Math.sin((pan + 1) * Math.PI / 4);

      left[sampleIdx] += sampleVal * leftGain;
      right[sampleIdx] += sampleVal * rightGain;
    }
  });
});

// Soft ambient background warmth (subtle drone)
for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  const drone = (Math.sin(2 * Math.PI * 87.31 * t) * 0.012 + Math.sin(2 * Math.PI * 130.81 * t) * 0.008);
  left[i] += drone;
  right[i] += drone;
}

// Seamless crossfade: blend the last 1.5s smoothly into the start
const crossfadeSamples = Math.floor(1.5 * sampleRate);
for (let i = 0; i < crossfadeSamples; i++) {
  const progress = i / crossfadeSamples;
  const endIdx = numSamples - crossfadeSamples + i;
  const startIdx = i;

  const endWeight = 1 - progress;
  const startWeight = progress;

  const blendedL = left[startIdx] * startWeight + left[endIdx] * endWeight;
  const blendedR = right[startIdx] * startWeight + right[endIdx] * endWeight;

  left[startIdx] = blendedL;
  right[startIdx] = blendedR;
}

// Convert Float32 to Int16
const leftInt16 = new Int16Array(numSamples);
const rightInt16 = new Int16Array(numSamples);

let peak = 0.001;
for (let i = 0; i < numSamples; i++) {
  if (Math.abs(left[i]) > peak) peak = Math.abs(left[i]);
  if (Math.abs(right[i]) > peak) peak = Math.abs(right[i]);
}

const normFactor = 0.82 / peak;
for (let i = 0; i < numSamples; i++) {
  leftInt16[i] = Math.max(-32767, Math.min(32767, Math.round(left[i] * normFactor * 32767)));
  rightInt16[i] = Math.max(-32767, Math.min(32767, Math.round(right[i] * normFactor * 32767)));
}

// Encode to MP3 via lamejs
const mp3Encoder = new lamejs.Mp3Encoder(2, sampleRate, 128);
const sampleBlockSize = 1152;
const mp3Data = [];

for (let i = 0; i < numSamples; i += sampleBlockSize) {
  const leftChunk = leftInt16.subarray(i, i + sampleBlockSize);
  const rightChunk = rightInt16.subarray(i, i + sampleBlockSize);
  const mp3buf = mp3Encoder.encodeBuffer(leftChunk, rightChunk);
  if (mp3buf.length > 0) {
    mp3Data.push(Buffer.from(mp3buf));
  }
}

const endBuf = mp3Encoder.flush();
if (endBuf.length > 0) {
  mp3Data.push(Buffer.from(endBuf));
}

const finalBuffer = Buffer.concat(mp3Data);
const targetDir = path.join(__dirname, '..', 'public', 'audio');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}
const outputPath = path.join(targetDir, 'adi-theme.mp3');
fs.writeFileSync(outputPath, finalBuffer);

console.log(`Generated soundtrack: ${outputPath} (${(finalBuffer.length / 1024).toFixed(1)} KB, ${totalDuration}s loop)`);
