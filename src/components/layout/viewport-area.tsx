import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Box } from 'lucide-react';

export const ViewportArea = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center bg-surface min-h-[400px] md:min-h-0 @container',
          'border border-border/50 rounded-lg m-2',
          className
        )}
        style={{ gridArea: 'viewport' }}
      >
        <Box className="size-16 text-accent-cyan/20 mb-4" />
        <p className="text-text-primary text-sm font-medium">
          Adicione uma função para visualizar
        </p>
        <p className="text-text-secondary text-xs mt-1">
          O gráfico 3D aparecerá aqui
        </p>
      </section>
    );
  }
);

ViewportArea.displayName = 'ViewportArea';
