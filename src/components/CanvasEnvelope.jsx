import React, { useRef, useEffect, useState } from "react";

function CanvasEnvelope({ isOpen, onOpenComplete }) {
  const canvasRef = useRef(null);
  const [animationFrame, setAnimationFrame] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalFrames = 30;
  const flapRotationLimit = Math.PI;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const scaleFactor = 2;
    const width = 160 * scaleFactor;
    const height = 120 * scaleFactor;
    canvas.width = width;
    canvas.height = height;

    const eWidth = width * 0.8;
    const eHeight = height * 0.7;
    const eCx = width / 2;
    const eCy = height / 2 + eHeight * 0.1;
    const flapHeight = eHeight * 0.6;

    const envColor = "#f5eada";
    const envShadowColor = "#e8dfcc";
    const flapColor = "#f9f2e3";
    const heartColor = "#ff5c8a";

    const draw = (currentFrame) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rotation = (currentFrame / totalFrames) * flapRotationLimit;

      // 1. Shadow/Body Back
      ctx.fillStyle = envShadowColor;
      ctx.fillRect(eCx - eWidth / 2, eCy - eHeight / 2, eWidth, eHeight);

      // 2. Front Pocket
      ctx.fillStyle = envColor;
      ctx.beginPath();
      ctx.moveTo(eCx - eWidth / 2, eCy + eHeight / 2);
      ctx.lineTo(eCx + eWidth / 2, eCy + eHeight / 2);
      ctx.lineTo(eCx + eWidth / 2, eCy - eHeight / 2 + eHeight * 0.2);
      ctx.lineTo(eCx, eCy);
      ctx.lineTo(eCx - eWidth / 2, eCy - eHeight / 2 + eHeight * 0.2);
      ctx.closePath();
      ctx.fill();

      // 3. Inner Paper Sneak Peek
      if (rotation > flapRotationLimit / 3) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
          eCx - (eWidth / 2) * 0.9,
          eCy - (eHeight / 2) * 0.8,
          eWidth * 0.9,
          eHeight * 0.8,
        );
      }

      // 4. Opening Flap
      ctx.save();
      ctx.translate(eCx, eCy - eHeight / 2);

      const progress = currentFrame / totalFrames;

      if (progress <= 0.5) {
        const scaleY = 1 - progress * 2;
        ctx.scale(1, scaleY);
        ctx.fillStyle = flapColor;
      } else {
        const scaleY = (progress - 0.5) * -2;
        ctx.scale(1, scaleY);
        ctx.fillStyle = envShadowColor;
      }

      ctx.beginPath();
      ctx.moveTo(-eWidth / 2, 0);
      ctx.lineTo(eWidth / 2, 0);
      ctx.lineTo(0, flapHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 5. Wax Seal Heart
      if (progress < 0.3) {
        ctx.fillStyle = heartColor;
        ctx.beginPath();
        const sealCx = eCx;
        const sealCy = eCy - flapHeight / 1.5;
        const heartSize = 6 * scaleFactor;

        ctx.moveTo(sealCx, sealCy);
        ctx.bezierCurveTo(
          sealCx - heartSize,
          sealCy - heartSize,
          sealCx - heartSize,
          sealCy + heartSize / 3,
          sealCx,
          sealCy + heartSize,
        );
        ctx.bezierCurveTo(
          sealCx + heartSize,
          sealCy + heartSize / 3,
          sealCx + heartSize,
          sealCy - heartSize,
          sealCx,
          sealCy,
        );
        ctx.fill();
      }
    };

    draw(animationFrame);
  }, [animationFrame, flapRotationLimit]);

  const handleTap = () => {
    if (isAnimating || isOpen) return;
    setIsAnimating(true);
    let frame = 0;

    const animate = () => {
      frame++;
      setAnimationFrame(frame);
      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        if (onOpenComplete) onOpenComplete();
      }
    };
    animate();
  };

  return (
    <div className="relative h-40 w-56 cursor-pointer lg:h-60 lg:w-auto">
      {/* Fixed: Used isOpen instead of undefined stage */}
      <div
        className={`absolute inset-4 rounded-full bg-pink-400/30 blur-2xl transition-opacity duration-300 ${
          isOpen ? "opacity-0" : "animate-pulse opacity-100"
        }`}
      />

      <button
        type="button"
        onClick={handleTap}
        aria-label="Tap to open letter"
        className="absolute inset-0 z-10 cursor-pointer opacity-0"
        disabled={isOpen || isAnimating}
      />

      <canvas ref={canvasRef} className="h-full w-full object-contain" />
    </div>
  );
}

export default CanvasEnvelope;
