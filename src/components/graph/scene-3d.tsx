'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Surface3D } from './surface-3d'
import ReferenceGrid from './reference-grid'
import { Lighting } from './lighting'
import AnimatedCamera from './animated-camera'

interface GridPoint { x: number; y: number; z: number }

interface Scene3DProps {
  grid?: GridPoint[]
  resolution?: number
  cameraTarget?: [number, number, number]
  renderMode?: 'solid' | 'wireframe' | 'both'
}

export default function Scene3D({ grid = [], resolution = 50, cameraTarget = [5, 5, 5], renderMode = 'solid' }: Scene3DProps) {
  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#0a0a0f']} />
      <Lighting />
      <OrbitControls enableDamping />
      <AnimatedCamera targetPosition={cameraTarget} />
      <ReferenceGrid />
      {grid.length > 0 && (
        <>
          <Surface3D
            grid={grid}
            resolution={resolution}
            wireframe={renderMode === 'wireframe'}
            colorMap
          />
          {renderMode === 'both' && (
            <Surface3D
              grid={grid}
              resolution={resolution}
              wireframe
              colorMap={false}
              color="rgba(255,255,255,0.3)"
            />
          )}
        </>
      )}
    </Canvas>
  )
}
