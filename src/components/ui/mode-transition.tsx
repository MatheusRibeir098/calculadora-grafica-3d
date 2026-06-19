'use client';
import { AnimatePresence, motion } from 'motion/react';
import { ReactNode } from 'react';

export function ModeTransition({ children, mode }: { children: ReactNode; mode: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
