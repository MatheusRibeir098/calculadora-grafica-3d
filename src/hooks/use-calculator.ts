"use client";

import { useReducer, useCallback } from "react";
import { evaluateExpression } from "@/lib/calculator-engine";

interface State {
  expression: string;
  result: string | null;
  error: string | null;
}

type Action =
  | { type: "APPEND"; char: string }
  | { type: "DELETE" }
  | { type: "CLEAR" }
  | { type: "EVALUATE" }
  | { type: "SET_EXPRESSION"; expression: string };

const OPERATORS = ["+", "-", "*", "/", "%"];

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "APPEND": {
      const ch = action.char;
      const lastChar = state.expression.slice(-1);

      // If there's a previous result and user appends an operator, continue from result
      if (state.result && OPERATORS.includes(ch) && state.expression === "") {
        return { expression: state.result + ch, result: null, error: null };
      }

      // Prevent consecutive operators
      if (OPERATORS.includes(ch) && OPERATORS.includes(lastChar)) {
        return { ...state, expression: state.expression.slice(0, -1) + ch };
      }

      // Prevent duplicate decimal in current number
      if (ch === ".") {
        const parts = state.expression.split(/[+\-*/%()]/);
        const currentNum = parts[parts.length - 1];
        if (currentNum.includes(".")) return state;
      }

      return { ...state, expression: state.expression + ch, error: null };
    }
    case "DELETE":
      return { ...state, expression: state.expression.slice(0, -1), error: null };
    case "CLEAR":
      return { expression: "", result: null, error: null };
    case "EVALUATE": {
      const { result, error } = evaluateExpression(state.expression);
      if (error) return { ...state, result: null, error };
      return { expression: "", result: String(result), error: null };
    }
    case "SET_EXPRESSION":
      return { ...state, expression: action.expression, error: null };
  }
}

export function useCalculator() {
  const [state, dispatch] = useReducer(reducer, {
    expression: "",
    result: null,
    error: null,
  });

  const append = useCallback((char: string) => dispatch({ type: "APPEND", char }), []);
  const deleteLast = useCallback(() => dispatch({ type: "DELETE" }), []);
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const evaluate = useCallback(() => dispatch({ type: "EVALUATE" }), []);
  const setExpression = useCallback(
    (expression: string) => dispatch({ type: "SET_EXPRESSION", expression }),
    []
  );

  return { ...state, append, deleteLast, clear, evaluate, setExpression };
}
