'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useCalculator } from '@/hooks/use-calculator';
import { useHistory } from '@/hooks/use-history';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { Display } from './display';
import { ButtonGrid } from './button-grid';
import { ScientificGrid } from './scientific-grid';
import { HistoryList } from './history-list';
import { ErrorBoundary } from './error-boundary';

export function Calculator() {
  const [mode, setMode] = useState<'basic' | 'scientific'>('basic');
  const [showHistory, setShowHistory] = useState(false);
  const { expression, result, error, append, deleteLast, clear, evaluate, setExpression } =
    useCalculator();
  const { entries, addEntry, clearHistory } = useHistory();
  const lastExpression = useRef<string>('');

  // Salva a expressão antes do evaluate para usar no histórico
  const handleEvaluate = useCallback(() => {
    lastExpression.current = expression;
    evaluate();
  }, [evaluate, expression]);

  // Adiciona ao histórico quando resultado aparece
  useEffect(() => {
    if (result && !error && lastExpression.current) {
      addEntry(lastExpression.current, result);
      lastExpression.current = '';
    }
  }, [result, error, addEntry]);

  useKeyboardShortcuts({ append, deleteLast, clear, evaluate: handleEvaluate });

  const handleButtonPress = useCallback(
    (value: string) => {
      if (value === '=') {
        lastExpression.current = expression;
        evaluate();
      } else if (value === 'C') {
        clear();
      } else if (value === '⌫') {
        deleteLast();
      } else {
        append(value);
      }
    },
    [append, deleteLast, clear, evaluate, expression]
  );

  if (showHistory) {
    return (
      <ErrorBoundary>
        <div className="flex flex-col h-full gap-3 p-2 md:p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-primary">Histórico</h2>
            <button
              onClick={() => setShowHistory(false)}
              className="text-xs text-accent-cyan hover:underline"
            >
              ← Voltar
            </button>
          </div>
          <HistoryList
            entries={entries}
            onSelect={(expr) => {
              setExpression(expr);
              setShowHistory(false);
            }}
            onClear={clearHistory}
          />
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-full gap-3 p-2 md:p-4">
        <Display expression={expression} result={result} error={error} />

        <div className="flex gap-2 mb-1">
          <button
            onClick={() => setMode('basic')}
            className={`text-xs px-3 py-1 rounded-md transition-colors ${
              mode === 'basic'
                ? 'bg-accent-cyan/20 text-accent-cyan'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Básico
          </button>
          <button
            onClick={() => setMode('scientific')}
            className={`text-xs px-3 py-1 rounded-md transition-colors ${
              mode === 'scientific'
                ? 'bg-accent-cyan/20 text-accent-cyan'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Científico
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className="text-xs px-3 py-1 rounded-md text-text-secondary hover:text-text-primary transition-colors ml-auto"
          >
            Histórico
          </button>
        </div>

        {mode === 'basic' ? (
          <ButtonGrid onButtonPress={handleButtonPress} />
        ) : (
          <ScientificGrid onButtonPress={handleButtonPress} />
        )}
      </div>
    </ErrorBoundary>
  );
}
