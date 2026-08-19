# 0006: x86 Micro shape over Ampere A1 (ARM)

## Status
Accepted

## Context
Oracle Cloud's Always Free tier offers two compute options: the Ampere A1
(ARM) shape, which can be sized up to 4 OCPUs / 24GB RAM total, and the
`VM.Standard.E2.1.Micro` (x86) shape, fixed at 1 OCPU / 1GB RAM. ARM was
tried first for the extra headroom. In practice, launching an A1 instance
repeatedly failed with "out of capacity" errors — a known, widely
documented constraint on that specific free shape, since demand for it
outstrips Oracle's shared pool in most regions.

## Decision
Deploy on the x86 Micro shape instead of continuing to wait for ARM
capacity, with a 2GB swap file added as headroom.

## Consequences
- Available immediately, no capacity contention.
- 1GB RAM is genuinely tight, but this site is mostly static content with
  no database or per-request compute — the actual working set fits
  comfortably, and the image is built in CI, not on the VM, so the box
  never needs to run `npm run build`.
- The swap file is a shock absorber for the odd spike (a deploy overlapping
  a visitor), not a way to sustainably run something heavier.
- If a future project on this VM needs real compute headroom, this
  decision should be revisited rather than assumed to still hold.
