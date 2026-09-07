import React, { useRef, useEffect } from "react";

function CanvasCake() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const width = 360;
    const height = 400;
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);

    let time = 0;
    let animId;

    // Vintage Bow with hanging ribbons
    const drawBow = (x, y, tailLength = 40, scale = 1) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      ctx.fillStyle = "#8E1616";
      ctx.strokeStyle = "#580C0D";
      ctx.lineWidth = 1.3;

      // Knot
      ctx.beginPath();
      ctx.arc(0, 0, 2.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Left Loop
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-13, -8, -14, 7, 0, 1);
      ctx.fill();
      ctx.stroke();

      // Right Loop
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(13, -8, 14, 7, 0, 1);
      ctx.fill();
      ctx.stroke();

      // Left Tail
      ctx.beginPath();
      ctx.moveTo(-1, 2);
      ctx.bezierCurveTo(-3, tailLength * 0.45, -5, tailLength * 0.75, -3, tailLength);
      ctx.strokeStyle = "#8E1616";
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.stroke();

      // Right Tail
      ctx.beginPath();
      ctx.moveTo(2, 2);
      ctx.bezierCurveTo(4, tailLength * 0.45, 6, tailLength * 0.75, 4, tailLength - 2);
      ctx.stroke();

      ctx.restore();
    };

    // 4-point star sparkle
    const drawSparkle = (x, y, radius, color = "#C99700") => {
      ctx.save();
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const rot = (i * Math.PI) / 2;
        ctx.lineTo(x + Math.cos(rot) * radius, y + Math.sin(rot) * radius);
        ctx.lineTo(
          x + Math.cos(rot + Math.PI / 4) * (radius * 0.28),
          y + Math.sin(rot + Math.PI / 4) * (radius * 0.28)
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Clean Swag Curve (Strictly connecting bows)
    const drawSwag = (x1, y1, x2, y2, sag) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo((x1 + x2) / 2, Math.max(y1, y2) + sag, x2, y2);
      ctx.strokeStyle = "#C49A78";
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      ctx.stroke();

      // Soft sketch shadow line
      ctx.beginPath();
      ctx.moveTo(x1, y1 + 1);
      ctx.quadraticCurveTo((x1 + x2) / 2, Math.max(y1, y2) + sag + 3, x2, y2 + 1);
      ctx.strokeStyle = "rgba(196, 154, 120, 0.4)";
      ctx.lineWidth = 1.1;
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;

      // 1. Sparkles around the cake
      drawSparkle(cx - 120, 205, 8 + Math.sin(time * 3) * 1.5, "#D4A373");
      drawSparkle(cx + 124, 280, 9 + Math.cos(time * 3) * 1.8, "#D4A373");
      drawSparkle(cx + 112, 100, 7 + Math.sin(time * 2.5) * 1.2, "#E6DDD1");
      drawSparkle(cx - 116, 320, 6, "#8E1616");

      // ==========================================
      // TIER 2 (BOTTOM TIER)
      // ==========================================
      const bY = 205;
      const bW = 118;
      const bH = 92;
      const bRy = 25;

      // Bottom Tier Base Shadow / Crumbs (Loose vintage pencil loops)
      ctx.save();
      ctx.strokeStyle = "#BFA287";
      ctx.lineWidth = 1.4;
      for (let i = -bW + 6; i <= bW - 6; i += 18) {
        ctx.beginPath();
        ctx.ellipse(cx + i, bY + bH + (1 - Math.abs(i) / bW) * 4, 10, 4, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // Bottom Cylinder Fill
      ctx.fillStyle = "#FAF4E8";
      ctx.beginPath();
      ctx.ellipse(cx, bY + bH, bW, bRy, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.rect(cx - bW, bY, bW * 2, bH);
      ctx.fill();

      // Side & Base Outline
      ctx.strokeStyle = "#CBB79F";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(cx - bW, bY);
      ctx.lineTo(cx - bW, bY + bH);
      ctx.moveTo(cx + bW, bY);
      ctx.lineTo(cx + bW, bY + bH);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, bY + bH, bW, bRy, 0, 0, Math.PI);
      ctx.stroke();

      // Bottom Tier Top Rim
      ctx.fillStyle = "#FFF9EE";
      ctx.beginPath();
      ctx.ellipse(cx, bY, bW, bRy, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Bottom Tier Swags (4 Bows -> 3 Connecting Swags)
      const bBowX = [-90, -32, 32, 90];
      const bBowY = [bY + 28, bY + 36, bY + 36, bY + 28];

      drawSwag(cx + bBowX[0], bBowY[0], cx + bBowX[1], bBowY[1], 15);
      drawSwag(cx + bBowX[1], bBowY[1], cx + bBowX[2], bBowY[2], 16);
      drawSwag(cx + bBowX[2], bBowY[2], cx + bBowX[3], bBowY[3], 15);

      // Lower secondary gentle swag
      drawSwag(cx + bBowX[0] + 8, bBowY[0] + 28, cx + bBowX[3] - 8, bBowY[3] + 28, 14);

      // Bottom Bows
      drawBow(cx + bBowX[0], bBowY[0], 52, 0.95);
      drawBow(cx + bBowX[1], bBowY[1], 56, 1.0);
      drawBow(cx + bBowX[2], bBowY[2], 56, 1.0);
      drawBow(cx + bBowX[3], bBowY[3], 52, 0.95);

      // ==========================================
      // TIER 1 (TOP TIER)
      // ==========================================
      const tY = 118;
      const tW = 88;
      const tH = 87;
      const tRy = 20;

      // Top Cylinder Fill
      ctx.fillStyle = "#FAF4E8";
      ctx.beginPath();
      ctx.ellipse(cx, tY + tH, tW, tRy, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.rect(cx - tW, tY, tW * 2, tH);
      ctx.fill();

      // Top Cylinder Outline
      ctx.strokeStyle = "#CBB79F";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(cx - tW, tY);
      ctx.lineTo(cx - tW, tY + tH);
      ctx.moveTo(cx + tW, tY);
      ctx.lineTo(cx + tW, tY + tH);
      ctx.stroke();

      // Top Surface
      ctx.fillStyle = "#FFF9EE";
      ctx.beginPath();
      ctx.ellipse(cx, tY, tW, tRy, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Top Tier Swags (3 Bows -> 2 Connecting Swags)
      const tBowX = [-62, 0, 62];
      const tBowY = [tY + 28, tY + 34, tY + 28];

      drawSwag(cx + tBowX[0], tBowY[0], cx + tBowX[1], tBowY[1], 14);
      drawSwag(cx + tBowX[1], tBowY[1], cx + tBowX[2], tBowY[2], 14);

      // Lower secondary gentle swag on top tier
      drawSwag(cx + tBowX[0] + 6, tBowY[0] + 24, cx + tBowX[2] - 6, tBowY[2] + 24, 12);

      // Top Tier Bows
      drawBow(cx + tBowX[0], tBowY[0], 45, 0.95);
      drawBow(cx + tBowX[1], tBowY[1], 50, 1.05);
      drawBow(cx + tBowX[2], tBowY[2], 45, 0.95);

      // Top Rim Cherries/Heart Dots
      ctx.fillStyle = "#8E1616";
      const dots = [
        [-68, tY - 4],
        [-44, tY - 12],
        [44, tY - 12],
        [68, tY - 4],
      ];
      dots.forEach(([dx, dy]) => {
        ctx.beginPath();
        ctx.arc(cx + dx, dy, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // ==========================================
      // 3 VINTAGE RED CANDLES & FLAMES
      // ==========================================
      const candles = [
        { x: cx - 40, y: tY - 8, h: 42 },
        { x: cx, y: tY - 14, h: 48 },
        { x: cx + 40, y: tY - 8, h: 42 },
      ];

      candles.forEach((c, idx) => {
        // Candle Body
        ctx.fillStyle = "#8E1616";
        ctx.beginPath();
        ctx.roundRect(c.x - 3, c.y - c.h, 6, c.h, 2);
        ctx.fill();

        ctx.strokeStyle = "#580C0D";
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // Accent on middle candle
        if (idx === 1) {
          ctx.beginPath();
          ctx.moveTo(c.x - 5, c.y - c.h + 16);
          ctx.lineTo(c.x + 5, c.y - c.h + 16);
          ctx.strokeStyle = "#8E1616";
          ctx.lineWidth = 1.8;
          ctx.stroke();
        }

        // Wick
        const wickY = c.y - c.h;
        ctx.beginPath();
        ctx.moveTo(c.x, wickY);
        ctx.lineTo(c.x, wickY - 5);
        ctx.strokeStyle = "#3a0607";
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Flame Animation
        const fY = wickY - 6;
        const wave = Math.sin(time * 12 + idx * 2.3) * 1.5;
        const flameHeight = 15 + Math.sin(time * 15 + idx) * 3;

        // Radial Glow
        const glow = ctx.createRadialGradient(
          c.x,
          fY - flameHeight * 0.4,
          1,
          c.x,
          fY - flameHeight * 0.4,
          15
        );
        glow.addColorStop(0, "rgba(255, 215, 0, 0.45)");
        glow.addColorStop(1, "rgba(255, 215, 0, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(c.x, fY - flameHeight * 0.4, 15, 0, Math.PI * 2);
        ctx.fill();

        // Outer Flame
        ctx.save();
        ctx.fillStyle = "#F5A623";
        ctx.beginPath();
        ctx.moveTo(c.x, fY);
        ctx.quadraticCurveTo(c.x + 4 + wave, fY - flameHeight * 0.5, c.x, fY - flameHeight);
        ctx.quadraticCurveTo(c.x - 4 + wave, fY - flameHeight * 0.5, c.x, fY);
        ctx.fill();

        // Inner Core
        ctx.fillStyle = "#FFF7DF";
        ctx.beginPath();
        ctx.moveTo(c.x, fY - 1);
        ctx.quadraticCurveTo(
          c.x + 2 + wave * 0.5,
          fY - flameHeight * 0.4,
          c.x,
          fY - flameHeight * 0.75
        );
        ctx.quadraticCurveTo(
          c.x - 2 + wave * 0.5,
          fY - flameHeight * 0.4,
          c.x,
          fY - 1
        );
        ctx.fill();
        ctx.restore();
      });

      time += 0.03;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative flex items-center scale-105 justify-center h-60 w-60 sm:h-68 sm:w-68 mx-auto">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
        className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
      />
    </div>
  );
}

export default CanvasCake;