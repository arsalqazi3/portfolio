import type { Metadata } from "next";
import ProjectRow from "@/components/ProjectRow";
import BackLink from "@/components/BackLink";
import HubSidebar from "@/components/HubSidebar";
import { EXPERIENCE } from "@/data/experience";

export const metadata: Metadata = { title: "Experience, Arslan Asad Qazi" };

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-20 lg:px-12">
      <BackLink fallbackHref="/">← Back to home</BackLink>

      <div className="mt-8 flex gap-12">
        <HubSidebar
          items={[
            ...EXPERIENCE.map((item) => ({ label: item.org, id: item.slug })),
            { label: "Open to Internship Roles", id: "internships" },
          ]}
        />

        <div className="min-w-0 flex-1">
          <h1 className="font-heading text-3xl font-semibold text-offwhite sm:text-4xl">
            Experience
          </h1>

          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">
            Leadership
          </p>
          <div className="mt-3">
            {EXPERIENCE.map((item, i) => (
              <ProjectRow
                key={item.slug}
                id={item.slug}
                first={i === 0}
                href={`/experience/${item.slug}`}
                linkLabel="Read more"
                title={item.org}
                description={item.summary}
                stack={[item.role]}
              />
            ))}
          </div>

          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">
            Internships
          </p>
          <div className="mt-3">
            <ProjectRow
              id="internships"
              first
              href="/#contact"
              linkLabel="Get in touch"
              title="Open to Internship Roles"
              description="Looking for a DevOps, Cloud, or DevSecOps internship where I can put what I've built here to work on real infrastructure."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
