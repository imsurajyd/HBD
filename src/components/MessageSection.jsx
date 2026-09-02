import React, { useState } from "react";

function MessageSection({ onHeartClick }) {
  const [letterOpen, setLetterOpen] = useState(false);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#fff7fa] via-[#fff1f5] to-[#ffeaf0] px-5 py-10">
      {!letterOpen ? (
        <div className="text-center">
          <button
            type="button"
            onClick={() => setLetterOpen(true)}
            className="text-8xl transition-transform duration-300 hover:scale-110"
          >
            💌
          </button>

          <p className="mt-5 text-sm uppercase tracking-[0.25em] text-[#a76576]">
            Tap the letter
          </p>
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          <div className="rounded-3xl bg-[#fffaf7] p-7 shadow-2xl sm:p-12">
            <p className="font-display text-2xl italic text-[#df6f8d]">
              Dear Love,
            </p>

            <p className="mt-6 leading-8 text-[#6f555b]">
              Today is a very special day because someone incredibly special
              came into this world. ❤️
            </p>

            <p className="mt-4 leading-8 text-[#6f555b]">
              I hope your 18th birthday brings you lots of happiness, beautiful
              memories, and everything your heart wishes for.
            </p>

            <p className="mt-6 text-center font-display text-3xl italic text-[#df6f8d]">
              Happy 18th Birthday ❤️
            </p>

            <p className="mt-8 text-right text-sm text-[#8d6972]">
              Someone who loves you 💗
            </p>
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={onHeartClick}
              aria-label="Open memories"
              className="text-6xl transition-transform duration-300 hover:scale-125 active:scale-95"
            >
              ❤️
            </button>

            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#a76576]">
              Tap the heart
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default MessageSection;
