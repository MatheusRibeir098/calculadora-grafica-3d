'use client';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Calculator } from '@/components/calculator/calculator';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileCalculatorSheet({ open, onOpenChange }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[70vh] bg-background rounded-t-2xl pb-safe">
        <SheetHeader>
          <SheetTitle className="text-sm text-text-secondary">Calculadora</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          <Calculator />
        </div>
      </SheetContent>
    </Sheet>
  );
}
