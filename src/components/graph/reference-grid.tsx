'use client'

import { Line, Text } from '@react-three/drei'
import * as THREE from 'three'

export default function ReferenceGrid() {
  return (
    <group>
      <gridHelper args={[20, 20, new THREE.Color(1, 1, 1), new THREE.Color(1, 1, 1)]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial attach="material" opacity={0.15} transparent />
      </gridHelper>

      {/* X axis */}
      <Line points={[[-10, 0, 0], [10, 0, 0]]} color="#ef4444" lineWidth={1.5} />
      {/* Y axis */}
      <Line points={[[0, -10, 0], [0, 10, 0]]} color="#22c55e" lineWidth={1.5} />
      {/* Z axis */}
      <Line points={[[0, 0, -10], [0, 0, 10]]} color="#3b82f6" lineWidth={1.5} />

      <Text position={[10.5, 0, 0]} fontSize={0.4} color="#ef4444">X</Text>
      <Text position={[0, 10.5, 0]} fontSize={0.4} color="#22c55e">Y</Text>
      <Text position={[0, 0, 10.5]} fontSize={0.4} color="#3b82f6">Z</Text>
    </group>
  )
}
