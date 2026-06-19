export function mapMathError(error: unknown): string {
  const msg = error instanceof Error ? error.message : String(error);
  if (/division by zero/i.test(msg)) return "Divisão por zero";
  if (/unexpected end/i.test(msg)) return "Expressão incompleta";
  if (/undefined symbol/i.test(msg)) return "Função desconhecida";
  if (/unexpected token/i.test(msg)) return "Expressão inválida";
  return "Erro no cálculo";
}

export function formatResult(value: number): string {
  if (value === Infinity) return "∞";
  if (value === -Infinity) return "-∞";
  if (isNaN(value)) return "Indefinido";
  if (Math.abs(value) > 1e15) return value.toExponential(10);
  const rounded = parseFloat(value.toPrecision(10));
  return String(rounded);
}
