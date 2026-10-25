# The Adi Experience — A Cinematic Personal Website

> *"An engineer by degree. A work in progress by choice."*

A distinctive, production-grade personal web experience built for **Adi (Adithyan Prakash)**, an engineering student specializing in Artificial Intelligence and Machine Learning in Bangalore, India.

Designed with the **"Midnight Editorial"** aesthetic: combining cinematic photography, editorial magazine layouts, modern typography (`Cormorant Garamond` serif & `Plus Jakarta Sans`), subtle romantic undertones, playful micro-interactions, and a confident, authentic digital identity.

---

## ⚡ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion 12
- **Icons**: Lucide React + Custom Inline SVGs
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

All personal data, projects, lifestyle journal entries, and interactive prompts are centralized in `src/data/` so you can customize your website **without modifying any React component logic**.

```text
Adi-Experience/
├── public/
│   └── images/
│       ├── hero.jpg             # Hero portrait (800x1000)
│       ├── lifestyle-1.jpg      # Everyday cadence (600x800)
│       ├── lifestyle-2.jpg      # Fitness & gym (600x600)
│       ├── lifestyle-3.jpg      # Cafés & coffee (800x600)
│       ├── lifestyle-4.jpg      # Bangalore exploration (800x500)
│       ├── lifestyle-5.jpg      # Personal style (600x800)
│       ├── lifestyle-6.jpg      # Sunset & acoustics (600x600)
│       └── og-image.jpg         # Open Graph social share image (1200x630)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Sticky navigation with monogram & scroll spy
│   │   ├── Hero.tsx             # Full-screen editorial opening with CTAs
│   │   ├── About.tsx            # Beyond the LinkedIn profile story
│   │   ├── LifestyleGallery.tsx # Magazine collage with interactive lightbox
│   │   ├── CurrentlyMe.tsx      # Interactive snapshot of live bandwidth
│   │   ├── Projects.tsx         # Technical stories (WellNest, ResumePilot, IRIS)
│   │   ├── Personality.tsx      # "Oddly Specific Things" accordion cards
│   │   ├── AdventureSelector.tsx# "Which version of me are we meeting today?"
│   │   ├── DateGenerator.tsx    # "Plan our hypothetical first date"
│   │   ├── Favorites.tsx        # Playlist-style culture & Bangalore spots
│   │   ├── Contact.tsx          # "Let's Get Coffee" closing section
│   │   ├── ContactModal.tsx     # Direct dispatch & one-click email copy
│   │   ├── Footer.tsx           # Signature, dynamic year & back-to-top
│   │   ├── Icons.tsx            # Clean brand SVG icons (GitHub, LinkedIn, Instagram)
│   │   └── ImageWithFallback.tsx# Resilient image loader with editorial fallback
│   ├── data/
│   │   ├── personal.ts          # Bio, facts, currently me, personality, adventures, favorites
│   │   ├── projects.ts          # Technical projects and stories
│   │   ├── dateIdeas.ts         # First date generator options
│   │   └── lifestyle.ts         # Journal captions and categories
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

## 🖼️ How to Replace Photos & Assets

Place your genuine photographs in `/public/images/`. Standard JPEG filenames are already configured:

| File Path | Recommended Ratio | Description |
| :--- | :--- | :--- |
| `public/images/hero.jpg` | 3:4 / 4:5 portrait | Your primary hero portrait |
| `public/images/lifestyle-1.jpg` | 3:4 portrait | Everyday workspace, candid moment |
| `public/images/lifestyle-2.jpg` | 1:1 square | Fitness, gym or training split |
| `public/images/lifestyle-3.jpg` | 4:3 landscape | Coffee shop, pour-over, café table |
| `public/images/lifestyle-4.jpg` | 16:10 landscape | Exploring Bangalore, Church St, Cubbon |
| `public/images/lifestyle-5.jpg` | 3:4 portrait | Personal style, fit, understated portrait |
| `public/images/lifestyle-6.jpg` | 1:1 square | Sunset sky, dusk view, golden hour moment |
| `public/images/og-image.jpg` | 1.91:1 (1200x630) | Open Graph preview card for social links |

> **Graceful Intentional Fallbacks**: If any image file is missing or still being edited, the built-in `ImageWithFallback` component automatically renders a film noir editorial card with camera metadata, typography, and framing marks so the website never shows broken image icons.

---

## ✍️ How to Personalize Your Content

### 1. Social Links & Contact Details
Open [`src/data/personal.ts`](file:///c:/Users/HP/Desktop/Adi-Experience/src/data/personal.ts):
```typescript
export const personalInfo = {
  // Update your Instagram handle when ready:
  links: {
    website: 'https://www.adithyanp.me/',
    github: 'https://github.com/Adithyan1809',
    linkedin: 'https://www.linkedin.com/in/adithyan-prakash/',
    instagram: 'https://instagram.com/YOUR_HANDLE_HERE', // ← Add your handle here
    email: 'contact@adithyanp.me' // ← Add your preferred email
  }
};
```

### 2. Fast Dossier & Quick Facts
In [`src/data/personal.ts`](file:///c:/Users/HP/Desktop/Adi-Experience/src/data/personal.ts), edit the `aboutData.facts` array to customize your morning ritual, fuel of choice, or weekend mode.

### 3. Currently Me Status
In [`src/data/personal.ts`](file:///c:/Users/HP/Desktop/Adi-Experience/src/data/personal.ts), update `currentlyItems` whenever what you're learning, building, or reading shifts.

### 4. Hypothetical Date Ideas
In [`src/data/dateIdeas.ts`](file:///c:/Users/HP/Desktop/Adi-Experience/src/data/dateIdeas.ts), add, remove, or modify date options, vibes, and Bangalore locations.

### 5. Projects & Stories
In [`src/data/projects.ts`](file:///c:/Users/HP/Desktop/Adi-Experience/src/data/projects.ts), update descriptions, stories, tech tags, or add live demo URLs when available.

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
