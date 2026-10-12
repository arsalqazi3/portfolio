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
  /** Problems hit along the way and how they were solved. */
  challenges?: string[];
  /** Ordered screenshot proof, rendered as a horizontal scroll strip. Filenames live at public/proofs/<slug>/<file>. */
  proofs?: { file: string; caption: string }[];
  /** Architecture diagram at public/diagrams/<file>. */
  diagram?: { file: string; alt: string };
  /** Filename at public/demos/<demoFile>. Leave it out for projects with no demo, like private self-hosted apps. */
  demoFile?: string;
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
  {
    slug: "home-server",
    title: "Home Server: Self-Hosted Apps on Ubuntu",
    status: "In Progress",
    summary:
      "An old 2014 Mac mini turned into a headless Ubuntu server that runs my own photo, file and DNS apps, and that I can manage securely from anywhere.",
    description: [
      "I turned an old 2014 Mac mini into a headless home server. The goal is to replace my Google One subscription, so it's meant to hold the photos and files from my 3 Google accounts. It also blocks ads on my own devices with my own DNS, and I can reach and manage it securely from anywhere, including my phone.",
      "The hardware is small: a dual-core Intel i5, 8GB of RAM that's soldered on, so that's the ceiling, and a 256GB SSD. I wiped macOS, installed Ubuntu 26.04 LTS and turned off the desktop, so it boots straight to the command line and saves RAM. It runs headless on Ethernet, with mbpfan for proper Mac fan control and sleep and suspend turned off. It has a static IP on my home network, with a matching DHCP reservation on the router, so the address never clashes.",
      "Every app runs in Docker. Immich is there to replace Google Photos, tuned for the weak CPU with lower job concurrency and video transcoding turned off. Nextcloud, with Postgres and Redis, is there to replace Google Drive, and I fixed its trusted-domain settings so it works properly. AdGuard Home blocks ads over DNS, but only on my own devices, so the rest of the household isn't affected. It forwards to Unbound, a caching DNS resolver on the same machine, with Cloudflare and Quad9 as fallback if Unbound fails. When I tested it with dig, cached lookups dropped to about 1ms, DNSSEC validation worked, and ad domains were still blocked.",
      "I reach everything through Tailscale, with HTTPS on every app through tailscale serve, and I SSH in from my laptop or my iPhone (Termius, with its own key). SSH only takes keys, with password and root login turned off, and the server also runs UFW, fail2ban and automatic security upgrades. Load-shedding power cuts are common here, so a small systemd service turns the Mac back on after power loss.",
      "Hermes Agent from Nous Research lets me control the server from my phone through a private Discord bot. I locked it down on purpose. Only my Discord user can talk to it, every action needs my approval, and a deny-list blocks sudo, destructive Docker volume commands, disabling or resetting the firewall, and taking Tailscale down or logging it out. Tools I don't use, like browser, vision, image generation and computer use, are turned off.",
      "I ran every setup step myself on purpose, to learn real Linux and DevOps work instead of letting automation tools do it.",
    ],
    stack: [
      "Ubuntu",
      "Linux",
      "Docker",
      "Docker Compose",
      "Tailscale",
      "Immich",
      "Nextcloud",
      "PostgreSQL",
      "Redis",
      "AdGuard Home",
      "Unbound",
      "DNS",
      "UFW",
      "fail2ban",
      "SSH",
      "systemd",
      "Hermes Agent",
      "Discord",
    ],
    diagram: {
      file: "home-server.svg",
      alt: "Home server architecture: my laptop and phone connect through Tailscale to the Mac mini running Ubuntu. Inside Docker it runs Immich, Nextcloud, AdGuard Home, Unbound and Hermes Agent. AdGuard Home forwards DNS to Unbound, which goes out to the internet.",
    },
    challenges: [
      "The Mac's Broadcom Wi-Fi had no driver after the install, so I got internet through Bluetooth tethering to my iPhone to install it.",
      "I had no spare monitor, so I used a capture card to see the Mac mini on my laptop during the install.",
      "The dual-core CPU is old, so I tuned Immich so it doesn't choke during photo processing.",
      "Power cuts kept taking the server and router down, so I added auto power-on after power loss. A UPS is next.",
      "Telegram signup in Pakistan wanted a paid SMS fee, so I used Discord for the agent instead.",
      "A YAML indentation bug in the Hermes config stopped the bot from connecting until I fixed it.",
    ],
    remaining: [
      "External backup drive, with restic backups on a timer",
      "Import Google Takeout from all 3 accounts: photos into Immich with immich-go, files into Nextcloud",
      "Test a full restore, then cancel Google One",
      "A UPS for the router and Mac mini",
      "WhatsApp backup, and a music library for Navidrome (set up, but paused for now)",
    ],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
