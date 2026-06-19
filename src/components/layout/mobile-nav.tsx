'use client';

import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { navItems } from './sidebar';

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] bg-sidebar pb-safe">
        <SheetHeader>
          <SheetTitle className="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
            CalcGraph 3D
          </SheetTitle>
        </SheetHeader>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map(({ icon: Icon, label }) => (
            <button
              key={label}
              className={cn(
                'flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm text-text-secondary',
                'hover:bg-surface-elevated hover:text-accent-cyan transition-colors'
              )}
            >
              <Icon className="size-5 shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
