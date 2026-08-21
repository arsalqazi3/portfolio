# Arslan Asad Qazi — Portfolio

Personal portfolio, also built to double as a working example of the
DevOps practices it talks about.

Live at [arslanasadqazi.is-a.dev](https://arslanasadqazi.is-a.dev) — see
the "How This Is Deployed" section on the site itself for the full story,
including why it moved off self-hosting.

## Stack

- **App**: Next.js (App Router) + TypeScript + Tailwind CSS
- **CI**: GitHub Actions — lint, build, and a Docker build + Trivy scan
  (validates the self-hosted path still builds cleanly; doesn't push or
  deploy anywhere)
- **Host**: Vercel

Originally self-hosted on a single Oracle Cloud VM behind Caddy, deployed
by an Ansible playbook on every push. That setup and the reasoning behind
it — and why it changed — is written up in [`docs/adr/`](docs/adr/). The
Dockerfile, Ansible playbook, and Caddy config are all still in this repo
and still exercised in CI, just not deployed anywhere right now.

## Local development

```bash
npm install
npm run dev
```

## Running with Docker

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio

# or:
docker compose up --build
```

## Project layout

```
src/                  Next.js app (App Router)
docs/adr/             Architecture decision records
ansible/deploy.yml    Self-hosted deploy playbook (not currently in use)
Caddyfile             Reverse proxy + automatic HTTPS config (not currently in use)
Dockerfile            Multi-stage build for a small runtime image
docker-compose.yml    Used for local dev and by the (currently unused) VM setup
.github/workflows/    CI pipeline — lint, build, Docker build + Trivy scan
```

## CI

[`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml) runs on every
push and pull request:

1. Lint and build the app.
2. Build the Docker image and scan it with
   [Trivy](https://github.com/aquasecurity/trivy) — fails on any CRITICAL
   vulnerability.

Deployment itself is handled by Vercel's own GitHub integration, outside
this workflow.
