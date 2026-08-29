export type Project = {
  slug: string;
  title: string;
  status: "In Progress" | "Completed";
  summary: string;
  description: string[];
  stack: string[];
  repoHref?: string;
  dockerHref?: string;
  done?: string[];
  remaining?: string[];
  /** Standout bullet points for a completed project's detail page. */
  highlights?: string[];
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
    status: "Completed",
    summary: "A DevSecOps pipeline that blocks vulnerable code before it ships.",
    description: [
      "SentinelForge is a CI/CD pipeline I built to actually learn how security fits into DevOps, not just read about it. It wraps a small Flask app in a full pipeline that tests the code, scans it for bugs and secrets, checks every dependency for known vulnerabilities, builds a Docker image, scans that image too, and only then pushes it and deploys it live. If anything looks unsafe at any step, the pipeline stops right there.",
      "The stack is Jenkins, SonarQube, Snyk, and Trivy, all wired together and running on AWS EC2. I didn't just set these tools up and hope they worked. I proved it. For each security gate, I broke something on purpose, watched the pipeline correctly block it, then fixed the problem and confirmed it recovered. That fail-then-pass proof is documented with real screenshots for every single gate.",
      "Most of the real work here wasn't writing pipeline steps. It was debugging real infrastructure problems: giving Jenkins access to Docker, losing installed tools every time a container got rebuilt (which pushed me to build a custom Jenkins image with everything baked in), tracking down credential mismatches, and understanding why SonarQube's quality gate wasn't catching what I expected it to.",
    ],
    stack: [
      "Jenkins",
      "SonarQube",
      "Snyk",
      "Trivy",
      "Docker",
      "Docker Hub",
      "AWS EC2",
      "Flask",
      "Python",
      "pytest",
      "GitHub Actions webhook",
      "gitleaks",
    ],
    repoHref: "https://github.com/arsalqazi3/SentinelForge",
    dockerHref: "https://hub.docker.com/r/arslanasadqazi/sentinelforge",
    highlights: [
      "Every security gate proven to actually block bad code, not just report on it",
      "Custom Jenkins Docker image built to solve a real tool-persistence bug",
      "Generates a Software Bill of Materials (SBOM) and a combined security report on every run",
      "Honest documentation of real limitations, including exactly why one gate is currently relaxed and what that means",
    ],
    demoFile: "sentinelforge.mp4",
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
