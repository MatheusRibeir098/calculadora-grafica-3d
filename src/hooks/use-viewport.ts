'use client';
import { useState, useCallback } from 'react';
import { Viewport } from '@/types/graph';

const DEFAULT_VIEWPORT: Viewport = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };

export function useViewport(initial?: Partial<Viewport>) {
  const [viewport, setViewport] = useState<Viewport>({ ...DEFAULT_VIEWPORT, ...initial });

  // Zoom centrado num ponto (cursorX, cursorY em coords de pixel)
  const zoom = useCallback((factor: number, centerX: number, centerY: number, canvasW: number, canvasH: number) => {
    setViewport(v => {
      // Converte pixel center para world coords
      const worldX = v.xMin + (centerX / canvasW) * (v.xMax - v.xMin);
      const worldY = v.yMax - (centerY / canvasH) * (v.yMax - v.yMin);
      // Aplica zoom mantendo center fixo
      const newXMin = worldX - (worldX - v.xMin) * factor;
      const newXMax = worldX + (v.xMax - worldX) * factor;
      const newYMin = worldY - (worldY - v.yMin) * factor;
      const newYMax = worldY + (v.yMax - worldY) * factor;
      // Limites
      const range = newXMax - newXMin;
      if (range < 0.001 || range > 100000) return v;
      return { xMin: newXMin, xMax: newXMax, yMin: newYMin, yMax: newYMax };
    });
  }, []);

  // Pan em pixels
  const pan = useCallback((dx: number, dy: number, canvasW: number, canvasH: number) => {
    setViewport(v => {
      const worldDx = dx / canvasW * (v.xMax - v.xMin);
      const worldDy = dy / canvasH * (v.yMax - v.yMin);
      return { xMin: v.xMin - worldDx, xMax: v.xMax - worldDx, yMin: v.yMin + worldDy, yMax: v.yMax + worldDy };
    });
  }, []);

  const reset = useCallback(() => setViewport(DEFAULT_VIEWPORT), []);

  return { viewport, zoom, pan, reset };
}
