"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type ProofGalleryProps = {
  images: { file: string; caption: string }[];
  basePath: string;
  alt: string;
};

/** One large slide at a time, sized to its own aspect ratio instead of forced into
 * a fixed video-shaped box (screenshots here range from ~1.3:1 to ~2.1:1, so a
 * fixed 16:9 crop was letterboxing the narrower ones down to a sliver). Prev/Next
 * are overlay arrows on the image itself, plus left/right arrow-key support. */
export default function ProofGallery({ images, basePath, alt }: ProofGalleryProps) {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const current = images[index];

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + total) % total);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  return (
    <div className="w-full">
      <div className="relative mx-auto h-[320px] w-full overflow-hidden rounded border border-ink-soft bg-ink-soft/20 sm:h-[440px]">
        <Image
          key={current.file}
          src={`${basePath}/${current.file}`}
          alt={`${alt}: ${current.caption}`}
          fill
          sizes="(min-width: 768px) 900px, 100vw"
          quality={100}
          className="object-contain"
          priority={index === 0}
        />

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous screenshot"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink-soft bg-ink/80 text-lg text-offwhite transition-all duration-300 hover:border-copper hover:text-copper"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next screenshot"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink-soft bg-ink/80 text-lg text-offwhite transition-all duration-300 hover:border-copper hover:text-copper"
        >
          ›
        </button>
      </div>

      <div className="mt-3 text-center">
        <p className="text-sm leading-snug text-muted">{current.caption}</p>
        <p className="mt-1 font-mono text-[11px] text-muted/60">
          {index + 1} / {total}
        </p>
      </div>
    </div>
  );
}
