import Image from "next/image";

type ProofGalleryProps = {
  images: { file: string; caption: string }[];
  basePath: string;
  alt: string;
};

/** Ordered proof screenshots as a horizontal, snap-scrolling strip. */
export default function ProofGallery({ images, basePath, alt }: ProofGalleryProps) {
  return (
    <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:-mx-8 sm:px-8">
      {images.map((item, i) => (
        <figure
          key={item.file}
          className="w-[240px] flex-none snap-start sm:w-[300px]"
        >
          <div className="relative aspect-video overflow-hidden rounded border border-ink-soft bg-ink-soft/20">
            <Image
              src={`${basePath}/${item.file}`}
              alt={`${alt}: ${item.caption}`}
              fill
              sizes="(min-width: 640px) 300px, 240px"
              quality={90}
              className="object-cover"
              loading={i < 2 ? "eager" : "lazy"}
            />
          </div>
          <figcaption className="mt-2 text-xs leading-snug text-muted/80">
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
