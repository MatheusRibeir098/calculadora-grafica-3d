"use client";

import { cn } from "@/lib/utils";

type CalcButtonVariant = "number" | "operator" | "action" | "equals" | "function" | "constant";

interface CalcButtonProps {
  label: string;
  value: string;
  variant?: CalcButtonVariant;
  colSpan?: number;
  className?: string;
  onPress: (value: string) => void;
}

const variantStyles: Record<CalcButtonVariant, string> = {
  number: "bg-surface-elevated text-text-primary",
  operator: "bg-accent-cyan/10 text-accent-cyan",
  action: "bg-surface-elevated text-accent-pink",
  equals: "bg-accent-cyan text-background",
  function: "bg-accent-purple/10 text-accent-purple",
  constant: "bg-accent-green/10 text-accent-green",
};

export function CalcButton({ label, value, variant = "number", colSpan = 1, className, onPress }: CalcButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onPress(value)}
      className={cn(
        "min-h-[44px] min-w-[44px] rounded-lg text-sm md:text-base font-medium transition-transform active:scale-95 touch-manipulation",
        variantStyles[variant],
        colSpan === 2 && "col-span-2",
        className
      )}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {label}
    </button>
  );
}
