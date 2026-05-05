const PEACH = '#ffd4ae';
const STROKE = '#000';

/** Peach meets a horizontal band here (pillar × roof intersections), not sloped wedges to the outer eaves. */
const ROOF_UNDER_Y =
  (72.23 +
    ((51.08 - 72.23) * (76.25 - 66.11)) / (90.01 - 66.11) +
    72.23 +
    ((51.08 - 72.23) * (104.36 - 114.49)) / (90.6 - 114.49)) /
  2;

export type BottomNavRoute = 'matches' | 'messages' | 'map' | 'profile';

type Props = {
  active: BottomNavRoute | null;
};

export default function BottomNavArtboard({ active }: Props) {
  const matches = active === 'matches';
  const messages = active === 'messages';
  const map = active === 'map';
  const profile = active === 'profile';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 484.52 137.9"
      className="block size-full select-none pointer-events-none"
      aria-hidden
    >
      <defs>
        <filter
          id="bottom-nav-drop-shadow"
          x={-7.86}
          y={11.26}
          width={501}
          height={133}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dx="0" dy="7.96" />
          <feGaussianBlur result="blur" stdDeviation={5.69} />
          <feFlood floodColor="#939393" floodOpacity={0.5} />
          <feComposite in2="blur" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g filter="url(#bottom-nav-drop-shadow)">
        <rect
          fill="#fff"
          stroke="#e4e4e4"
          strokeWidth={0.99}
          strokeMiterlimit={10}
          x={10.3}
          y={20.89}
          width={463.91}
          height={96.12}
          rx={12}
          ry={12}
        />
      </g>
      <g strokeMiterlimit={10}>
        {matches ? (
          <g>
            <polygon
              fill={PEACH}
              stroke="none"
              strokeMiterlimit={10}
              points={`90.01,51.08 90.6,51.08 104.36,${ROOF_UNDER_Y} 76.25,${ROOF_UNDER_Y}`}
            />
            <polygon
              fill={PEACH}
              stroke="none"
              strokeMiterlimit={10}
              points={`66.11,${ROOF_UNDER_Y} 114.49,${ROOF_UNDER_Y} 114.49,72.23 104.36,86.66 76.25,86.82 66.11,72.23`}
            />
          </g>
        ) : null}
        <g stroke={STROKE} strokeWidth={0.77} fill="none">
          <polyline points="114.49 72.23 90.6 51.08 90.01 51.08 66.11 72.23" />
          <line x1={76.25} y1={63.18} x2={76.25} y2={86.82} />
          <polyline points="104.33 63.06 90.38 86.09 90.38 86.09 76.37 63.04" />
          <line x1={104.36} y1={63.01} x2={104.36} y2={86.66} />
        </g>
        <path
          stroke={STROKE}
          strokeWidth={0.87}
          strokeMiterlimit={10}
          fill={messages ? PEACH : 'none'}
          d="M219.62,76.49c2.4-2.44,2.72-4.83,2.72-7.99,0-8.47-10.06-15.34-22.46-15.34s-22.46,6.87-22.46,15.34,10.06,15.34,22.46,15.34c5.65,0,10.81-1.43,14.76-3.78.22.33.43.73.58,1.19.58,1.82-.27,3.19.17,3.45.52.31,2.37-1.23,3.39-3.24,1.02-2.01.95-3.97.84-4.97h0Z"
        />
        <path
          stroke={STROKE}
          strokeWidth={0.78}
          strokeMiterlimit={10}
          fill={map ? PEACH : 'none'}
          d="M297.64,85.15c-.71-.13-1.17-1.45-1.87-2.51-.49-.83-.98-1.64-1.49-2.47-3.09-5.45-9.62-14.4-8.96-18.66,1.65-10.85,20.71-12.01,24.26-1.31.5,1.54.46,3.05-.09,4.54-1.27,3.61-4.99,9.67-7.94,14.51-.63,1.04-1.25,2.06-1.87,3.09-.78,1.17-1.29,2.65-2.03,2.8h-.01Z"
        />
        <g stroke={STROKE} strokeWidth={0.8}>
          <ellipse
            cx={395.63}
            cy={62.08}
            rx={11.98}
            ry={11.49}
            fill={profile ? PEACH : 'none'}
          />
          <path
            fill={profile ? PEACH : 'none'}
            d="M372.86,86.56c0-5.73,4.89-10.42,10.86-10.42,1.06,0,2.11,0,3.17,0,6.89,0,13.77,0,20.66,0,.73,0,4.57.08,7.67,3.06,1.97,1.89,3.19,4.49,3.19,7.36v.76"
          />
        </g>
      </g>
    </svg>
  );
}
