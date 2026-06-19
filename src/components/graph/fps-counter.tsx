'use client';
import { Stats } from '@react-three/drei';

export function FpsCounter() {
  if (process.env.NODE_ENV !== 'development') return null;
  return <Stats />;
}
