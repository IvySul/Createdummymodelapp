import basicInfoBlank from '../../../assets/matches-basic-info-artboard.svg';

export type MatchesBasicInfoArtboardProps = {
  age: number;
  genderDisplay: string;
  location: string;
  price: string;
  timeRange: string;
  politics: string;
  education: string;
  occupation: string;
  religion: string;
};

const VIEWBOX_WIDTH = 426.1;
const VIEWBOX_HEIGHT = 401.03;

function toCaps(value: string | number) {
  return String(value).toUpperCase();
}

export function MatchesBasicInfoArtboard({
  age,
  genderDisplay,
  location,
  price,
  timeRange,
  politics,
  education,
  occupation,
  religion,
}: MatchesBasicInfoArtboardProps) {
  return (
    <div data-no-swipe="true" className="w-full">
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        className="pointer-events-none block h-auto w-full select-none"
        aria-hidden
      >
        <image href={basicInfoBlank} x="0" y="0" width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} />
        <text x="36.64" y="60.76" fill="#282828" fontFamily="'Open Sans', sans-serif" fontSize="28" fontWeight="300">
          BASIC INFO
        </text>

        <g fill="#282828" fontFamily="'Open Sans', sans-serif" fontSize="14" fontWeight="300" letterSpacing="-0.2">
          <text x="44.1" y="102.96">{toCaps(age)}</text>
          <text x="105.92" y="102.96">{toCaps(genderDisplay)}</text>
          <text x="201.37" y="102.96">{toCaps(location)}</text>
          <text x="300.84" y="102.96">{toCaps(price)}</text>

          <text x="88.67" y="148.08">{toCaps(timeRange)}</text>
          <text x="90.86" y="193.39">{toCaps(politics)}</text>
          <text x="91.2" y="237.49">{toCaps(education)}</text>
          <text x="90.58" y="280">{toCaps(occupation)}</text>
          <text x="92.53" y="322.24">{toCaps(religion)}</text>
        </g>
      </svg>
    </div>
  );
}
