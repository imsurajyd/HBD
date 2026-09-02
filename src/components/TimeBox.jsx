function TimeBox({ value, label }) {
  return (
    <div className="rounded-2xl border border-pink-200/60 bg-white/75 px-2 py-4 shadow-xl shadow-pink-200/20 backdrop-blur-md sm:px-5 sm:py-5">
      <div className="font-display text-3xl font-semibold text-[#d96180] sm:text-5xl">
        {String(value).padStart(2, "0")}
      </div>

      <div className="mt-1 text-[8px] uppercase tracking-widest text-[#a47782] sm:text-[10px]">
        {label}
      </div>
    </div>
  );
}

export default TimeBox;
