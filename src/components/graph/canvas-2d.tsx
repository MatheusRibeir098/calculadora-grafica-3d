"use client";

import { useRef } from "react";
import { useCanvas } from "@/hooks/use-canvas";
import { useAnimationFrame } from "@/hooks/use-animation-frame";

interface Canvas2DProps {
  onDraw?: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
}

export function Canvas2D({ onDraw }: Canvas2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height, ctx } = useCanvas(canvasRef);

  useAnimationFrame(() => {
    if (!ctx || !width || !height) return;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, width, height);
    if (onDraw) onDraw(ctx, width, height);
  });

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ background: "#0a0a0f" }}
    />
  );
}
