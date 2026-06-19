"use client";

interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

interface HistoryListProps {
  entries: HistoryEntry[];
  onSelect: (expression: string) => void;
  onClear: () => void;
}

export function HistoryList({ entries, onSelect, onClear }: HistoryListProps) {
  if (entries.length === 0) {
    return (
      <p className="text-text-secondary text-sm text-center py-4">
        Nenhum cálculo ainda
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {entries.map((entry) => (
        <button
          key={entry.id}
          onClick={() => onSelect(entry.expression)}
          className="text-left px-3 py-2 hover:bg-surface-elevated rounded-md transition-colors"
        >
          <p className="text-text-secondary text-sm font-mono truncate">
            {entry.expression}
          </p>
          <p className="text-text-primary text-base font-mono truncate">
            {entry.result}
          </p>
        </button>
      ))}
      <button
        onClick={onClear}
        className="text-accent-pink text-sm mt-2 py-2 hover:opacity-80 transition-opacity"
      >
        Limpar histórico
      </button>
    </div>
  );
}
