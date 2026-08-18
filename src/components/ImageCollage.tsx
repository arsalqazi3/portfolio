import Image from "next/image";

type ImageCollageProps = {
  images: string[];
  basePath: string;
  alt: string;
};

/** A layered photo-stack collage: one base image with the rest overlapping its
 * lower edge at a slight rotation, framed and shadowed like stacked prints.
 * Built from real <img> tiles, not a flattened raster, so every photo stays
 * sharp at any screen size. */
export default function ImageCollage({ images, basePath, alt }: ImageCollageProps) {
  const [base, ...accents] = images;
  const rotations = ["-4deg", "5deg", "-6deg", "3deg"];
  // Two accents sit flush left/right; three or more fan out evenly across
  // the base's lower edge instead, shrinking a bit so they don't collide.
  const accentWidth = accents.length >= 3 ? 30 : 38;
  const accentLeft = (i: number) => {
    if (accents.length <= 2) return i === 0 ? 2 : 100 - 2 - accentWidth;
    const start = 2;
    const end = 100 - 2 - accentWidth;
    const step = (end - start) / (accents.length - 1);
    return start + i * step;
  };

  if (accents.length === 0) {
    return (
      <div className="relative mx-auto w-full max-w-xs">
        <div className="relative aspect-[4/5] overflow-hidden rounded border-4 border-offwhite shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)]">
          <Image
            src={`${basePath}/${base}`}
            alt={alt}
            fill
            sizes="(min-width: 768px) 320px, 60vw"
            quality={95}
            className="object-cover"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ marginBottom: accents.length ? "3.5rem" : 0 }}>
      <div className="relative aspect-video w-full overflow-hidden rounded border-4 border-offwhite shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)]">
        <Image
          src={`${basePath}/${base}`}
          alt={`${alt} 1`}
          fill
          sizes="(min-width: 768px) 672px, 100vw"
          quality={95}
          className="object-cover"
          priority
        />
      </div>

      {accents.map((image, i) => (
        <div
          key={image}
          className="absolute"
          style={{
            bottom: "-2.5rem",
            left: `${accentLeft(i)}%`,
            width: `${accentWidth}%`,
            transform: `rotate(${rotations[i]})`,
            zIndex: i + 1,
          }}
        >
          <div className="relative aspect-video overflow-hidden rounded border-4 border-offwhite shadow-[0_10px_24px_-6px_rgba(0,0,0,0.55)]">
            <Image
              src={`${basePath}/${image}`}
              alt={`${alt} ${i + 2}`}
              fill
              sizes="(min-width: 768px) 260px, 42vw"
              quality={95}
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
