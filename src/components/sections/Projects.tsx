import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectRow from "@/components/ProjectRow";
import { ArrowUpRightIcon } from "@/components/icons";
import { PROJECTS } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-40 border-t border-ink-soft py-14 sm:scroll-mt-24 sm:py-20">
      <ScrollReveal>
        <Link href="/projects" className="group inline-block">
          <h2 className="font-heading text-3xl font-semibold text-offwhite transition-colors duration-300 group-hover:text-copper sm:text-4xl">
            Projects
          </h2>
        </Link>
        <p className="mt-3 max-w-xl text-sm text-muted sm:text-base">
          A couple of things I&apos;ve actually built, plus one I&apos;m still
          working through.
        </p>
      </ScrollReveal>

      <div className="mt-8">
        {PROJECTS.map((project, i) => (
          <ScrollReveal key={project.slug}>
            <ProjectRow
              first={i === 0}
              href={`/projects/${project.slug}`}
              title={project.title}
              status={project.status}
              description={project.summary}
              stack={project.stack}
              repoHref={project.repoHref}
            />
          </ScrollReveal>
        ))}

        <ScrollReveal>
          <ProjectRow
            title="This Portfolio"
            href="#deployment"
            linkLabel="See how this site is deployed"
            description="You're looking at it. Built, linted, and scanned through its own CI pipeline on every push, deployed on Vercel."
            stack={["GitHub Actions", "Trivy", "Vercel", "Docker (CI-only)"]}
          />
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <Link
          href="/projects"
          className="group mt-6 inline-flex items-center gap-1.5 rounded border border-ink-soft px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-muted transition-all duration-300 hover:border-copper hover:text-copper"
        >
          View all projects
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </Link>
      </ScrollReveal>
    </section>
  );
}
