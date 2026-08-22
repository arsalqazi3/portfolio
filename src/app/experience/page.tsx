import type { Metadata } from "next";
import Link from "next/link";
import ProjectRow from "@/components/ProjectRow";
import HubSidebar from "@/components/HubSidebar";
import { EXPERIENCE } from "@/data/experience";

export const metadata: Metadata = { title: "Experience, Arslan Asad Qazi" };

export default function ExperiencePage() {
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
            ...EXPERIENCE.map((item) => ({ label: item.org, id: item.slug })),
            { label: "Open to New Opportunities", id: "internships" },
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

          <div className="mt-8">
            <ProjectRow
              id="internships"
              first
              href="/#contact"
              linkLabel="Get in touch"
              title="Open to New Opportunities"
              description="Looking for DevOps, Cloud, or DevSecOps roles, where I can put what I've built here to work on real infrastructure."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
