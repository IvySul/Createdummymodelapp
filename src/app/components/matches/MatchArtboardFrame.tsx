import type { ReactNode } from 'react';

/** White card in assets is 387.85px wide inside a 426.1 viewBox — scale so the card spans the same width as full-bleed content above. */
export function MatchArtboardFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative left-1/2 w-[calc(100%*426.1/387.85)] max-w-none -translate-x-1/2 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
