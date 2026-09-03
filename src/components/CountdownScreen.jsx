import React, { useState, useRef, useEffect } from "react";
import TimeBox from "./TimeBox";
import Wait from "../assets/gifs/Wait.gif";
import CanvasBoyThief, { playCartoonSfx } from "./CanvasBoyThief";

function CountdownScreen({ timeLeft }) {
  // Prank Stages:
  // "idle" -> "enter_and_steal" -> "show_taunt" -> "escape_right" -> "empty_wait" -> "returning" -> "idle"
  const [prankStage, setPrankStage] = useState("idle");
  const sequenceTimeoutRef = useRef(null);

  // Aakhri 10 seconds protection
  const isUrgent =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds <= 10 &&
    timeLeft.seconds > 0;

  // Agar aakhri 10 seconds ho jayein to prank band
  useEffect(() => {
    if (isUrgent && prankStage !== "idle") {
      clearTimeout(sequenceTimeoutRef.current);
      setPrankStage("idle");
    }
  }, [isUrgent, prankStage]);

  const handleScreenClick = () => {
    if (isUrgent || prankStage !== "idle") return;

    // STEP 1: Ladka aayega aur bag kholkar sab kheenchega
    setPrankStage("enter_and_steal");
    playCartoonSfx("steal");

    // STEP 2: 1.2s me sab bag me gaya -> Steal dialogue bolega
    sequenceTimeoutRef.current = setTimeout(() => {
      setPrankStage("show_taunt");

      // STEP 3: 2.2s taunt dikha kar right side bhaag kar gayab
      sequenceTimeoutRef.current = setTimeout(() => {
        setPrankStage("escape_right");

        // 0.8s me screen se baahar, ab agle 10 SECONDS TAK SCREEN KHALI (No Text)
        sequenceTimeoutRef.current = setTimeout(() => {
          setPrankStage("empty_wait");

          // STEP 4: Theek 10 seconds baad ladka wapas aayega, sab dega aur sorry bolega
          sequenceTimeoutRef.current = setTimeout(() => {
            setPrankStage("returning");
            playCartoonSfx("heart");

            // STEP 5: 2.5s sorry bubble dikhane ke baad boy screen se exit
            sequenceTimeoutRef.current = setTimeout(() => {
              setPrankStage("idle");
            }, 2500);
          }, 10000); // ⏱️ Exactly 10 Seconds gap
        }, 800);
      }, 2200);
    }, 1200);
  };

  const isContentInBag =
    prankStage === "show_taunt" ||
    prankStage === "escape_right" ||
    prankStage === "empty_wait";

  return (
    <section
      onClick={handleScreenClick}
      className={`relative flex min-h-screen w-full cursor-pointer items-center justify-center overflow-hidden px-4 py-8 text-[#4a2835] transition-colors duration-1000 select-none ${
        isUrgent
          ? "bg-linear-to-b from-[#ffe0ea] via-[#ffccd9] to-[#ffe0ea]"
          : "bg-linear-to-b from-[#fff5f7] via-[#ffecf2] to-[#ffe4ec]"
      }`}
    >
      {/* 🌸 Ambient Atmosphere Orbs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl" />

      {/* Floating Sparkles & Emojis */}
      <div className="pointer-events-none absolute left-[8%] top-[15%] text-2xl text-pink-300 opacity-60 animate-bounce">
        ♡
      </div>
      <div className="pointer-events-none absolute right-[12%] top-[18%] text-2xl text-pink-400 opacity-70 animate-pulse">
        ✦
      </div>
      <div className="pointer-events-none absolute bottom-[18%] left-[10%] text-3xl opacity-50 animate-pulse">
        🌸
      </div>
      <div className="pointer-events-none absolute right-[8%] bottom-[22%] text-3xl opacity-50 animate-bounce">
        🌷
      </div>
      <div className="pointer-events-none absolute left-[15%] bottom-[8%] text-xl text-rose-300 opacity-60">
        ✨
      </div>

      {/* 🎒 DYNAMIC BOY RUNNER & THIEF */}
      {prankStage !== "idle" && prankStage !== "empty_wait" && (
        <div
          className={`fixed z-50 flex flex-col items-center pointer-events-none transition-all duration-800 ease-in-out ${
            prankStage === "enter_and_steal"
              ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-100"
              : prankStage === "show_taunt"
              ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-105"
              : prankStage === "escape_right"
              ? "left-[130%] top-1/2 -translate-x-1/2 -translate-y-1/2 scale-95" // Right side bhaag gaya
              : prankStage === "returning"
              ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-105" // Wapas dekar speech
              : "-left-40 top-1/2 -translate-x-1/2 -translate-y-1/2"
          }`}
        >
          {/* 1. Churaate waqt ka dialogue */}
          {prankStage === "show_taunt" && (
            <div className="relative mb-2 whitespace-nowrap rounded-2xl border border-rose-300 bg-white/95 px-4 py-2 text-xs font-black text-[#9e1c28] shadow-[0_8px_30px_rgba(244,114,182,0.4)] backdrop-blur-md sm:text-sm animate-bounce">
              Ab Akele! Mana lo apna birthday! 😏🎒
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-r border-b border-rose-300 bg-white" />
            </div>
          )}

          {/* 2. Sab dekar sorry bolne wala dialogue */}
          {prankStage === "returning" && (
            <div className="relative mb-2 whitespace-nowrap rounded-2xl border border-rose-300 bg-white/95 px-4 py-2 text-xs font-black text-[#9e1c28] shadow-[0_8px_30px_rgba(244,114,182,0.4)] backdrop-blur-md sm:text-sm animate-bounce">
              sorry medam ji prank tha 🙈 | Thora sabar kare😘❤️
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-r border-b border-rose-300 bg-white" />
            </div>
          )}

          <CanvasBoyThief isReturning={prankStage === "returning"} />

          {/* Returning Heart Pop */}
          {prankStage === "returning" && (
            <span className="absolute -top-10 text-5xl animate-[popHeart_1.2s_ease-out_infinite]">
              💖
            </span>
          )}
        </div>
      )}

      {/* 📦 Main Screen Content (Chori hone par bag ke andar shrink ho jayega) */}
      <div
        className={`relative z-10 flex w-full max-w-2xl flex-col items-center text-center transition-all duration-700 ease-in-out ${
          isContentInBag
            ? "scale-0 rotate-12 opacity-0 pointer-events-none -translate-y-10"
            : "scale-100 rotate-0 opacity-100 translate-y-0"
        }`}
      >
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-200/80 bg-white/70 px-4 py-1 shadow-xs backdrop-blur-xs">
          <span className="text-lg animate-spin">⏳</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display mt-4 text-5xl font-bold leading-[1.05] tracking-tight text-[#4a2835] sm:text-7xl md:text-7xl">
          Something <br />
          <span className="italic text-[#df6f8d]">Beautiful</span> <br />
          Is Coming...
        </h1>

        {/* Ribbon / Bow Accent */}
        <span className="mt-2 text-7xl animate-pulse">🎀</span>

        <p
          style={{ fontFamily: "'Caveat', cursive" }}
          className="mx-auto mt-2 max-w-md text-xl text-[#8d6972] sm:text-2xl"
        >
          A little surprise made just for you, my love ❤️
        </p>

        {/* Timer Grid */}
        <div className="mt-6 grid w-full max-w-md grid-cols-4 gap-2 sm:gap-4">
          <TimeBox value={timeLeft.days} label="Days" />
          <TimeBox value={timeLeft.hours} label="Hours" />
          <TimeBox value={timeLeft.minutes} label="Minutes" />

          <div
            className={`transition-all duration-300 ${
              isUrgent
                ? "scale-110 drop-shadow-[0_0_12px_rgba(223,111,141,0.5)]"
                : "scale-100"
            }`}
          >
            <TimeBox value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>

        {/* Mascot */}
        <div className="mt-8 flex justify-center">
          <img
            src={Wait}
            alt="Cute celebration mascot"
            className="h-28 w-auto object-contain drop-shadow-[0_12px_24px_rgba(158,28,40,0.15)] transition-transform duration-300 hover:scale-105 sm:h-32"
          />
        </div>
      </div>

      <style>{`
        @keyframes popHeart {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.5);
          }
          50% {
            opacity: 1;
            transform: translateY(-25px) scale(1.3);
          }
          100% {
            opacity: 0;
            transform: translateY(-45px) scale(0.8);
          }
        }
      `}</style>
    </section>
  );
}

export default CountdownScreen;