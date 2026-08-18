import ScrollReveal from "@/components/ScrollReveal";
import { GithubIcon, LinkedinIcon, MailIcon, UpworkIcon } from "@/components/icons";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-40 border-t border-ink-soft py-16 sm:scroll-mt-24 sm:py-24">
      <ScrollReveal>
        <h2 className="font-heading text-2xl font-semibold text-offwhite sm:text-3xl">
          Contact
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
          Open to DevOps, Cloud, and DevSecOps roles and internships. The
          fastest way to reach me is email.
        </p>

        <ul className="mt-6 space-y-3 text-sm">
          <li>
            <a
              href="mailto:arslanaqazi3@gmail.com"
              className="inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-copper"
            >
              <MailIcon className="h-4 w-4" />
              arslanaqazi3@gmail.com
            </a>
          </li>
          <li>
            <a
              href="https://github.com/arsalqazi3"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-copper"
            >
              <GithubIcon className="h-4 w-4" />
              github.com/arsalqazi3
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/arslanasadqazi123/"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-copper"
            >
              <LinkedinIcon className="h-4 w-4" />
              linkedin.com/in/arslanasadqazi123
            </a>
          </li>
          <li>
            <a
              href="https://www.upwork.com/freelancers/~01f940971bff1d657e"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-copper"
            >
              <UpworkIcon className="h-4 w-4" />
              Upwork
            </a>
          </li>
        </ul>
      </ScrollReveal>

      <ScrollReveal delay={120}>
        <p className="mt-16 font-mono text-xs text-muted/50">
          Built and deployed by Arslan Asad Qazi.
        </p>
      </ScrollReveal>
    </section>
  );
}
