import TimeBox from "./TimeBox";
import Wait from "../assets/gifs/Wait.gif";

function CountdownScreen({ timeLeft }) {
  // Urgent countdown threshold (Last 5 seconds)
  const isUrgent =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds <= 10 &&
    timeLeft.seconds > 0;

  return (
    <section
      className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-8 text-[#4a2835] transition-colors duration-1000 select-none ${
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

        {/* Timer Grid (Clean spacing + Modern Glass Effect) */}
        <div className="mt-6 grid w-full max-w-md grid-cols-4 gap-2 sm:gap-4">
          <TimeBox value={timeLeft.days} label="Days" />
          <TimeBox value={timeLeft.hours} label="Hours" />
          <TimeBox value={timeLeft.minutes} label="Minutes" />

          {/* Seconds Box: Smooth Pulsing without Remounting */}
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

        {/* Teddy / Heart Mascot */}
        <div className="mt-8 flex justify-center">
          <img
            src={Wait}
            alt="Cute celebration mascot"
            className="h-28 w-auto object-contain drop-shadow-[0_12px_24px_rgba(158,28,40,0.15)] transition-transform duration-300 hover:scale-105 sm:h-32"
          />
        </div>
      </div>
    </section>
  );
}

export default CountdownScreen;
