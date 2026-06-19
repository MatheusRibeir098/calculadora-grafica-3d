import { cn } from '@/lib/utils';

export function MainPanel({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'flex flex-col bg-background border-r border-border p-4 md:p-6',
        className
      )}
      style={{ gridArea: 'main' }}
    >
      <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
        Funções
      </h2>
      <p className="text-sm text-text-secondary">Nenhuma função adicionada</p>
    </section>
  );
}
