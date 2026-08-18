import type { Metadata } from "next";
import ProjectRow from "@/components/ProjectRow";
import BackLink from "@/components/BackLink";
import HubSidebar from "@/components/HubSidebar";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = { title: "Projects, Arslan Asad Qazi" };

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-20 lg:px-12">
      <BackLink fallbackHref="/">← Back to home</BackLink>

      <div className="mt-8 flex gap-12">
        <HubSidebar />

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
              title="This Portfolio"
              href="/#deployment"
              linkLabel="See how this site is deployed"
              description="You're looking at it. A live case study in the practices below: containerized, scanned, and deployed through its own pipeline."
              stack={["Docker", "GitHub Actions", "Trivy", "GHCR", "Ansible", "Caddy", "Oracle Cloud"]}
            />

            <ProjectRow
              title="More Work Underway"
              description="Additional projects are in progress and will be published here as they're ready."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
