function TimeBox({ value, label }) {
  return (
    <div className="group relative flex flex-col items-center justify-center rounded-2xl border border-[#E6DDD1]/20 bg-[#E6DDD1]/10 px-2 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 sm:px-4 sm:py-4">
      {/* Subtle Inner Highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-linear-to-b from-[#E6DDD1]/15 to-transparent" />

      {/* Number Display (Warm Cream High Contrast) */}
      <div className="font-display text-3xl font-bold tracking-tight text-[#E6DDD1] sm:text-5xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
        {String(value).padStart(2, "0")}
      </div>

      {/* Label (Soft Rose Gold Accent) */}
      <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#D4A373] sm:text-[10px]">
        {label}
      </div>
    </div>
  );
}

export default TimeBox;