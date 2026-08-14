# 0003: GHCR over Docker Hub

## Status
Accepted

## Context
The built image needs somewhere to live between "CI built it" and "Ansible
pulls it onto the VM." Docker Hub is the default most people reach for, but
it's not the only option and not the best fit here.

## Decision
Push images to GitHub Container Registry (`ghcr.io`) instead of Docker Hub.

## Consequences
- Docker Hub's free tier has pull-rate limits that can bite during CI or
  redeploys; GHCR doesn't impose the same limits on this kind of usage.
- GHCR authenticates with the same GitHub token already available in
  Actions (`GITHUB_TOKEN`) — no separate account, secret, or login step to
  manage.
- The image lives next to the code it was built from, under the same
  GitHub namespace, which makes it easier to trace an image tag back to a
  commit.
- Trade-off: GHCR is tied to GitHub. If the code ever moved off GitHub,
  the registry would need to move too. Acceptable for a project that's
  already fully committed to GitHub Actions for CI.
