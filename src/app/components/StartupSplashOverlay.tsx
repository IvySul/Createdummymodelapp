const LINE_STYLE = {
  fill: 'none',
  stroke: '#111111',
  strokeWidth: 7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const M_PATH = 'M70 190 L70 83 L150 190 L230 83 L230 190';
const ROOF_PATH = 'M40 110 L150 25 L260 110';

type StartupSplashOverlayProps = {
  visible: boolean;
};

export function StartupSplashOverlay({ visible }: StartupSplashOverlayProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[6000] flex min-h-[100dvh] w-full min-w-0 flex-col bg-[#ffd4ae] pointer-events-none pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]">
      <section className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-5 py-8">
        <div className="w-[min(88vw,320px)] aspect-[300/230] flex items-center justify-center overflow-visible">
          <svg viewBox="0 -50 300 270" role="img" aria-label="Occumate splash icon" className="w-full h-full">
            <path d={M_PATH} pathLength={1} style={LINE_STYLE} className="draw-line draw-m" />
            <g className="roof-group">
              <path d={ROOF_PATH} pathLength={1} style={LINE_STYLE} className="draw-line draw-roof" />
            </g>
          </svg>
        </div>
      </section>

      <style>{`
        .draw-line {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          opacity: 1;
        }

        .draw-m {
          animation: draw-stroke 0.82s cubic-bezier(0.2, 0.8, 0.22, 1) forwards;
        }

        .draw-roof {
          animation: draw-stroke 0.62s cubic-bezier(0.2, 0.8, 0.22, 1) 0.9s forwards;
        }

        .roof-group {
          transform: translateY(-44px) scale(0.96);
          animation: roof-drop 0.62s cubic-bezier(0.18, 0.95, 0.2, 1) 1.55s forwards;
        }

        @keyframes draw-stroke {
          from {
            stroke-dashoffset: 1;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes roof-drop {
          0% {
            transform: translateY(-44px) scale(0.96);
          }
          50% {
            transform: translateY(14px) scale(1.02);
          }
          72% {
            transform: translateY(-6px) scale(0.995);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
