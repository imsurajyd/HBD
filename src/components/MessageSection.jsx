import { useState, useMemo } from "react";
import CanvasEnvelope from "./CanvasEnvelope";
import LetterMascot from "../assets/gifs/Lovem.gif";
import LetterBackground from "../assets/photos/LetterBackground.webp";

// 🎀 Real Corner Accent Stickers
import RedBowSticker from "../assets/stickers/redBow.png";
import ButterflySticker from "../assets/stickers/redButterfly.png";

function MessageSection({
  recipientName,
  isOpened,
  setIsOpened,
  onHeartClick,
}) {
  const [stage, setStage] = useState(isOpened ? "opened" : "sealed");

  const displayName = useMemo(() => {
    if (recipientName && recipientName.trim()) return recipientName.trim();
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const name = params.get("name")?.trim();
      if (name) return name;
    }
    return "Suraj";
  }, [recipientName]);

  const handleOpenComplete = () => {
    setTimeout(() => {
      setStage("opened");
      if (setIsOpened) setIsOpened(true);
    }, 150);
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-linear-to-b from-[#580C0D] via-[#48090a] to-[#3a0607] px-4 py-8 text-[#E6DDD1] select-none">
      {/* Ambient Atmosphere Orbs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#8c1c20]/30 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#E6DDD1]/10 blur-3xl animate-pulse" />

      {/* Floating Sparkles & Accents */}
      <div className="pointer-events-none absolute left-[10%] top-[16%] text-3xl opacity-50 animate-bounce">
        💌
      </div>
      <div className="pointer-events-none absolute right-[12%] top-[18%] text-3xl opacity-50 animate-pulse">
        💖
      </div>
      <div className="pointer-events-none absolute bottom-[14%] left-[12%] text-2xl opacity-40 animate-pulse">
        ✦
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
            <span className="h-px w-6 bg-[#D4A373]/60 sm:w-10" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A373]">
              ✦ a special note for you ✦
            </p>
            <span className="h-px w-6 bg-[#D4A373]/60 sm:w-10" />
          </div>

          <h2 className="font-display mt-2 text-4xl font-bold tracking-tight text-[#E6DDD1] sm:text-5xl">
            You Have Received a{" "}
            <span className="italic font-serif font-medium text-[#D4A373]">
              Letter
            </span>
          </h2>

          <div className="mt-3 flex justify-center">
            <img
              src={LetterMascot}
              alt="Cute Mascot with letter"
              className="h-24 w-24 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-110 sm:h-28 sm:w-28"
            />
          </div>
        </div>

        {/* Envelope & Letter Interactive Group */}
        <div className="relative mt-1 lg:mt-6 flex h-56 w-full items-center justify-center">
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

          {/* Opened Letter Paper (Modal Container) */}
          <div
            className={`fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              stage === "opened"
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-90 pointer-events-none"
            }`}
          >
            {/* 💌 Message Card (Aspect Locked & Zero Distortion) */}
            <div
              style={{ backgroundImage: `url(${LetterBackground})` }}
              className="relative flex h-[88vh] sm:h-[90dvh] aspect-9/16 max-w-full flex-col items-center justify-between rounded-2xl bg-cover bg-center bg-no-repeat px-6 py-8 text-[#580C0D] drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] select-none mx-auto sm:px-8 sm:py-10"
            >
              {/* 🎀 1. Top-Left Red Ribbon Bow (Half inside, half outside) */}
              <img
                src={RedBowSticker}
                alt="Red Ribbon Bow"
                className="pointer-events-none absolute -top-1 -left-2 z-999 w-25 sm:w-30 -rotate-15 drop-shadow-[0_12px_20px_rgba(0,0,0,0.7)]"
              />

              {/* 🦋 2. Bottom-Right Crimson Butterfly (Half on card, half flying off) */}
              <img
                src={ButterflySticker}
                alt="Crimson Butterfly"
                className="pointer-events-none absolute bottom-1 -right-10 z-999 w-27 sm:w-35 rotate-12 drop-shadow-[0_12px_22px_rgba(0,0,0,0.75)]"
              />

              {/* Scattered Subtle Background Hearts */}
              <div className="pointer-events-none absolute inset-0 select-none overflow-hidden opacity-30 rounded-2xl">
                <span className="absolute left-[10%] top-[8%] text-lg sm:text-xl">
                  💕
                </span>
                <span className="absolute right-[12%] top-[10%] text-base sm:text-lg -rotate-12">
                  💗
                </span>
                <span className="absolute left-[14%] top-[30%] text-sm rotate-12">
                  💖
                </span>
                <span className="absolute right-[14%] top-[34%] text-base">
                  💕
                </span>
                <span className="absolute left-[10%] top-[54%] text-lg -rotate-12">
                  💗
                </span>
                <span className="absolute right-[12%] top-[58%] text-sm rotate-45">
                  💖
                </span>
                <span className="absolute left-[14%] bottom-[20%] text-base">
                  💕
                </span>
                <span className="absolute right-[14%] bottom-[22%] text-lg -rotate-6">
                  💗
                </span>
                <span className="absolute left-[26%] bottom-[12%] text-xs">
                  💖
                </span>
                <span className="absolute right-[26%] bottom-[14%] text-xs">
                  💕
                </span>
              </div>

              {/* Handwritten Letter Content Wrapper with Rotations */}
              <div
                style={{ fontFamily: "'Caveat', cursive" }}
                className="relative z-10 my-auto flex w-full flex-col gap-2.5 px-2 text-center text-[#3a0607]"
              >
                {/* Personal Salutation Greeting with Kiss Emoji */}
                <p className="text-xl sm:text-2xl font-bold text-[#580C0D] capitalize">
                  Happiest 18th Birthday meri Kucchu Pucchu Dia 😘,
                </p>

                {/* Main body of the message, split into rotated blocks for natural handwritten feel */}
                <p className="inline-block transform -rotate-1 text-[13.5px] sm:text-[15.5px] italic leading-snug">
                  Mera birthday to kaafi accha gaya ghume khaye masti kiye maza
                  aaya but tumhara shayad thoda kam ho kyuki tum ghum nhi paogi
                  jyada. Aage aane wala saal bahut mast hoga naye dost milenge
                  or naya experience hoga.
                </p>

                <p className="inline-block transform rotate-1 text-[13.5px] sm:text-[15.5px] italic leading-snug">
                  Aaj tum finally 18+ ho gayi or ab tumko kaafi sara freedom
                  milega. Ab tum vote bhi de sakogi. Aane wala saal bahut kuch
                  sikhayega. Hum ummid krte hain tum hamesha khush raho or aise
                  hi mere sath pyar se raho.
                </p>

                <p className="inline-block transform -rotate-1 text-[13.5px] sm:text-[15.5px] italic leading-snug">
                  Mehnat kro padho likho duniya dekho or maze karo... I hope God
                  will fulfill all your dreams or agar nhi bhi pura ho paye to
                  kuch or accha plan hoga god ka. Bas tum khud pe bharosa rakho
                  or khul ke jiyo.
                </p>
              </div>

              {/* Footer Accents */}
              <div className="relative z-10 mt-1 flex w-full items-center justify-end pr-2 select-none">
                <div
                  style={{ fontFamily: "'Permanent Marker', cursive" }}
                  className="text-right text-[#580C0D] leading-tight"
                >
                  <p className="text-[10px] sm:text-[11.5px] tracking-wider uppercase font-bold">
                    I LOVE YOU SO MUCH,
                    <br /> {displayName}.
                  </p>

                  <p className="pt-0.5 text-sm sm:text-base tracking-[0.25em] text-[#580C0D]">
                    XXX
                  </p>
                </div>
              </div>

              {/* Next Section Icon Button */}
              <div className="relative z-20 mt-3 flex justify-center pb-2">
                <button
                  type="button"
                  onClick={onHeartClick}
                  className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-[#D4A373]/50 bg-gradient-to-r from-[#580C0D] via-[#6f1214] to-[#45090a] px-5 py-2 text-[10px] font-bold tracking-[0.2em] text-[#E6DDD1] uppercase shadow-[0_8px_20px_rgba(88,12,13,0.55)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_25px_rgba(88,12,13,0.75)] active:scale-95 sm:px-6 sm:py-2.5 sm:text-xs"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#E6DDD1]/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

                  <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#E6DDD1]/15 text-xs shadow-inner transition-transform duration-300 group-hover:rotate-12">
                    📸
                  </span>

                  <span className="relative z-10 drop-shadow-xs">Memories</span>

                  <span className="relative z-10 text-[#D4A373] transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[#E6DDD1]">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tap Instruction */}
        {stage === "sealed" && (
          <p className="mt-14 animate-pulse text-xs font-bold uppercase tracking-[0.3em] text-[#D4A373] transition-opacity duration-300">
            ✨ Tap the letter to unseal ✨
          </p>
        )}
      </div>
    </section>
  );
}

export default MessageSection;
