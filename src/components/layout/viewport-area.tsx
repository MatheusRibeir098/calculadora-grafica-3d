'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Graph2D } from '@/components/graph/graph-2d';
import { Graph3D } from '@/components/graph/graph-3d';
import { FunctionList } from '@/components/graph/function-list';
import { useFunctions } from '@/hooks/use-functions';

export function ViewportArea({ className }: { className?: string }) {
  const [mode, setMode] = useState<'2d' | '3d'>('2d');
  const [expression3D, setExpression3D] = useState('sin(x)*cos(y)');
  const { functions, addFunction, removeFunction, updateExpression, toggleVisibility } =
    useFunctions();

  return (
    <section
      className={cn(
        'flex flex-col bg-surface min-h-[400px] md:min-h-0 @container',
        'border border-border/50 rounded-lg m-2 overflow-hidden',
        className
      )}
      style={{ gridArea: 'viewport' }}
    >
      {/* Controls bar */}
      <div className="flex items-center gap-2 p-2 border-b border-border/50">
        <button
          onClick={() => setMode('2d')}
          className={`text-xs px-3 py-1 rounded-md transition-colors ${
            mode === '2d'
              ? 'bg-accent-cyan/20 text-accent-cyan'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          2D
        </button>
        <button
          onClick={() => setMode('3d')}
          className={`text-xs px-3 py-1 rounded-md transition-colors ${
            mode === '3d'
              ? 'bg-accent-cyan/20 text-accent-cyan'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          3D
        </button>

        {mode === '3d' && (
          <input
            value={expression3D}
            onChange={(e) => setExpression3D(e.target.value)}
            placeholder="f(x,y) = ..."
            className="ml-2 flex-1 bg-surface-elevated rounded px-2 py-1 text-xs font-mono text-text-primary outline-none focus:ring-1 focus:ring-accent-cyan"
          />
        )}
      </div>

      {/* Function list for 2D */}
      {mode === '2d' && (
        <div className="p-2 border-b border-border/50">
          <FunctionList
            functions={functions}
            onAdd={addFunction}
            onRemove={removeFunction}
            onUpdate={updateExpression}
            onToggle={toggleVisibility}
          />
        </div>
      )}

      {/* Graph area */}
      <div className="flex-1 relative min-h-0">
        {mode === '2d' ? <Graph2D functions={functions} /> : <Graph3D expression={expression3D} />}
      </div>
    </section>
  );
}
