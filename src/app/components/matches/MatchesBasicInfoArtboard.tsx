import type { ReactNode } from 'react';
import basicInfoBlank from '../../../assets/matches-basic-info-artboard.svg';

const SLOT = {
  header: { top: '11.2%', left: '4%', width: '40%', height: '6%', noWrap: true },
  age: { top: '19.2%', left: '3.5%', width: '20.5%', height: '11.2%', noWrap: true },
  gender: { top: '19.2%', left: '26.5%', width: '21%', height: '11.2%', noWrap: true },
  location: { top: '19.2%', left: '50%', width: '21%', height: '11.2%', noWrap: true },
  price: { top: '19.2%', left: '73.5%', width: '23%', height: '11.2%', noWrap: true },
  timeRange: { top: '32%', left: '13%', width: '82%', height: '11.2%', listPad: true },
  politics: { top: '44.5%', left: '13%', width: '82%', height: '11.2%', listPad: true },
  education: { top: '57%', left: '13%', width: '82%', height: '11.2%', listPad: true },
  occupation: { top: '69.5%', left: '13%', width: '82%', height: '11.2%', listPad: true },
  religion: { top: '82%', left: '13%', width: '82%', height: '11.2%', listPad: true },
} as const;

type Slot = (typeof SLOT)[keyof typeof SLOT];

function ValueSlot({ slot, children }: { slot: Slot; children: ReactNode }) {
  return (
    <div
      className={`pointer-events-none absolute box-border flex items-center text-left font-['Open_Sans',sans-serif] text-[14px] font-normal uppercase leading-none text-black ${
        slot.listPad ? 'pl-11 pr-1' : 'px-0.5'
      }`}
      style={{ top: slot.top, left: slot.left, width: slot.width, height: slot.height }}
    >
      <span className={`block w-full ${slot.noWrap ? 'whitespace-nowrap overflow-hidden text-ellipsis' : 'break-words'}`}>
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
        <ValueSlot slot={SLOT.header}>BASIC INFO</ValueSlot>
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
