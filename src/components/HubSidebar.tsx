"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/data/nav";

/** Sticky vertical section nav for hub pages (mirrors TopBar's links, dash-mark
 * style instead of horizontal). Desktop only: on mobile, TopBar's own nav
 * already covers this without duplicating it in a second place. */
export default function HubSidebar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Site sections" className="sticky top-24 hidden h-fit w-36 shrink-0 md:block">
      <ul className="space-y-4">
        {NAV_ITEMS.map((item) => {
          const isPage = "href" in item;
          const href = isPage ? item.href : `/#${item.id}`;
          const isActive = isPage && pathname.startsWith(item.href);

          return (
            <li key={item.label}>
              <Link
                href={href}
                className={`group flex items-center gap-3 font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${
                  isActive ? "text-offwhite" : "text-muted hover:text-offwhite"
                }`}
              >
                <span
                  className={`h-px shrink-0 transition-all duration-300 ${
                    isActive
                      ? "w-8 bg-offwhite"
                      : "w-4 bg-ink-soft group-hover:w-6 group-hover:bg-offwhite"
                  }`}
                />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
