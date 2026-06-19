'use client';
import { motion } from 'motion/react';

interface Tab { id: string; label: string; }

export function AnimatedTabs({ tabs, activeTab, onTabChange }: { tabs: Tab[]; activeTab: string; onTabChange: (id: string) => void }) {
  return (
    <div className="flex gap-1 relative bg-surface-elevated rounded-lg p-1">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative z-10 px-3 py-1 text-xs transition-colors ${
            activeTab === tab.id ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute inset-0 bg-accent-cyan/20 rounded-md"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
