'use client';
import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

interface GridPoint { x: number; y: number; z: number; }

interface Surface3DProps {
  grid: GridPoint[];
  resolution: number;
  color?: string;
  wireframe?: boolean;
  colorMap?: boolean;
}

function lerpColor(t: number): [number, number, number] {
  const stops: { t: number; r: number; g: number; b: number }[] = [
    { t: 0,    r: 0x3b / 255, g: 0x82 / 255, b: 0xf6 / 255 }, // blue
    { t: 0.33, r: 0x06 / 255, g: 0xb6 / 255, b: 0xd4 / 255 }, // cyan
    { t: 0.66, r: 0xa8 / 255, g: 0x55 / 255, b: 0xf7 / 255 }, // purple
    { t: 1,    r: 0xec / 255, g: 0x48 / 255, b: 0x99 / 255 }, // pink
  ];
  const clamped = Math.max(0, Math.min(1, t));
  let i = 0;
  for (; i < stops.length - 2; i++) {
    if (clamped <= stops[i + 1].t) break;
  }
  const a = stops[i], b = stops[i + 1];
  const local = (clamped - a.t) / (b.t - a.t);
  return [
    a.r + (b.r - a.r) * local,
    a.g + (b.g - a.g) * local,
    a.b + (b.b - a.b) * local,
  ];
}

const Surface3DInner = ({ grid, resolution, color = '#06b6d4', wireframe = false, colorMap = true }: Surface3DProps) => {
  const geoRef = useRef<THREE.BufferGeometry | null>(null);

  const positions = useMemo(() => {
    if (!grid || grid.length === 0) return null;
    const arr = new Float32Array(grid.length * 3);
    for (let i = 0; i < grid.length; i++) {
      arr[i * 3] = grid[i].x;
      arr[i * 3 + 1] = grid[i].z; // Three.js Y is up
      arr[i * 3 + 2] = grid[i].y;
    }
    return arr;
  }, [grid]);

  const indices = useMemo(() => {
    if (!grid || grid.length === 0 || resolution < 2) return null;
    const idx: number[] = [];
    for (let row = 0; row < resolution - 1; row++) {
      for (let col = 0; col < resolution - 1; col++) {
        const i = row * resolution + col;
        idx.push(i, i + 1, i + resolution);
        idx.push(i + 1, i + resolution + 1, i + resolution);
      }
    }
    return new Uint32Array(idx);
  }, [grid, resolution]);

  const colors = useMemo(() => {
    if (!colorMap || !grid || grid.length === 0) return null;
    let zMin = Infinity, zMax = -Infinity;
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].z < zMin) zMin = grid[i].z;
      if (grid[i].z > zMax) zMax = grid[i].z;
    }
    const range = zMax - zMin || 1;
    const arr = new Float32Array(grid.length * 3);
    for (let i = 0; i < grid.length; i++) {
      const t = (grid[i].z - zMin) / range;
      const [r, g, b] = lerpColor(t);
      arr[i * 3] = r;
      arr[i * 3 + 1] = g;
      arr[i * 3 + 2] = b;
    }
    return arr;
  }, [grid, colorMap]);

  const geometry = useMemo(() => {
    if (!positions || !indices) return null;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setIndex(new THREE.BufferAttribute(indices, 1));
    if (colors) {
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
    geo.computeVertexNormals();
    return geo;
  }, [positions, indices, colors]);

  useEffect(() => {
    return () => { geoRef.current?.dispose(); };
  }, []);

  useEffect(() => {
    geoRef.current?.dispose();
    geoRef.current = geometry;
  }, [geometry]);

  if (!geometry) return null;

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={colorMap ? undefined : color}
        vertexColors={colorMap}
        wireframe={wireframe}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export const Surface3D = React.memo(Surface3DInner);
