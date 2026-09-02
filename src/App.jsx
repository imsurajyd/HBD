import React, { useEffect, useState } from "react";

import CountdownScreen from "./components/CountdownScreen";
import BirthdayHero from "./components/BirthdayHero";
import MessageSection from "./components/MessageSection";
import MemoriesSection from "./components/MemoriesSection";

// const BIRTHDAY_DATE = new Date("2026-09-09T00:00:00");
const BIRTHDAY_DATE = new Date(Date.now() + 30 * 1000);

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
    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),
    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),
    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}

function App() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [stage, setStage] = useState("birthday");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff7fa] text-[#5b343f]">

      {/* Countdown khatam hone tak sirf Countdown dikhega */}
      {!timeLeft.birthdayMode ? (
        <CountdownScreen timeLeft={timeLeft} />

      ) : stage === "birthday" ? (
        /* Countdown khatam hone ke baad BirthdayHero */
        <BirthdayHero
          onTeddyClick={() => setStage("message")}
        />

      ) : stage === "message" ? (
        /* Teddy click ke baad Message */
        <MessageSection
          onHeartClick={() => setStage("memories")}
        />

      ) : (
        /* Heart click ke baad Memories */
        <MemoriesSection />
      )}

    </main>
  );
}

export default App;