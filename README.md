# The Adi Experience — A Cinematic Personal Website

> *"A little bit of code. A little bit of chaos."*

A distinctive, production-grade personal web experience built for **Adi (Adithyan Prakash)**, an engineering student specializing in Artificial Intelligence and Machine Learning at Dayananda Sagar Academy of Technology & Management (DSATM) in Bangalore, India.

Designed with the **"Midnight Editorial"** aesthetic: combining cinematic photography, editorial magazine layouts, modern typography (`Cormorant Garamond` serif & `Plus Jakarta Sans`), subtle romantic undertones, playful micro-interactions, an integrated ambient soundtrack, and a confident, authentic digital identity.

---

## ⚡ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion 12
- **Audio Engine**: HTML5 Audio + Web Audio API synthesizer fallback (`adi-theme.mp3`)
- **Icons**: Lucide React + Custom Inline Brand SVGs
- **Celebration Effects**: Canvas Confetti
- **Typography**: Google Fonts (*Cormorant Garamond* & *Plus Jakarta Sans*)

---

## 🚀 Quick Start

### 1. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Production Build
```bash
npm run build
```
Generates an optimized static production bundle in `dist/`.

### 3. Production Preview
```bash
npm run preview
```

---

## 📁 Project Architecture

All personal data, projects, lifestyle journal entries, audio settings, and interactive prompts are centralized in `src/data/` so you can customize your website **without modifying any React component logic**.

```text
Adi-Experience/
├── public/
│   ├── audio/
│   │   ├── adi-theme.mp3        # Seamless royalty-free ambient loop (CC0 original)
│   │   └── README.md            # Track specifications and audio license notes
│   └── images/
│       ├── hero.jpg             # Hero portrait (800x1000)
│       ├── lifestyle-1.jpg      # Everyday cadence / candid workspace (600x800)
│       ├── lifestyle-2.jpg      # Fitness & gym training (600x600)
│       ├── lifestyle-3.jpg      # Cafés & coffee (800x600)
│       ├── lifestyle-4.jpg      # Bangalore exploration (800x500)
│       ├── lifestyle-5.jpg      # Personal style & fit (600x800)
│       ├── lifestyle-6.jpg      # Sunset & golden hour (600x600)
│       └── og-image.jpg         # Open Graph social share card (1200x630)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Sticky navigation with monogram, scroll spy & direct CTA
│   │   ├── Hero.tsx             # Full-screen editorial opening, CTAs & integrated Music Player
│   │   ├── MusicPlayer.tsx      # Ambient soundtrack controller with equalizer & volume slider
│   │   ├── About.tsx            # Beyond the LinkedIn profile story, focus areas & IEEE research
│   │   ├── LifestyleGallery.tsx # Magazine collage with interactive lightbox & intentional fallback
│   │   ├── CurrentlyMe.tsx      # Live bandwidth: Building, Learning, Fitness (5 km goal), Next
│   │   ├── Projects.tsx         # Honest engineering stories (WellNest, ResumePilot, IRIS)
│   │   ├── Personality.tsx      # "Important questions. Low stakes." interactive accordion
│   │   ├── AdventureSelector.tsx# "Which version of me are we meeting today?" (Curious / Chaotic / Low-Key)
│   │   ├── DateGenerator.tsx    # "Okay, hypothetically…" grounded Bangalore date ideas
│   │   ├── Contact.tsx          # "Your turn." closing section with verified links
│   │   ├── ContactModal.tsx     # Direct mailto dispatch to contact@adithyanp.me + one-click copy
│   │   ├── Footer.tsx           # Signature, dynamic year & smooth back-to-top
│   │   ├── Icons.tsx            # Clean brand SVG icons (GitHub, LinkedIn, Instagram)
│   │   └── ImageWithFallback.tsx# Editorial artwork placeholder plate or genuine photo loader
│   ├── data/
│   │   ├── personal.ts          # Bio, college, facts, currently me, personality, adventures & music config
│   │   ├── projects.ts          # Technical projects with verified problems, challenges & tags
│   │   ├── dateIdeas.ts         # First date generator options grounded in Bangalore
│   │   └── lifestyle.ts         # Journal captions, categories & hasRealPhoto flags
│   ├── types/
│   │   └── index.ts             # TypeScript interface definitions
│   ├── App.tsx                  # Main layout container
│   ├── main.tsx                 # React entry point
│   └── index.css                # Tailwind imports, film grain, accessibility & custom scrollbars
├── index.html                   # SEO tags, Open Graph metadata & typography
├── tailwind.config.js           # Midnight Editorial theme palette
└── tsconfig.json                # TypeScript configuration
```

---

## 🎵 Ambient Background Music System

The website includes a dedicated editorial background soundtrack (`adi-theme.mp3`) located in `public/audio/`.

- **Sound Profile**: A warm, mellow acoustic ambient loop (Fmaj9 → Am7 → Dm9 → Cadd9) composed at 68 BPM.
- **License**: 100% Royalty-Free / Public Domain (CC0).
- **Controls**:
  - Play / Pause toggle.
  - Interactive live-animating 4-bar equalizer indicator.
  - Hover / click volume slider (`0%` to `100%`).
  - Browser-native autoplay policy detection: If the browser blocks auto-playback on first load, an unobtrusive `"Enable sound"` cue appears in the Hero without interrupting the user.
  - Preferences (playing state, volume, muted) persist in browser `localStorage`.
- **How to Replace the Track**:
  Drop any `.mp3` file into `public/audio/adi-theme.mp3` or update the file path in `src/data/personal.ts`:
  ```typescript
  musicConfig: {
    enabled: true,
    audioSrc: '/audio/adi-theme.mp3',
    title: 'Midnight Resonance',
    artist: 'Adi',
    defaultVolume: 0.25,
    autoPlay: true,
  }
  ```

---

## 🖼️ How to Replace Photos & Assets

The site uses a dual-state image system. Until you provide genuine photos, it displays **tailored editorial film-plates with typography, lens markings, and monograms** rather than broken images or low-res placeholders.

### When You Have Your Real Photos Ready:
1. Place your JPEG/PNG files in `/public/images/`:

| File Path | Recommended Ratio | Description |
| :--- | :--- | :--- |
| `public/images/hero.jpg` | 3:4 or 4:5 portrait | Your primary hero portrait |
| `public/images/lifestyle-1.jpg` | 3:4 portrait | Everyday workspace, desk, candid moment |
| `public/images/lifestyle-2.jpg` | 1:1 square | Fitness, gym or training split |
| `public/images/lifestyle-3.jpg` | 4:3 landscape | Coffee shop, pour-over, café table |
| `public/images/lifestyle-4.jpg` | 16:10 landscape | Exploring Bangalore (Church St, Cubbon Park, etc.) |
| `public/images/lifestyle-5.jpg` | 3:4 portrait | Personal style, fit, understated portrait |
| `public/images/lifestyle-6.jpg` | 1:1 square | Sunset sky, dusk view, golden hour moment |
| `public/images/og-image.jpg` | 1.91:1 (1200x630) | Open Graph preview card for social links (already generated) |

2. Flip `hasRealPhoto: true` in your data files:
   - For the hero portrait, in `src/data/personal.ts`:
     ```typescript
     heroPhoto: {
       url: '/images/hero.jpg',
       caption: 'Bangalore dusk, caught between classes.',
       alt: 'Portrait of Adi in Bangalore',
       hasRealPhoto: true, // ← Flip to true
     }
     ```
   - For lifestyle gallery photos, in `src/data/lifestyle.ts`:
     ```typescript
     {
       id: 'desk-and-terminal',
       imageUrl: '/images/lifestyle-1.jpg',
       hasRealPhoto: true, // ← Flip to true
       ...
     }
     ```

---

## ✍️ How to Personalize Your Content

### 1. Social Links & Contact Details
Open [`src/data/personal.ts`](file:///c:/Users/HP/Desktop/Adi-Experience/src/data/personal.ts):
```typescript
export const personalInfo = {
  links: {
    website: 'https://www.adithyanp.me/',
    github: 'https://github.com/Adithyan1809',
    linkedin: 'https://www.linkedin.com/in/adithyan-prakash/',
    instagram: '', // ← Add your Instagram profile URL when ready
    email: 'contact@adithyanp.me',
  }
};
```
*(If `instagram` is left empty `''`, the website gracefully hides the Instagram button and links your verified LinkedIn and GitHub profiles.)*

### 2. Fast Dossier & Quick Facts
In [`src/data/personal.ts`](file:///c:/Users/HP/Desktop/Adi-Experience/src/data/personal.ts), edit the `aboutData.facts` array to customize your morning ritual, fuel of choice, or weekend mode.

### 3. Currently Me Status
In [`src/data/personal.ts`](file:///c:/Users/HP/Desktop/Adi-Experience/src/data/personal.ts), update `currentlyItems` whenever what you're learning, building, or your fitness milestones shift (currently set to your genuine goal: working toward running 5 km continuously).

### 4. Hypothetical Date Ideas
In [`src/data/dateIdeas.ts`](file:///c:/Users/HP/Desktop/Adi-Experience/src/data/dateIdeas.ts), add, remove, or modify date options, vibes, and Bangalore locations (Blossom Book House, Cubbon Park, New Café Test, Arcade Game Night, Street Food Trail, Rooftop Sunset).

### 5. Projects & Stories
In [`src/data/projects.ts`](file:///c:/Users/HP/Desktop/Adi-Experience/src/data/projects.ts), update descriptions, stories, tech tags, or add live demo URLs when available (includes verified stories for WellNest, ResumePilot, and Project IRIS).

---

## 🎨 Color Palette Reference ("Midnight Editorial")

- **Obsidian**: `#171717` — Deep cinematic canvas
- **Warm Ivory**: `#F2EBDD` — Editorial serif headlines & accents
- **Muted Terracotta**: `#A64B42` — Focal highlights & interaction cues
- **Stone Gray**: `#8C8B83` — Metadata, captions & subtle dividers
- **Deep Charcoal**: `#222222` — Elevated surface cards & containers

---

## ♿ Accessibility & Performance Standards

- Fully responsive from mobile devices (`360px+`) to ultra-wide displays
- High contrast compliant typography
- Native keyboard navigation and visible focus rings
- Modal escape listener with background scroll locking
- Automatic reduction of motion for visitors with `prefers-reduced-motion` enabled
- Zero console warnings or broken asset calls
- Clean static production bundle tested with `tsc && vite build`
