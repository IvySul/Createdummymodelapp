import { useEffect, useId, useMemo, useState } from 'react';
import { motion } from 'motion/react';

/** Fill inside the key (matches design request). */
const KEY_FILL = '#ffd4ae';

export type CompatibilityKeyMeterProps = {
  /** 0–100 compatibility score. */
  value: number;
  className?: string;
};

/**
 * Horizontal key-shaped meter: fill grows left → right inside the key silhouette.
 */
export function CompatibilityKeyMeter({ value, className }: CompatibilityKeyMeterProps) {
  const reactId = useId();
  const clipId = useMemo(() => `key-meter-clip-${reactId.replace(/:/g, '')}`, [reactId]);

  const pct = Math.max(0, Math.min(100, value));
  const [displayPct, setDisplayPct] = useState(0);
  /** Path extents (horizontal key); fill animates along this span. */
  const pathW = 92;
  const pathH = 30;
  /** Padding so stroke is not clipped at the SVG edges. */
  const pad = 5;
  const viewW = pathW + pad * 2;
  const viewH = pathH + pad * 2;

  useEffect(() => {
    setDisplayPct(0);
    const timerId = window.setTimeout(() => setDisplayPct(pct), 120);
    return () => window.clearTimeout(timerId);
  }, [pct]);

  // Lying-down key (bow left, bit right); same topology as the vertical key, coords swapped + shifted.
  const keyPath =
    'M 3 15 A 13 13 0 1 1 29 15 L 67 15 L 67 10 L 76 10 L 76 15 L 88 15 L 88 21 L 58 21 L 58 24 L 49 24 L 49 19 L 29 19 A 13 13 0 0 1 3 15 Z';

  return (
    <div
      className={className ? `flex w-full flex-col items-stretch overflow-visible ${className}` : 'flex w-full flex-col items-stretch overflow-visible'}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-label={`Compatibility ${Math.round(pct)} percent`}
    >
      <svg
        viewBox={`${-pad} ${-pad} ${viewW} ${viewH}`}
        preserveAspectRatio="xMidYMid meet"
        className="block w-full overflow-visible"
        style={{ aspectRatio: `${viewW} / ${viewH}` }}
        aria-hidden
      >
        <defs>
          <clipPath id={clipId}>
            <path d={keyPath} />
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          <motion.rect
            x={0}
            y={0}
            height={pathH}
            fill={KEY_FILL}
            initial={{ width: 0 }}
            animate={{ width: pathW * (displayPct / 100) }}
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
          strokeWidth={0.9}
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
