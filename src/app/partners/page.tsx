import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Temporarily hidden — the /partners route is intentionally returning 404
// while partner deals are mid-flight. Restore by reverting the commit that
// introduced this stub (look for "hide partners") to bring back the full
// page implementation. All partner data, sub-components, and the page's
// original code are preserved in git history; nothing was deleted.

export const metadata: Metadata = {
  title: "Partners",
};

export default function PartnersPage() {
  notFound();
}
