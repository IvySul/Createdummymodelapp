import type { ReactNode } from 'react';
import basicInfoBlank from '../../../assets/matches-basic-info-blank.png';

/** matches-basic-info-blank.png (427×402). Overlay positions as % of rendered box. */
const SLOT = {
  age: { top: '20.5%', left: '3.5%', width: '20.5%' },
  gender: { top: '20.5%', left: '26.5%', width: '21%' },
  location: { top: '20.5%', left: '50%', width: '21%' },
  price: { top: '20.5%', left: '73.5%', width: '23%' },
  timeRange: { top: '32%', left: '13%', width: '82%' },
  politics: { top: '44.5%', left: '13%', width: '82%' },
  education: { top: '57%', left: '13%', width: '82%' },
  occupation: { top: '69.5%', left: '13%', width: '82%' },
  religion: { top: '82%', left: '13%', width: '82%' },
} as const;

function ValueSlot({
  slot,
  children,
}: {
  slot: { top: string; left: string; width: string };
  children: ReactNode;
}) {
  return (
    <div
      className="pointer-events-none absolute text-left font-['Open_Sans',sans-serif] text-[11px] font-light leading-snug text-black"
      style={{ top: slot.top, left: slot.left, width: slot.width }}
    >
      {children}
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
        <ValueSlot slot={SLOT.location}>
          <span className="line-clamp-3 break-words">{location}</span>
        </ValueSlot>
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
