import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  surface?: "dark" | "light";
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, align = "left", surface = "dark", className, id }: Props) {
  const eyebrowColor = surface === "light" ? "text-starry-violet-deep" : "text-starry-blue-light";
  const titleColor = surface === "light" ? "text-ink-on-light" : "text-ink-primary";
  const subtitleColor = surface === "light" ? "text-ink-on-light-soft" : "text-ink-soft";

  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("mb-4 font-mono text-[12px] uppercase tracking-[0.18em]", eyebrowColor)}>
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={cn("text-section text-balance", titleColor)}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-5 text-body-lg text-balance", subtitleColor)}>
          {subtitle}
        </p>
      )}
    </header>
  );
}
