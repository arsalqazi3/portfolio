"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GithubIcon, LinkedinIcon, MailIcon, UpworkIcon } from "./icons";

type NavItem = { label: string } & ({ id: string } | { href: string });

const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About" },
  { href: "/experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { id: "deployment", label: "Deploy" },
  { href: "/certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];

export default function TopBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    if (!isHome) return;

    const anchorIds = NAV_ITEMS.filter((item): item is { id: string; label: string } => "id" in item).map(
      (item) => item.id
    );
    const sections = anchorIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header className="sticky top-0 z-10 w-full border-b border-ink-soft bg-ink">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-4 sm:px-8 lg:px-12">
        <Link href="/#top" className="font-heading text-base font-semibold text-offwhite">
          Arslan Asad Qazi
        </Link>

        <nav className="order-3 w-full sm:order-2 sm:w-auto" aria-label="In-page">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs uppercase tracking-widest">
            {NAV_ITEMS.map((item) => {
              const isPage = "href" in item;
              const href = isPage ? item.href : `/#${item.id}`;
              const isActive = isPage ? pathname.startsWith(item.href) : isHome && active === item.id;
              return (
                <li key={item.label}>
                  <Link
                    href={href}
                    className={`transition-colors duration-300 ${
                      isActive ? "text-copper" : "text-muted hover:text-offwhite"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="order-2 flex items-center gap-3 sm:order-3">
          <a
            href="#"
            className="rounded border border-copper px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-copper transition-all duration-300 hover:bg-copper hover:text-ink"
          >
            {/* TODO: add resume PDF, currently a placeholder link */}
            Resume
          </a>
          <ul className="flex items-center gap-2">
            <li>
              <a
                href="https://github.com/arsalqazi3"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded border border-ink-soft text-offwhite/80 transition-all duration-300 hover:border-copper hover:text-copper"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/arslanasadqazi123/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded border border-ink-soft text-offwhite/80 transition-all duration-300 hover:border-copper hover:text-copper"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a
                href="mailto:arslanaqazi3@gmail.com"
                aria-label="Email"
                className="flex h-8 w-8 items-center justify-center rounded border border-ink-soft text-offwhite/80 transition-all duration-300 hover:border-copper hover:text-copper"
              >
                <MailIcon className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a
                href="https://www.upwork.com/freelancers/~01f940971bff1d657e"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Upwork"
                className="flex h-8 w-8 items-center justify-center rounded border border-ink-soft text-offwhite/80 transition-all duration-300 hover:border-copper hover:text-copper"
              >
                <UpworkIcon className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
