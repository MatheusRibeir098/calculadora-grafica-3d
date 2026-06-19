export function GraphSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-surface animate-pulse">
      <div className="w-3/4 h-3/4 rounded-lg bg-surface-elevated relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </div>
  );
}
