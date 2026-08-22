import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectRow from "@/components/ProjectRow";
import { ArrowUpRightIcon } from "@/components/icons";
import { EXPERIENCE } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-40 border-t border-ink-soft py-12 sm:scroll-mt-24 sm:py-16">
      <ScrollReveal>
        <Link href="/experience" className="group inline-block">
          <h2 className="font-heading text-2xl font-semibold text-offwhite transition-colors duration-300 group-hover:text-copper">
            Experience
          </h2>
        </Link>
        <p className="mt-3 max-w-xl text-sm text-muted sm:text-base">
          Leadership roles alongside the technical work, and what I&apos;m looking for next.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={30}>
        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">Leadership</p>
      </ScrollReveal>
      <div className="mt-3">
        {EXPERIENCE.slice(0, 3).map((item, i) => (
          <ScrollReveal key={item.slug} delay={60 + i * 60}>
            <ProjectRow
              first={i === 0}
              href={`/experience/${item.slug}`}
              linkLabel="Read more"
              title={item.org}
              description={item.summary}
              stack={[item.role]}
            />
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-8">
        <ScrollReveal delay={270}>
          <ProjectRow
            first
            href="#contact"
            linkLabel="Get in touch"
            title="Open to New Opportunities"
            description="Looking for DevOps, Cloud, or DevSecOps roles, where I can put what I've built here to work on real infrastructure."
          />
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <Link
          href="/experience"
          className="group mt-6 inline-flex items-center gap-1.5 rounded border border-ink-soft px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-muted transition-all duration-300 hover:border-copper hover:text-copper"
        >
          View all experience
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </Link>
      </ScrollReveal>
    </section>
  );
}
