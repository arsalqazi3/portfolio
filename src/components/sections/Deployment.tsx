import ScrollReveal from "@/components/ScrollReveal";

const STEPS = ["GitHub Actions", "Lint + Build", "Trivy", "Vercel"];

export default function Deployment() {
  return (
    <section id="deployment" className="scroll-mt-40 border-t border-ink-soft py-14 sm:scroll-mt-24 sm:py-20">
      <ScrollReveal>
        <h2 className="font-heading text-2xl font-semibold text-offwhite sm:text-3xl">
          How this is deployed
        </h2>
        <div className="mt-5 max-w-2xl space-y-4 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            This originally ran on a self-hosted pipeline: every push built a
            Docker image, scanned it with Trivy, pushed it to GHCR, then an
            Ansible playbook SSHed into a single Oracle Cloud VM to pull and
            recreate the container, with Caddy handling the reverse proxy
            and HTTPS. That setup worked well for weeks.
          </p>
          <p>
            It moved to Vercel after Oracle&apos;s free tier locked the
            account over a routine card verification charge, with no
            reliable way to recover access in a reasonable time. For a
            portfolio site that needs to actually stay up, that&apos;s not
            an acceptable failure mode, so the trade-off flipped: managing
            the VM myself stopped being worth the reliability risk.
          </p>
          <p>
            The self-hosted path isn&apos;t gone, it&apos;s just not what
            serves this site right now. The Dockerfile, Ansible playbook,
            and Caddy config are still in the repo and still tested in CI
            (build, lint, Trivy scan on every push), they just don&apos;t
            deploy anywhere at the moment.
          </p>
          <p className="text-xs text-muted/70">
            The full reasoning is written up as ADRs in{" "}
            <code className="text-copper">docs/adr/</code> in the repo.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={160} className="mt-8">
        <p
          className="max-w-2xl font-mono text-xs leading-loose text-muted sm:text-sm"
          role="img"
          aria-label={`Deploy pipeline: ${STEPS.join(" then ")}, then live on Vercel`}
        >
          {STEPS.map((step, i) => (
            <span key={step}>
              <span className="text-offwhite">{step}</span>
              {i < STEPS.length - 1 && <span className="text-muted/50"> → </span>}
            </span>
          ))}
          <span className="text-muted/50"> → </span>
          <span className="text-copper">live at arslanasadqazi.is-a.dev</span>
        </p>
      </ScrollReveal>
    </section>
  );
}
