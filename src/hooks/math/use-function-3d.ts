import { useMemo } from "react";
import { compile } from "mathjs";
import { mapMathError } from "@/lib/error-messages";

interface UseFunction3DResult {
  grid: Array<{ x: number; y: number; z: number }>;
  error: string | null;
  isValid: boolean;
}

export function useFunction3D(
  expression: string,
  rangeX: [number, number],
  rangeY: [number, number],
  resolution: number = 50,
): UseFunction3DResult {
  const compiled = useMemo(() => {
    if (!expression.trim()) return null;
    try {
      return compile(expression);
    } catch (e) {
      return { error: mapMathError(e) };
    }
  }, [expression]);

  return useMemo(() => {
    if (!expression.trim()) return { grid: [], error: null, isValid: false };
    if (!compiled || "error" in compiled)
      return {
        grid: [],
        error: (compiled as { error: string })?.error ?? "Erro no cálculo",
        isValid: false,
      };

    const stepX = (rangeX[1] - rangeX[0]) / (resolution - 1);
    const stepY = (rangeY[1] - rangeY[0]) / (resolution - 1);
    const grid: Array<{ x: number; y: number; z: number }> = [];

    for (let i = 0; i < resolution; i++) {
      const x = rangeX[0] + i * stepX;
      for (let j = 0; j < resolution; j++) {
        const y = rangeY[0] + j * stepY;
        try {
          const z = compiled.evaluate({ x, y }) as number;
          grid.push({ x, y, z: isFinite(z) ? z : 0 });
        } catch {
          grid.push({ x, y, z: 0 });
        }
      }
    }

    return { grid, error: null, isValid: true };
  }, [compiled, rangeX, rangeY, resolution, expression]);
}
