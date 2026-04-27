"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  ariaLabel?: string;
};

/**
 * Stylised phone frame. Children render inside the screen area.
 * Mouse-tilt is wired through Framer Motion springs so motion stays smooth
 * and respects prefers-reduced-motion automatically.
 */
export function PhoneMockup({ children, className, tilt = true, ariaLabel = "App screen" }: Props) {
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
        "relative mx-auto w-[280px] sm:w-[320px] md:w-[300px] lg:w-[340px]",
        className,
      )}
    >
      <div className="relative aspect-[9/19.5] rounded-[42px] border border-white/15 bg-gradient-to-b from-starry-soft to-starry-deep p-2.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6),0_0_60px_-20px_rgba(107,91,255,0.4)]">
        <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/80" aria-hidden />
        <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-starry-deep">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
