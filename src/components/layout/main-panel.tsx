import { cn } from '@/lib/utils';
import { Calculator } from '@/components/calculator/calculator';

export function MainPanel({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'flex flex-col bg-background border-r border-border overflow-y-auto',
        className
      )}
      style={{ gridArea: 'main' }}
    >
      <Calculator />
    </section>
  );
}
