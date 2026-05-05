import { useEffect, useId, useMemo, useState } from 'react';
import { motion } from 'motion/react';

/** Soft panel tint used across Occumate (`#ebeff5`) with a slightly warmer companion for the fill gradient. */
const FILL_GRADIENT_STOPS = [
  { offset: '0%', color: '#dfe5f0' },
  { offset: '48%', color: '#ebeff5' },
  { offset: '100%', color: '#f4ece8' },
] as const;

export type CompatibilityKeyMeterProps = {
  /** 0–100 compatibility score. */
  value: number;
  className?: string;
};

/**
 * Horizontal key-shaped meter: fill grows left → right inside the key silhouette,
 * with a slow ease (Occumate panel / peachy neutrals).
 */
export function CompatibilityKeyMeter({ value, className }: CompatibilityKeyMeterProps) {
  const reactId = useId();
  const clipId = useMemo(() => `key-meter-clip-${reactId.replace(/:/g, '')}`, [reactId]);
  const gradId = useMemo(() => `key-meter-grad-${reactId.replace(/:/g, '')}`, [reactId]);

  const pct = Math.max(0, Math.min(100, value));
  const [displayPct, setDisplayPct] = useState(0);
  const vbW = 76;
  const vbH = 42;

  useEffect(() => {
    setDisplayPct(0);
    const timerId = window.setTimeout(() => setDisplayPct(pct), 120);
    return () => window.clearTimeout(timerId);
  }, [pct]);

  // Lying-down key (bow left, bit right); same topology as the vertical key, coords swapped + shifted.
  const keyPath =
    'M 0 19 C 0 8 8 0 17 0 C 26 0 33 6 34 15 L 53 15 L 53 6 L 63 6 L 63 15 L 73 15 L 73 23 L 45 23 L 45 30 L 34 30 C 33 32 26 38 17 38 C 8 38 0 30 0 19 Z';

  return (
    <div
      className={className ? `flex w-full flex-col items-stretch ${className}` : 'flex w-full flex-col items-stretch'}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-label={`Compatibility ${Math.round(pct)} percent`}
    >
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        preserveAspectRatio="xMidYMid meet"
        className="mx-auto block h-auto w-full max-w-full drop-shadow-[0_1px_4px_rgba(0,0,0,0.1)]"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            {FILL_GRADIENT_STOPS.map((s) => (
              <stop key={s.offset} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>
          <clipPath id={clipId}>
            <path d={keyPath} />
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          <motion.rect
            x={0}
            y={0}
            height={vbH}
            fill={`url(#${gradId})`}
            initial={{ width: 0 }}
            animate={{ width: vbW * (displayPct / 100) }}
            transition={{
              type: 'tween',
              duration: 2.8,
              ease: [0.22, 0.94, 0.36, 1],
            }}
          />
        </g>

        <path
          d={keyPath}
          fill="none"
          stroke="rgba(64,64,64,0.82)"
          strokeWidth={1.35}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <p className="mt-2 text-center text-[13px] font-medium tabular-nums tracking-tight text-neutral-800">
        {Math.round(pct)}%
      </p>
    </div>
  );
}
