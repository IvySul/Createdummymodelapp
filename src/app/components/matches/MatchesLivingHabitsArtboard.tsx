import livingHabitsBlank from '../../../assets/matches-living-habits-artboard.svg';
import { MatchArtboardFrame } from './MatchArtboardFrame';

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

/** Same header slot and list baselines as `MatchesBasicInfoArtboard` for matched vertical rhythm. */
const TEXT = {
  title: { x: 36.64, y: 60.76 },
  schedule: { x: 88.67, y: 102.96 },
  noise: { x: 88.67, y: 148.08 },
  cleanliness: { x: 90.86, y: 193.39 },
  pets: { x: 91.2, y: 237.49 },
  guestPolicy: { x: 90.58, y: 280 },
  substanceUse: { x: 92.53, y: 322.24 },
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
      <MatchArtboardFrame>
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
      </MatchArtboardFrame>
    </div>
  );
}
