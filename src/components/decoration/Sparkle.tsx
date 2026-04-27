import { cn } from "@/lib/cn";

type Tone = "blue" | "violet" | "violet-soft";

const tones: Record<Tone, string> = {
  blue: "#7FC8FF",
  violet: "#6B5BFF",
  "violet-soft": "#9B8FFF",
};

/**
 * Hand-drawn celestial sparkle. Default tone is light blue (v4.1).
 */
export function Sparkle({ size = 24, tone = "blue", className }: { size?: number; tone?: Tone; className?: string }) {
  const fill = tones[tone];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("block", className)}
    >
      <path
        d="M12 2c.4 4.5 1.6 7 4.5 8.2-2.9 1.3-4 3.8-4.5 8.3-.4-4.5-1.6-7-4.5-8.3C10.4 9 11.6 6.5 12 2Z"
        fill={fill}
        opacity="0.92"
      />
      <circle cx="20" cy="4" r="1.2" fill={fill} opacity="0.7" />
      <circle cx="3.5" cy="18.5" r="0.9" fill={fill} opacity="0.6" />
    </svg>
  );
}

export function Constellation({ className, tone = "blue" }: { className?: string; tone?: Tone }) {
  const color = tones[tone];
  return (
    <svg viewBox="0 0 200 80" className={cn("", className)} aria-hidden>
      <g fill={color} opacity="0.9">
        <circle cx="20" cy="40" r="2.4" />
        <circle cx="65" cy="22" r="1.6" />
        <circle cx="100" cy="50" r="2" />
        <circle cx="135" cy="28" r="1.6" />
        <circle cx="180" cy="46" r="2.4" />
      </g>
      <g stroke={color} strokeWidth="0.6" opacity="0.5" fill="none">
        <line x1="20" y1="40" x2="65" y2="22" />
        <line x1="65" y1="22" x2="100" y2="50" />
        <line x1="100" y1="50" x2="135" y2="28" />
        <line x1="135" y1="28" x2="180" y2="46" />
      </g>
    </svg>
  );
}
