"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export function useCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setCtx(canvas.getContext("2d"));

    const observer = new ResizeObserver((entries) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const entry = entries[0];
        if (!entry) return;
        const { width, height } = entry.contentRect;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        const context = canvas.getContext("2d");
        context?.scale(dpr, dpr);
        setCtx(context);
        setSize({ width, height });
      });
    });

    observer.observe(canvas);
    return () => {
      observer.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [canvasRef]);

  return { width: size.width, height: size.height, ctx };
}
