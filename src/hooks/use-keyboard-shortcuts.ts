"use client";

import { useEffect } from "react";

interface Actions {
  append: (char: string) => void;
  deleteLast: () => void;
  clear: () => void;
  evaluate: () => void;
}

export function useKeyboardShortcuts({ append, deleteLast, clear, evaluate }: Actions) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey) return;

      const el = document.activeElement;
      if (
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el as HTMLElement)?.isContentEditable
      ) return;

      const key = e.key;

      if (/^[0-9]$/.test(key)) { append(key); e.preventDefault(); }
      else if (key === "+" || key === "-") { append(key); e.preventDefault(); }
      else if (key === "*") { append("×"); e.preventDefault(); }
      else if (key === "/") { append("÷"); e.preventDefault(); }
      else if (key === "." || key === "(" || key === ")") { append(key); e.preventDefault(); }
      else if (key === "Enter") { evaluate(); e.preventDefault(); }
      else if (key === "Escape") { clear(); e.preventDefault(); }
      else if (key === "Backspace") { deleteLast(); e.preventDefault(); }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [append, deleteLast, clear, evaluate]);
}
