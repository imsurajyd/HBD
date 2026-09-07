import React from "react";

function MemoryCard({ memory, index, isTop, isRemoving, onTap }) {
  const cardRotation = memory.rotation ?? 0;

  return (
    <div
      onClick={isTop ? onTap : undefined}
      style={{
        transform: isRemoving
          ? "translate(150px, -90px) rotate(22deg) scale(0.85)"
          : `rotate(${cardRotation}deg)`,
        zIndex: index + 10,
      }}
      className={`absolute select-none transition-all duration-500 ease-out ${
        isRemoving
          ? "pointer-events-none opacity-0"
          : isTop
            ? "cursor-pointer hover:scale-[1.02] active:scale-95 drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)]"
            : "pointer-events-none drop-shadow-[0_10px_22px_rgba(0,0,0,0.35)]"
      }`}
    >
      {/* 📜 Vintage Warm Cream Polaroid Frame */}
      <div className="relative rounded-[2px] border border-[#D5C8B8] bg-[#E6DDD1] p-3 pb-7 shadow-inner sm:p-4 sm:pb-9">
        {/* Scalloped Edge Mask */}
        <div
          className="pointer-events-none absolute -inset-[3px] rounded-xs opacity-50"
          style={{
            backgroundImage: `radial-gradient(circle, transparent 2px, #E6DDD1 2px)`,
            backgroundSize: "8px 8px",
          }}
        />

        {/* Inner Photo Frame */}
        <div className="relative h-56 w-72 overflow-hidden rounded-[2px] bg-[#D8CEBF] shadow-[inset_0_1px_5px_rgba(0,0,0,0.2)] sm:h-64 sm:w-80">
          <img
            src={memory.image}
            alt={memory.caption}
            className="pointer-events-none h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[#580C0D]/5 mix-blend-multiply" />
        </div>

        {/* Handwritten Caption & Date (Deep Wine Tone) */}
        <div className="mt-3 text-center">
          <p
            style={{ fontFamily: "'Caveat', cursive" }}
            className="text-xl font-bold tracking-wide text-[#580C0D] sm:text-2xl"
          >
            {memory.caption}
          </p>
          {memory.date && (
            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-[#8C1C20]/80">
              {memory.date}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemoryCard;