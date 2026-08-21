import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only the self-hosted Docker build needs this (it copies .next/standalone
  // into the runtime image). Vercel does its own equivalent packaging and
  // this actively breaks its build if left on unconditionally.
  ...(process.env.DOCKER_BUILD === "true" ? { output: "standalone" } : {}),
};

export default nextConfig;
