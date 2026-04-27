"use client";

import { useEffect, useState } from "react";

const KEY = "starryTrader_seen_intro";

/**
 * Returns true on the first time this hook runs in a browser session.
 * Returns null during SSR and the very first render (so callers can render
 * a non-flashing fallback, then react after hydration).
 *
 * Uses sessionStorage so the animation replays per browser session.
 */
export function useFirstVisit() {
  const [isFirst, setIsFirst] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const seen = window.sessionStorage.getItem(KEY);
      if (!seen) {
        window.sessionStorage.setItem(KEY, "1");
        setIsFirst(true);
      } else {
        setIsFirst(false);
      }
    } catch {
      // Private mode / blocked storage. Treat as not-first to avoid
      // re-firing the animation on every page load.
      setIsFirst(false);
    }
  }, []);

  return isFirst;
}
