'use client';
import { motion, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';

export function AnimatedNumber({ value, className }: { value: number | null; className?: string }) {
  const spring = useSpring(0, { stiffness: 100, damping: 20 });
  const display = useTransform(spring, v => {
    if (!isFinite(v)) return String(value ?? '0');
    return Number(v.toFixed(6)).toString();
  });

  useEffect(() => {
    if (value !== null && isFinite(value)) spring.set(value);
  }, [value, spring]);

  if (value === null) return null;
  return <motion.span className={className}>{display}</motion.span>;
}
