import type { Metadata } from "next";
import Link from "next/link";
import ProjectRow from "@/components/ProjectRow";
import HubSidebar from "@/components/HubSidebar";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = { title: "Projects, Arslan Asad Qazi" };

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-20 lg:px-12">
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-widest text-muted transition-colors duration-300 hover:text-copper"
      >
        ← Back to home
      </Link>

      <div className="mt-8 flex gap-12">
        <HubSidebar
          items={[
            ...PROJECTS.map((p) => ({ label: p.title, id: p.slug })),
            { label: "This Portfolio", id: "this-portfolio" },
            { label: "More Work Underway", id: "more-work" },
          ]}
        />

        <div className="min-w-0 flex-1">
          <h1 className="font-heading text-3xl font-semibold text-offwhite sm:text-4xl">
            Projects
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted sm:text-base">
            A couple of things I&apos;ve actually built, plus one I&apos;m still
            working through.
          </p>

          <div className="mt-8">
            {PROJECTS.map((project, i) => (
              <ProjectRow
                key={project.slug}
                id={project.slug}
                first={i === 0}
                href={`/projects/${project.slug}`}
                title={project.title}
                status={project.status}
                description={project.summary}
                stack={project.stack}
                repoHref={project.repoHref}
              />
            ))}

            <ProjectRow
              id="this-portfolio"
              title="This Portfolio"
              href="/#deployment"
              linkLabel="See how this site is deployed"
              description="You're looking at it. Built, linted, and scanned through its own CI pipeline on every push, deployed on Vercel."
              stack={["GitHub Actions", "Trivy", "Vercel", "Docker (CI-only)"]}
            />

            <ProjectRow
              id="more-work"
              title="More Work Underway"
              description="Additional projects are in progress and will be published here as they're ready."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
