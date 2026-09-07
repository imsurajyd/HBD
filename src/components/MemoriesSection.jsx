import { useEffect, useState } from "react";
import { memories } from "../data/memories";
import MemoryCard from "./MemoryCard";

// Sticker Imports
import CameraSticker from "../assets/stickers/Camera.png";
import DaisySticker from "../assets/stickers/Daisy Flower.png";
import BowSticker from "../assets/stickers/Flower.png";
import DriedFlowerSticker from "../assets/stickers/Flower2.png";
import HibiscusSticker from "../assets/stickers/Pokie.png";

function MemoriesSection({ selectedAlbum, setSelectedAlbum }) {
  const [deck, setDeck] = useState([]);
  const [peeledStack, setPeeledStack] = useState([]);
  const [removingId, setRemovingId] = useState(null);
  const [returningId, setReturningId] = useState(null);

  // Album Selection Change hone par respective 18 photos load karna
  const handleSelectAlbum = (albumNumber) => {
    setSelectedAlbum(albumNumber);
    const albumPhotos =
      albumNumber === 1 ? memories.slice(0, 18) : memories.slice(18, 36);
    setDeck(albumPhotos);
    setPeeledStack([]);
    setRemovingId(null);
    setReturningId(null);
  };

  const handleBackToHub = () => {
    setSelectedAlbum(null);
    setDeck([]);
    setPeeledStack([]);
    setRemovingId(null);
    setReturningId(null);
  };

  const handlePhotoTap = (id) => {
    if (removingId !== null || returningId !== null || deck.length === 0) return;
    setRemovingId(id);

    const cardToPeel = deck.find((item) => item.id === id);

    setTimeout(() => {
      setDeck((prev) => prev.filter((item) => item.id !== id));
      if (cardToPeel) {
        setPeeledStack((prev) => [...prev, cardToPeel]);
      }
      setRemovingId(null);
    }, 400);
  };

  // 🔄 Reverse Peel Animation Handler
  const handlePreviousPhoto = () => {
    if (peeledStack.length === 0 || removingId !== null || returningId !== null) return;

    const lastPeeled = peeledStack[peeledStack.length - 1];
    setReturningId(lastPeeled.id);

    // Card wapas deck me add hoga
    setPeeledStack((prev) => prev.slice(0, -1));
    setDeck((prev) => [...prev, lastPeeled]);

    // Animation complete hone ke baad reset
    setTimeout(() => {
      setReturningId(null);
    }, 450);
  };

  const handleReset = () => {
    const albumPhotos =
      selectedAlbum === 1 ? memories.slice(0, 18) : memories.slice(18, 36);
    setDeck(albumPhotos);
    setPeeledStack([]);
    setRemovingId(null);
    setReturningId(null);
  };

  useEffect(() => {
    const handlePopState = (e) => {
      if (peeledStack.length > 0 && deck.length > 0) {
        e.preventDefault();
        handlePreviousPhoto();
        window.history.pushState({ stage: "memories" }, "");
      } else if (selectedAlbum !== null) {
        e.preventDefault();
        handleBackToHub();
        window.history.pushState({ stage: "memories" }, "");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [peeledStack, deck.length, selectedAlbum]);

  const visibleCards = deck.slice(-4);
  const isFirstPhoto = peeledStack.length === 0;

  // Single button handler (no glitch/jump)
  const handleBottomButtonClick = () => {
    if (isFirstPhoto) {
      handleBackToHub();
    } else {
      handlePreviousPhoto();
    }
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#580C0D] via-[#48090a] to-[#3a0607] px-4 py-6 text-[#E6DDD1] select-none sm:py-8">
      {/* Ambient Wine Orbs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#8c1c20]/30 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#E6DDD1]/10 blur-3xl animate-pulse" />

      {/* 📷 1. Vintage Camera Sticker (Top Left) */}
      <img
        src={CameraSticker}
        alt="Vintage Camera"
        className="pointer-events-none absolute left-[4%] top-[22%] lg:left-[4%] lg:top-[8%] z-50 w-20 sm:w-28 -rotate-12 drop-shadow-[0_12px_20px_rgba(0,0,0,0.55)] opacity-90 transition-transform duration-500 hover:scale-110"
      />

      {/* 🎀 2. Coquette Pink Bow Sticker (Top Right) */}
      <img
        src={BowSticker}
        alt="Pink Bow Sticker"
        className="pointer-events-none absolute right-[5%] top-[10%] z-40 w-16 sm:w-24 rotate-12 drop-shadow-[0_10px_18px_rgba(0,0,0,0.5)] opacity-100"
      />

      {/* 🌼 3. Daisy Bouquet Sticker (Bottom Left) */}
      <img
        src={DaisySticker}
        alt="Daisy Bouquet"
        className="pointer-events-none absolute left-[4%] bottom-[8%] w-22 sm:w-32 rotate-6 drop-shadow-[0_12px_22px_rgba(0,0,0,0.6)] opacity-90"
      />

      {/* 🌾 4. Dried Vintage Flower Sticker (Bottom Right) */}
      <img
        src={DriedFlowerSticker}
        alt="Dried Flower Bouquet"
        className="pointer-events-none absolute right-[6%] bottom-[15%] z-50 w-18 sm:w-26 -rotate-6 drop-shadow-[0_12px_22px_rgba(0,0,0,0.6)] opacity-85"
      />

      {/* 🌺 5. Hibiscus Sticker */}
      <img
        src={HibiscusSticker}
        alt="Pink Hibiscus"
        className="pointer-events-none absolute left-[3%] top-[3%] lg:left-[48%] lg:top-[25%] z-50 w-14 sm:w-20 -rotate-12 drop-shadow-md opacity-80 blur-[0.5px]"
      />

      {/* VIEW 1: ALBUM SELECTION HUB */}
      {selectedAlbum === null ? (
        <div className="relative z-10 flex min-h-[82vh] w-full flex-col items-center justify-center text-center">
          <div className="flex items-center gap-3 select-none">
            <span className="h-px w-6 bg-[#D4A373]/60 sm:w-10" />
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#D4A373] sm:text-[11px]">
              ✦ Choose A Collection ✦
            </p>
            <span className="h-px w-6 bg-[#D4A373]/60 sm:w-10" />
          </div>

          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-[#E6DDD1] sm:text-5xl">
            Memories Of{" "}
            <span className="italic font-serif font-medium text-[#D4A373]">
              Us
            </span>
          </h2>

          <p
            style={{ fontFamily: "'Caveat', cursive" }}
            className="mt-1 text-lg text-[#E6DDD1]/80 sm:text-2xl"
          >
            Select a chapter to unlock 18 special memories ♡
          </p>

          <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:gap-8">
            {/* SECTION 1 */}
            <div
              onClick={() => handleSelectAlbum(1)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-[#D4A373]/40 bg-[#3a0607]/80 p-4 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#D4A373] active:scale-95"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black/40">
                <img
                  src={memories[0]?.url || memories[0]?.image}
                  alt="Album 1 Cover"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-3 right-3 rounded-full border border-[#D4A373]/60 bg-[#580C0D]/90 px-3 py-1 text-[10px] font-bold tracking-wider text-[#E6DDD1] backdrop-blur-sm">
                  18 PHOTOS
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A373]">
                    Collection 01
                  </p>
                  <h3
                    style={{ fontFamily: "'Permanent Marker', cursive" }}
                    className="text-2xl text-white drop-shadow-md"
                  >
                    Memories of Us 💞
                  </h3>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between px-1">
                <span
                  style={{ fontFamily: "'Caveat', cursive" }}
                  className="text-base text-[#E6DDD1]/80"
                >
                  Open 18 Photos 💖
                </span>
                <span className="text-lg text-[#D4A373] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>

            {/* SECTION 2 */}
            <div
              onClick={() => handleSelectAlbum(2)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-[#D4A373]/40 bg-[#3a0607]/80 p-4 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#D4A373] active:scale-95"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black/40">
                <img
                  src={
                    memories[18]?.url ||
                    memories[18]?.image ||
                    memories[0]?.url ||
                    memories[0]?.image
                  }
                  alt="Album 2 Cover"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-3 right-3 rounded-full border border-[#D4A373]/60 bg-[#580C0D]/90 px-3 py-1 text-[10px] font-bold tracking-wider text-[#E6DDD1] backdrop-blur-sm">
                  18 PHOTOS
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A373]">
                    Collection 02
                  </p>
                  <h3
                    style={{ fontFamily: "'Permanent Marker', cursive" }}
                    className="text-2xl text-white drop-shadow-md"
                  >
                    Dia 💝
                  </h3>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between px-1">
                <span
                  style={{ fontFamily: "'Caveat', cursive" }}
                  className="text-base text-[#E6DDD1]/80"
                >
                  Open 18 Photos ✨
                </span>
                <span className="text-lg text-[#D4A373] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW 2: 18-PHOTO STACK VIEW */
        <>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="flex items-center gap-3 select-none">
              <span className="h-px w-6 bg-[#D4A373]/60 sm:w-10" />
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#D4A373] sm:text-[11px]">
                {selectedAlbum === 1 ? "Chapter 1" : "Chapter 2"} • 18 Moments
              </p>
              <span className="h-px w-6 bg-[#D4A373]/60 sm:w-10" />
            </div>

            <h2 className="font-display mt-2 text-4xl font-bold tracking-tight text-[#E6DDD1] sm:text-6xl">
              Captured{" "}
              <span className="italic font-serif font-medium text-[#D4A373]">
                Memories
              </span>
            </h2>

            <p
              style={{ fontFamily: "'Caveat', cursive" }}
              className="mt-1 text-lg text-[#E6DDD1]/80 sm:text-2xl"
            >
              Tap the photo to peel • Tap button below to navigate
            </p>
          </div>

          {/* The Physical Photo Deck: Scaled properly for 4:5 cards */}
          <div className="relative my-auto flex h-[450px] w-full max-w-md items-center justify-center sm:h-[590px]">
            <div className="pointer-events-none absolute h-80 w-84 rounded-3xl bg-black/40 blur-2xl" />

            {deck.length > 0 ? (
              visibleCards.map((memory, index) => {
                const isTop = index === visibleCards.length - 1;
                const isReturning = returningId === memory.id;

                return (
                  <div
                    key={memory.id}
                    className={`absolute inset-0 flex items-center justify-center ${
                      isReturning
                        ? "animate-[reversePeelIn_0.45s_cubic-bezier(0.16,1,0.3,1)_forwards] z-50"
                        : ""
                    }`}
                  >
                    <MemoryCard
                      memory={memory}
                      index={index}
                      isTop={isTop}
                      isRemoving={removingId === memory.id}
                      onTap={() => handlePhotoTap(memory.id)}
                    />
                  </div>
                );
              })
            ) : (
              <div className="relative z-20 flex w-full max-w-xs flex-col items-center rounded-3xl border border-[#D4A373]/40 bg-[#E6DDD1] p-8 text-center shadow-2xl backdrop-blur-md animate-[popIn_0.5s_ease-out_forwards]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#580C0D]/10 text-4xl shadow-inner">
                  💝
                </div>
                <h3
                  style={{ fontFamily: "'Permanent Marker', cursive" }}
                  className="mt-4 text-2xl text-[#580C0D]"
                >
                  Every Memory With You Is Pure Magic
                </h3>
                <p
                  style={{ fontFamily: "'Caveat', cursive" }}
                  className="mt-2 text-xl text-[#580C0D]/80"
                >
                  And the best chapters are still yet to be written...
                </p>

                <div className="mt-6 flex flex-col gap-2 w-full">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#D4A373]/50 bg-[#580C0D] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#E6DDD1] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#6e1012] active:scale-95"
                  >
                    <span>🔄 View Again</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBackToHub}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#580C0D]/30 bg-transparent px-6 py-2 text-xs font-bold uppercase tracking-wider text-[#580C0D] transition-all hover:bg-black/5"
                  >
                    <span>← Other Chapter</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Controls: Unified Smooth Button */}
          <div className="relative z-20 flex flex-col items-center gap-2 pb-3">
            {deck.length > 0 && (
              <button
                type="button"
                onClick={handleBottomButtonClick}
                className="group flex cursor-pointer items-center justify-center rounded-full border border-[#D4A373]/40 bg-[#E6DDD1] px-6 py-2 text-xs font-bold uppercase tracking-wider text-[#580C0D] shadow-md transition-all duration-200 hover:bg-white hover:shadow-lg active:scale-95"
              >
                <div className="relative flex h-4 items-center justify-center overflow-hidden">
                  {/* State 1: Back to Albums */}
                  <span
                    className={`flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                      isFirstPhoto
                        ? "opacity-100 translate-y-0 relative pointer-events-auto"
                        : "opacity-0 -translate-y-3 absolute pointer-events-none"
                    }`}
                  >
                    <span className="transition-transform group-hover:-translate-x-0.5">←</span>
                    <span>Back To Albums</span>
                  </span>

                  {/* State 2: Previous Photo */}
                  <span
                    className={`flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
                      !isFirstPhoto
                        ? "opacity-100 translate-y-0 relative pointer-events-auto"
                        : "opacity-0 translate-y-3 absolute pointer-events-none"
                    }`}
                  >
                    <span className="transition-transform group-hover:-translate-x-0.5">↩</span>
                    <span>Previous Photo</span>
                  </span>
                </div>
              </button>
            )}
          </div>
        </>
      )}

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

        /* 💫 Reverse Peel Animation */
        @keyframes reversePeelIn {
          0% {
            opacity: 0;
            transform: translate(120px, -60px) rotate(16deg) scale(0.9);
          }
          70% {
            opacity: 0.95;
            transform: translate(-6px, 4px) rotate(-3deg) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translate(0px, 0px) rotate(0deg) scale(1);
          }
        }
      `}</style>
    </section>
  );
}

export default MemoriesSection;