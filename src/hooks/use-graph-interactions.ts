'use client';
import { useEffect, RefObject } from 'react';

interface GraphInteractionsOptions {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  zoom: (factor: number, cx: number, cy: number, w: number, h: number) => void;
  pan: (dx: number, dy: number, w: number, h: number) => void;
}

export function useGraphInteractions({ canvasRef, zoom, pan }: GraphInteractionsOptions) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 1.1 : 0.9;
      zoom(factor, e.offsetX, e.offsetY, canvas.width, canvas.height);
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.offsetX;
      lastY = e.offsetY;
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.offsetX - lastX;
      const dy = e.offsetY - lastY;
      lastX = e.offsetX;
      lastY = e.offsetY;
      pan(dx, dy, canvas.width, canvas.height);
    };

    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      canvas.releasePointerCapture(e.pointerId);
    };

    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);

    return () => {
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
    };
  }, [canvasRef, zoom, pan]);
}
