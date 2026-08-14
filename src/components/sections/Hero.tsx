import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export default function Hero() {
  return (
    <section id="top" className="py-6 sm:py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
        <ScrollReveal delay={80} className="order-2 min-w-0 flex-1 sm:order-1">
          <p className="font-mono text-xs uppercase tracking-widest text-copper">
            DevOps · Cloud · DevSecOps
          </p>
          <h1 className="mt-3 font-heading text-2xl leading-snug text-offwhite sm:text-3xl lg:text-4xl">
            I&apos;m <span className="text-copper">Arslan Asad Qazi</span>, and
            I build the pipelines that get code from a commit to production
            without breaking or leaking anything along the way.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Final-year Computer Science student at FAST-NUCES Karachi,
            graduating June 2027. This site is one of the systems
            I&apos;ve built, see how below.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0} className="order-1 self-start sm:order-2 sm:self-center">
          <div className="relative aspect-square w-36 overflow-hidden rounded border border-ink-soft bg-ink-soft/40 sm:w-48 lg:w-56">
            <Image
              src="/profile.jpg"
              alt="Arslan Asad Qazi"
              fill
              sizes="(min-width: 1024px) 450px, (min-width: 640px) 380px, 300px"
              quality={90}
              className="object-cover"
              priority
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
