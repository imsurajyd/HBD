import React, { useRef, useEffect } from "react";

// Suction and Return Sound Effects
export const playCartoonSfx = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === "steal") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(460, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    } else {
      osc.type = "sine";
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    }
  } catch (e) {}
};

export default function CanvasBoyThief({ isReturning }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationId;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = 95;
      const cy = isReturning ? 85 : 88;
      const breathe = Math.sin(frame * 0.15) * 2;

      // Floor Shadow
      ctx.beginPath();
      ctx.ellipse(cx, 165, 45, 7, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(158, 28, 40, 0.22)";
      ctx.fill();

      // Giant Brown Burlap Sack
      ctx.save();
      if (!isReturning) {
        // Open wide facing the elements to vacuum them in
        ctx.fillStyle = "#854d0e";
        ctx.beginPath();
        ctx.ellipse(cx - 32, cy + 20, 28, 35, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Dark wide mouth of sack
        ctx.fillStyle = "#3e1c00";
        ctx.beginPath();
        ctx.ellipse(cx - 15, cy + 10, 14, 20, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Swirl suction wind line
        ctx.strokeStyle = "rgba(244, 114, 182, 0.6)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        const offset = (frame * 5) % 25;
        ctx.moveTo(cx + 35 - offset, cy - 8);
        ctx.quadraticCurveTo(cx - 5, cy + 2, cx - 15, cy + 10);
        ctx.stroke();
      } else {
        // Closed bag tied with golden rope
        ctx.fillStyle = "#854d0e";
        ctx.beginPath();
        ctx.ellipse(cx - 30, cy + 22, 22, 28, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fde047";
        ctx.beginPath();
        ctx.arc(cx - 24, cy - 4, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Legs / Jeans
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.roundRect(cx - 14, cy + 42, 11, 32, 3);
      ctx.roundRect(cx + 4, cy + 42, 11, 32, 3);
      ctx.fill();

      // White Sneakers
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.roundRect(cx - 18, cy + 70, 15, 7, 3);
      ctx.roundRect(cx + 4, cy + 70, 15, 7, 3);
      ctx.fill();

      // Red Hoodie
      ctx.fillStyle = "#e11d48";
      ctx.beginPath();
      ctx.roundRect(cx - 22, cy + 6, 44, 38, 8);
      ctx.fill();

      // Collar
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(cx, cy + 10, 10, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head & Skin
      ctx.beginPath();
      ctx.arc(cx, cy - 20 + breathe, 23, 0, Math.PI * 2);
      ctx.fillStyle = "#fed7aa";
      ctx.fill();

      // Blush
      ctx.fillStyle = "#fca5a5";
      ctx.beginPath();
      ctx.arc(cx - 12, cy - 14 + breathe, 5, 0, Math.PI * 2);
      ctx.arc(cx + 12, cy - 14 + breathe, 5, 0, Math.PI * 2);
      ctx.fill();

      // Boy Hair
      ctx.fillStyle = "#271612";
      ctx.beginPath();
      ctx.arc(cx, cy - 24 + breathe, 25, Math.PI * 0.95, Math.PI * 2.05);
      ctx.fill();

      // Bangs
      ctx.beginPath();
      ctx.moveTo(cx - 23, cy - 22 + breathe);
      ctx.quadraticCurveTo(cx - 12, cy - 8 + breathe, cx - 8, cy - 17 + breathe);
      ctx.quadraticCurveTo(cx - 1, cy - 6 + breathe, cx + 5, cy - 17 + breathe);
      ctx.quadraticCurveTo(cx + 14, cy - 8 + breathe, cx + 23, cy - 22 + breathe);
      ctx.lineTo(cx + 23, cy - 35 + breathe);
      ctx.lineTo(cx - 23, cy - 35 + breathe);
      ctx.closePath();
      ctx.fill();

      // Facial Expression
      if (!isReturning) {
        // Mischievous Smug Face
        ctx.fillStyle = "#1e1e1e";
        ctx.beginPath();
        ctx.arc(cx + 9, cy - 18 + breathe, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#271612";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx - 9, cy - 18 + breathe, 4.5, 0.2, Math.PI - 0.2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx + 2, cy - 9 + breathe, 6, 0.1, Math.PI * 0.7);
        ctx.stroke();

        // Hands pulling timer inside
        ctx.fillStyle = "#fed7aa";
        ctx.beginPath();
        ctx.arc(cx + 16, cy + 18, 6, 0, Math.PI * 2);
        ctx.arc(cx - 12, cy + 24, 6, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Laughing Face
        ctx.strokeStyle = "#271612";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx - 9, cy - 18 + breathe, 5, Math.PI + 0.2, -0.2);
        ctx.arc(cx + 9, cy - 18 + breathe, 5, Math.PI + 0.2, -0.2);
        ctx.stroke();

        ctx.fillStyle = "#be123c";
        ctx.beginPath();
        ctx.arc(cx, cy - 10 + breathe, 8, 0, Math.PI);
        ctx.fill();

        ctx.fillStyle = "#fed7aa";
        ctx.beginPath();
        ctx.arc(cx - 14, cy + 16, 6, 0, Math.PI * 2);
        ctx.arc(cx + 14, cy + 16, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [isReturning]);

  return (
    <canvas
      ref={canvasRef}
      width={190}
      height={180}
      className="pointer-events-none drop-shadow-[0_12px_28px_rgba(158,28,40,0.3)]"
    />
  );
}