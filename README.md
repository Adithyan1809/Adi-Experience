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
- **Audio Engine**: HTML5 Audio (`/audio/adi-theme.mp3`, CC0 programmatic synthesis) + Spotify Embeds
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

## 📁 Architecture & Editorial Chapters

All personal data, projects, lifestyle snapshots, archive entries, and music tracks are centralized in `src/data/` so you can customize your website **without modifying any React component logic**.

### Sequential Editorial Chapters:
1. **Chapter 01: Intro** (`#hero`): Editorial opening with ambient soundtrack player, verified bio, and portrait slot.
2. **Chapter 02: About** (`#about`): Focused introduction, focus areas (AI & Data Systems, Regular Gym Training, Practical Software), IEEE research highlight, and "The short version" dossier.
3. **Chapter 03: Cadence** (`#lifestyle`): When photos are configured, displays genuine photography with responsive crops and lightbox; when unconfigured, tastefully defaults to a text-led everyday cadence section rather than empty frames.
4. **Chapter 04: Lately** (`#currently`): Live bandwidth ("Lately, I've been...") with updated timestamp, building prototypes, learning data systems, 5 km running endurance goal, and shipping open-source.
5. **Chapter 05: Listening** (`#music-room`): **The Listening Room** featuring up to 3 curated Spotify playlists (*On Repeat*, *After Hours*, *Focus Mode*), lazy-loaded Spotify player embeds, external Spotify profile links, and intelligent audio coordination that pauses local ambient playback when playing Spotify.
6. **Chapter 06: Little Things** (`#personality`): A mix of harmless quirks, curiosity rabbit holes, lifestyle preferences, and everyday observations.
7. **Chapter 07: Archive** (`#archive`): **Personal Archive ("Things worth remembering.")** featuring quiet milestones, lessons learned, and Bangalore observations.
8. **Chapter 08: Work** (`#projects`): Compact expandable engineering stories for WellNest, Project IRIS, and ResumePilot with honest GitHub profile links, architectural takeaways, and lessons learned.
9. **Chapter 09: Contact** (`#contact`): "Your turn" closing section with quick conversation starter prompt pills (*"Recommend a song"*, *"Talk about a project"*, *"Just saying hello"*, *"Bangalore spot"*), verified social links, and an accessible contact modal.
10. **Footer** (`#footer`): Signature, year, back-to-top button, and the **Monogram "A" Backstage Pass Easter Egg** (activates after 5 taps or keyboard presses).

```text
Adi-Experience/
├── public/
│   ├── audio/
│   │   ├── adi-theme.mp3        # Seamless royalty-free ambient loop (CC0 synthesized loop)
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
│   │   ├── MusicPlayer.tsx      # Ambient soundtrack controller with mobile & desktop volume popover
│   │   ├── About.tsx            # Beyond the profile story, focus areas & IEEE research
│   │   ├── LifestyleGallery.tsx # Photo gallery when configured, or text-led cadence when photos are pending
│   │   ├── CurrentlyMe.tsx      # "Lately, I've been..." live bandwidth with updated timestamp
│   │   ├── SpotifySection.tsx   # "The Listening Room" Spotify embeds, playlist tabs & audio coordination
│   │   ├── Personality.tsx      # "Little Things" expandable accordion cards
│   │   ├── PersonalArchive.tsx  # "Things worth remembering" editorial archive cards
│   │   ├── Projects.tsx         # Expandable engineering stories (WellNest, Project IRIS, ResumePilot)
│   │   ├── Contact.tsx          # "Your turn." closing section with conversation starter pills
│   │   ├── ContactModal.tsx     # Direct mailto dispatch to contact@adithyanp.me + copy button
│   │   ├── ScrollExperience.tsx # Slim top progress indicator & desktop vertical section-nav rail
│   │   ├── Footer.tsx           # Signature, dynamic year, back-to-top & Backstage Pass Easter egg
│   │   ├── Icons.tsx            # Clean brand SVG icons (GitHub, LinkedIn, Instagram)
│   │   └── ImageWithFallback.tsx# Editorial artwork placeholder plate or genuine photo loader
│   ├── data/
│   │   ├── personal.ts          # Bio, college, facts, currently me, personality, starters & easter egg
│   │   ├── spotify.ts           # Playlists, Spotify profile URL, embed URIs & categories
│   │   ├── archive.ts           # Personal archive entries, categories & summaries
│   │   ├── projects.ts          # Technical projects with verified problems, challenges & tags
│   │   └── lifestyle.ts         # Journal captions, categories & hasRealPhoto flags
│   ├── types/
│   │   └── index.ts             # TypeScript interface definitions
│   ├── App.tsx                  # Main layout container
│   ├── main.tsx                 # React entry point
│   └── index.css                # Tailwind imports, film grain, proximity snap & accessibility
├── index.html                   # SEO tags, absolute Open Graph metadata & typography
├── tailwind.config.js           # Midnight Editorial theme palette
└── tsconfig.json                # TypeScript configuration
```

---

## 🎧 Configuring Spotify ("The Listening Room")

All playlist configurations live in `src/data/spotify.ts`:

1. **Add your Spotify profile**:
   Update `profileUrl` with your public profile link:
   ```ts
   profileUrl: 'https://open.spotify.com/user/YOUR_USERNAME'
   ```
2. **Add genuine playlists**:
   In `playlists`, set your playlist embed URL and toggle `isConfigured: true`:
   ```ts
   {
     id: 'on-repeat',
     title: 'On Repeat',
     subtitle: 'Current high rotation',
     description: 'A mix of electronic grooves and songs carrying my week.',
     category: 'Rotation',
     embedUrl: 'https://open.spotify.com/embed/playlist/YOUR_PLAYLIST_ID?utm_source=generator&theme=0',
     spotifyUrl: 'https://open.spotify.com/playlist/YOUR_PLAYLIST_ID',
     isConfigured: true // ← Set to true once embedUrl is set
   }
   ```
3. **Audio coordination**:
   Whenever a visitor interacts with Spotify or clicks an external link, a custom browser event `adi:pause-ambient` fires automatically, cleanly pausing the local ambient soundtrack so visitors never experience clashing audio.

---

## 📜 Personal Archive ("Things worth remembering.")

All archive entries live in `src/data/archive.ts`:
- Each entry has `id`, `title`, `date`, `category` (`Observation` | `Milestone` | `Lesson` | `Discovery`), `summary`, `content`, and `tag`.
- Set `isConfigured: false` to hide any entry without deleting it.

---

## 💬 Conversation Starters & Contact Modal

Visitors can jump directly into specific conversation topics from `src/components/Contact.tsx`:
- *"Recommend a song"*
- *"Talk about a project"*
- *"Just saying hello"*
- *"Bangalore café or spot"*

Clicking any starter opens `ContactModal.tsx` with the topic pre-selected and a natural opening prompt inserted into the message textarea, ready for them to complete.

---

## 🗝️ Footer Monogram Easter Egg ("Backstage Pass")

Tapping or clicking the "A" monogram in the footer 5 times (or pressing Enter / Space with keyboard focus) reveals the understated **Backstage Pass** card with a friendly message and a one-click button to send a backstage hello. Fully accessible and dismissible with Escape. Configured in `src/data/personal.ts` under `easterEggConfig`.

---

## 🖼️ How to Add Your Real Photos

The website displays genuine photographs only when explicitly configured via `hasRealPhoto: true`. When photos are not yet configured, the gallery automatically renders a text-led "Everyday Cadence" section rather than empty frames.

### Step 1: Place your image files in `public/images/`:

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

### Step 2: Enable the photo flags in your data files:
- For the hero portrait, in `src/data/personal.ts`:
  ```typescript
  heroPhoto: {
    src: '/images/hero.jpg',
    caption: 'AI/ML student at DSATM, Bangalore',
    alt: 'Portrait of Adi',
    hasRealPhoto: true, // ← Set to true once hero.jpg is added
  }
  ```
- For lifestyle gallery photos, in `src/data/lifestyle.ts`:
  ```typescript
  {
    id: 'everyday',
    imagePath: '/images/lifestyle-1.jpg',
    hasRealPhoto: true, // ← Set to true for photos you have added
  }
  ```

---

## 🎨 Color Palette Reference ("Midnight Editorial")

- **Obsidian**: `#171717` — Deep cinematic canvas
- **Warm Ivory**: `#F2EBDD` — Editorial serif headlines & accents
- **Muted Terracotta**: `#A64B42` — Focal highlights & interaction cues
- **Stone Gray**: `#8C8B83` — Metadata, captions & subtle dividers
- **Deep Charcoal**: `#222222` — Elevated surface cards & containers

---

## ♿ Accessibility & Motion Standards

- High-contrast, WCAG 2.1 AA compliant typography.
- Slim top scroll progress bar with Framer Motion spring physics.
- Desktop vertical section-navigation rail with live scroll spy and accessible tooltips.
- Proximity scroll snapping (`scroll-snap-type: y proximity`) on desktop viewports (`≥ 1024px`) with `scroll-snap-stop: normal`, preserving natural mouse wheel and touch scrolling.
- Automatically disables snapping on mobile and when `prefers-reduced-motion` is active.
- Native semantic buttons with visible focus rings across all cards, sliders, tabs, and accordions.
- Contact modal with focus trapping, Escape key listener, and focus restoration to trigger button.
- Zero horizontal overflow across all screen sizes.
