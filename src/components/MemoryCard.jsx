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
            ? "cursor-pointer hover:scale-[1.02] active:scale-95 drop-shadow-[0_20px_40px_rgba(60,35,45,0.28)]"
            : "pointer-events-none drop-shadow-[0_8px_18px_rgba(60,35,45,0.12)]"
      }`}
    >
      {/* Vintage Photo Paper Frame */}
      <div className="relative rounded-[2px] border border-[#e5d9c5] bg-[#fbf8f2] p-3 pb-7 shadow-inner sm:p-4 sm:pb-9">
        {/* Scalloped Edge Mask */}
        <div
          className="pointer-events-none absolute -inset-[3px] rounded-xs opacity-60"
          style={{
            backgroundImage: `radial-gradient(circle, transparent 2px, #fbf8f2 2px)`,
            backgroundSize: "8px 8px",
          }}
        />

        {/* Inner Photo Frame */}
        <div className="relative h-56 w-72 overflow-hidden rounded-[2px] bg-[#e8e0d2] shadow-[inset_0_1px_4px_rgba(0,0,0,0.15)] sm:h-64 sm:w-80">
          <img
            src={memory.image}
            alt={memory.caption}
            className="pointer-events-none h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-amber-900/5 mix-blend-multiply" />
        </div>

        {/* Handwritten Caption & Date */}
        <div className="mt-3 text-center">
          <p
            style={{ fontFamily: "'Caveat', cursive" }}
            className="text-xl font-bold tracking-wide text-[#3f252b] sm:text-2xl"
          >
            {memory.caption}
          </p>
          {memory.date && (
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#9b727d]">
              {memory.date}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemoryCard;
