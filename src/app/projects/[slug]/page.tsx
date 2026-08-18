import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "@/data/projects";
import StatusTag from "@/components/StatusTag";
import DemoVideo from "@/components/DemoVideo";
import BackLink from "@/components/BackLink";
import { GithubIcon } from "@/components/icons";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  return { title: project ? `${project.title}, Arslan Asad Qazi` : "Project not found" };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const hasDemo = existsSync(path.join(process.cwd(), "public", "demos", project.demoFile));

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-20 lg:px-12">
      <BackLink fallbackHref="/#projects">← Back to projects</BackLink>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <h1 className="font-heading text-2xl font-semibold text-offwhite sm:text-3xl">
          {project.title}
        </h1>
        <StatusTag status={project.status} />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted/80">{project.stack.join(" · ")}</p>

      {project.repoHref && (
        <a
          href={project.repoHref}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-5 inline-flex items-center gap-1.5 rounded border border-ink-soft px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-muted transition-all duration-300 hover:border-copper hover:text-copper"
        >
          <GithubIcon className="h-4 w-4" />
          View on GitHub
        </a>
      )}

      <div className="mt-8 max-w-2xl space-y-4 text-sm leading-relaxed text-muted sm:text-base">
        {project.description.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      {(project.done || project.remaining) && (
        <div className="mt-8 grid max-w-2xl gap-6 text-xs leading-relaxed sm:grid-cols-2 sm:text-sm">
          {project.done && (
            <div>
              <p className="text-muted/70">Done</p>
              <ul className="mt-1 space-y-1 text-muted">
                {project.done.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {project.remaining && (
            <div>
              <p className="text-muted/70">Remaining</p>
              <ul className="mt-1 space-y-1 text-muted/60">
                {project.remaining.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-10">
        <p className="font-mono text-xs uppercase tracking-widest text-copper">Demo</p>
        {hasDemo ? (
          <DemoVideo src={`/demos/${project.demoFile}`} />
        ) : (
          <div className="mt-3 flex aspect-video w-full items-center justify-center rounded border border-dashed border-ink-soft bg-ink-soft/20">
            <p className="px-4 text-center text-xs text-muted/60 sm:text-sm">
              Demo video coming soon, {project.demoFile}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
