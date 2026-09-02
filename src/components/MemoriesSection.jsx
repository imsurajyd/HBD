import React, { useState } from "react";
import { memories } from "../data/memories";
import MemoryCard from "./MemoryCard";

function MemoriesSection() {
  const [deck, setDeck] = useState(memories);
  const [removingId, setRemovingId] = useState(null);

  const totalPhotos = memories.length;
  const currentPhotoNum = totalPhotos - deck.length + 1;

  const handlePhotoTap = (id) => {
    if (removingId !== null || deck.length === 0) return;
    setRemovingId(id);

    setTimeout(() => {
      setDeck((prev) => prev.filter((item) => item.id !== id));
      setRemovingId(null);
    }, 450);
  };

  const handleReset = () => {
    setDeck(memories);
    setRemovingId(null);
  };

  // Performance stack: Keep top 4 photos rendered
  const visibleCards = deck.slice(-4);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#fff5f7] via-[#ffecf2] to-[#ffe4ec] px-4 py-8 text-[#4a2835] select-none">
      {/* 🌸 Ambient Atmosphere Orbs (Matched with App & Hero) */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-rose-200/40 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-pink-200/40 blur-3xl animate-pulse" />

      {/* Floating Aesthetic Stickers */}
      <div className="pointer-events-none absolute left-[8%] top-[12%] -rotate-12 text-3xl opacity-50 transition-transform duration-700 hover:rotate-12">
        🎞️
      </div>
      <div className="pointer-events-none absolute right-[10%] top-[15%] rotate-12 text-2xl opacity-60">
        ✨
      </div>
      <div className="pointer-events-none absolute bottom-[14%] left-[10%] rotate-6 text-2xl opacity-50">
        🌸
      </div>
      <div className="pointer-events-none absolute bottom-[18%] right-[8%] -rotate-12 text-3xl opacity-50">
        💌
      </div>

      {/* 🏷️ Header Section */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Vintage Stamp Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-[2px] bg-[#fce7ee]/80 px-3 py-0.5 shadow-xs -rotate-2">
          <span className="text-xs">✨</span>
          <p
            style={{ fontFamily: "'Caveat', cursive" }}
            className="text-base font-semibold text-[#8d4255]"
          >
            pieces of us
          </p>
        </div>

        <h2 className="font-display mt-2 text-4xl font-bold tracking-tight text-[#4a2835] sm:text-6xl">
          Captured <span className="italic text-[#df6f8d]">Memories</span>
        </h2>

        <p
          style={{ fontFamily: "'Caveat', cursive" }}
          className="mt-1 text-lg text-[#8d6972] sm:text-2xl"
        >
          Tap the photo to peel it away and uncover the next moment...
        </p>
      </div>

      {/* 📸 The Physical Photo Deck Area */}
      <div className="relative my-auto flex h-[410px] w-full max-w-sm items-center justify-center sm:h-[460px]">
        {/* Soft Desk shadow under the photo stack */}
        <div className="pointer-events-none absolute h-64 w-72 rounded-3xl bg-[#d49aa9]/25 blur-2xl" />

        {deck.length > 0 ? (
          visibleCards.map((memory, index) => {
            const isTop = index === visibleCards.length - 1;
            return (
              <MemoryCard
                key={memory.id}
                memory={memory}
                index={index}
                isTop={isTop}
                isRemoving={removingId === memory.id}
                onTap={() => handlePhotoTap(memory.id)}
              />
            );
          })
        ) : (
          /* Empty Deck Celebration Card */
          <div className="relative z-20 flex w-full max-w-xs flex-col items-center rounded-3xl border border-white/90 bg-[#fffdfa]/95 p-8 text-center shadow-2xl backdrop-blur-md animate-[popIn_0.5s_ease-out_forwards]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-4xl shadow-inner">
              💝
            </div>
            <h3
              style={{ fontFamily: "'Permanent Marker', cursive" }}
              className="mt-4 text-2xl text-[#9e1c28]"
            >
              Every Memory With You Is Pure Magic
            </h3>
            <p
              style={{ fontFamily: "'Caveat', cursive" }}
              className="mt-2 text-xl text-[#5b343f]"
            >
              And the best chapters are still yet to be written...
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="mt-6 flex cursor-pointer items-center gap-2 rounded-full bg-[#9e1c28] px-7 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#80141f] active:scale-95"
            >
              <span>🔄 Flip Deck Again</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}

export default MemoriesSection;
