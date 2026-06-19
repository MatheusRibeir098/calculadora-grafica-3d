'use client';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function ZoomControls({ onZoomIn, onZoomOut, onReset }: ZoomControlsProps) {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-1 bg-surface/80 backdrop-blur-sm rounded-md p-1">
      <button onClick={onZoomIn} className="text-xs text-text-secondary hover:text-accent-cyan px-2 py-1">+</button>
      <button onClick={onZoomOut} className="text-xs text-text-secondary hover:text-accent-cyan px-2 py-1">−</button>
      <button onClick={onReset} className="text-xs text-text-secondary hover:text-accent-cyan px-2 py-1">Reset</button>
    </div>
  );
}
