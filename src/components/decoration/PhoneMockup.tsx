"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

type Bezel = "solid" | "glass";

type Props = {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  ariaLabel?: string;
  /** "solid" (default) is the navy bezel. "glass" is a frosted-glass
   *  look — best on dark / atmospheric backgrounds where backdrop-blur
   *  has something to blur. */
  bezel?: Bezel;
};

/**
 * Stylised phone frame. Children render inside the screen area.
 * Mouse-tilt is wired through Framer Motion springs so motion stays smooth
 * and respects prefers-reduced-motion automatically.
 */
export function PhoneMockup({ children, className, tilt = true, ariaLabel = "App screen", bezel = "solid" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-50, 50], [6, -6]), { stiffness: 90, damping: 14 });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-6, 6]), { stiffness: 90, damping: 14 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = e.clientX - r.left - r.width / 2;
    const cy = e.clientY - r.top - r.height / 2;
    x.set((cx / r.width) * 100);
    y.set((cy / r.height) * 100);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      role="img"
      aria-label={ariaLabel}
      className={cn(
        "relative mx-auto w-[280px] sm:w-[320px] lg:w-[340px]",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-[9/19.5] rounded-[46px] p-[6px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),0_8px_24px_-8px_rgba(0,0,0,0.4)]",
          bezel === "glass"
            ? "bg-gradient-to-b from-white/[0.18] via-white/[0.04] to-white/[0.10] backdrop-blur-md ring-1 ring-inset ring-white/20"
            : "bg-starry-soft",
        )}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[40px]">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
