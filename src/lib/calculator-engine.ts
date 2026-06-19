import { evaluate } from "mathjs";
import { mapMathError, formatResult } from "./error-messages";

type EvalResult =
  | { result: string; error: null }
  | { result: null; error: string };

export function evaluateExpression(expr: string): EvalResult {
  if (!expr.trim()) return { result: null, error: "Expressão vazia" };

  const open = (expr.match(/\(/g) || []).length;
  const close = (expr.match(/\)/g) || []).length;
  const balanced = expr + ")".repeat(Math.max(0, open - close));

  try {
    const res = evaluate(balanced);
    if (typeof res !== "number") return { result: null, error: "Resultado inválido" };
    if (isNaN(res)) return { result: null, error: "Indefinido" };
    return { result: formatResult(res), error: null };
  } catch (e) {
    return { result: null, error: mapMathError(e) };
  }
}
