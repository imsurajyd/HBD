import { useEffect } from "react";
import confetti from "canvas-confetti";

function Celebration() {
  useEffect(() => {
    // 1. Center se bada explosion blast (Party Popper Effect 🎉)
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#ff5c8a", "#ff9fba", "#ffd166", "#06d6a0", "#118ab2"],
    });

    // 2. Side se cannons launch (celebration fill karne ke liye)
    const end = Date.now() + 2500;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }

      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fff7fa]">
      <div className="animate-bounce text-8xl sm:text-9xl">🎉</div>
      <h2 className="font-display mt-6 text-4xl font-bold text-[#df6f8d] sm:text-6xl">
        Yaaay! It's Time! 🥳
      </h2>
    </div>
  );
}

export default Celebration;
