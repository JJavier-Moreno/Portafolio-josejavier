import React, { useEffect, useMemo, useRef } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const toRgba = (hex, alpha) => {
  let normalized = hex.replace("#", "");
  if (normalized.length === 3) {
    normalized = normalized
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const int = parseInt(normalized, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const defaultColors = ["#2aff95", "#0a241c", "#020409"];

const LiquidEther = ({
  colors = defaultColors,
  mouseForce = 20,
  speed = 0.6,
  resolution = 1,
  backgroundColor = "#030712",
  className = "",
  style,
}) => {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);

  const palette = useMemo(() => {
    if (!Array.isArray(colors) || colors.length === 0) {
      return defaultColors;
    }
    return colors;
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    const pixelRatio = window.devicePixelRatio || 1;
    const scaleFactor = clamp(resolution, 0.35, 1.5);

    const pointer = {
      active: false,
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const blobCount = Math.max(palette.length, 3);
    const blobs = Array.from({ length: blobCount }).map((_, index) => ({
      color: palette[index % palette.length],
      x: width / 2,
      y: height / 2,
      angle: (index / blobCount) * Math.PI * 2,
      offset: (index / blobCount) * Math.PI * 2,
      orbit: 0,
      radius: 0,
      speed: 0.002 + index * 0.0009,
    }));

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (!width || !height) {
        return;
      }
      const displayWidth = Math.max(1, Math.floor(width * pixelRatio * scaleFactor));
      const displayHeight = Math.max(1, Math.floor(height * pixelRatio * scaleFactor));

      canvas.width = displayWidth;
      canvas.height = displayHeight;
      context.setTransform(displayWidth / width, 0, 0, displayHeight / height, 0, 0);

      const baseRadius = Math.max(width, height) * 0.75;
      const orbitRadius = Math.max(width, height) * 0.28;
      blobs.forEach((blob, index) => {
        blob.radius = baseRadius;
        blob.orbit = orbitRadius * (0.7 + (index / blobCount) * 0.45);
      });
    };

    resize();

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    const updatePointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      const nextX = event.clientX - rect.left;
      const nextY = event.clientY - rect.top;
      const inside =
        nextX >= 0 &&
        nextX <= rect.width &&
        nextY >= 0 &&
        nextY <= rect.height;

      pointer.targetX = clamp(nextX, 0, rect.width || 1);
      pointer.targetY = clamp(nextY, 0, rect.height || 1);
      pointer.active = inside;
    };

    const handleLeave = () => {
      pointer.active = false;
      pointer.targetX = width / 2;
      pointer.targetY = height / 2;
    };

    window.addEventListener("pointermove", updatePointer);
    window.addEventListener("pointerleave", handleLeave);

    const draw = (timestamp) => {
      if (!width || !height) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }
      const t = timestamp * 0.001 * clamp(speed, 0.1, 2);
      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;

      context.save();
      context.globalCompositeOperation = "source-over";
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, width, height);
      context.restore();

      context.globalCompositeOperation = "screen";
      const pointerInfluence = clamp(mouseForce / 100, 0, 1.2);

      blobs.forEach((blob, index) => {
        blob.angle += blob.speed * clamp(speed, 0.4, 2);
        const orbitX = width / 2 + Math.cos(blob.angle + t * 0.5) * blob.orbit;
        const orbitY = height / 2 + Math.sin(blob.angle + t * 0.5) * blob.orbit;

        const attraction = pointer.active ? 1 : 0.35;
        const influence = pointerInfluence * attraction;
        const targetX = orbitX + (pointer.x - width / 2) * influence;
        const targetY = orbitY + (pointer.y - height / 2) * influence;

        blob.x += (targetX - blob.x) * 0.12;
        blob.y += (targetY - blob.y) * 0.12;

        const gradient = context.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );

        gradient.addColorStop(0, toRgba(blob.color, 0.9));
        gradient.addColorStop(0.45, toRgba(blob.color, 0.35));
        gradient.addColorStop(1, toRgba(blob.color, 0));

        context.beginPath();
        context.fillStyle = gradient;
        context.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        context.fill();
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", resize);
      }
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", handleLeave);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [palette, mouseForce, resolution, speed, backgroundColor]);

  return (
    <div className={className} style={style}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default LiquidEther;
