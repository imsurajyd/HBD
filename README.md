# 🌸 18th Birthday Celebration — Vintage Rose Romance

A handcrafted, highly aesthetic, and romantic interactive 18th Birthday web experience designed with warm rose gradients, soft creams, animated canvas elements, synthetic party blasts, and stacked nostalgic polaroid memories.

---

## ✨ Preview

<div align="center">
  <img src="./assets/preview.png" alt="18th Birthday Hero Celebration Preview" width="850" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);" />
</div>

---

## 🎀 Key Features

* ⏳ **Real-Time Countdown Screen:** Live calculation down to the exact second with dynamic urgency pulses in the final seconds.
* 💥 **Synthetic Audio Popper Blast:** Zero-file-dependency Web Audio API audio synthesis producing realistic party popper/balloon burst snaps.
* 🎂 **Interactive Canvas Cake:** Smooth candle flicker and animated cake rendering.
* 💌 **Interactive Wax Seal Envelope:** Custom HTML5 Canvas envelope with 3D flap unsealing, animated crimson wax seal, and smooth letter extraction.
* 📜 **Love Letter Modal:** Handwritten love message styled with romantic typography, Cupid heart graphics, and playful mascot accents.
* 📸 **3D Vintage Polaroid Stack:** Interactive card deck with realistic deckle/scalloped edges, organic scatter rotations, and tap-to-peel reveal animations.
* 🎵 **Audio Sync Engine:** Background music transition handler with fallback user-interaction unlock and global mute control.

---

## 🎨 Color Palette & Design System

| Color Role | Hex Code | Visual Sample |
| :--- | :--- | :--- |
| **Primary Background** | `#fff5f7` | Soft Pearl Rose |
| **Secondary Fill** | `#fffdfa` | Warm Milk Cream |
| **Rose Silk Accents** | `#fce7ee` | Delicate Blush |
| **Primary Velvet Text** | `#4a2835` | Deep Plum Velvet |
| **Crimson Highlight** | `#9e1c28` | Vintage Burgundy Rose |

---

## 🛠️ Tech Stack

* **Framework:** React 18+ (Vite)
* **Styling:** Tailwind CSS
* **Canvas Animations:** HTML5 2D Canvas & Canvas Confetti
* **Audio:** Web Audio API & HTML5 Audio
* **Fonts:** *Playfair Display / Serif Display*, *Caveat (Handwritten)*, *Permanent Marker*

---

## 📂 Project Structure

```text
├── public/
│   ├── birthday-song.mp3       # Romantic background melody
│   └── countdown-sound.mp3     # Clock ticking audio
├── src/
│   ├── assets/
│   │   ├── gifs/               # Mascots & celebration animations
│   │   └── photos/             # Stacked polaroid photos
│   ├── components/
│   │   ├── CountdownScreen.jsx # Step 1: Live countdown screen
│   │   ├── TimeBox.jsx         # Glassmorphism timer digit pill
│   │   ├── BirthdayHero.jsx    # Step 2: Confetti blast & cake hero
│   │   ├── CanvasCake.jsx      # Canvas-rendered birthday cake
│   │   ├── MessageSection.jsx  # Step 3: Letter reveal wrapper
│   │   ├── CanvasEnvelope.jsx  # 2D Canvas animated folding envelope
│   │   ├── MemoriesSection.jsx # Step 4: Polaroid deck stack section
│   │   └── MemoryCard.jsx      # Scalloped photo paper card
│   ├── data/
│   │   └── memories.js         # Polaroid memories photo dataset
│   ├── App.jsx                 # Stage switcher & global audio controller
│   └── index.css               # Tailwind & custom typography rules
└── README.md

🚀 Getting Started
1. Clone the repository
Bash
git clone [https://github.com/your-username/18th-birthday-website.git](https://github.com/your-username/18th-birthday-website.git)
cd 18th-birthday-website
2. Install dependencies
Bash
npm install
3. Setup assets
Place your audio files inside public/ as birthday-song.mp3 and countdown-sound.mp3.

Place your memory pictures in src/assets/photos/ and configure src/data/memories.js.

Put your preview screenshot inside assets/preview.png.

4. Run development server
Bash
npm run dev
5. Build for production
Bash
npm run build
💖 Made with Love
Crafted as a one-of-a-kind digital keepsake for an unforgettable 18th Birthday.