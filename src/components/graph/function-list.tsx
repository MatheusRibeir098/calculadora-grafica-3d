'use client';

import { FunctionEntry } from '@/hooks/use-functions';

interface FunctionListProps {
  functions: FunctionEntry[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, expression: string) => void;
  onToggle: (id: string) => void;
}

export function FunctionList({ functions, onAdd, onRemove, onUpdate, onToggle }: FunctionListProps) {
  return (
    <div className="space-y-2">
      {functions.map(fn => (
        <div key={fn.id} className="flex items-center gap-2 bg-surface rounded-md p-2">
          <span
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: fn.color }}
          />
          <input
            type="text"
            value={fn.expression}
            onChange={e => onUpdate(fn.id, e.target.value)}
            placeholder="ex: sin(x)"
            className="flex-1 bg-transparent font-mono text-sm outline-none min-w-0"
          />
          <button
            onClick={() => onToggle(fn.id)}
            className="text-xs opacity-60 hover:opacity-100 shrink-0"
            aria-label={fn.visible ? 'Ocultar' : 'Mostrar'}
          >
            {fn.visible ? '👁' : '👁‍🗨'}
          </button>
          <button
            onClick={() => onRemove(fn.id)}
            className="text-xs opacity-60 hover:opacity-100 shrink-0"
            aria-label="Remover"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={onAdd}
        disabled={functions.length >= 5}
        className="w-full text-sm py-1 rounded-md opacity-70 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        + Adicionar função
      </button>
    </div>
  );
}
