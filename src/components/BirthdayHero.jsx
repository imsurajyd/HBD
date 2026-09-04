import { useEffect, useMemo } from "react";
import confetti from "canvas-confetti";
import Confetti from "./Confetti";
import Balloons from "./Balloons";
import Dance from "../assets/gifs/Dance.gif";
import CanvasCake from "./CanvasCake";

// Number to ordinal suffix (e.g., 18 -> 18th, 19 -> 19th, 20 -> 20th, 21 -> 21st, 22 -> 22nd)
function getOrdinalSuffix(number) {
  const n = parseInt(number, 10);
  if (isNaN(n)) return number || "18th";

  const j = n % 10;
  const k = n % 100;

  if (j === 1 && k !== 11) return `${n}st`;
  if (j === 2 && k !== 12) return `${n}nd`;
  if (j === 3 && k !== 13) return `${n}rd`;
  return `${n}th`;
}

// URL parameters reader
function getBirthdayParams() {
  if (typeof window === "undefined") return { ordinal: "18th", name: "Suraj" };

  const params = new URLSearchParams(window.location.search);
  const name = params.get("name")?.trim() || "Suraj";

  const ageParam = params.get("age");
  const dateParam = params.get("date");

  let calculatedNumber = 18;

  if (ageParam) {
    calculatedNumber = ageParam;
  } else if (dateParam) {
    const d = new Date(dateParam);
    if (!isNaN(d.getTime())) {
      calculatedNumber = d.getDate(); // Month ki date (e.g. 18, 19, 20)
    }
  }

  return {
    ordinal: getOrdinalSuffix(calculatedNumber),
    name,
  };
}

// Synthetic party popper / balloon burst audio (no external file needed)
const playPopperBlastSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === "suspended") ctx.resume();

    // 1. Noise burst for crisp crackle
    const bufferSize = Math.floor(ctx.sampleRate * 0.14);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    // Filter to add heavy snap thump
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1100, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.12);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(1.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.13);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoise.start();
  } catch (e) {
    // Autoplay policy fallback
  }
};

function BirthdayHero({ recipientName, onTeddyClick }) {
  const params = useMemo(() => getBirthdayParams(), []);
  const displayName = recipientName || params.name;
  const displayOrdinal = params.ordinal;

  useEffect(() => {
    // 💥 1. Instant balloon pop sound on entrance
    playPopperBlastSound();

    // 2. Center Confetti Blast
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.55 },
      colors: ["#ff5c8a", "#ff9fba", "#ffd166", "#06d6a0", "#118ab2"],
    });

    // 💥 3. Follow-up micro pop for cannon effect
    const secondPopTimer = setTimeout(() => {
      playPopperBlastSound();
    }, 280);

    // 4. Side celebratory cannons
    let animId;
    const end = Date.now() + 1800;
    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 45,
        origin: { x: 0, y: 0.7 },
        colors: ["#ff5c8a", "#ffd166"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 45,
        origin: { x: 1, y: 0.7 },
        colors: ["#ff5c8a", "#ffd166"],
      });
      if (Date.now() < end) {
        animId = requestAnimationFrame(frame);
      }
    };
    frame();

    return () => {
      clearTimeout(secondPopTimer);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-linear-to-b from-[#fff5f7] via-[#ffecf2] to-[#ffe4ec] px-4 py-4 text-[#4a2835] select-none sm:py-6">
      {/* 🌸 Ambient Atmosphere Orbs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl" />

      {/* Confetti & Floating Balloons Elements */}
      <Confetti />
      <Balloons />

      {/* Floating Side Hearts */}
      <div className="pointer-events-none absolute left-[6%] top-[14%] animate-bounce text-2xl opacity-60 sm:text-3xl">
        💗
      </div>
      <div className="pointer-events-none absolute right-[6%] top-[16%] animate-pulse text-2xl opacity-60 sm:text-3xl">
        💕
      </div>
      <div className="pointer-events-none absolute bottom-[14%] left-[8%] animate-pulse text-xl opacity-50 sm:text-2xl">
        💖
      </div>
      <div className="pointer-events-none absolute bottom-[14%] right-[8%] animate-bounce text-xl opacity-50 sm:text-2xl">
        💞
      </div>

      {/* Main Single-Screen Content Wrapper */}
      <div className="relative z-20 my-auto flex w-full max-w-xl flex-col items-center text-center">
        {/* 1. Animated Canvas Cake */}
        <div className="flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
          <CanvasCake />
        </div>

        {/* 2. Birthday Headline (Perfect Color & Font Matched) */}
        <h1 className="font-display mt-1 text-4xl font-bold leading-[1.1] tracking-tight text-[#4a2835] sm:text-6xl md:text-7xl">
          Happy <br />
          <span className="italic font-serif font-medium text-[#df6f8d]">
            {displayOrdinal} Birthday
          </span>
          <br />
          <span className="inline-flex items-center justify-center gap-2 mt-1">
            <span className="italic font-serif font-normal text-[#df6f8d] text-3xl sm:text-5xl md:text-6xl">
              My love
            </span>{" "}
            <span className="text-[#4a2835] text-3xl sm:text-5xl md:text-6xl capitalize">
              {displayName}
            </span>
            <span className="text-2xl sm:text-4xl">❤️</span>
          </span>
        </h1>

        {/* 3. Dance Mascot GIF */}
        <div className="mt-2 flex justify-center">
          <img
            src={Dance}
            alt="Celebrating Cute Mascot"
            className="h-20 w-auto object-contain drop-shadow-[0_10px_20px_rgba(158,28,40,0.15)] sm:h-28"
          />
        </div>

        {/* 4. Subtitle Message */}
        <p
          style={{ fontFamily: "'Caveat', cursive" }}
          className="mt-2 max-w-md text-base leading-snug text-[#7e5560] sm:text-xl"
        >
          Meri zindagi ki sabse khubsurat wajah tum ho...
          <br />
          Happy {displayOrdinal} Birthday to my love {displayName}, who owns my
          whole heart. 🌸❤️
        </p>

        {/* 5. Heart Envelope Action Button */}
        <div className="mt-3 flex flex-col items-center">
          <button
            type="button"
            onClick={onTeddyClick}
            aria-label="Tap to open the letter"
            className="group relative cursor-pointer text-5xl transition-transform duration-300 hover:scale-125 active:scale-95 drop-shadow-[0_0_18px_rgba(255,105,180,0.7)] animate-[heroHeartbeat_1.4s_ease-in-out_infinite] sm:text-6xl"
          >
            💌
          </button>

          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#9e1c28] sm:text-xs">
            Tap The Envelope
          </p>

          <p
            style={{ fontFamily: "'Caveat', cursive" }}
            className="mt-0.5 text-base italic text-[#df6f8d] sm:text-lg"
          >
            I have something written just for you... ✨
          </p>
        </div>

        {/* 6. Bottom Accents */}
        <div className="mt-3 flex items-center gap-3 text-sm opacity-75 sm:text-base">
          <span>🎈</span>
          <span>✦</span>
          <span>🎉</span>
          <span>✦</span>
          <span>🎈</span>
        </div>
      </div>

      <style>{`
        @keyframes heroHeartbeat {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }
      `}</style>
    </section>
  );
}

export default BirthdayHero;
