'use client'

import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('./scene-3d'), { ssr: false })

interface GridPoint { x: number; y: number; z: number }

interface Props {
  grid?: GridPoint[]
  resolution?: number
  cameraTarget?: [number, number, number]
  renderMode?: 'solid' | 'wireframe' | 'both'
}

export default function Scene3DWrapper(props: Props) {
  return <Scene3D {...props} />
}
