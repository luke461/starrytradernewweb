"use client";

import Link from "next/link";
import { useRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "md" | "lg";
type Surface = "dark" | "light";

const base = "relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[15px] rounded-full",
  lg: "h-12 px-6 text-[16px] rounded-full",
};

const variantsDark: Record<Variant, string> = {
  primary:
    "bg-starry-violet-deep text-white shadow-[0_8px_24px_-8px_rgba(76,63,224,0.55)] hover:bg-starry-violet hover:-translate-y-[1px] hover:shadow-[0_12px_30px_-10px_rgba(107,91,255,0.65),0_0_0_3px_rgba(127,200,255,0.25)] active:translate-y-0",
  outline:
    "border border-starry-violet text-starry-violet hover:bg-starry-violet-soft hover:text-white hover:border-starry-violet-soft",
  secondary:
    "text-ink-soft hover:text-ink-primary group/sec gap-1.5",
  ghost:
    "border border-white/15 text-ink-primary hover:border-white/35 hover:bg-white/5",
};

const variantsLight: Record<Variant, string> = {
  primary:
    "bg-starry-violet-deep text-white shadow-[0_8px_24px_-8px_rgba(76,63,224,0.45)] hover:bg-starry-violet hover:-translate-y-[1px] hover:shadow-[0_14px_30px_-10px_rgba(107,91,255,0.55),0_0_0_3px_rgba(127,200,255,0.30)] active:translate-y-0",
  outline:
    "border border-starry-violet text-starry-violet-deep hover:bg-starry-violet-soft hover:text-white hover:border-starry-violet-soft",
  secondary:
    "text-ink-on-light-soft hover:text-ink-on-light group/sec gap-1.5",
  ghost:
    "border border-ink-on-light/15 text-ink-on-light hover:border-ink-on-light/35 hover:bg-ink-on-light/5",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  surface?: Surface;
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
};

type AnchorProps = CommonProps & { href: string; external?: boolean } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type ButtonProps = CommonProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export function Button(props: AnchorProps | ButtonProps) {
  const { variant = "primary", size = "md", withArrow = false, surface = "dark", magnetic = false, className, children, ...rest } = props;
  const innerRef = useRef<HTMLSpanElement | null>(null);

  const variants = surface === "light" ? variantsLight : variantsDark;
  const cls = cn(base, sizes[size], variants[variant], className);

  // Magnetic effect: inner span shifts up to 4px toward cursor when within 80px.
  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (!magnetic || !innerRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - (r.left + r.width / 2);
    const cy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(cx, cy);
    const radius = 80;
    if (dist > radius) {
      innerRef.current.style.transform = "translate(0,0)";
      return;
    }
    const power = (1 - dist / radius) * 4;
    const dx = (cx / dist) * power;
    const dy = (cy / dist) * power;
    innerRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
  }
  function onLeave() {
    if (!innerRef.current) return;
    innerRef.current.style.transform = "translate(0,0)";
  }

  const arrow = withArrow ? (
    <span aria-hidden className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/sec:translate-x-1 group-hover:translate-x-1">→</span>
  ) : null;

  const inner = (
    <span ref={innerRef} className="pointer-events-none inline-flex items-center gap-2 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]">
      {children}
      {arrow}
    </span>
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, external } = props as AnchorProps;
    if (external || href.startsWith("http") || href.startsWith("mailto")) {
      return (
        <a href={href} className={cls} onMouseMove={onMove} onMouseLeave={onLeave} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} onMouseMove={onMove} onMouseLeave={onLeave} {...(rest as Omit<ComponentProps<typeof Link>, "href" | "className" | "children">)}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={cls} onMouseMove={onMove} onMouseLeave={onLeave} {...(rest as ComponentProps<"button">)}>
      {inner}
    </button>
  );
}
