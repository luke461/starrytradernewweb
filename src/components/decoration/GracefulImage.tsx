"use client";

import { useState, type ReactNode } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/cn";

type Props = Omit<ImageProps, "onError"> & {
  /** Replaces the entire output (including any wrapper) when the image fails to load. */
  fallback?: ReactNode;
  /** When set, the image is rendered inside a div with this className. On
   *  error the wrapper is dropped along with the image so the layout
   *  collapses cleanly (no empty aspect-ratio band, no broken-image icon). */
  wrapperClassName?: string;
  className?: string;
};

/**
 * Wraps next/image with onError-driven graceful degradation. If the source
 * 404s (e.g. asset not yet uploaded), the entire wrapper collapses so the
 * page never shows a broken-image icon or an empty placeholder.
 */
export function GracefulImage({ fallback = null, wrapperClassName, className, alt, ...rest }: Props) {
  const [errored, setErrored] = useState(false);
  if (errored) return <>{fallback}</>;
  const img = (
    <Image
      {...rest}
      alt={alt}
      className={cn(className)}
      onError={() => setErrored(true)}
    />
  );
  if (wrapperClassName) {
    return <div className={wrapperClassName}>{img}</div>;
  }
  return img;
}
