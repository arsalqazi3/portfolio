"use client";

import { useRouter } from "next/navigation";

type BackLinkProps = {
  /** Where to go if there's no in-site history to return to (e.g. a shared direct link). */
  fallbackHref: string;
  children: React.ReactNode;
};

/** Goes back to wherever the user actually came from (preserving scroll position),
 * instead of always jumping to a fixed anchor. Falls back to a fixed destination
 * only when there's no history to go back to. */
export default function BackLink({ fallbackHref, children }: BackLinkProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      }}
      className="font-mono text-xs uppercase tracking-widest text-muted transition-colors duration-300 hover:text-copper"
    >
      {children}
    </button>
  );
}
