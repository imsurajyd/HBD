import React, { useState, useRef } from "react";

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio playback error:", err);
        });
    }
  };

  return (
    <>
      {/* Audio element DOM mein direct mounted rahega */}
      <audio ref={audioRef} src="/Birthday.mp3" autoPlay loop preload="auto" />

      {/* Floating Button */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label="Toggle music"
        className="fixed bottom-5 right-5 z-999 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-2 border-pink-300 bg-white/95 text-2xl shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {isPlaying ? "🎵" : "🔇"}
      </button>
    </>
  );
}

export default MusicPlayer;
