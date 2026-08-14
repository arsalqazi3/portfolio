export type Project = {
  slug: string;
  title: string;
  status: "In Progress" | "Completed";
  summary: string;
  description: string[];
  stack: string[];
  repoHref?: string;
  done?: string[];
  remaining?: string[];
  /** Filename to look for at public/demos/<demoFile>. None uploaded yet. */
  demoFile: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "logsense",
    title: "LogSense",
    status: "Completed",
    summary:
      "FastAPI backend running Z-score based anomaly detection, paired with a Next.js dashboard. Deployed on AWS EC2 with Docker and GitHub Actions CI/CD.",
    description: [
      "LogSense watches incoming log data and flags entries that fall outside a normal statistical range. It uses a Z-score based approach: each value gets compared against the recent mean and standard deviation, and anything far enough from the norm gets flagged as a potential anomaly.",
      "The backend is built with FastAPI and exposes the anomaly detection logic as an API. A Next.js dashboard sits on top of it, so the flagged anomalies actually show up somewhere readable.",
      "The whole thing runs in a Docker container on AWS EC2, with GitHub Actions handling build and deploy on every push, the same CI/CD discipline used across the rest of this portfolio's projects.",
    ],
    stack: ["FastAPI", "Next.js", "Docker", "AWS EC2", "GitHub Actions"],
    repoHref: "https://github.com/AmmarHussain00/logsense",
    demoFile: "logsense.mp4",
  },
  {
    slug: "sentinelforge",
    title: "SentinelForge",
    status: "In Progress",
    summary:
      "A secure CI/CD pipeline with scanning and gating built into every stage.",
    description: [
      "SentinelForge is an exercise in building a CI/CD pipeline where security scanning actually blocks a bad build: a critical vulnerability, a leaked secret, a failing test all stop the pipeline instead of sailing through.",
      "Jenkins orchestrates the pipeline stages. SonarQube runs static analysis (SAST) against the codebase. Trivy scans the built container image for known vulnerabilities. Snyk covers dependency scanning (SCA) so vulnerable packages get caught before they ship. Docker packages the app, and AWS is the target deployment environment.",
      "A GitLeaks pre-commit hook already stops secrets from ever reaching a commit in the first place, and the Flask demo app has a pytest suite (5 passing tests) so the pipeline has something real to build, test, and scan end to end.",
    ],
    stack: ["Jenkins", "SonarQube", "Trivy", "Snyk", "Docker", "AWS"],
    repoHref: "https://github.com/arsalqazi3/SentinelForge",
    done: [
      "Flask demo app",
      "pytest suite (5 passing tests)",
      "hardened Dockerfile",
      "GitLeaks pre-commit hook",
      "architecture diagram",
    ],
    remaining: ["Jenkins pipeline setup", "scanner integration", "EC2 deployment"],
    demoFile: "sentinelforge.mp4",
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
