# The Adi Experience — Personal Website

> *"A little bit of code. A little bit of chaos."*

A distinctive, authentic personal web experience built for **Adi (Adithyan Prakash)**, an engineering student specializing in Artificial Intelligence and Machine Learning at Dayananda Sagar Academy of Technology & Management (DSATM) in Bangalore, India.

Designed with the **"Midnight Editorial"** aesthetic: combining cinematic photography, editorial magazine layouts, modern typography (`Cormorant Garamond` serif & `Plus Jakarta Sans`), subtle film grain, an integrated ambient soundtrack, and a confident, authentic digital identity.

---

## ⚡ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion 12
- **Audio Engine**: HTML5 Audio (`/audio/adi-theme.mp3`, CC0 original composition)
- **Icons**: Lucide React + Custom Inline Brand SVGs
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

## 📁 Architecture & Flow

All personal data, projects, lifestyle snapshots, and prompts are centralized in `src/data/` so you can customize your website **without modifying any React component logic**.

### Page Section Order:
1. **Hero** (`#hero`): Editorial opening with ambient soundtrack player, verified bio, and portrait slot.
2. **About** (`#about`): Focus areas (AI & Data Engineering, Gym & Consistency, Practical Software), IEEE research highlight, and verified dossier.
3. **Snapshots** (`#lifestyle`): Asymmetric visual log with interactive lightbox dialog and intentional fallback plates.
4. **Right Now** (`#currently`): Live bandwidth (Building prototypes, Learning data architectures, 5 km running goal, Shipping open-source).
5. **Little Things** (`#personality`): A mix of harmless quirks, curiosity rabbit holes, lifestyle preferences, and everyday observations.
6. **Projects** (`#projects`): Practical engineering stories for WellNest, Project IRIS, and ResumePilot with honest GitHub profile links.
7. **Say Hello** (`#contact`): "Your turn" closing section with verified links and a low-pressure mail client launcher.

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
│       ├── lifestyle-4.jpg      # City walk & exploration (800x500)
│       ├── lifestyle-5.jpg      # Personal style & off-duty fit (600x800)
│       ├── lifestyle-6.jpg      # Sunset & golden hour (600x600)
│       └── og-image.jpg         # Open Graph social share card (1200x630)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Sticky navigation with monogram, scroll spy & direct action
│   │   ├── Hero.tsx             # Editorial opening with CTAs & integrated Music Player
│   │   ├── MusicPlayer.tsx      # Ambient soundtrack controller with equalizer & volume slider
│   │   ├── About.tsx            # Beyond the profile story, focus areas & IEEE research
│   │   ├── LifestyleGallery.tsx # Magazine collage with interactive lightbox & intentional fallback
│   │   ├── CurrentlyMe.tsx      # Live bandwidth: Building, Learning, Fitness (5 km goal), Next
│   │   ├── Personality.tsx      # "Little Things" expandable accordion cards
│   │   ├── Projects.tsx         # Engineering stories (WellNest, Project IRIS, ResumePilot)
│   │   ├── Contact.tsx          # "Your turn." closing section with verified links
│   │   ├── ContactModal.tsx     # Direct mailto dispatch to contact@adithyanp.me + copy button
│   │   ├── Footer.tsx           # Signature, dynamic year & smooth back-to-top
│   │   ├── Icons.tsx            # Clean brand SVG icons (GitHub, LinkedIn, Instagram)
│   │   └── ImageWithFallback.tsx# Editorial artwork placeholder plate or genuine photo loader
│   ├── data/
│   │   ├── personal.ts          # Bio, college, facts, currently me, personality & music config
│   │   ├── projects.ts          # Technical projects with verified problems, challenges & tags
│   │   └── lifestyle.ts         # Journal captions, categories & hasRealPhoto flags
│   ├── types/
│   │   └── index.ts             # TypeScript interface definitions
│   ├── App.tsx                  # Main layout container
│   ├── main.tsx                 # React entry point
│   └── index.css                # Tailwind imports, film grain, accessibility & custom scrollbars
├── index.html                   # SEO tags, absolute Open Graph metadata & typography
├── tailwind.config.js           # Midnight Editorial theme palette
└── tsconfig.json                # TypeScript configuration
```

---

## 🖼️ How to Add Your Real Photos

The site uses a dual-state image system. Until you provide genuine photos, it displays **tailored editorial film-plates with typography, lens markings, and monograms** rather than broken images or low-res placeholders.

### When You Have Your Real Photos Ready:
1. Place your JPEG/PNG files in `/public/images/`:

| File Path | Recommended Ratio | Description |
| :--- | :--- | :--- |
| `public/images/hero.jpg` | 3:4 or 4:5 portrait | Your primary hero portrait |
| `public/images/lifestyle-1.jpg` | 3:4 portrait | Everyday workspace, desk, candid moment |
| `public/images/lifestyle-2.jpg` | 1:1 square | Fitness, gym or training split |
| `public/images/lifestyle-3.jpg` | 4:3 landscape | Coffee shop, pour-over, café table |
| `public/images/lifestyle-4.jpg` | 16:10 landscape | City walk or Bangalore exploration |
| `public/images/lifestyle-5.jpg` | 3:4 portrait | Personal style, fit, understated portrait |
| `public/images/lifestyle-6.jpg` | 1:1 square | Sunset sky, dusk view, golden hour moment |
| `public/images/og-image.jpg` | 1.91:1 (1200x630) | Open Graph preview card for social links (already generated) |

2. Flip `hasRealPhoto: true` in your data files:
   - For the hero portrait, in [`src/data/personal.ts`](file:///c:/Users/HP/Desktop/Adi-Experience/src/data/personal.ts):
     ```typescript
     heroPhoto: {
       src: '/images/hero.jpg',
       caption: 'AI/ML student at DSATM, Bangalore',
       alt: 'Portrait of Adi',
       hasRealPhoto: true, // ← Flip to true
     }
     ```
   - For lifestyle gallery photos, in [`src/data/lifestyle.ts`](file:///c:/Users/HP/Desktop/Adi-Experience/src/data/lifestyle.ts):
     ```typescript
     {
       id: 'everyday',
       imagePath: '/images/lifestyle-1.jpg',
       hasRealPhoto: true, // ← Flip to true
       ...
     }
     ```

---

## ✍️ Checklist of Unconfirmed Details to Verify

Before publishing, review these placeholders in [`src/data/personal.ts`](file:///c:/Users/HP/Desktop/Adi-Experience/src/data/personal.ts):

- [ ] **Email Address**: Check `links.email` (currently `contact@adithyanp.me`).
- [ ] **Instagram (Optional)**: If you'd like your Instagram profile linked, paste your URL in `links.instagram`. If left empty `''`, the website gracefully hides the Instagram button and links your verified GitHub and LinkedIn.
- [ ] **Personality Prompts**: In `personalityPrompts`, review each answer. If you want to hide any prompt, simply set `isConfigured: false`:
  - `harmless-habit`: Browser tab hoarding habit.
  - `rabbit-holes`: Multi-hour technical/curiosity deep dives.
  - `talk-for-hours`: Subjects you enjoy talking about (AI systems, film scores).
  - `opinion-defend`: Simplicity over software bloat, filter coffee.
  - `slow-afternoon`: Quiet bookstore, unhurried walk, good coffee.
  - `three-small-things`: Compiling code, Bangalore rain, background music loops.
  - `plan-rarely-turn-down`: Spontaneous food or neighborhood exploration.
- [ ] **Fitness Goal**: In `aboutData.facts` and `currentlyItems`, verified to: *"Running 5 km continuously"*.

---

## 🎵 Ambient Background Music System

The website includes a dedicated editorial background soundtrack (`adi-theme.mp3`) located in `public/audio/`.

- **Sound Profile**: A warm, mellow acoustic ambient loop (Fmaj9 → Am7 → Dm9 → Cadd9) composed at 68 BPM.
- **License**: 100% Royalty-Free / Public Domain (CC0).
- **Controls**: Play/Pause toggle, 4-bar animated equalizer, volume slider (persisted in `localStorage`).
- **Autoplay Handling**: If the browser blocks audio on first visit, a non-intrusive `"Enable sound"` button appears in the Hero without interrupting navigation.
- **To Replace**: Drop any `.mp3` into `public/audio/adi-theme.mp3` or update the file path in `src/data/personal.ts`.

---

## 🎨 Color Palette Reference ("Midnight Editorial")

- **Obsidian**: `#171717` — Deep cinematic canvas
- **Warm Ivory**: `#F2EBDD` — Editorial serif headlines & accents
- **Muted Terracotta**: `#A64B42` — Focal highlights & interaction cues
- **Stone Gray**: `#8C8B83` — Metadata, captions & subtle dividers
- **Deep Charcoal**: `#222222` — Elevated surface cards & containers

---

## ♿ Accessibility & Performance Standards

- High-contrast, WCAG 2.1 AA compliant typography.
- Native keyboard navigation and visible focus rings across all cards and buttons.
- Modal escape key listener and background scroll locking.
- Full respect for `prefers-reduced-motion`.
- Fully responsive on mobile, tablet, and wide desktop displays.
- Zero console warnings or broken asset calls.
