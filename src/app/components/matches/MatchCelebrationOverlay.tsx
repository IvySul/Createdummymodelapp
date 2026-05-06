const LINE_STYLE = {
  fill: "none",
  stroke: "#111111",
  strokeWidth: 7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const M_PATH = "M70 190 L70 83 L150 190 L230 83 L230 190";
const ROOF_PATH = "M40 110 L150 25 L260 110";

type MatchCelebrationOverlayProps = {
  visible: boolean;
};

export function MatchCelebrationOverlay({ visible }: MatchCelebrationOverlayProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[6000] flex min-h-[100dvh] w-full min-w-0 flex-col bg-[#ffd4ae] pointer-events-auto pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]">
      <section className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 overflow-hidden px-5 py-8">
        <h1
          className="title-reveal font-semibold text-zinc-900 text-center leading-[1.05] uppercase"
          style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "clamp(1.8rem, 6.6vw, 3.4rem)" }}
        >
          You Matched!
        </h1>

        <div className="w-[min(88vw,320px)] aspect-[300/230] flex items-center justify-center overflow-visible">
          <svg
            viewBox="0 -50 300 270"
            role="img"
            aria-label="You matched celebration icon"
            className="w-full h-full"
          >
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

        .title-reveal {
          opacity: 0;
          transform: translateY(8px);
          animation: title-in 250ms ease-out 2.18s forwards;
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

        @keyframes title-in {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
