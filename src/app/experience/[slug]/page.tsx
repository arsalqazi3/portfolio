import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EXPERIENCE, getExperience } from "@/data/experience";
import ImageCollage from "@/components/ImageCollage";
import { InstagramIcon } from "@/components/icons";

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
  const hasStandout =
    item.standoutImage &&
    existsSync(path.join(process.cwd(), "public", "leadership", item.standoutImage));

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-20 lg:px-12">
      <Link
        href="/#experience"
        className="font-mono text-xs uppercase tracking-widest text-muted transition-colors duration-300 hover:text-copper"
      >
        ← Back to leadership
      </Link>

      <h1 className="mt-8 font-heading text-2xl font-semibold text-offwhite sm:text-3xl">
        {item.org}
      </h1>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">{item.role}</p>
        {item.verifyHref && (
          <a
            href={item.verifyHref}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded border border-ink-soft px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-muted transition-all duration-300 hover:border-copper hover:text-copper"
          >
            <InstagramIcon className="h-4 w-4" />
            Verify
          </a>
        )}
      </div>

      {(availableImages.length > 0 || hasStandout) && (
        <div className="mt-8 flex flex-col items-start gap-8 md:flex-row md:items-end">
          {availableImages.length > 0 && (
            <div className="w-full max-w-3xl md:flex-1">
              <ImageCollage images={availableImages} basePath="/leadership" alt={item.org} />
            </div>
          )}
          {hasStandout && (
            <div className="w-full shrink-0 md:w-56">
              <ImageCollage
                images={[item.standoutImage!]}
                basePath="/leadership"
                alt={`${item.org} official announcement`}
              />
            </div>
          )}
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
