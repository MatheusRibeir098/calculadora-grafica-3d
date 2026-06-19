import { useMemo } from "react";
import { compile } from "mathjs";
import { mapMathError } from "@/lib/error-messages";

interface UseFunctionResult {
  points: Array<{ x: number; y: number }>;
  error: string | null;
  isValid: boolean;
}

export function useFunction(
  expression: string,
  range: [number, number],
  points: number = 500,
): UseFunctionResult {
  const compiled = useMemo(() => {
    if (!expression.trim()) return null;
    try {
      return compile(expression);
    } catch (e) {
      return { error: mapMathError(e) };
    }
  }, [expression]);

  return useMemo(() => {
    if (!expression.trim()) return { points: [], error: null, isValid: false };
    if (!compiled || "error" in compiled)
      return {
        points: [],
        error: (compiled as { error: string })?.error ?? "Erro no cálculo",
        isValid: false,
      };

    const [min, max] = range;
    const step = (max - min) / (points - 1);
    const result: Array<{ x: number; y: number }> = [];

    for (let i = 0; i < points; i++) {
      const x = min + i * step;
      try {
        const y = compiled.evaluate({ x }) as number;
        if (isFinite(y)) result.push({ x, y });
      } catch {
        // skip invalid points
      }
    }

    return { points: result, error: null, isValid: true };
  }, [compiled, range, points, expression]);
}
