/** Line icons matching matches-artboard-basicinfo.png (thin stroke, no fill). */

const stroke = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.15,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

type IconProps = { className?: string };

export function BasicInfoCalendarIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" {...stroke} />
      <line x1="3.5" y1="9.5" x2="20.5" y2="9.5" {...stroke} />
      <line x1="8" y1="3.5" x2="8" y2="7" {...stroke} />
      <line x1="16" y1="3.5" x2="16" y2="7" {...stroke} />
      <rect x="6" y="12" width="3" height="2.5" rx="0.35" {...stroke} />
      <rect x="10.5" y="12" width="3" height="2.5" rx="0.35" {...stroke} />
      <rect x="15" y="12" width="3" height="2.5" rx="0.35" {...stroke} />
      <rect x="6" y="15.5" width="3" height="2.5" rx="0.35" {...stroke} />
      <rect x="10.5" y="15.5" width="3" height="2.5" rx="0.35" {...stroke} />
      <rect x="15" y="15.5" width="3" height="2.5" rx="0.35" {...stroke} />
    </svg>
  );
}

export function BasicInfoBuildingIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d="M4 20.5h16" {...stroke} />
      <path d="M6 20.5V10.5h12v10" {...stroke} />
      <path d="M4 10.5L12 4.5l8 6" {...stroke} />
      <line x1="9" y1="20.5" x2="9" y2="13" {...stroke} />
      <line x1="12" y1="20.5" x2="12" y2="13" {...stroke} />
      <line x1="15" y1="20.5" x2="15" y2="13" {...stroke} />
      <path d="M10.5 13h3v3.5h-3z" {...stroke} />
    </svg>
  );
}

export function BasicInfoGradCapIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d="M12 5.5 3.5 9.25 12 13l8.5-3.75L12 5.5z" {...stroke} />
      <path d="M6.25 10.75V15.5c0 1.75 2.6 3.25 5.75 3.25S17.75 17.25 17.75 15.5v-4.75" {...stroke} />
      <path d="M19.5 9.25v5.5" {...stroke} />
      <circle cx="19.5" cy="15.75" r="1" {...stroke} />
    </svg>
  );
}

export function BasicInfoBriefcaseIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <rect x="4.5" y="8.5" width="15" height="11" rx="1.25" {...stroke} />
      <path d="M9 8.5V7.25a3 3 0 0 1 6 0V8.5" {...stroke} />
      <line x1="9" y1="12.5" x2="15" y2="12.5" {...stroke} />
    </svg>
  );
}

export function BasicInfoOpenBookIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d="M12 5.5v14" {...stroke} />
      <path
        d="M12 5.5 5.5 7.75V18.5L12 16.25"
        {...stroke}
      />
      <path
        d="M12 5.5 18.5 7.75V18.5L12 16.25"
        {...stroke}
      />
    </svg>
  );
}
