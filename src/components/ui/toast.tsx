'use client';
import { AnimatePresence, motion } from 'motion/react';

interface ToastProps {
  message: string | null;
  type?: 'error' | 'info';
  onDismiss: () => void;
}

export function Toast({ message, type = 'error', onDismiss }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-sm font-mono ${
            type === 'error' ? 'bg-accent-pink/20 text-accent-pink border border-accent-pink/30' : 'bg-surface-elevated text-text-primary'
          }`}
          onClick={onDismiss}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
