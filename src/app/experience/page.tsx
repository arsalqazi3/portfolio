import type { Metadata } from "next";
import Link from "next/link";
import ProjectRow from "@/components/ProjectRow";
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

      <h1 className="mt-8 font-heading text-3xl font-semibold text-offwhite sm:text-4xl">
        Experience
      </h1>

      <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">
        Leadership
      </p>
      <div className="mt-3">
        {EXPERIENCE.map((item, i) => (
          <ProjectRow
            key={item.slug}
            first={i === 0}
            href={`/experience/${item.slug}`}
            linkLabel="Read more"
            title={item.org}
            description={item.summary}
            stack={[item.role]}
          />
        ))}
      </div>
    </div>
  );
}
