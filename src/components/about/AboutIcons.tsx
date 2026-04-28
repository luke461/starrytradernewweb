/**
 * Inlined SVG icons for the About page. Lucide-style strokes, sized to
 * match the brief's Lucide names (Infinity, ShieldOff, Lock, FileText,
 * Globe, GraduationCap, TrendingUp, ShieldCheck) without adding a runtime
 * dependency. Currents stroke colour, which lets each call site colour
 * via `text-starry-blue-light` etc.
 */

type IconProps = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function InfinityIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M18.6 8.4a4.5 4.5 0 0 0-6.4 0L12 8.6l-.2.2a4.5 4.5 0 0 1-6.4 0 4.5 4.5 0 0 1 0-6.4 4.5 4.5 0 0 1 6.4 0L12 2.6" />
      <path d="M5.4 15.6a4.5 4.5 0 0 0 6.4 0L12 15.4l.2.2a4.5 4.5 0 0 0 6.4 0 4.5 4.5 0 0 0 0-6.4" />
      <path d="M5.4 8.4a4.5 4.5 0 0 0 0 6.4" />
      <path d="M18.6 15.6a4.5 4.5 0 0 0 0-6.4" />
    </svg>
  );
}

export function ShieldOffIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M19.7 14.4c.2-.8.3-1.6.3-2.4V5l-8-3-3.9 1.5" />
      <path d="M4 5v7a10 10 0 0 0 8 9.8c1.6-.4 3-1.2 4.3-2.2" />
      <path d="m3 3 18 18" />
    </svg>
  );
}

export function LockIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function FileTextIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h6" />
    </svg>
  );
}

export function GlobeIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

export function GraduationCapIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      <path d="M22 10v6" />
    </svg>
  );
}

export function TrendingUpIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 17 9 11l4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  );
}

export function ShieldCheckIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 2 4 5v7a10 10 0 0 0 8 9.8A10 10 0 0 0 20 12V5z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function ArrowDownTrayIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 4v12" />
      <path d="m6 12 6 6 6-6" />
      <path d="M5 21h14" />
    </svg>
  );
}

export const commitmentIcons = {
  infinity: InfinityIcon,
  shieldOff: ShieldOffIcon,
  lock: LockIcon,
  fileText: FileTextIcon,
} as const;

export const impactIcons = {
  globe: GlobeIcon,
  graduationCap: GraduationCapIcon,
  trendingUp: TrendingUpIcon,
  shieldCheck: ShieldCheckIcon,
} as const;
