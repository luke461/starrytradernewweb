"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Animates a number from 0 to its final value when scrolled into view.
 * Preserves the original suffix (%, +, K, etc.) and digit grouping.
 */
type Props = {
  value: string;
  duration?: number;
  className?: string;
  surface?: "dark" | "light";
};

function parseValue(raw: string): { num: number; prefix: string; suffix: string } {
  const match = raw.match(/^([^\d-]*)(-?\d[\d,]*\.?\d*)(.*)$/);
  if (!match) return { num: 0, prefix: "", suffix: raw };
  const num = parseFloat(match[2].replace(/,/g, ""));
  return { num: isFinite(num) ? num : 0, prefix: match[1], suffix: match[3] };
}

function formatNumber(n: number, original: string): string {
  const isInt = !original.includes(".");
  const hasComma = original.includes(",");
  const fixed = isInt ? Math.round(n) : Math.round(n * 100) / 100;
  const str = isInt ? fixed.toString() : fixed.toFixed(2);
  if (!hasComma) return str;
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function CountUp({ value, duration = 1200, className, surface = "dark" }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState("0");
  const parsed = useRef(parseValue(value));
  const started = useRef(false);

  useEffect(() => {
    parsed.current = parseValue(value);
    setDisplay(`${parsed.current.prefix}0${parsed.current.suffix}`);
  }, [value]);

  useEffect(() => {
    if (!ref.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const { num, prefix, suffix } = parsed.current;
            function step(now: number) {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
              const current = num * eased;
              setDisplay(`${prefix}${formatNumber(current, value)}${suffix}`);
              if (t < 1) requestAnimationFrame(step);
              else setDisplay(value);
            }
            requestAnimationFrame(step);
            io.disconnect();
          }
        }
      },
      { threshold: 0.5 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span
      ref={ref}
      className={cn(
        "font-mono font-bold leading-none tracking-tight tabular-nums",
        surface === "light" ? "text-starry-violet-deep" : "text-starry-blue-light",
        className,
      )}
    >
      {display}
    </span>
  );
}
