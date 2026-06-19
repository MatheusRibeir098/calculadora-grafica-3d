'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useFunction3D } from '@/hooks/math/use-function-3d';
import CameraControls from './camera-controls';
import { RenderModeToggle } from './render-mode-toggle';

const Scene3DWrapper = dynamic(() => import('./scene-3d-wrapper'), { ssr: false });

interface Graph3DProps {
  expression: string;
}

export function Graph3D({ expression }: Graph3DProps) {
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([5, 5, 5]);
  const [renderMode, setRenderMode] = useState<'solid' | 'wireframe' | 'both'>('solid');
  const { grid, isValid } = useFunction3D(expression, [-5, 5], [-5, 5], 50);

  return (
    <div className="relative w-full h-full">
      <Scene3DWrapper
        grid={isValid ? grid : []}
        resolution={50}
        cameraTarget={cameraTarget}
        renderMode={renderMode}
      />
      <CameraControls onPreset={setCameraTarget} />
      <RenderModeToggle mode={renderMode} onModeChange={setRenderMode} />
    </div>
  );
}
