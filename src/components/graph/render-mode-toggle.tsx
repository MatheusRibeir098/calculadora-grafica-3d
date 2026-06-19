'use client';

type RenderMode = 'solid' | 'wireframe' | 'both';

interface RenderModeToggleProps {
  mode: RenderMode;
  onModeChange: (mode: RenderMode) => void;
}

const modes: { label: string; value: RenderMode }[] = [
  { label: 'Solid', value: 'solid' },
  { label: 'Wire', value: 'wireframe' },
  { label: 'Ambos', value: 'both' },
];

export function RenderModeToggle({ mode, onModeChange }: RenderModeToggleProps) {
  return (
    <div className="absolute top-2 left-2 z-10 flex gap-1 rounded-md bg-surface/80 p-1 backdrop-blur-sm">
      {modes.map((m) => (
        <button
          key={m.value}
          onClick={() => onModeChange(m.value)}
          className={`rounded px-2 py-1 text-xs transition-colors ${
            mode === m.value ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-surface'
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
