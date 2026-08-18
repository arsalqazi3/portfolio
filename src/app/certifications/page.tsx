import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TitleRule from "@/components/TitleRule";
import BackLink from "@/components/BackLink";
import { CERTIFICATIONS } from "@/data/certifications";

export const metadata: Metadata = { title: "Certifications, Arslan Asad Qazi" };

export default function CertificationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-20 lg:px-12">
      <BackLink fallbackHref="/">← Back to home</BackLink>

      <h1 className="mt-8 font-heading text-3xl font-semibold text-offwhite sm:text-4xl">
        Certifications
      </h1>
      <p className="mt-3 max-w-xl text-sm text-muted sm:text-base">
        Courses I&apos;ve completed on DevOps and DevSecOps tooling.
      </p>

      <div className="mt-8">
        {CERTIFICATIONS.map((cert, i) => (
          <Link
            key={cert.slug}
            href={`/certifications/${cert.slug}`}
            className={`group -mx-4 grid gap-4 rounded px-4 py-6 transition-colors duration-300 hover:bg-ink-soft/20 sm:grid-cols-[140px_1fr] sm:gap-6 ${
              i === 0 ? "" : "border-t border-ink-soft"
            }`}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-ink-soft bg-ink-soft/20 sm:w-[140px]">
              <Image
                src={`/certifications/${cert.image}`}
                alt={cert.title}
                fill
                sizes="140px"
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="flex items-center gap-2.5 font-heading text-base font-semibold text-offwhite transition-colors duration-300 group-hover:text-copper sm:text-lg">
                <TitleRule />
                {cert.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-muted">
                {cert.instructors.join(", ")} · {cert.platform}
              </p>
              <span className="mt-3 inline-block font-mono text-xs uppercase tracking-widest text-muted transition-colors duration-300 group-hover:text-copper">
                View certificate
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
