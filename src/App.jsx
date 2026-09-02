import React, { useEffect, useState, useRef } from "react";

import CountdownScreen from "./components/CountdownScreen";
import BirthdayHero from "./components/BirthdayHero";
import MessageSection from "./components/MessageSection";
import MemoriesSection from "./components/MemoriesSection";

// TESTING: 8 seconds (Aapke test ke mutabiq)
const BIRTHDAY_DATE = new Date(Date.now() + 8 * 1000);

// FINAL:
// const BIRTHDAY_DATE = new Date("2026-09-09T00:00:00");

function getTimeLeft() {
  const difference = BIRTHDAY_DATE.getTime() - new Date().getTime();

  if (difference <= 0) {
    return {
      birthdayMode: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    birthdayMode: false,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function App() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [stage, setStage] = useState("countdown");
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Dedicated Audio Refs
  const countdownAudioRef = useRef(null);
  const birthdayAudioRef = useRef(null);

  // 1. Initialize Audios with Preload & Volume
  useEffect(() => {
    const countAudio = new Audio("/countdown-sound.mp3");
    countAudio.loop = true;
    countAudio.volume = 0.5;
    countAudio.preload = "auto";
    countdownAudioRef.current = countAudio;

    const bdayAudio = new Audio("/birthday-song.mp3");
    bdayAudio.loop = true;
    bdayAudio.volume = 0.65;
    bdayAudio.preload = "auto";
    birthdayAudioRef.current = bdayAudio;

    // Browser audio unlock on first user touch / click
    const unlockAudio = () => {
      setHasInteracted(true);

      // Silent dummy play to unlock browser audio context
      if (countdownAudioRef.current && stage === "countdown") {
        countdownAudioRef.current.play().catch(() => {});
      }

      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      if (countdownAudioRef.current) {
        countdownAudioRef.current.pause();
        countdownAudioRef.current = null;
      }
      if (birthdayAudioRef.current) {
        birthdayAudioRef.current.pause();
        birthdayAudioRef.current = null;
      }
    };
  }, []);

  // 2. Countdown Interval Tracker
  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = getTimeLeft();
      setTimeLeft(newTime);

      if (newTime.birthdayMode) {
        setStage((curr) => (curr === "countdown" ? "birthday" : curr));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 3. Stage Change Music Transition
  useEffect(() => {
    if (stage !== "countdown") {
      // Step A: Countdown audio ko gracefully fade & stop karo
      if (countdownAudioRef.current) {
        countdownAudioRef.current.pause();
        countdownAudioRef.current.currentTime = 0;
      }

      // Step B: Blast hone ke thik baad Birthday Song guarantee play karo
      const songDelay = setTimeout(() => {
        if (birthdayAudioRef.current && !isMuted) {
          birthdayAudioRef.current
            .play()
            .then(() => {
              // Playing successfully
            })
            .catch((err) => {
              console.warn(
                "Audio autoplay blocked by browser policy, tap anywhere to resume:",
                err,
              );
            });
        }
      }, 1400); // 1.4s delay so that popper blast plays cleanly first

      return () => clearTimeout(songDelay);
    }
  }, [stage, isMuted]);

  // 4. Global Mute / Unmute Synchronization
  useEffect(() => {
    if (countdownAudioRef.current) {
      countdownAudioRef.current.muted = isMuted;
    }
    if (birthdayAudioRef.current) {
      birthdayAudioRef.current.muted = isMuted;
      if (
        !isMuted &&
        stage !== "countdown" &&
        birthdayAudioRef.current.paused
      ) {
        birthdayAudioRef.current.play().catch(() => {});
      }
    }
  }, [isMuted, stage]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <main
      onClick={() => {
        // Fallback: Agar browser ne block kiya ho toh kisi bhi tap par song force play ho jaye
        if (
          stage !== "countdown" &&
          birthdayAudioRef.current &&
          birthdayAudioRef.current.paused &&
          !isMuted
        ) {
          birthdayAudioRef.current.play().catch(() => {});
        }
      }}
      className="relative min-h-screen w-full overflow-x-hidden bg-[#fff5f7] text-[#4a2835]"
    >
      {/* Floating Audio Control Pill */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleMute();
        }}
        aria-label="Toggle Sound"
        className="fixed bottom-5 right-5 z-[999] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-rose-200/80 bg-white/85 text-xl shadow-[0_8px_20px_rgba(244,114,182,0.25)] backdrop-blur-md transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        {isMuted ? "🔇" : "🎵"}
      </button>

      {/* 1️⃣ Countdown Screen */}
      {stage === "countdown" && <CountdownScreen timeLeft={timeLeft} />}

      {/* 2️⃣ Birthday Hero Section */}
      {stage === "birthday" && (
        <BirthdayHero onTeddyClick={() => setStage("message")} />
      )}

      {/* 3️⃣ Envelope Message Section */}
      {stage === "message" && (
        <MessageSection onHeartClick={() => setStage("memories")} />
      )}

      {/* 4️⃣ Memories Section */}
      {stage === "memories" && <MemoriesSection />}
    </main>
  );
}

export default App;
