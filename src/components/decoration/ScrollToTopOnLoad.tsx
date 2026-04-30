"use client";

import { useEffect } from "react";

/**
 * Forces the page to start at scroll Y=0 on mount, overriding browser
 * scroll restoration. Use on pages that contain GSAP-pinned sections
 * (e.g. /product) where stale restored scroll positions land users
 * mid-pin instead of at the top.
 *
 * Respects in-page hash navigation: if the URL has a #fragment, the
 * browser's native anchor jump runs instead.
 */
export function ScrollToTopOnLoad() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return null;
}
