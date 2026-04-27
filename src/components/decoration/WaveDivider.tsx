import { cn } from "@/lib/cn";

type Props = {
  /** Color of the section the wave is "pouring into" (the next section). */
  to: "deep" | "mid" | "soft" | "pale" | "mist";
  /** Direction of the curve: "down" if the next section is below, "up" if above. */
  direction?: "down" | "up";
  className?: string;
};

const fillFor: Record<Props["to"], string> = {
  deep: "#131A35",
  mid:  "#1F2747",
  soft: "#2A3360",
  pale: "#F4F6FF",
  mist: "#E4E9FF",
};

/**
 * Soft SVG wave between two sections of different surface colors.
 * Pure visual — never replaces semantic structure.
 */
export function WaveDivider({ to, direction = "down", className }: Props) {
  const fill = fillFor[to];
  const path =
    direction === "down"
      ? "M0,40 C240,80 480,0 720,30 C960,60 1200,90 1440,40 L1440,120 L0,120 Z"
      : "M0,80 C240,40 480,120 720,90 C960,60 1200,30 1440,80 L1440,0 L0,0 Z";
  return (
    <div className={cn("relative -mt-px h-[60px] w-full overflow-hidden md:h-[90px]", className)} aria-hidden>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path d={path} fill={fill} />
      </svg>
    </div>
  );
}
