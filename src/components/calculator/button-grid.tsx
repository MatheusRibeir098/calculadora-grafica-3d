"use client";

import { CalcButton } from "./calc-button";

type CalcButtonVariant = "number" | "operator" | "action" | "equals";

interface ButtonConfig {
  label: string;
  value: string;
  variant: CalcButtonVariant;
  colSpan?: number;
}

const buttons: ButtonConfig[] = [
  { label: "C", value: "C", variant: "action" },
  { label: "⌫", value: "Backspace", variant: "action" },
  { label: "%", value: "%", variant: "operator" },
  { label: "÷", value: "÷", variant: "operator" },
  { label: "7", value: "7", variant: "number" },
  { label: "8", value: "8", variant: "number" },
  { label: "9", value: "9", variant: "number" },
  { label: "×", value: "×", variant: "operator" },
  { label: "4", value: "4", variant: "number" },
  { label: "5", value: "5", variant: "number" },
  { label: "6", value: "6", variant: "number" },
  { label: "−", value: "−", variant: "operator" },
  { label: "1", value: "1", variant: "number" },
  { label: "2", value: "2", variant: "number" },
  { label: "3", value: "3", variant: "number" },
  { label: "+", value: "+", variant: "operator" },
  { label: "±", value: "±", variant: "operator" },
  { label: "0", value: "0", variant: "number", colSpan: 2 },
  { label: ".", value: ".", variant: "number" },
  { label: "=", value: "=", variant: "equals" },
];

interface ButtonGridProps {
  onButtonPress: (value: string) => void;
}

export function ButtonGrid({ onButtonPress }: ButtonGridProps) {
  return (
    <div className="grid grid-cols-4 gap-1.5 md:gap-2 p-2 md:p-4">
      {buttons.map((btn) => (
        <CalcButton
          key={btn.label + btn.value}
          label={btn.label}
          value={btn.value}
          variant={btn.variant}
          colSpan={btn.colSpan}
          onPress={onButtonPress}
        />
      ))}
    </div>
  );
}
