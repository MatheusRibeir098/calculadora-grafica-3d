interface DisplayProps {
  expression: string;
  result: string | null;
  error: string | null;
}

export function Display({ expression, result, error }: DisplayProps) {
  const showError = error !== null;
  const preview = showError ? error : (result ?? '...');

  return (
    <div className="bg-surface rounded-lg p-4">
      <div className="text-base md:text-lg text-text-primary font-mono truncate overflow-x-auto">
        {expression || '\u00A0'}
      </div>
      <div
        className={`text-sm md:text-base font-mono mt-1 truncate overflow-x-auto ${
          showError ? 'text-accent-pink' : 'text-text-secondary'
        }`}
      >
        {preview}
      </div>
    </div>
  );
}
