import { useMemo } from "react";

function Confetti() {
  const pieces = useMemo(() => {
    // 🍷 Royal Wine & Champagne Palette for ambient sparkles
    const colors = ["#E6DDD1", "#D4A373", "#f2eae1", "#c97a7e"];

    return Array.from({ length: 35 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
      symbol: ["✦", "♡", "•", "✧"][index % 4],
      color: colors[index % colors.length],
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="absolute text-lg animate-confetti opacity-80"
          style={{
            left: `${piece.left}%`,
            top: "-20px",
            color: piece.color,
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