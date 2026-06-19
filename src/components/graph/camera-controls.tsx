'use client'

const presets: Record<string, [number, number, number]> = {
  Top: [0, 10, 0.01],
  Front: [0, 0, 10],
  Side: [10, 0, 0],
  '3D': [5, 5, 5],
}

interface CameraControlsProps {
  onPreset: (position: [number, number, number]) => void
}

export default function CameraControls({ onPreset }: CameraControlsProps) {
  return (
    <div className="absolute top-2 right-2 z-10 flex gap-1 rounded-md bg-surface/80 p-1 backdrop-blur-sm">
      {Object.entries(presets).map(([name, pos]) => (
        <button
          key={name}
          onClick={() => onPreset(pos)}
          className="rounded px-2 py-1 text-xs text-text-secondary hover:text-accent-cyan"
        >
          {name}
        </button>
      ))}
    </div>
  )
}
