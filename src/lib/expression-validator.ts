import { parse } from "mathjs";
import { mapMathError } from "@/lib/error-messages";

const TRAILING_OPERATOR = /[+\-*/^(]\s*$/;

export function validateExpression(expr: string): {
  isValid: boolean;
  error: string | null;
} {
  if (!expr.trim()) return { isValid: false, error: null };
  if (TRAILING_OPERATOR.test(expr)) return { isValid: false, error: null };

  try {
    parse(expr);
    return { isValid: true, error: null };
  } catch (e) {
    return { isValid: false, error: mapMathError(e) };
  }
}
