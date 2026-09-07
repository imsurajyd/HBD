import { useEffect, useState, useRef, useMemo } from "react";

import CountdownScreen from "./components/CountdownScreen";
import BirthdayHero from "./components/BirthdayHero";
import MessageSection from "./components/MessageSection";
import MemoriesSection from "./components/MemoriesSection";

// Audio Imports
import COUNTDOWN_AUDIO_URL from "./assets/music/Countdown.mp3"; // 10s Ticking
import BIRTHDAY_AUDIO_URL from "./assets/music/Birthday.mp3"; // Birthday Hero Song
import FAVORITE_AUDIO_URL from "./assets/music/Favorite.mp3"; // GF's Favorite Song

// URL Params Reader Helper
function getUrlParams() {
  if (typeof window === "undefined") return { name: "Meri Jaan", targetDate: null };

  const params = new URLSearchParams(window.location.search);
  const name = params.get("name")?.trim() || "Babu";
  const dateParam = params.get("date"); // Format: 2026-09-09T00:00:00

  let parsedDate = null;
  if (dateParam) {
    const d = new Date(dateParam);
    if (!isNaN(d.getTime())) {
      parsedDate = d;
    }
  }

  return { name, targetDate: parsedDate };
}

function calculateTimeLeft(targetDate) {
  const difference = targetDate.getTime() - new Date().getTime();

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
  // 1. Dynamic Date & Name from URL (Fallback: 40s testing date)
  const { name: recipientName, targetDate: urlTargetDate } = useMemo(() => getUrlParams(), []);
  
  // Agar URL me ?date=... hai to wo use hoga, warna default 40s testing timer
  const birthdayDate = useMemo(() => {
    return urlTargetDate || new Date(Date.now() + 15 * 1000);
  }, [urlTargetDate]);

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(birthdayDate));
  const [stage, setStage] = useState("countdown");
  const [isMuted, setIsMuted] = useState(false);
  const [isLetterOpened, setIsLetterOpened] = useState(false);

  const countdownAudioRef = useRef(null);
  const birthdayAudioRef = useRef(null);
  const favoriteAudioRef = useRef(null);

  // 1. Audio Setup & Unlock
  useEffect(() => {
    const tickAudio = new Audio(COUNTDOWN_AUDIO_URL);
    tickAudio.loop = true;
    tickAudio.volume = 0.6;
    tickAudio.preload = "auto";
    countdownAudioRef.current = tickAudio;

    const bdayAudio = new Audio(BIRTHDAY_AUDIO_URL);
    bdayAudio.loop = true;
    bdayAudio.volume = 0.55;
    bdayAudio.preload = "auto";
    birthdayAudioRef.current = bdayAudio;

    const favAudio = new Audio(FAVORITE_AUDIO_URL);
    favAudio.loop = true;
    favAudio.volume = 0.65;
    favAudio.preload = "auto";
    favoriteAudioRef.current = favAudio;

    const unlockAudio = () => {
      if (countdownAudioRef.current) countdownAudioRef.current.load();
      if (birthdayAudioRef.current) birthdayAudioRef.current.load();
      if (favoriteAudioRef.current) favoriteAudioRef.current.load();
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      [countdownAudioRef, birthdayAudioRef, favoriteAudioRef].forEach((ref) => {
        if (ref.current) {
          ref.current.pause();
          ref.current = null;
        }
      });
    };
  }, []);

  // 2. Countdown Interval & 10s Trigger
  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft(birthdayDate);
      setTimeLeft(newTime);

      const isLastTenSeconds =
        !newTime.birthdayMode &&
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds <= 10 &&
        newTime.seconds > 0;

      if (isLastTenSeconds && countdownAudioRef.current && !isMuted) {
        if (countdownAudioRef.current.paused) {
          countdownAudioRef.current.currentTime = 0;
          countdownAudioRef.current.play().catch(() => {});
        }
      }

      if (newTime.birthdayMode) {
        setStage((curr) => {
          if (curr === "countdown") {
            window.history.replaceState({ stage: "birthday" }, "");
            return "birthday";
          }
          return curr;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [birthdayDate, isMuted]);

  // 3. Native Back Button Listener (popstate)
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.stage) {
        setStage(event.state.stage);
      } else {
        setStage("birthday");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (nextStage) => {
    window.history.pushState({ stage: nextStage }, "");
    setStage(nextStage);
  };

  // 4. Music Switch: Letter Open hone par Favorite Song start hoga
  useEffect(() => {
    const tick = countdownAudioRef.current;
    const bday = birthdayAudioRef.current;
    const fav = favoriteAudioRef.current;

    if (stage === "countdown") {
      if (bday) bday.pause();
      if (fav) fav.pause();
    } else if (stage === "birthday") {
      if (tick) tick.pause();
      if (fav) fav.pause();

      const timer = setTimeout(() => {
        if (bday && !isMuted && bday.paused) {
          bday.play().catch(() => {});
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (stage === "message") {
      if (tick) tick.pause();

      if (isLetterOpened) {
        if (bday) bday.pause();
        if (fav && !isMuted && fav.paused) {
          fav.play().catch(() => {});
        }
      } else {
        if (fav) fav.pause();
        if (bday && !isMuted && bday.paused) {
          bday.play().catch(() => {});
        }
      }
    } else if (stage === "memories") {
      if (bday) bday.pause();
      if (tick) tick.pause();
      if (fav && !isMuted && fav.paused) {
        fav.play().catch(() => {});
      }
    }
  }, [stage, isLetterOpened, isMuted]);

  // 5. Global Mute Sync
  useEffect(() => {
    if (countdownAudioRef.current) countdownAudioRef.current.muted = isMuted;
    if (birthdayAudioRef.current) birthdayAudioRef.current.muted = isMuted;
    if (favoriteAudioRef.current) favoriteAudioRef.current.muted = isMuted;
  }, [isMuted]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#580C0D] text-[#E6DDD1]">
      {/* 🍷 Floating Audio Button (Luxury Wine & Champagne Glassmorphism) */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label="Toggle Sound"
        className="fixed bottom-5 right-5 z-999 flex h-8 w-8 lg:h-12 lg:w-12 cursor-pointer items-center justify-center rounded-full border border-[#D4A373]/40 bg-[#580C0D]/90 lg:text-xl text-sm text-[#E6DDD1] shadow-[0_8px_25px_rgba(0,0,0,0.45)] backdrop-blur-md transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        {isMuted ? "🔇" : "🎵"}
      </button>

      {/* Screens */}
      {stage === "countdown" && (
        <CountdownScreen timeLeft={timeLeft} recipientName={recipientName} />
      )}

      {stage === "birthday" && (
        <BirthdayHero recipientName={recipientName} onTeddyClick={() => navigateTo("message")} />
      )}

      {stage === "message" && (
        <MessageSection
          recipientName={recipientName}
          isOpened={isLetterOpened}
          setIsOpened={setIsLetterOpened}
          onHeartClick={() => navigateTo("memories")}
        />
      )}

      {stage === "memories" && <MemoriesSection recipientName={recipientName} />}
    </main>
  );
}

export default App;