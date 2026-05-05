import type { ReactNode } from 'react';

/** Full-width wrapper so artboards align with the same max-w-md column as Profile and other tabs. */
export function MatchArtboardFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`relative w-full ${className}`.trim()}>{children}</div>;
}
