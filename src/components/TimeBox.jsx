function TimeBox({ value, label }) {
  return (
    <div className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/80 bg-[#fffdfa]/85 px-2 py-3 shadow-[0_10px_25px_rgba(223,111,141,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 sm:px-4 sm:py-4">
      {/* Subtle Inner Highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-linear-to-b from-white/60 to-transparent" />

      {/* Number Display */}
      <div className="font-display text-3xl font-bold tracking-tight text-[#9e1c28] sm:text-5xl drop-shadow-xs">
        {String(value).padStart(2, "0")}
      </div>

      {/* Label */}
      <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#8d6972] sm:text-[10px]">
        {label}
      </div>
    </div>
  );
}

export default TimeBox;
