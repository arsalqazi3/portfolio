"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GithubIcon, LinkedinIcon, MailIcon, UpworkIcon } from "./icons";
import { NAV_ITEMS } from "@/data/nav";

export default function TopBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState<string>("about");

  // Tracks every homepage section (including ones whose nav item links out to
  // a dedicated hub page) so the nav can highlight whichever is in view.
  useEffect(() => {
    if (!isHome) return;

    const sections = NAV_ITEMS.map((item) => document.getElementById(item.sectionId)).filter(
      (el): el is HTMLElement => el !== null
    );

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

  // Client-side route transitions don't trigger the browser's native
  // "scroll to #hash" behavior, so arriving at "/#section" from elsewhere
  // (e.g. a "Back to X" link on another page) needs a manual scroll once
  // the homepage has actually mounted.
  useEffect(() => {
    if (!isHome) return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
  }, [isHome]);

  // When already on the homepage, scroll directly instead of round-tripping
  // through a Link navigation (which wouldn't auto-scroll on a same-route
  // hash change either).
  const handleAnchorClick = (e: React.MouseEvent, sectionId: string) => {
    if (!isHome) return;
    const el = document.getElementById(sectionId);
    if (!el) return;
    e.preventDefault();
    window.history.pushState(null, "", `/#${sectionId}`);
    setActive(sectionId);
    requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
  };

  return (
    <header className="sticky top-0 z-10 w-full border-b border-ink-soft bg-ink">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-4 sm:px-8 lg:px-12">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- intentionally
            a plain anchor so the same-page click handler owns scrolling outright,
            without next/link's own navigation/scroll handling fighting it */}
        <a
          href="/#top"
          onClick={(e) => handleAnchorClick(e, "top")}
          className="font-heading text-base font-semibold text-offwhite"
        >
          Arslan Asad Qazi
        </a>

        <nav className="order-3 w-full sm:order-2 sm:w-auto" aria-label="In-page">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs uppercase tracking-widest">
            {NAV_ITEMS.map((item) => {
              const isAnchorItem = item.href.startsWith("/#");
              const isActive = isHome
                ? active === item.sectionId
                : !isAnchorItem && pathname.startsWith(item.href);
              const className = `transition-colors duration-300 ${
                isActive ? "text-copper" : "text-muted hover:text-offwhite"
              }`;
              return (
                <li key={item.label}>
                  {isAnchorItem ? (
                    <a
                      href={item.href}
                      onClick={(e) => handleAnchorClick(e, item.sectionId)}
                      className={className}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className={className}>
                      {item.label}
                    </Link>
                  )}
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
