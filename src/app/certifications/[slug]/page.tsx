import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CERTIFICATIONS, getCertification } from "@/data/certifications";
import { ArrowUpRightIcon } from "@/components/icons";
import BackLink from "@/components/BackLink";

export function generateStaticParams() {
  return CERTIFICATIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/certifications/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const cert = getCertification(slug);
  return { title: cert ? `${cert.title}, Arslan Asad Qazi` : "Certificate not found" };
}

export default async function CertificationPage(props: PageProps<"/certifications/[slug]">) {
  const { slug } = await props.params;
  const cert = getCertification(slug);
  if (!cert) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-20 lg:px-12">
      <BackLink fallbackHref="/#certifications">← Back to certifications</BackLink>

      <h1 className="mt-8 font-heading text-2xl font-semibold text-offwhite sm:text-3xl">
        {cert.title}
      </h1>
      <p className="mt-3 font-mono text-xs text-muted">
        {cert.instructors.join(", ")} · {cert.platform} · {cert.date} · {cert.length}
      </p>

      <div className="relative mt-8 aspect-[4/3] w-full max-w-2xl overflow-hidden rounded border border-ink-soft bg-ink-soft/20">
        <Image
          src={`/certifications/${cert.image}`}
          alt={`${cert.title} certificate`}
          fill
          sizes="(min-width: 768px) 672px, 100vw"
          className="object-contain"
          priority
        />
      </div>

      <div className="mt-8 max-w-2xl space-y-4 text-sm leading-relaxed text-muted sm:text-base">
        {cert.description.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-copper">
          Skills covered
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {cert.skills.map((skill) => (
            <li
              key={skill}
              className="rounded border border-ink-soft px-3 py-1 text-xs text-muted"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={cert.certUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="group mt-10 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted transition-colors duration-300 hover:text-copper"
      >
        Verify on Udemy
        <ArrowUpRightIcon className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
