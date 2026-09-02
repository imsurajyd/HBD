import { useMemo } from "react";

function Confetti() {
  const pieces = useMemo(() => {
    return Array.from({ length: 35 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
      symbol: ["✦", "♡", "•", "✧"][index % 4],
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="absolute text-lg text-[#e98ca5] animate-confetti"
          style={{
            left: `${piece.left}%`,
            top: "-20px",
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        >
          {piece.symbol}
        </span>
      ))}
    </div>
  );
}

export default Confetti;
