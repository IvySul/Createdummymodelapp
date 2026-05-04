import type { ReactNode } from 'react';
import basicInfoBlank from '../../../assets/matches-basic-info-artboard.svg';

/** matches-basic-info-blank.png (427×402). Overlay positions as % of rendered box. */
// Tuned to sit visually centered between the top-row divider lines.
const TOP_BAND = { top: '19.2%', height: '11.2%', noWrap: true } as const;

const SLOT = {
  age: { ...TOP_BAND, left: '3.5%', width: '20.5%' },
  gender: { ...TOP_BAND, left: '26.5%', width: '21%' },
  location: { ...TOP_BAND, left: '50%', width: '21%' },
  price: { ...TOP_BAND, left: '73.5%', width: '23%' },
  timeRange: { top: '32%', height: '11.2%', left: '13%', width: '82%', listPad: true },
  politics: { top: '44.5%', height: '11.2%', left: '13%', width: '82%', listPad: true },
  education: { top: '57%', height: '11.2%', left: '13%', width: '82%', listPad: true },
  occupation: { top: '69.5%', height: '11.2%', left: '13%', width: '82%', listPad: true },
  religion: { top: '82%', height: '11.2%', left: '13%', width: '82%', listPad: true },
} as const;

function ValueSlot({
  slot,
  children,
}: {
  slot: {
    top: string;
    left: string;
    width: string;
    height: string;
    listPad?: boolean;
    noWrap?: boolean;
  };
  children: ReactNode;
}) {
  return (
    <div
      className={`pointer-events-none absolute box-border flex items-center text-left font-['Open_Sans',sans-serif] text-[14px] font-normal uppercase leading-tight tracking-normal text-black ${
        slot.listPad ? 'pl-11 pr-1' : 'px-0.5'
      }`}
      style={{ top: slot.top, left: slot.left, width: slot.width, height: slot.height }}
    >
      <span
        className={`block min-h-0 w-full ${
          slot.noWrap ? 'whitespace-nowrap overflow-hidden text-ellipsis' : 'hyphens-auto break-words'
        }`}
      >
        {children}
      </span>
    </div>
  );
}

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

/** Blank artboard PNG (header + chrome only); dynamic copy is overlaid. */
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
    <div data-no-swipe="true" className="relative w-full">
      <img
        src={basicInfoBlank}
        alt=""
        aria-hidden
        className="pointer-events-none block h-auto w-full select-none"
      />
      <div className="pointer-events-none absolute inset-0">
        <ValueSlot slot={SLOT.age}>{age}</ValueSlot>
        <ValueSlot slot={SLOT.gender}>{genderDisplay}</ValueSlot>
        <ValueSlot slot={SLOT.location}>{location}</ValueSlot>
        <ValueSlot slot={SLOT.price}>{price}</ValueSlot>
        <ValueSlot slot={SLOT.timeRange}>{timeRange}</ValueSlot>
        <ValueSlot slot={SLOT.politics}>{politics}</ValueSlot>
        <ValueSlot slot={SLOT.education}>{education}</ValueSlot>
        <ValueSlot slot={SLOT.occupation}>{occupation}</ValueSlot>
        <ValueSlot slot={SLOT.religion}>{religion}</ValueSlot>
      </div>
    </div>
  );
}
