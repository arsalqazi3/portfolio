import ScrollReveal from "@/components/ScrollReveal";

const STEPS = ["Docker", "GitHub Actions", "Trivy", "GHCR", "Ansible", "Caddy"];

export default function Deployment() {
  return (
    <section id="deployment" className="border-t border-ink-soft py-14 sm:py-20">
      <ScrollReveal>
        <h2 className="font-heading text-2xl font-semibold text-offwhite sm:text-3xl">
          How this is deployed
        </h2>
        <div className="mt-5 max-w-2xl space-y-4 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            This site runs through an actual deployment pipeline rather than
            a static export pushed to a CDN. Every push to main works
            through tests, a Docker build, a Trivy vulnerability scan, and a
            push to GHCR before a deploy is even attempted.
          </p>
          <p>
            The container image is built once and tagged with the commit
            SHA, then pushed to GitHub Container Registry, which sits next
            to the code and reuses GitHub auth instead of a separate
            registry account. An Ansible playbook handles the actual
            deploy: it runs on every push, SSHes into a single Oracle Cloud
            VM, pulls the new image, and recreates the container.
          </p>
          <p>
            Caddy sits in front of the container as a reverse proxy and
            handles HTTPS automatically for arslanasadqazi.is-a.dev, with no
            separate Certbot cron job to maintain. There&apos;s no Terraform
            here either, because provisioning a single VM by hand in the
            Oracle console is simpler than writing infrastructure as code
            for one resource. That trade-off flips once there&apos;s more
            than one thing to provision.
          </p>
          <p className="text-xs text-muted/70">
            The full reasoning behind each of these choices is written up as
            ADRs in <code className="text-copper">docs/adr/</code> in the
            repo.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={160} className="mt-8">
        <p
          className="max-w-2xl font-mono text-xs leading-loose text-muted sm:text-sm"
          role="img"
          aria-label={`Deploy pipeline: ${STEPS.join(" then ")}, then live on Oracle Cloud`}
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
