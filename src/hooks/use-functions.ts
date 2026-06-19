'use client';

import { useState, useCallback } from 'react';

export interface FunctionEntry {
  id: string;
  expression: string;
  color: string;
  visible: boolean;
}

const COLORS = ['#06b6d4', '#a855f7', '#22c55e', '#f97316', '#ec4899'];
const MAX_FUNCTIONS = 5;

function createEntry(color: string): FunctionEntry {
  return { id: crypto.randomUUID(), expression: '', color, visible: true };
}

export function useFunctions() {
  const [functions, setFunctions] = useState<FunctionEntry[]>([createEntry(COLORS[0])]);

  const addFunction = useCallback(() => {
    setFunctions(prev => {
      if (prev.length >= MAX_FUNCTIONS) return prev;
      const usedColors = new Set(prev.map(f => f.color));
      const nextColor = COLORS.find(c => !usedColors.has(c)) ?? COLORS[prev.length % COLORS.length];
      return [...prev, createEntry(nextColor)];
    });
  }, []);

  const removeFunction = useCallback((id: string) => {
    setFunctions(prev => prev.filter(f => f.id !== id));
  }, []);

  const updateExpression = useCallback((id: string, expression: string) => {
    setFunctions(prev => prev.map(f => f.id === id ? { ...f, expression } : f));
  }, []);

  const toggleVisibility = useCallback((id: string) => {
    setFunctions(prev => prev.map(f => f.id === id ? { ...f, visible: !f.visible } : f));
  }, []);

  return { functions, addFunction, removeFunction, updateExpression, toggleVisibility };
}
