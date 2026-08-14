# 0002: Ansible runs on every deploy, not just once

## Status
Accepted

## Context
Ansible is often used purely for one-time server setup — install some
packages, configure a service, walk away. Used that way here, it wouldn't
really justify its place in the stack; a shell script run once by hand
would do the same job.

## Decision
The `ansible/deploy.yml` playbook runs on every push to `main`, as the
actual continuous-deployment step. It installs Docker and Caddy if they're
missing (they usually won't be, after the first run), then pulls the new
image tag, recreates the container, and reloads Caddy — every time.

## Consequences
- Ansible is the deploy mechanism, not a setup script that gets run once
  and forgotten. That's what earns it a place in this pipeline.
- Every task in the playbook has to be idempotent — safe to re-run without
  side effects when nothing changed. This takes more care than a one-shot
  script but means the playbook can be trusted to run unattended on every
  push.
- Deploys are a full `docker compose pull` + recreate on every push, which
  is simple and predictable at the cost of a few seconds of downtime per
  deploy. Fine for a personal portfolio; would need a different approach
  (rolling update, blue/green) at higher-availability requirements.
