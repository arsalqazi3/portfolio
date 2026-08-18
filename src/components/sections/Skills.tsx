import {
  siDocker,
  siKubernetes,
  siHelm,
  siJenkins,
  siGithubactions,
  siArgo,
  siTerraform,
  siAnsible,
  siSonarqubeserver,
  siSnyk,
  siTrivy,
  siOwasp,
  siPrometheus,
  siGrafana,
  siNginx,
  siCaddy,
  siFastapi,
  siFlask,
  siGit,
  siGithub,
  siLinux,
  siGnubash,
} from "simple-icons";
import ScrollReveal from "@/components/ScrollReveal";
import SkillTile from "@/components/SkillTile";

type Tool = { name: string; icon?: { path: string; hex: string } };

type Category = {
  label: string;
  caption?: string;
  tools: Tool[];
};

const CATEGORIES: Category[] = [
  {
    label: "Cloud",
    caption: "AWS: EC2, S3, IAM, CloudWatch, VPC, ECR, CLI. Oracle Cloud: Ampere ARM VM.",
    tools: [{ name: "AWS" }, { name: "Oracle Cloud" }],
  },
  {
    label: "CI/CD & IaC",
    tools: [
      { name: "Jenkins", icon: siJenkins },
      { name: "GitHub Actions", icon: siGithubactions },
      { name: "GitOps" },
      { name: "ArgoCD", icon: siArgo },
      { name: "Terraform", icon: siTerraform },
      { name: "Ansible", icon: siAnsible },
    ],
  },
  {
    label: "Containers & Orchestration",
    tools: [
      { name: "Docker", icon: siDocker },
      { name: "Kubernetes", icon: siKubernetes },
      { name: "EKS" },
      { name: "Helm", icon: siHelm },
    ],
  },
  {
    label: "DevSecOps",
    tools: [
      { name: "SonarQube (SAST)", icon: siSonarqubeserver },
      { name: "Snyk (SCA)", icon: siSnyk },
      { name: "Trivy", icon: siTrivy },
      { name: "gitleaks" },
      { name: "OWASP ZAP (DAST)", icon: siOwasp },
    ],
  },
  {
    label: "Monitoring",
    tools: [
      { name: "Prometheus", icon: siPrometheus },
      { name: "Grafana", icon: siGrafana },
      { name: "Loki" },
    ],
  },
  {
    label: "Web / Infra",
    tools: [
      { name: "Nginx", icon: siNginx },
      { name: "Caddy", icon: siCaddy },
      { name: "Certbot" },
    ],
  },
  {
    label: "Backend",
    tools: [
      { name: "FastAPI", icon: siFastapi },
      { name: "Flask", icon: siFlask },
      { name: "REST APIs" },
    ],
  },
  {
    label: "Core Tools",
    tools: [
      { name: "Git", icon: siGit },
      { name: "GitHub", icon: siGithub },
      { name: "GHCR" },
      { name: "Linux (Ubuntu)", icon: siLinux },
      { name: "Bash", icon: siGnubash },
    ],
  },
];

const CS_FOUNDATIONS = [
  "Discrete Mathematics",
  "Data Structures",
  "Design and Analysis of Algorithms",
  "Object Oriented Programming",
  "Programming Fundamentals",
  "Software Design and Analysis",
  "Operating Systems",
  "Computer Networks",
  "Database Systems (SQL)",
  "Software Engineering",
  "Information Security",
  "Artificial Intelligence",
];

export default function Skills() {
  return (
    <section id="skills" className="border-t border-ink-soft py-10 sm:py-14">
      <ScrollReveal>
        <h2 className="font-heading text-2xl font-semibold text-offwhite">Skills</h2>
      </ScrollReveal>

      {CATEGORIES.map((category, i) => (
        <ScrollReveal key={category.label} delay={60 + i * 30}>
          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted first:mt-6">
            {category.label}
          </p>
          {category.caption && (
            <p className="mt-1 text-xs text-muted/70">{category.caption}</p>
          )}
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {category.tools.map((tool) => (
              <SkillTile key={tool.name} name={tool.name} icon={tool.icon} />
            ))}
          </div>
        </ScrollReveal>
      ))}

      <ScrollReveal delay={60 + CATEGORIES.length * 30}>
        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">
          Computer Science Foundations
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {CS_FOUNDATIONS.map((course) => (
            <li
              key={course}
              className="rounded border border-ink-soft px-3 py-1.5 text-xs text-muted"
            >
              {course}
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </section>
  );
}
