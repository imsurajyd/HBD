import React, { useState, useRef, useEffect } from "react";
import TimeBox from "./TimeBox";
import Wait from "../assets/gifs/Wait.gif";

// Subtle cute click pop audio
const playSoftPop = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  } catch (e) {}
};

function CountdownScreen({ timeLeft }) {
  const [isFastForwarding, setIsFastForwarding] = useState(false);
  const [fakeTime, setFakeTime] = useState(null); // { days, hours, minutes, seconds }
  const [bubbleMessage, setBubbleMessage] = useState(null);

  const fastForwardIntervalRef = useRef(null);
  const stageTimeoutRef = useRef(null);
  const cleanupTimeoutRef = useRef(null);

  // Aakhri 10 seconds check (Days, Hours, Mins = 0 aur Seconds <= 10)
  const isUrgent =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds <= 10 &&
    timeLeft.seconds > 0;

  // Agar timer aakhri 10 seconds me enter ho jaye, to prank turant cancel ho jayega
  useEffect(() => {
    if (isUrgent) {
      if (fastForwardIntervalRef.current) clearInterval(fastForwardIntervalRef.current);
      if (stageTimeoutRef.current) clearTimeout(stageTimeoutRef.current);
      if (cleanupTimeoutRef.current) clearTimeout(cleanupTimeoutRef.current);

      setIsFastForwarding(false);
      setFakeTime(null);
      setBubbleMessage(null);
    }
  }, [isUrgent]);

  const handleScreenClick = () => {
    // ⚠️ Agar 10 second ya usse kam bache hain, to prank trigger nahi hoga
    if (isUrgent) return;

    // Agar pehle se chal raha ho to ignore karein
    if (isFastForwarding || bubbleMessage !== null) return;

    playSoftPop();
    setIsFastForwarding(true);

    let d = Number(timeLeft.days) || 0;
    let h = Number(timeLeft.hours) || 0;
    let m = Number(timeLeft.minutes) || 0;
    let s = Number(timeLeft.seconds) || 14;

    setFakeTime({ days: d, hours: h, minutes: m, seconds: s });

    // Sabhi units ek sath rapidly collapse honge
    fastForwardIntervalRef.current = setInterval(() => {
      d = Math.max(0, d - 1);
      h = Math.max(0, h - 2);
      m = Math.max(0, m - 3);
      s = Math.max(0, s - 2);

      if (d === 0 && h === 0 && m === 0 && s === 0) {
        clearInterval(fastForwardIntervalRef.current);
        setFakeTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsFastForwarding(false);

        // 1st Message: 5 seconds tak poora timer 00 pe freeze
        setBubbleMessage("Lo ho gya time khatam, mana lo apna birthday 😏");

        // 5 seconds baad funny reveal
        stageTimeoutRef.current = setTimeout(() => {
          setBubbleMessage("Mazak tha babu! 🤣❤️");

          // 2.2 seconds baad real time restore
          cleanupTimeoutRef.current = setTimeout(() => {
            setBubbleMessage(null);
            setFakeTime(null);
          }, 2200);
        }, 8000);
      } else {
        setFakeTime({ days: d, hours: h, minutes: m, seconds: s });
      }
    }, 85);
  };

  // Prank ke dauran fake time dikhega, warna actual running time
  const currentDisplay = fakeTime !== null ? fakeTime : timeLeft;
  const isFrozenAtZero = fakeTime !== null && fakeTime.seconds === 0 && fakeTime.minutes === 0;

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

      {/* Content Container */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-200/80 bg-white/70 px-4 py-1 shadow-xs backdrop-blur-xs">
          <span className={`text-lg ${isFastForwarding ? "animate-spin" : "animate-pulse"}`}>
            ⏳
          </span>
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

        {/* Timer Grid (Chaaron boxes ek sath fast forward / freeze honge) */}
        <div
          className={`mt-6 grid w-full max-w-md grid-cols-4 gap-2 transition-all duration-200 sm:gap-4 ${
            isFastForwarding
              ? "scale-105 animate-[shake_0.15s_infinite]"
              : isFrozenAtZero
              ? "scale-105 drop-shadow-[0_0_15px_rgba(223,111,141,0.65)]"
              : isUrgent
              ? "scale-105"
              : "scale-100"
          }`}
        >
          <TimeBox value={currentDisplay.days} label="Days" />
          <TimeBox value={currentDisplay.hours} label="Hours" />
          <TimeBox value={currentDisplay.minutes} label="Minutes" />
          <TimeBox value={currentDisplay.seconds} label="Seconds" />
        </div>

        {/* Mascot + Two-Stage Dialogue Bubble */}
        <div className="relative mt-8 flex flex-col items-center justify-center">
          <div
            className={`absolute -top-11 z-20 whitespace-nowrap rounded-full border border-rose-300 bg-white/95 px-4 py-1.5 text-xs font-bold text-[#9e1c28] shadow-[0_8px_25px_rgba(244,114,182,0.35)] backdrop-blur-md transition-all duration-300 sm:text-sm ${
              bubbleMessage !== null
                ? "opacity-100 scale-100 -translate-y-1"
                : "opacity-0 scale-75 translate-y-2 pointer-events-none"
            }`}
          >
            {bubbleMessage}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rotate-45 border-r border-b border-rose-300 bg-white" />
          </div>

          <img
            src={Wait}
            alt="Cute celebration mascot"
            className={`h-28 w-auto object-contain drop-shadow-[0_12px_24px_rgba(158,28,40,0.15)] transition-transform duration-300 sm:h-32 ${
              isFastForwarding
                ? "scale-115 -translate-y-2"
                : bubbleMessage !== null
                ? "scale-110 -translate-y-1"
                : "hover:scale-105"
            }`}
          />
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-2px) rotate(-1.5deg); }
          75% { transform: translateX(2px) rotate(1.5deg); }
        }
      `}</style>
    </section>
  );
}

export default CountdownScreen;