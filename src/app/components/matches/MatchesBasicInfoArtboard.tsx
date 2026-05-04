import type { ReactNode } from 'react';
import { Calendar, Landmark, GraduationCap, Briefcase, BookOpen } from 'lucide-react';

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

const rule = 'border-[#d4d4d4]';

function Row({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div data-no-swipe="true" className="flex gap-3.5 py-3.5">
      <div className="flex w-7 shrink-0 justify-start pt-0.5 text-black">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-light uppercase tracking-[0.1em] text-black">{title}</p>
        <p className="mt-1.5 text-left text-[12px] font-light leading-snug text-black">{value}</p>
      </div>
    </div>
  );
}

/**
 * Card layout inspired by the old basic-info artboard, but all copy except the
 * “BASIC INFO” title is original UI text (no baked-in PNG labels).
 */
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
    <div
      data-no-swipe="true"
      className={`rounded-[22px] bg-white px-5 pb-4 pt-5 font-['Open_Sans',sans-serif] shadow-[0_4px_18px_rgba(0,0,0,0.12)]`}
    >
      <p
        className={`border-b ${rule} pb-3 text-left text-[20px] font-light uppercase leading-none tracking-[0.2em] text-black`}
      >
        Basic info
      </p>

      <div className={`grid grid-cols-4 border-b ${rule}`}>
        {(
          [
            { head: 'Age', body: String(age) },
            { head: 'Gender', body: genderDisplay },
            { head: 'Home base', body: location },
            { head: 'Rent budget', body: price },
          ] as const
        ).map((col, idx) => (
          <div
            key={col.head}
            className={`min-w-0 px-2 py-3 ${idx < 3 ? `border-r ${rule}` : ''}`}
          >
            <p className="text-[10px] font-light uppercase leading-tight tracking-[0.1em] text-black">
              {col.head}
            </p>
            <p className="mt-2 text-left text-[12px] font-light leading-snug text-black" title={col.body}>
              <span className="line-clamp-3 break-words">{col.body}</span>
            </p>
          </div>
        ))}
      </div>

      <div className={`border-t ${rule} divide-y divide-[#d4d4d4]`}>
        <Row
          icon={<Calendar className="h-6 w-6" strokeWidth={1.25} />}
          title="Lease window"
          value={timeRange}
        />
        <Row
          icon={<Landmark className="h-6 w-6" strokeWidth={1.25} />}
          title="Politics (self-described)"
          value={politics}
        />
        <Row
          icon={<GraduationCap className="h-6 w-6" strokeWidth={1.25} />}
          title="Study level"
          value={education}
        />
        <Row
          icon={<Briefcase className="h-6 w-6" strokeWidth={1.25} />}
          title="Work / hustle"
          value={occupation}
        />
        <Row
          icon={<BookOpen className="h-6 w-6" strokeWidth={1.25} />}
          title="Faith & tradition"
          value={religion}
        />
      </div>
    </div>
  );
}
