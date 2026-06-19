'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

interface AnimatedCameraProps {
  targetPosition: [number, number, number]
}

export default function AnimatedCamera({ targetPosition }: AnimatedCameraProps) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(...targetPosition))

  target.current.set(...targetPosition)

  useFrame(() => {
    const dist = camera.position.distanceTo(target.current)
    if (dist > 0.01) {
      camera.position.lerp(target.current, 0.05)
      camera.lookAt(0, 0, 0)
    }
  })

  return null
}
