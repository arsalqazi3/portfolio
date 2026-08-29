"use client";

import { useEffect, useRef } from "react";

const MUTED = "155,149,137"; // --color-muted
const COPPER = "184,115,51"; // --color-copper
const MAX_LINK_DIST = 150;
const NEAR_RADIUS = 170;

type Node = { x: number; y: number; vx: number; vy: number };

/** A quiet, self-organizing node mesh rendered behind the whole site. Lines near
 * the cursor pull taut in copper; everything else drifts as a faint muted web.
 * Skips itself entirely under prefers-reduced-motion. */
export default function WebMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let rafId = 0;
    const mouse = { x: -9999, y: -9999 };

    function nodeCountFor(w: number) {
      if (w < 640) return 16;
      if (w < 1024) return 26;
      return 38;
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = nodeCountFor(width);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function onPointerMove(e: PointerEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onPointerLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function step() {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      ctx!.clearRect(0, 0, width, height);

      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const dx = nodes[a].x - nodes[b].x;
          const dy = nodes[a].y - nodes[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= MAX_LINK_DIST) continue;

          const midX = (nodes[a].x + nodes[b].x) / 2;
          const midY = (nodes[a].y + nodes[b].y) / 2;
          const mdist = Math.hypot(midX - mouse.x, midY - mouse.y);
          const near = Math.max(0, 1 - mdist / NEAR_RADIUS);
          const restOpacity = (1 - dist / MAX_LINK_DIST) * 0.1;
          const opacity = restOpacity + near * 0.5;

          ctx!.strokeStyle = near > 0.25 ? `rgba(${COPPER},${opacity.toFixed(2)})` : `rgba(${MUTED},${opacity.toFixed(2)})`;
          ctx!.lineWidth = 1 + near * 1.1;
          ctx!.beginPath();
          ctx!.moveTo(nodes[a].x, nodes[a].y);
          ctx!.lineTo(nodes[b].x, nodes[b].y);
          ctx!.stroke();
        }
      }

      rafId = requestAnimationFrame(step);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
