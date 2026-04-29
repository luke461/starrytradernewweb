"use client";

import Image from "next/image";
import type { Partner } from "@/content/partners";
import { partnerAnchorId } from "@/content/partners";

/** Two small monochrome partner logos beneath the hero copy. Each logo
 *  acts as an anchor link to its full section further down the page.
 *  Smooth scroll comes from the global `html { scroll-behavior: smooth }`
 *  rule, with a reduced-motion override in globals.css. */
export function PartnerHeroLogos({ partners }: { partners: Partner[] }) {
  return (
    <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
      {partners.map((p) => (
        <li key={p.name} className="flex items-center">
          <a
            href={`#${partnerAnchorId(p.name)}`}
            aria-label={`Jump to ${p.name}`}
            className="group inline-flex items-center opacity-85 transition-opacity duration-200 hover:opacity-100"
          >
            <span className="flex h-[56px] w-[160px] items-center justify-center rounded-lg bg-white/95 px-3">
              <Image
                src={p.logoPath}
                alt={p.name}
                width={p.logoWidth}
                height={p.logoHeight}
                className="h-auto w-auto max-h-[28px] max-w-[136px] object-contain"
              />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
