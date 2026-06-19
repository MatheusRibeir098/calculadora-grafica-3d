'use client';

import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  className?: string;
  onMenuClick?: () => void;
}

export function Header({ className, onMenuClick }: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex items-center h-14 px-4 bg-surface border-b border-border',
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden mr-2"
        aria-label="Abrir menu"
        onClick={onMenuClick}
      >
        <Menu className="size-5" />
      </Button>
      <h1 className="text-lg font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
        CalcGraph 3D
      </h1>
    </header>
  );
}
