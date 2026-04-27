import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  glow?: "violet" | "blue" | "none";
  surface?: "dark" | "light";
  interactive?: boolean;
};

const glowMap = {
  violet: "before:bg-[radial-gradient(circle_at_top,rgba(107,91,255,0.18),transparent_60%)]",
  blue: "before:bg-[radial-gradient(circle_at_top,rgba(127,200,255,0.18),transparent_60%)]",
  none: "",
} as const;

const surfaceClasses = {
  dark: "bg-starry-mid border-white/[0.08] text-ink-primary",
  light: "bg-white border-starry-violet-soft/20 text-ink-on-light shadow-[0_16px_40px_-24px_rgba(31,39,71,0.18),0_1px_2px_rgba(31,39,71,0.04)]",
} as const;

const hoverClasses = {
  dark: "hover:border-white/20 hover:shadow-[0_24px_40px_-24px_rgba(11,16,36,0.9)]",
  light: "hover:border-starry-violet/40 hover:shadow-[0_28px_56px_-28px_rgba(76,63,224,0.30),0_1px_2px_rgba(31,39,71,0.04)]",
} as const;

export function Card({ className, children, glow = "none", surface = "dark", interactive = false, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[20px] border p-8",
        surfaceClasses[surface],
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-300",
        glowMap[glow],
        interactive &&
          "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:before:opacity-100",
        interactive && hoverClasses[surface],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
