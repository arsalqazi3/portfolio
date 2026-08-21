# 0007: Vercel over the self-hosted Oracle VM

## Status
Accepted

## Context
This site ran on a self-hosted pipeline (Docker → Trivy → GHCR → Ansible →
Caddy → Oracle Cloud VM) for several weeks, and it worked. Then Oracle's
Always Free tier locked the account over a routine card verification
charge that was initially declined for insufficient funds. Fixing the
underlying payment issue didn't restore access: password reset succeeded
but sign-in still failed, live chat support required a business email
address to even open a ticket, and the community forum was the only
channel left. This is a widely reported pattern on Oracle's own forums,
not a one-off — multiple threads describe the identical symptom, with
resolution times ranging from days to weeks.

## Decision
Move hosting to Vercel. Keep the Dockerfile, Ansible playbook, and Caddy
config in the repo, still exercised in CI (build, lint, Trivy scan on
every push), but no longer deployed anywhere.

## Consequences
- The site no longer demonstrates a live self-hosted deployment. The
  pipeline code is still there and still tested, just not proving itself
  against a real server anymore.
- Zero ongoing infrastructure risk of this specific kind: Vercel's free
  tier doesn't gate access behind a card verification step the way
  Oracle's does.
- Any future move back to self-hosting (a different VPS with a simpler,
  predictable billing model rather than another free tier with the same
  failure mode) is still straightforward, since the playbook and Docker
  setup are portable and already proven.
- This trade-off was made under real time pressure (the site needs to
  stay reachable during an active job search), not idle preference. A
  side project with no audience depending on uptime might reasonably
  have made the opposite call and just waited out the lockout.
