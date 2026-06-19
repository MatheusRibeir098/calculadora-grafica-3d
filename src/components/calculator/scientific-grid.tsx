"use client";

import { CalcButton } from "./calc-button";

interface ScientificGridProps {
  onButtonPress: (value: string) => void;
}

const buttons = [
  // Row 1: trig functions
  { label: "sin", value: "sin(", variant: "function" as const },
  { label: "cos", value: "cos(", variant: "function" as const },
  { label: "tan", value: "tan(", variant: "function" as const },
  { label: "(", value: "(", variant: "operator" as const },
  { label: ")", value: ")", variant: "operator" as const },
  // Row 2: inverse trig & powers
  { label: "asin", value: "asin(", variant: "function" as const },
  { label: "acos", value: "acos(", variant: "function" as const },
  { label: "atan", value: "atan(", variant: "function" as const },
  { label: "x²", value: "^2", variant: "operator" as const },
  { label: "xⁿ", value: "^(", variant: "operator" as const },
  // Row 3: log, root, misc
  { label: "log", value: "log(", variant: "function" as const },
  { label: "ln", value: "ln(", variant: "function" as const },
  { label: "√", value: "sqrt(", variant: "function" as const },
  { label: "!", value: "!", variant: "operator" as const },
  { label: "abs", value: "abs(", variant: "function" as const },
  // Row 4: constants & actions
  { label: "π", value: "pi", variant: "constant" as const },
  { label: "e", value: "e", variant: "constant" as const },
  { label: "%", value: "%", variant: "operator" as const },
  { label: "⌫", value: "backspace", variant: "action" as const },
  { label: "C", value: "clear", variant: "action" as const },
  // Row 5-9: numeric grid
  { label: "7", value: "7", variant: "number" as const },
  { label: "8", value: "8", variant: "number" as const },
  { label: "9", value: "9", variant: "number" as const },
  { label: "÷", value: "/", variant: "operator" as const },
  { label: "×", value: "*", variant: "operator" as const },
  { label: "4", value: "4", variant: "number" as const },
  { label: "5", value: "5", variant: "number" as const },
  { label: "6", value: "6", variant: "number" as const },
  { label: "−", value: "-", variant: "operator" as const },
  { label: "+", value: "+", variant: "operator" as const },
  { label: "1", value: "1", variant: "number" as const },
  { label: "2", value: "2", variant: "number" as const },
  { label: "3", value: "3", variant: "number" as const },
  { label: "±", value: "negate", variant: "action" as const },
  { label: "=", value: "=", variant: "equals" as const },
  { label: "0", value: "0", variant: "number" as const, colSpan: 2 },
  { label: ".", value: ".", variant: "number" as const },
];

export function ScientificGrid({ onButtonPress }: ScientificGridProps) {
  return (
    <div className="grid grid-cols-5 gap-1 md:gap-1.5 overflow-x-auto">
      {buttons.map((btn) => (
        <CalcButton
          key={btn.label + btn.value}
          label={btn.label}
          value={btn.value}
          variant={btn.variant}
          colSpan={btn.colSpan}
          className="text-xs md:text-sm"
          onPress={onButtonPress}
        />
      ))}
    </div>
  );
}
