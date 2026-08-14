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
  const rotations = ["-4deg", "5deg", "-6deg"];

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
          className="absolute w-[42%] sm:w-[38%]"
          style={{
            bottom: "-2.5rem",
            left: i === 0 ? "2%" : undefined,
            right: i === 1 ? "2%" : undefined,
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
