import type { Metadata } from "next";
import Link from "next/link";
import ProjectRow from "@/components/ProjectRow";
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

      <h1 className="mt-8 font-heading text-3xl font-semibold text-offwhite sm:text-4xl">
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
          title="More projects coming soon"
          description="Currently building a chaos engineering platform on Kubernetes and Terraform."
          stack={["Kubernetes", "Terraform"]}
        />
      </div>
    </div>
  );
}
