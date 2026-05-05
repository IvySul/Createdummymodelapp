import { useId, useMemo } from 'react';
import { motion } from 'motion/react';

export type CompatibilityKeyMeterProps = {
  /** 0–100 compatibility score. */
  value: number;
  className?: string;
};

/**
 * Key-shaped meter: a gradient fill rises inside the key silhouette (clipped),
 * with a spring animation when `value` changes.
 */
export function CompatibilityKeyMeter({ value, className }: CompatibilityKeyMeterProps) {
  const reactId = useId();
  const clipId = useMemo(() => `key-meter-clip-${reactId.replace(/:/g, '')}`, [reactId]);
  const gradId = useMemo(() => `key-meter-grad-${reactId.replace(/:/g, '')}`, [reactId]);

  const pct = Math.max(0, Math.min(100, value));
  const vbW = 56;
  const vbH = 80;

  // Bow + shaft + bit; single closed region for clip-path fill.
  const keyPath =
    'M 28 5 C 17 5 9 13 9 22 C 9 31 15 38 24 39 L 24 58 L 15 58 L 15 68 L 24 68 L 24 78 L 32 78 L 32 50 L 39 50 L 39 39 C 41 38 47 31 47 22 C 47 13 39 5 28 5 Z';

  return (
    <div
      className={className ? `flex flex-col items-stretch ${className}` : 'flex flex-col items-stretch'}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-label={`Compatibility ${Math.round(pct)} percent`}
    >
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        className="mx-auto block h-full w-auto max-w-full drop-shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="55%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#a7f3d0" />
          </linearGradient>
          <clipPath id={clipId}>
            <path d={keyPath} />
          </clipPath>
        </defs>

        {/* Dim track inside key */}
        <path d={keyPath} fill="rgba(0,0,0,0.06)" />

        <g clipPath={`url(#${clipId})`}>
          <motion.rect
            x={0}
            width={vbW}
            fill={`url(#${gradId})`}
            initial={{ y: vbH, height: 0 }}
            animate={{
              y: vbH * (1 - pct / 100),
              height: vbH * (pct / 100),
            }}
            transition={{
              type: 'spring',
              stiffness: 70,
              damping: 16,
              mass: 0.85,
            }}
          />
        </g>

        <path
          d={keyPath}
          fill="none"
          stroke="rgba(64,64,64,0.88)"
          strokeWidth={1.75}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <p className="mt-1 text-center text-[11px] font-medium tabular-nums tracking-tight text-neutral-800">
        {Math.round(pct)}%
      </p>
    </div>
  );
}
