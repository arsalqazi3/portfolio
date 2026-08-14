import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EXPERIENCE, getExperience } from "@/data/experience";
import ImageCollage from "@/components/ImageCollage";

export function generateStaticParams() {
  return EXPERIENCE.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(
  props: PageProps<"/experience/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const item = getExperience(slug);
  return { title: item ? `${item.org}, Arslan Asad Qazi` : "Not found" };
}

export default async function ExperiencePage(props: PageProps<"/experience/[slug]">) {
  const { slug } = await props.params;
  const item = getExperience(slug);
  if (!item) notFound();

  const availableImages = (item.images ?? []).filter((image) =>
    existsSync(path.join(process.cwd(), "public", "leadership", image))
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-20 lg:px-12">
      <Link
        href="/#leadership"
        className="font-mono text-xs uppercase tracking-widest text-muted transition-colors duration-300 hover:text-copper"
      >
        ← Back to leadership
      </Link>

      <h1 className="mt-8 font-heading text-2xl font-semibold text-offwhite sm:text-3xl">
        {item.org}
      </h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted">
        {item.role}
      </p>

      {availableImages.length > 0 && (
        <div className="mt-8 max-w-3xl">
          <ImageCollage images={availableImages} basePath="/leadership" alt={item.org} />
        </div>
      )}

      <div className="mt-8 max-w-2xl space-y-4 text-sm leading-relaxed text-muted sm:text-base">
        {item.description.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-copper">
          How this connects to DevOps
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          {item.devopsConnection}
        </p>
      </div>
    </div>
  );
}
