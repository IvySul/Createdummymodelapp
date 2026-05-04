import livingHabitsBlank from '../../../assets/matches-living-habits-artboard.svg';

export type MatchesLivingHabitsArtboardProps = {
  schedule: string;
  noise: string;
  cleanliness: string;
  pets: string;
  guestPolicy: string;
  substanceUse: string;
};

const VIEWBOX_WIDTH = 426.1;
const VIEWBOX_HEIGHT = 401.03;

/** Original `Artboard 3.svg` text anchor points (same viewBox). */
const TEXT = {
  title: { x: 33.42, y: 62.69 },
  schedule: { x: 83.22, y: 102.1 },
  noise: { x: 85.6, y: 147.01 },
  cleanliness: { x: 87.79, y: 192.32 },
  pets: { x: 88.14, y: 236.42 },
  guestPolicy: { x: 87.52, y: 278.93 },
  substanceUse: { x: 89.46, y: 321.17 },
} as const;

function toCaps(value: string | number) {
  return String(value).toUpperCase();
}

export function MatchesLivingHabitsArtboard({
  schedule,
  noise,
  cleanliness,
  pets,
  guestPolicy,
  substanceUse,
}: MatchesLivingHabitsArtboardProps) {
  return (
    <div data-no-swipe="true" className="mt-5 w-full">
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        className="pointer-events-none block h-auto w-full select-none"
        aria-hidden
      >
        <image href={livingHabitsBlank} x="0" y="0" width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} />
        <text x={TEXT.title.x} y={TEXT.title.y} fill="#282828" fontFamily="'Open Sans', sans-serif" fontSize="28" fontWeight="300">
          LIVING HABITS
        </text>

        <g fill="#282828" fontFamily="'Open Sans', sans-serif" fontSize="14" fontWeight="300" letterSpacing="-0.2">
          <text x={TEXT.schedule.x} y={TEXT.schedule.y}>
            {toCaps(schedule)}
          </text>
          <text x={TEXT.noise.x} y={TEXT.noise.y}>
            {toCaps(noise)}
          </text>
          <text x={TEXT.cleanliness.x} y={TEXT.cleanliness.y}>
            {toCaps(cleanliness)}
          </text>
          <text x={TEXT.pets.x} y={TEXT.pets.y}>
            {toCaps(pets)}
          </text>
          <text x={TEXT.guestPolicy.x} y={TEXT.guestPolicy.y}>
            {toCaps(guestPolicy)}
          </text>
          <text x={TEXT.substanceUse.x} y={TEXT.substanceUse.y}>
            {toCaps(substanceUse)}
          </text>
        </g>
      </svg>
    </div>
  );
}
