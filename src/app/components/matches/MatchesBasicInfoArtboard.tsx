import basicInfoBlank from '../../../assets/matches-basic-info-artboard.svg';

export type MatchesBasicInfoArtboardProps = {
  age: number;
  genderDisplay: string;
  location: string;
  /** e.g. "$700–$900" (en dash). */
  priceRange: string;
  timeRange: string;
  politics: string;
  education: string;
  occupation: string;
  religion: string;
};

const VIEWBOX_WIDTH = 426.1;
const VIEWBOX_HEIGHT = 401.03;

/** Must match `matches-basic-info-artboard.svg` vertical dividers in the top stat row. */
const TOP_ROW = {
  innerLeft: 32.39,
  div1: 90.65,
  div2: 178.39,
  div3: 305,
  innerRight: 402.41,
  textY: 102.96,
} as const;

const TOP_ROW_CENTERS = {
  age: (TOP_ROW.innerLeft + TOP_ROW.div1) / 2,
  gender: (TOP_ROW.div1 + TOP_ROW.div2) / 2,
  location: (TOP_ROW.div2 + TOP_ROW.div3) / 2,
  price: (TOP_ROW.div3 + TOP_ROW.innerRight) / 2,
} as const;

function toCaps(value: string | number) {
  return String(value).toUpperCase();
}

export function MatchesBasicInfoArtboard({
  age,
  genderDisplay,
  location,
  priceRange,
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
          <text x={TOP_ROW_CENTERS.age} y={TOP_ROW.textY} textAnchor="middle">
            {toCaps(age)}
          </text>
          <text x={TOP_ROW_CENTERS.gender} y={TOP_ROW.textY} textAnchor="middle">
            {toCaps(genderDisplay)}
          </text>
          <text x={TOP_ROW_CENTERS.location} y={TOP_ROW.textY} textAnchor="middle">
            {toCaps(location)}
          </text>
          <text x={TOP_ROW_CENTERS.price} y={TOP_ROW.textY} textAnchor="middle">
            {toCaps(priceRange)}
          </text>

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
