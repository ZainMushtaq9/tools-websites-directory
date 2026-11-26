// Inline SVG icons — no emoji, no icon library, no extra dependency.
// Every icon is a small stroke icon in currentColor, so it inherits the
// surrounding text colour in light and dark themes. All are aria-hidden:
// they decorate adjacent text, they never carry meaning on their own.
function Svg({ children, size = 18, className = "" }) {
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function TrophyIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v6a5 5 0 0 1-10 0V4z" />
      <path d="M7 6H4a2 2 0 0 0 2 4h1" />
      <path d="M17 6h3a2 2 0 0 1-2 4h-1" />
    </Svg>
  );
}

export function GridIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </Svg>
  );
}

export function LayersIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <path d="M12 3 3 8l9 5 9-5-9-5z" />
      <path d="m3 13 9 5 9-5" />
      <path d="m3 17.5 9 5 9-5" />
    </Svg>
  );
}

export function MapPinIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </Svg>
  );
}

export function CrescentIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <path d="M20 13.5A8.5 8.5 0 0 1 10.5 4 8.5 8.5 0 1 0 20 13.5z" />
    </Svg>
  );
}

export function WheatIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <path d="M12 22v-9" />
      <path d="M12 13c-3 0-5-2-5-5 3 0 5 2 5 5z" />
      <path d="M12 13c3 0 5-2 5-5-3 0-5 2-5 5z" />
      <path d="M12 18c-3 0-5-2-5-5 3 0 5 2 5 5z" />
      <path d="M12 18c3 0 5-2 5-5-3 0-5 2-5 5z" />
      <path d="M12 8.5c-1.2-1.6-1.2-3.6 0-5.5 1.2 1.9 1.2 3.9 0 5.5z" />
    </Svg>
  );
}

export function SearchIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20.5 20.5-4.6-4.6" />
    </Svg>
  );
}

export function SlidersIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <path d="M4 7h9M19 7h1M4 17h3M13 17h7" />
      <circle cx="16" cy="7" r="2.4" />
      <circle cx="10" cy="17" r="2.4" />
    </Svg>
  );
}

export function ExternalLinkIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M19 13.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 3 19V6a1.5 1.5 0 0 1 1.5-1.5H10" />
    </Svg>
  );
}

export function QuestionIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.4 9.2a2.8 2.8 0 0 1 5.4 1c0 1.9-2.8 2.3-2.8 3.8" />
      <path d="M12 17h.01" />
    </Svg>
  );
}

export function CheckIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Svg>
  );
}

export function ArrowRightIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </Svg>
  );
}

export function HomeIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <path d="m3.5 11 8.5-7 8.5 7" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5.5h4V20" />
    </Svg>
  );
}

export function ListIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <path d="M8.5 6.5H21M8.5 12H21M8.5 17.5H21" />
      <path d="M3.5 6.5h.01M3.5 12h.01M3.5 17.5h.01" />
    </Svg>
  );
}

export function CalculatorIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8" />
      <path d="M8 12h.01M12 12h.01M16 12h.01" />
      <path d="M8 16h.01M12 16h.01M16 16h.01" />
    </Svg>
  );
}

export function CoinsIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <ellipse cx="9" cy="6.5" rx="5.5" ry="2.5" />
      <path d="M3.5 6.5v5c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-5" />
      <path d="M14.5 9.8c2.4.2 4 1.2 4 2.5 0 1.4-2.4 2.5-5.5 2.5" />
      <path d="M18.5 12.3v4.4c0 1.4-2.4 2.5-5.5 2.5-1.6 0-3-.3-4.1-.9" />
    </Svg>
  );
}

export function HeartPulseIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10.5c0 5.4-7.5 10-7.5 10z" />
      <path d="m6.5 12.5 2.5-1.5 2 3 2-4.5 2 2.5h2.5" />
    </Svg>
  );
}

export function HardHatIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <path d="M4 15a8 8 0 0 1 5-7.4V5.5h6v2.1a8 8 0 0 1 5 7.4" />
      <path d="M2.5 15h19v2.5a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 17.5V15z" />
      <path d="M12 5.5V3" />
    </Svg>
  );
}

export function ClockIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  );
}

export function ScaleIcon({ size = 18, className = "" }) {
  return (
    <Svg size={size} className={className}>
      <path d="M12 4v16" />
      <path d="M8 20h8" />
      <path d="M5 7h14" />
      <path d="M7 7l-2.5 5a2.8 2.8 0 0 0 5 0L7 7z" />
      <path d="M17 7l-2.5 5a2.8 2.8 0 0 0 5 0L17 7z" />
    </Svg>
  );
}

// Category slug -> its icon. Unknown input falls back to the layers icon
// so nothing ever renders empty.
const CATEGORY_ICONS = {
  math: CalculatorIcon,
  finance: CoinsIcon,
  health: HeartPulseIcon,
  construction: HardHatIcon,
  datetime: ClockIcon,
  units: ScaleIcon,
  pakistan: MapPinIcon,
  islamic: CrescentIcon,
  agriculture: WheatIcon,
  best: TrophyIcon,
  categories: GridIcon
};

export function CategoryIcon({ category, size = 18, className = "" }) {
  const key = String((category && category.id) || category || "")
    .trim()
    .toLowerCase();
  const Icon = CATEGORY_ICONS[key] || LayersIcon;
  return <Icon size={size} className={className} />;
}

// Tier id ("a".."f"), letter ("A".."F") or a tier object -> its icon.
// Unknown input falls back to the layers icon so nothing ever renders empty.
const TIER_ICONS = {
  a: TrophyIcon,
  b: GridIcon,
  c: LayersIcon,
  d: MapPinIcon,
  e: CrescentIcon,
  f: WheatIcon
};

export function TierIcon({ tier, size = 18, className = "" }) {
  const key = String((tier && tier.id) || tier || "")
    .trim()
    .toLowerCase()
    .charAt(0);
  const Icon = TIER_ICONS[key] || LayersIcon;
  return <Icon size={size} className={className} />;
}
