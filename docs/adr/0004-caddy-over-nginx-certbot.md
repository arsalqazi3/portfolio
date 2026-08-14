# 0004: Caddy over Nginx + Certbot

## Status
Accepted

## Context
The site needs a reverse proxy in front of the container and HTTPS on a
custom domain. The conventional pairing is Nginx for the proxy and Certbot
for certificates, with a cron job or systemd timer to keep certs renewed.

## Decision
Use Caddy as the reverse proxy instead of Nginx + Certbot.

## Consequences
- Caddy provisions and renews TLS certificates automatically as part of
  normal operation — there's no separate renewal job to schedule, monitor,
  or debug when it silently stops firing.
- The whole reverse-proxy + TLS config fits in one short `Caddyfile`
  (see the project root), instead of an Nginx config plus Certbot's
  renewal hooks and cert paths.
- Fewer moving parts for the same practical outcome: HTTPS reverse proxy
  in front of a Docker container.
- Trade-off: Nginx has a larger ecosystem and more people have
  production experience tuning it under heavy load. Not a concern at this
  project's scale.
