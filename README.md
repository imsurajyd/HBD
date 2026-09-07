<div align="center">

# 🌸 18th Birthday Celebration — Vintage Rose Romance

A bespoke, interactive digital keepsake built with React, Vite, and Tailwind CSS. Features real-time countdown mechanics, synthetic audio effects via the Web Audio API, animated HTML5 canvas elements, and a nostalgic 3D polaroid photo gallery.

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

<br />

<img src="./assets/preview.png" alt="Application Preview" width="850" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);" />

</div>

---

## 🌟 Key Highlights

* **Precision Countdown Engine:** Real-time state-driven countdown tracking days, hours, minutes, and seconds, featuring urgency pulse animations in the final countdown phase.
* **Synthetic Web Audio FX:** Custom Web Audio API implementation generating procedural party-popper and balloon-burst snaps without relying on external audio assets.
* **Interactive 2D Canvas Cake:** Dynamic candle flame flicker rendering using HTML5 2D Canvas with interactive blow-out state triggers.
* **Animated Wax-Seal Envelope:** 3D flap-opening simulation, animated crimson wax seal extraction, and transition into a typography-focused love letter modal.
* **Deckle-Edged Polaroid Deck:** Stacked 3D photo gallery featuring organic rotation offsets, responsive hover dynamics, and tap-to-peel reveal flows.
* **Fail-Safe Audio Controller:** Background audio manager with automatic policy handling, user-gesture unlock triggers, and global mute toggling.

---

## 🎨 Design System

The visual theme combines editorial serif typography with nostalgic vintage rose and warm milk-cream hues:

| Role | Token Name | Hex Value | Preview |
| :--- | :--- | :--- | :---: |
| **Canvas Base** | `bg-pearl-rose` | `#fff5f7` | <img src="https://via.placeholder.com/16/fff5f7/000000?text=+" width="16" height="16" /> |
| **Card Fill** | `surface-cream` | `#fffdfa` | <img src="https://via.placeholder.com/16/fffdfa/000000?text=+" width="16" height="16" /> |
| **Borders & Accents** | `accent-blush` | `#fce7ee` | <img src="https://via.placeholder.com/16/fce7ee/000000?text=+" width="16" height="16" /> |
| **Primary Typography** | `text-velvet-plum` | `#4a2835` | <img src="https://via.placeholder.com/16/4a2835/000000?text=+" width="16" height="16" /> |
| **CTA & Wax Seal** | `brand-crimson` | `#9e1c28` | <img src="https://via.placeholder.com/16/9e1c28/000000?text=+" width="16" height="16" /> |

---

## 🛠️ Technology Stack

* **Core:** React 18, Vite
* **Styling:** Tailwind CSS, Custom Utility CSS
* **Rendering & Effects:** HTML5 Canvas API, Canvas Confetti
* **Audio Processing:** Web Audio API (Synthesized SFX), HTML5 Audio AudioContext
* **Typography:** Playfair Display, Caveat, Permanent Marker

---

## 📁 Repository Structure

```text
├── public/
│   ├── birthday-song.mp3       # Background score asset
│   └── countdown-sound.mp3     # Clock ticking asset
├── src/
│   ├── assets/
│   │   ├── gifs/               # Sticker & celebration animations
│   │   └── photos/             # Polaroid gallery image assets
│   ├── components/
│   │   ├── CountdownScreen.jsx # Phase 1: Real-time countdown timer
│   │   ├── TimeBox.jsx         # Glassmorphism counter unit
│   │   ├── BirthdayHero.jsx    # Phase 2: Confetti blast & primary message
│   │   ├── CanvasCake.jsx      # Procedural canvas birthday cake
│   │   ├── MessageSection.jsx  # Phase 3: Letter reveal container
│   │   ├── CanvasEnvelope.jsx  # Animated 2D wax-seal envelope
│   │   ├── MemoriesSection.jsx # Phase 4: Polaroid deck layout
│   │   └── MemoryCard.jsx      # Polaroid component with deckle edges
│   ├── data/
│   │   └── memories.js         # Image paths and captions registry
│   ├── App.jsx                 # Global state & stage router
│   ├── index.css               # Design tokens & animation utilities
│   └── main.jsx                # Application root entry point
├── package.json
└── vite.config.js

🚀 Getting Started
Prerequisites
Node.js (version 18.0.0 or higher recommended)

npm, pnpm, or yarn

Installation & Setup
Clone the repository:

Bash
git clone [https://github.com/](https://github.com/)<your-username>/18th-birthday-website.git
cd 18th-birthday-website
Install project dependencies:

Bash
npm install
Configure static assets:

Place background music and countdown ticks in public/ as birthday-song.mp3 and countdown-sound.mp3.

Add polaroid images into src/assets/photos/ and configure image arrays inside src/data/memories.js.

Place repository preview asset at assets/preview.png.

Launch development environment:

Bash
npm run dev
Generate production build:

Bash
npm run build
📄 License
Distributed under the MIT License. See LICENSE for more information.