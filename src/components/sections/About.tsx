import ScrollReveal from "@/components/ScrollReveal";

export default function About() {
  return (
    <section id="about" className="scroll-mt-40 border-t border-ink-soft py-12 sm:scroll-mt-24 sm:py-16">
      <ScrollReveal>
        <h2 className="font-heading text-2xl font-semibold text-offwhite">About</h2>
        <div className="mt-5 max-w-2xl space-y-4 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            Final-year Computer Science student at FAST-NUCES Karachi,
            graduating in June 2027. My focus is DevOps, Cloud, and DevSecOps
            engineering: the practical side of getting software built,
            tested, secured, and deployed without someone babysitting every
            step.
          </p>
          <p>
            The parts that get skipped are what I care about most. Pipelines
            that break quietly, infrastructure that isn&apos;t built to
            scale, security checks added too late instead of built in from
            the start. Fixing that means designing systems that hold up on
            their own, from the first commit to the last deploy.
          </p>
          <p>
            A design background came first, and it still shapes how I build,
            not just how something runs, but how it feels to use. That mix
            shows up in the details: clean, secure, and made to last.
          </p>
          <p>
            Always learning the next layer of the stack. Always looking for
            the next hard problem worth solving.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
