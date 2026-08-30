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
  /** Ordered screenshot proof, rendered as a horizontal scroll strip. Filenames live at public/proofs/<slug>/<file>. */
  proofs?: { file: string; caption: string }[];
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
      "LogSense is a full-stack app I built with my team to catch weird behavior in system logs before it turns into a real problem. It watches a stream of logs, tracks things like error rate and batch size over a rolling window, and uses a Z-score based statistical engine to spot when something looks off. No machine learning model, no training data needed. It just learns what normal looks like and flags what doesn't fit.",
      "On top of the statistics sits a rule-based AI agent that decides how serious an anomaly actually is. It weighs different signals against each other, an empty batch, an all-errors batch, a high or medium Z-score, and gives back a plain-language reason for its verdict: normal, warning, or critical.",
      "The backend is FastAPI, the dashboard is Next.js and polls for new alerts every 5 seconds so you can watch things update live. The whole thing runs on Docker and Docker Compose, deployed to AWS EC2 with Nginx and HTTPS, shipped through a GitHub Actions CI/CD pipeline.",
      "I owned deployment and infrastructure on this one. My teammate Ammar Hussain built the backend and AI agent logic, and Hassaan worked on the CI/CD side with me. We also benchmarked LogSense against a plain fixed-threshold detector using the public HDFS log dataset, to prove it actually catches more with fewer false alarms, not just that it runs.",
    ],
    stack: ["FastAPI", "Next.js", "Docker", "Docker Compose", "AWS EC2", "Nginx", "GitHub Actions"],
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
    proofs: [
      { file: "01-sonarqube-fail-jenkins.png", caption: "SonarQube gate blocks the Jenkins build" },
      { file: "02-sonarqube-issue-detail.png", caption: "The exact issue SonarQube caught" },
      { file: "03-sonarqube-fail-sonarqube.png", caption: "Failed quality gate in SonarQube itself" },
      { file: "04-sonarqube-pass-jenkins.png", caption: "Fixed, Jenkins build passes the gate" },
      { file: "05-sonarqube-pass-sonarqube.png", caption: "Quality gate passed in SonarQube" },
      { file: "06-trivy-fail-stage.png", caption: "Trivy stage fails the pipeline on a vulnerable image" },
      { file: "07-trivy-fail-vulnerabilities.png", caption: "The vulnerabilities Trivy flagged" },
      { file: "08-trivy-pass-stage.png", caption: "Fixed, Trivy stage passes" },
      { file: "09-trivy-pass-vulnerabilities.png", caption: "Clean scan after the fix" },
      { file: "10-snyk-fail.png", caption: "Snyk blocks a vulnerable dependency" },
      { file: "11-snyk-pass.png", caption: "Dependency updated, Snyk passes" },
      { file: "12-aggregate-report.png", caption: "Combined security report generated every run" },
      { file: "13-dockerhub-repo.png", caption: "Image published to Docker Hub" },
      { file: "14-curl-success.png", caption: "Live app responding after deploy" },
    ],
    demoFile: "sentinelforge.mp4",
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
