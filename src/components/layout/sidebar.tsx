'use client';

import { cn } from '@/lib/utils';
import { Calculator, FunctionSquare, History } from 'lucide-react';

const navItems = [
  { icon: Calculator, label: 'Calculadora' },
  { icon: FunctionSquare, label: 'Funções' },
  { icon: History, label: 'Histórico' },
] as const;

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        'hidden md:flex flex-col overflow-y-auto bg-sidebar border-r border-sidebar-border',
        'lg:w-[280px] md:w-[60px] lg:hover:w-[280px] md:hover:w-[280px]',
        'transition-[width] duration-300 ease-in-out group/sidebar',
        className
      )}
      style={{ gridArea: 'sidebar' }}
    >
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className={cn(
              'flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm text-text-secondary',
              'hover:bg-surface-elevated hover:text-accent-cyan transition-colors'
            )}
          >
            <Icon className="size-5 shrink-0" />
            <span className="truncate opacity-0 group-hover/sidebar:opacity-100 lg:opacity-100 transition-opacity duration-300">
              {label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export { navItems };
