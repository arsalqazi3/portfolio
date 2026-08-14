# 0005: Next.js over Astro

## Status
Accepted

## Context
This is a mostly-static portfolio page. It doesn't need server-side
rendering, API routes, or most of what makes Next.js worth reaching for —
a lighter static-site generator like Astro would technically be a better
fit for the actual content.

## Decision
Build the site in Next.js anyway.

## Consequences
- Familiarity and speed of delivery mattered more than picking the
  theoretically-optimal tool for a page this simple. Next.js is what's
  known well, so building and shipping it took less time.
- This is a conscious trade-off, not an oversight: the honest reasoning is
  recorded here rather than pretending Next.js was necessary on technical
  grounds.
- The Docker build still stays small — `next build` with `output:
  "standalone"` produces a minimal runtime image, so the cost of this
  choice on image size and deploy pipeline stays low even though the
  framework is heavier than the content strictly requires.
