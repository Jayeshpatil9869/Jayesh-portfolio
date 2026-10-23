import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Smooth Fast Cursor Trail
 * A React component that renders a smooth GSAP-powered cursor trail on a fullscreen canvas.
 * Based on the provided animation with optimized performance.
 */
export default function CustomCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for mobile/tablet devices
    const isMobile = window.matchMedia("(max-width: 768px)").matches ||
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile) return;

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse position
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Points for the trail
    const POINT_COUNT = 15;
    const points = [];
    for (let i = 0; i < POINT_COUNT; i++) {
      points.push({ x: mouse.x, y: mouse.y });
    }
    const pointSetters = points.map((point, index) => ({
      x: gsap.quickTo(point, "x", {
        duration: index === 0 ? 0.08 : 0.1,
        ease: index === 0 ? "power4.out" : "power2.out",
      }),
      y: gsap.quickTo(point, "y", {
        duration: index === 0 ? 0.08 : 0.1,
        ease: index === 0 ? "power4.out" : "power2.out",
      }),
    }));

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 3;
      ctx.shadowColor = "#cfa355";
      // ctx.shadowBlur = 12; // Uncomment for glow effect

      // Draw segments with fading opacity
      for (let i = 0; i < POINT_COUNT - 1; i++) {
        const pct = i / (POINT_COUNT - 1); // 0 (front) → 1 (back)
        ctx.strokeStyle = `rgba(207,163,85,${1 - pct * 0.3})`;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[i + 1].x, points[i + 1].y);
        ctx.stroke();
      }
    };

    // GSAP ticker for smooth real-time updates
    const ticker = () => {
      pointSetters[0].x(mouse.x);
      pointSetters[0].y(mouse.y);

      for (let i = 1; i < POINT_COUNT; i++) {
        pointSetters[i].x(points[i - 1].x);
        pointSetters[i].y(points[i - 1].y);
      }

      draw();
    };

    // Add GSAP ticker
    let running = true;
    const onVisibility = () => {
      if (document.hidden && running) {
        gsap.ticker.remove(ticker);
        running = false;
      } else if (!document.hidden && !running) {
        gsap.ticker.add(ticker);
        running = true;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    gsap.ticker.add(ticker);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="trail"
      className="fixed inset-0 block pointer-events-none"
      style={{
        zIndex: 9999,
      }}
    />
  );
}
