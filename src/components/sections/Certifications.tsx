import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import TitleRule from "@/components/TitleRule";
import { ArrowUpRightIcon } from "@/components/icons";
import { CERTIFICATIONS } from "@/data/certifications";

export default function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-40 border-t border-ink-soft py-14 sm:scroll-mt-24 sm:py-20">
      <ScrollReveal>
        <Link href="/certifications" className="group inline-block">
          <h2 className="font-heading text-2xl font-semibold text-offwhite transition-colors duration-300 group-hover:text-copper sm:text-3xl">
            Certifications
          </h2>
        </Link>
        <p className="mt-3 max-w-xl text-sm text-muted sm:text-base">
          Courses I&apos;ve completed on DevOps and DevSecOps tooling.
        </p>
      </ScrollReveal>

      <div className="mt-8">
        {CERTIFICATIONS.slice(0, 3).map((cert, i) => (
          <ScrollReveal key={cert.slug} delay={i * 60}>
            <Link
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
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <Link
          href="/certifications"
          className="group mt-6 inline-flex items-center gap-1.5 rounded border border-ink-soft px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-muted transition-all duration-300 hover:border-copper hover:text-copper"
        >
          View all certifications
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </Link>
      </ScrollReveal>
    </section>
  );
}
