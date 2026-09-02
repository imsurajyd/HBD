function MemoryCard({ memory, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative w-full cursor-pointer text-left ${memory.rotation} transition-all duration-500 hover:z-20 hover:rotate-0 hover:scale-[1.03]`}
    >
      <div className="absolute -top-3 left-1/2 z-20 h-7 w-20 -translate-x-1/2 rotate-2 bg-pink-200/70 shadow-sm" />

      <div className="rounded-sm bg-white p-3 pb-5 shadow-xl shadow-pink-200/30">
        <div className="relative overflow-hidden bg-pink-50">
          <img
            src={memory.image}
            alt={memory.caption}
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-[#5b343f]/10 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-white/90 px-4 py-2 text-xs text-[#a76576] shadow-lg">
              Tap to view ❤️
            </span>
          </div>
        </div>

        <div className="px-2 pt-4">
          <p className="font-display text-xl italic text-[#5b343f]">
            {memory.caption}
          </p>

          <p className="mt-1 text-[10px] uppercase tracking-widest text-[#b28a94]">
            {memory.date}
          </p>
        </div>
      </div>

      <div className="absolute -right-3 -top-3 text-2xl opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100">
        💗
      </div>
    </button>
  );
}

export default MemoryCard;
