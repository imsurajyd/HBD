import { useState } from "react";
import CanvasEnvelope from "./CanvasEnvelope";
import LetterMascot from "../assets/gifs/Lovem.gif";
import leftGif from "../assets/gifs/Left.gif";
import rightGif from "../assets/gifs/right.gif";

function MessageSection({ onHeartClick }) {
  const [stage, setStage] = useState("sealed"); // sealed, unfolding, opened

  const handleOpenComplete = () => {
    setTimeout(() => {
      setStage("opened");
    }, 150);
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-linear-to-b from-[#fff5f7] via-[#ffecf2] to-[#ffe4ec] px-4 py-8 text-[#4a2835] select-none">
      {/* 🌸 Ambient Atmosphere Orbs (Matched with previous screens) */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-rose-200/40 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-pink-200/40 blur-3xl animate-pulse" />

      {/* Floating Sparkles & Envelopes */}
      <div className="pointer-events-none absolute left-[10%] top-[16%] text-3xl opacity-50 animate-bounce">
        💌
      </div>
      <div className="pointer-events-none absolute right-[12%] top-[18%] text-3xl opacity-50 animate-pulse">
        💖
      </div>
      <div className="pointer-events-none absolute bottom-[14%] left-[12%] text-2xl opacity-40 animate-pulse">
        🌸
      </div>
      <div className="pointer-events-none absolute bottom-[16%] right-[10%] text-2xl opacity-40 animate-bounce">
        ✨
      </div>

      {/* Main Container */}
      <div className="relative z-20 flex w-full max-w-lg flex-col items-center text-center">
        {/* Stage 1: The sealed message header */}
        <div
          className={`flex flex-col items-center transition-all duration-500 ease-out ${
            stage === "sealed"
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-3 select-none">
            <span className="h-px w-6 bg-[#df6f8d]/60 sm:w-10" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a76576]">
              ✦ a special note for you ✦
            </p>
            <span className="h-px w-6 bg-[#df6f8d]/60 sm:w-10" />
          </div>

          <h2 className="font-display mt-2 text-4xl font-bold tracking-tight text-[#4a2835] sm:text-5xl">
            You Have Received a{" "}
            <span className="italic text-[#df6f8d]">Letter</span>
          </h2>

          {/* 🐱 Cute Mascot GIF jo letter ke upar baithega */}
          <div className="mt-3 flex justify-center">
            <img
              src={LetterMascot}
              alt="Cute Mascot with letter"
              className="h-28 w-28 object-contain drop-shadow-[0_8px_16px_rgba(158,28,40,0.12)] transition-transform duration-300 hover:scale-110 sm:h-30 sm:w-30"
            />
          </div>
        </div>

        {/* Envelope & Letter Interactive Group */}
        <div className="relative mt-1 lg:mt-8 flex h-56 w-full items-center justify-center">
          {/* Canvas Envelope */}
          <div
            className={`transition-all duration-700 ease-in-out ${
              stage === "opened"
                ? "opacity-0 scale-90 pointer-events-none"
                : "opacity-100 scale-100"
            }`}
          >
            <CanvasEnvelope
              isOpen={stage === "opened"}
              onOpenComplete={handleOpenComplete}
            />
          </div>

          {/* Opened Letter Paper (Clean No-Scroll Modal) */}
          <div
            className={`fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              stage === "opened"
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-90 pointer-events-none"
            }`}
          >
            <div className="relative flex w-full max-w-md flex-col items-center justify-between rounded-3xl border border-white/90 bg-[#fffdfa] px-4 py-5 shadow-[0_20px_50px_rgba(244,114,182,0.28)] backdrop-blur-xl sm:px-8 sm:py-7">
              {/* Scattered Pink Background Hearts */}
              <div className="pointer-events-none absolute inset-0 select-none overflow-hidden opacity-65">
                <span className="absolute left-[7%] top-[6%] text-lg text-pink-300 sm:text-xl">
                  💕
                </span>
                <span className="absolute right-[8%] top-[8%] text-base text-pink-300 sm:text-lg -rotate-12">
                  💗
                </span>
                <span className="absolute left-[12%] top-[26%] text-sm text-pink-200 rotate-12">
                  💖
                </span>
                <span className="absolute right-[10%] top-[30%] text-base text-pink-300">
                  💕
                </span>
                <span className="absolute left-[6%] top-[52%] text-lg text-pink-300 -rotate-12">
                  💗
                </span>
                <span className="absolute right-[8%] top-[56%] text-sm text-pink-200 rotate-45">
                  💖
                </span>
                <span className="absolute left-[10%] bottom-[16%] text-base text-pink-300">
                  💕
                </span>
                <span className="absolute right-[10%] bottom-[18%] text-lg text-pink-300 -rotate-6">
                  💗
                </span>
                <span className="absolute left-[24%] bottom-[6%] text-xs text-pink-200">
                  💖
                </span>
                <span className="absolute right-[24%] bottom-[7%] text-xs text-pink-200">
                  💕
                </span>
              </div>

              {/* Header: Heart Graphic + FAVORITE */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="relative flex items-center justify-center">
                  <div className="text-6xl drop-shadow-[0_4px_12px_rgba(251,113,133,0.45)] sm:text-7xl">
                    💖
                  </div>

                  <span className="absolute -right-2 -top-1 rotate-45 text-2xl text-[#f43f5e]">
                    ➹
                  </span>

                  <span
                    style={{ fontFamily: "'Permanent Marker', cursive" }}
                    className="absolute top-5 text-xs tracking-wider text-[#9e1c28] sm:top-6 sm:text-sm"
                  >
                    YOU'RE MY
                  </span>
                </div>

                <h2
                  style={{ fontFamily: "'Permanent Marker', cursive" }}
                  className="-mt-2 text-3xl tracking-wide text-[#9e1c28] drop-shadow-sm sm:text-4xl"
                >
                  FAVORITE
                </h2>
              </div>

              {/* Handwritten Body */}
              <div
                style={{ fontFamily: "'Caveat', cursive" }}
                className="relative z-10 my-4 flex flex-col gap-3 px-2 text-center"
              >
                <p className="inline-block transform rotate-[-1.8deg] text-[16px] italic leading-snug text-[#2c1810] sm:text-[19px] sm:leading-relaxed">
                  It's kind of wild to think about how long we've known each
                  other now. We were just kids when we met, and somehow we've
                  grown up side by side, figuring it all out as we went. I don't
                  think either of us knew back then what it would turn into, but
                  looking at us now, I'm so glad it did.
                </p>

                <p className="inline-block transform rotate-[1.2deg] text-[16px] italic leading-snug text-[#2c1810] sm:text-[19px] sm:leading-relaxed">
                  You've been there through every version of me—through all the
                  messy, brilliant, and totally ordinary parts of life—and I
                  honestly can't imagine doing any of it without you. You've got
                  this way of making everything feel a bit lighter, a bit
                  better, just by being you.
                </p>
              </div>

              {/* Footer Accents with Left and Right GIFs */}
              <div className="relative z-10 mt-1 flex w-full items-center justify-center gap-2 sm:gap-4 select-none">
                {/* Left GIF */}
                <img
                  src={leftGif}
                  alt="Love accent left"
                  className="h-15 w-15 lg:h-20 lg:w-20 sm:h-12 sm:w-12 object-contain drop-shadow-sm -scale-x-100"
                />

                {/* Center Text */}
                <div
                  style={{ fontFamily: "'Permanent Marker', cursive" }}
                  className="text-center text-[#9e1c28]"
                >
                  <p className="text-[11px] tracking-wider sm:text-sm">
                    I LOVE YOU SO MUCH.
                  </p>
                  <p className="text-[10px] tracking-wider sm:text-xs">
                    ALWAYS HAVE, ALWAYS WILL.
                  </p>
                  <p className="pt-0.5 text-base tracking-[0.25em] text-[#9e1c28]">
                    XXX
                  </p>
                </div>

                {/* Right GIF */}
                <img
                  src={rightGif}
                  alt="Love accent right"
                  className="h-15 w-15 lg:h-20 lg:w-20 sm:h-12 sm:w-12 object-contain drop-shadow-sm"
                />
              </div>

              {/* Next Section Button */}
              <div className="relative z-10 mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={onHeartClick}
                  className="group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden rounded-full border border-[#f87171]/40 bg-linear-to-r from-[#9e1c28] via-[#b91c1c] to-[#7f1d1d] px-6 py-2.5 text-[11px] font-bold tracking-[0.2em] text-white uppercase shadow-[0_10px_25px_rgba(158,28,40,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_30px_rgba(158,28,40,0.5)] active:scale-95 sm:px-7 sm:py-3 sm:text-xs"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-xs shadow-inner transition-transform duration-300 group-hover:rotate-12">
                    📸
                  </span>

                  <span className="relative z-10 drop-shadow-sm">
                    Look At Our Memories
                  </span>

                  <span className="relative z-10 text-rose-200 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-white">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tap Instruction */}
        {stage === "sealed" && (
          <p className="mt-14 animate-pulse text-xs font-bold uppercase tracking-[0.3em] text-[#9e1c28] transition-opacity duration-300">
            ✨ Tap the letter to unseal ✨
          </p>
        )}
      </div>
    </section>
  );
}

export default MessageSection;
