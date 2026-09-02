import React, { useRef, useEffect } from "react";

function CanvasCake() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const scaleFactor = 3.5; // Smooth rendering ke liye size
    const width = 80 * scaleFactor;
    const height = 100 * scaleFactor;
    canvas.width = width;
    canvas.height = height;

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- PARAMETERS ---
      const cakeColor = "#ffb7c5"; // Soft pink base
      const icingColor = "#ffffff"; // White top
      const standColor = "#e6edf2"; // Pale stand
      const cx = width / 2;
      const cy = height * 0.7; // Lower center for cake
      const rx = width * 0.35; // Oval radius x
      const ry = height * 0.1; // Oval radius y
      const layerHeight = height * 0.25;

      // 1. Draw Cake Stand
      ctx.fillStyle = standColor;
      ctx.beginPath();
      ctx.ellipse(
        cx,
        cy + layerHeight * 1.5,
        rx * 0.8,
        ry * 0.8,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.beginPath();
      ctx.rect(
        cx - rx * 0.1,
        cy + layerHeight * 1.1,
        rx * 0.2,
        layerHeight * 0.4,
      );
      ctx.fill();

      // 2. Draw Cake Body (Layer 1)
      ctx.fillStyle = cakeColor;
      ctx.beginPath();
      ctx.ellipse(cx, cy + layerHeight, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.rect(cx - rx, cy, rx * 2, layerHeight);
      ctx.fill();

      // 3. Draw Top Layer / Icing (Layer 2)
      ctx.fillStyle = icingColor;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.rect(cx - rx, cy - layerHeight * 0.6, rx * 2, layerHeight * 0.6);
      ctx.fill();
      ctx.fillStyle = cakeColor;
      ctx.beginPath();
      ctx.ellipse(cx, cy - layerHeight * 0.6, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();

      // 4. Draw Icing Swirls (Subtle top decoration)
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const ix = cx + Math.cos(angle) * (rx * 0.7);
        const iy = cy - layerHeight * 0.6 + Math.sin(angle) * (ry * 0.5);
        ctx.beginPath();
        ctx.arc(ix, iy, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- CANDLES ---
      ctx.lineWidth = 1;
      const candleColors = ["#ffd166", "#06d6a0", "#118ab2"]; // Golden, Mint, Blue

      for (let i = 0; i < 3; i++) {
        const offset = i - 1; // Center (0), Left (-1), Right (1)
        const canCx = cx + offset * (rx * 0.45);
        const canCy = cy - layerHeight * 0.6 - layerHeight * 0.15;
        const canW = 6;
        const canH = layerHeight * 0.5;

        // Draw Candle Body
        ctx.fillStyle = candleColors[i];
        ctx.beginPath();
        ctx.rect(canCx - canW / 2, canCy - canH, canW, canH);
        ctx.fill();

        // Draw Candle Top (Oval)
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.ellipse(canCx, canCy - canH, canW / 2, 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // --- FLICKERING FLAME 🔥 ---
        const wickHeight = 5;
        const baseCy = canCy - canH - wickHeight;

        // Dynamic flame height based on time and index for variability
        const fHeightBase = 20;
        const fWave = Math.sin(time * 15 + i * 2) * 4;
        const fWidthWave = Math.sin(time * 10 + i * 2) * 1.5;

        const fHeight = fHeightBase + fWave;
        const fWidth = 8 + fWidthWave;

        // Use gradient for realistic flame color
        const grd = ctx.createLinearGradient(
          canCx,
          baseCy,
          canCx,
          baseCy - fHeight,
        );
        grd.addColorStop(0, "#ffd811"); // Outer edge
        grd.addColorStop(0.3, "#ff5c00"); // Mid flame
        grd.addColorStop(0.9, "#ffffff"); // Inner hot core
        grd.addColorStop(1, "rgba(255,255,255,0)"); // Transparent tip

        ctx.fillStyle = grd;

        // Draw teardrop flame shape
        ctx.beginPath();
        ctx.moveTo(canCx, baseCy); // Base on wick

        // Right curve
        ctx.bezierCurveTo(
          canCx + fWidth / 2,
          baseCy - 2, // Control 1
          canCx + fWidth / 4,
          baseCy - fHeight * 0.7, // Control 2
          canCx,
          baseCy - fHeight, // Tip
        );

        // Left curve
        ctx.bezierCurveTo(
          canCx - fWidth / 4,
          baseCy - fHeight * 0.7, // Control 1
          canCx - fWidth / 2,
          baseCy - 2, // Control 2
          canCx,
          baseCy, // Back to base wick
        );
        ctx.fill();

        // Optional: Very subtle glow overlay
        ctx.fillStyle = `rgba(255, 108, 0, ${0.1 + Math.sin(time * 20 + i) * 0.05})`;
        ctx.beginPath();
        ctx.arc(canCx, baseCy - fHeight * 0.3, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 0.02; // Increment time for animation loop
      requestAnimationFrame(draw);
    };

    draw(); // Start loop

    return () => {
      // Clean up (though requestAnimationFrame usually handles this on unmount)
    };
  }, []);

  return (
    <div className="relative h-28 w-28 mb-3 lg:h-40 lg:w-auto scale-110 lg:scale-100">
      <canvas ref={canvasRef} className="h-full w-full object-contain" />
    </div>
  );
}

export default CanvasCake;
