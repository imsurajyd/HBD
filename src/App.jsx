import { useEffect, useState, useMemo } from "react";

import CountdownScreen from "./components/CountdownScreen";
import BirthdayHero from "./components/BirthdayHero";
import MessageSection from "./components/MessageSection";
import MemoriesSection from "./components/MemoriesSection";

// Custom Audio Hook
import { useSoundManager } from "./hooks/useSoundManager";

// 🎯 Final Birthday Target Date (Midnight 9th September 2026)
const BIRTHDAY_DATE = new Date("2026-09-09T00:00:00");

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
  const { name: recipientName, targetDate: urlTargetDate } = useMemo(() => getUrlParams(), []);
  
  // Agar URL me ?date=... hai to testing date use hogi, warna default final BIRTHDAY_DATE
  const birthdayDate = useMemo(() => {
    return urlTargetDate || BIRTHDAY_DATE;
  }, [urlTargetDate]);

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(birthdayDate));
  const [stage, setStage] = useState("countdown");
  const [isLetterOpened, setIsLetterOpened] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // 🎵 Extracted Audio Logic Hook
  const { isMuted, toggleMute, playCountdownTick } = useSoundManager({
    stage,
    isLetterOpened,
    selectedAlbum,
  });

  // Countdown Interval (Ticking audio continuous jab tak countdown chal raha hai)
  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft(birthdayDate);
      setTimeLeft(newTime);

      // Jab tak countdown active hai (birthdayMode nahi aaya), ticking sound play hoti rahegi
      if (!newTime.birthdayMode) {
        playCountdownTick();
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
  }, [birthdayDate, playCountdownTick]);

  // Popstate Listener
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

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#580C0D] text-[#E6DDD1]">
      {/* Floating Audio Button */}
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

      {stage === "memories" && (
        <MemoriesSection
          recipientName={recipientName}
          selectedAlbum={selectedAlbum}
          setSelectedAlbum={setSelectedAlbum}
        />
      )}
    </main>
  );
}

export default App;