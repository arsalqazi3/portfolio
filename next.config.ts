import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only the self-hosted Docker build needs this (it copies .next/standalone
  // into the runtime image). Vercel does its own equivalent packaging and
  // this actively breaks its build if left on unconditionally.
  ...(process.env.DOCKER_BUILD === "true" ? { output: "standalone" } : {}),
  // Google may still hold the old photo under its former URL; point it at the new one.
  async redirects() {
    return [{ source: "/profile.jpg", destination: "/profile.png", permanent: true }];
  },
  images: {
    // Next 16 clamps any unlisted `quality` prop down to 75 by default, so
    // proof screenshots (readable UI text) and other quality={90+} usages
    // were silently getting compressed harder than intended.
    qualities: [75, 90, 95, 100],
  },
};

export default nextConfig;
