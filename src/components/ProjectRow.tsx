import Link from "next/link";
import StatusTag from "./StatusTag";
import TitleRule from "./TitleRule";
import { ArrowUpRightIcon, GithubIcon } from "./icons";

type ProjectRowProps = {
  title: string;
  status?: "In Progress" | "Completed";
  description: string;
  stack?: string[];
  /** Internal route (e.g. "/projects/logsense"), external URL, or same-page anchor (e.g. "#deployment"). */
  href?: string;
  linkLabel?: string;
  repoHref?: string;
  children?: React.ReactNode;
  first?: boolean;
};

export default function ProjectRow({
  title,
  status,
  description,
  stack,
  href,
  linkLabel = "View project",
  repoHref,
  children,
  first = false,
}: ProjectRowProps) {
  const isClickable = Boolean(href);
  const isExternal = href?.startsWith("http");
  const isAnchor = href?.startsWith("#");

  return (
    <div
      className={`group relative grid gap-3 py-8 transition-colors duration-300 sm:grid-cols-[200px_1fr] sm:gap-10 ${
        first ? "pt-0" : "border-t border-ink-soft"
      } ${isClickable ? "-mx-4 rounded px-4 hover:bg-ink-soft/20" : ""}`}
    >
      <div>
        <h3
          className={`flex items-center gap-2.5 font-heading text-lg font-semibold text-offwhite transition-colors duration-300 ${
            isClickable ? "group-hover:text-copper" : ""
          }`}
        >
          <TitleRule />
          {title}
        </h3>
        {status && <StatusTag status={status} className="mt-2 block" />}
        {stack && stack.length > 0 && (
          <p className="mt-4 text-xs leading-relaxed text-muted/80">{stack.join(" · ")}</p>
        )}
      </div>

      <div className="max-w-2xl">
        <p className="text-sm leading-relaxed text-muted sm:text-base">{description}</p>

        {children}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {isClickable && (
            <span className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted transition-colors duration-300 group-hover:text-copper">
              {linkLabel}
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          )}
          {repoHref && (
            <a
              href={repoHref}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${title} on GitHub`}
              className="relative z-20 inline-flex items-center gap-1.5 rounded border border-ink-soft px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-muted transition-all duration-300 hover:border-copper hover:text-copper"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          )}
        </div>
      </div>

      {isClickable &&
        (isExternal || isAnchor ? (
          <a
            href={href}
            {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
            className="absolute inset-0 z-10"
            aria-label={`View ${title}`}
          />
        ) : (
          <Link href={href!} className="absolute inset-0 z-10" aria-label={`View ${title}`} />
        ))}
    </div>
  );
}
