import ScrollReveal from "@/components/ScrollReveal";

export default function About() {
  return (
    <section id="about" className="scroll-mt-40 border-t border-ink-soft py-12 sm:scroll-mt-24 sm:py-16">
      <ScrollReveal>
        <h2 className="font-heading text-2xl font-semibold text-offwhite">About</h2>
        <div className="mt-5 max-w-2xl space-y-4 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            Arslan is a final-year Computer Science student at FAST-NUCES
            Karachi, graduating in June 2027. His focus is DevOps, Cloud, and
            DevSecOps engineering, the practical side of getting software
            built, tested, secured, and deployed without someone babysitting
            every step.
          </p>
          <p>
            He has hands-on experience across CI/CD pipelines,
            containerization, cloud infrastructure, and security tooling,
            mostly gained by building real projects. This portfolio is one of
            those projects. It&apos;s deployed the same way he&apos;d deploy
            anything else.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
