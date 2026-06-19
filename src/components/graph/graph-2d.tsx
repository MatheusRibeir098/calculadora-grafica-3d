'use client';

import { useRef, useState, useCallback } from 'react';
import { Canvas2D } from './canvas-2d';
import { useViewport } from '@/hooks/use-viewport';
import { drawGrid, drawLabels } from './layers/grid-layer';
import { drawCurve } from './layers/curve-layer';
import { drawCrosshair } from './layers/crosshair-layer';
import { ZoomControls } from './zoom-controls';
import { compile } from 'mathjs';

interface FunctionEntry {
  id: string;
  expression: string;
  color: string;
  visible: boolean;
}

interface Graph2DProps {
  functions: FunctionEntry[];
}

export function Graph2D({ functions }: Graph2DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { viewport, zoom, pan, reset } = useViewport();
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const isDragging = useRef(false);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  const handleDraw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      drawGrid(ctx, width, height, viewport);
      drawLabels(ctx, width, height, viewport);

      functions.forEach((fn) => {
        if (!fn.visible || !fn.expression.trim()) return;
        try {
          const compiled = compile(fn.expression);
          const points: { x: number; y: number }[] = [];
          const n = 500;
          const step = (viewport.xMax - viewport.xMin) / n;
          for (let i = 0; i <= n; i++) {
            const x = viewport.xMin + i * step;
            try {
              const y = compiled.evaluate({ x });
              if (typeof y === 'number' && isFinite(y)) {
                points.push({ x, y });
              }
            } catch {
              // skip
            }
          }
          drawCurve(ctx, points, width, height, viewport, { color: fn.color });
        } catch {
          // invalid expression
        }
      });

      if (mouse) {
        drawCrosshair(ctx, mouse.x, mouse.y, width, height, viewport);
      }
    },
    [viewport, functions, mouse]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onWheel={(e) => {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        const factor = e.deltaY > 0 ? 1.1 : 0.9;
        zoom(factor, e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
      }}
      onPointerDown={(e) => {
        isDragging.current = true;
        lastPointer.current = { x: e.clientX, y: e.clientY };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        if (isDragging.current && lastPointer.current) {
          const dx = e.clientX - lastPointer.current.x;
          const dy = e.clientY - lastPointer.current.y;
          pan(dx, dy, rect.width, rect.height);
          lastPointer.current = { x: e.clientX, y: e.clientY };
        }
      }}
      onPointerUp={() => {
        isDragging.current = false;
        lastPointer.current = null;
      }}
      onPointerLeave={() => {
        setMouse(null);
        isDragging.current = false;
        lastPointer.current = null;
      }}
    >
      <Canvas2D onDraw={handleDraw} />
      <ZoomControls
        onZoomIn={() => zoom(0.8, 0, 0, 1, 1)}
        onZoomOut={() => zoom(1.2, 0, 0, 1, 1)}
        onReset={reset}
      />
    </div>
  );
}
