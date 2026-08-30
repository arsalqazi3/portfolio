"use client";

import { useState } from "react";
import Image from "next/image";

type ProofGalleryProps = {
  images: { file: string; caption: string }[];
  basePath: string;
  alt: string;
};

/** A single large slide at a time, same aspect and width as the demo video,
 * with Previous/Next controls instead of a cramped horizontal scroll strip. */
export default function ProofGallery({ images, basePath, alt }: ProofGalleryProps) {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const current = images[index];

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  return (
    <div className="w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded border border-ink-soft bg-ink-soft/20">
        <Image
          key={current.file}
          src={`${basePath}/${current.file}`}
          alt={`${alt}: ${current.caption}`}
          fill
          sizes="(min-width: 768px) 672px, 100vw"
          quality={90}
          className="object-contain"
          priority={index === 0}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous screenshot"
          className="inline-flex items-center gap-1.5 rounded border border-ink-soft px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-muted transition-all duration-300 hover:border-copper hover:text-copper"
        >
          ← Prev
        </button>

        <div className="text-center">
          <p className="text-sm leading-snug text-muted">{current.caption}</p>
          <p className="mt-1 font-mono text-[11px] text-muted/60">
            {index + 1} / {total}
          </p>
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next screenshot"
          className="inline-flex items-center gap-1.5 rounded border border-ink-soft px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-muted transition-all duration-300 hover:border-copper hover:text-copper"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
