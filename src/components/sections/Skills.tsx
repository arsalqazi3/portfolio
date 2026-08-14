import {
  siLinux,
  siDocker,
  siKubernetes,
  siJenkins,
  siTerraform,
  siAnsible,
  siPrometheus,
  siGrafana,
  siHelm,
  siArgo,
  siSnyk,
  siSonarqubeserver,
  siOwasp,
} from "simple-icons";
import ScrollReveal from "@/components/ScrollReveal";
import SkillTile from "@/components/SkillTile";

type Tool = { name: string; icon?: { path: string; hex: string } };

const DEVOPS_CLOUD: Tool[] = [
  { name: "Linux", icon: siLinux },
  { name: "AWS" },
  { name: "Docker", icon: siDocker },
  { name: "Kubernetes", icon: siKubernetes },
  { name: "Jenkins", icon: siJenkins },
  { name: "Terraform", icon: siTerraform },
  { name: "Ansible", icon: siAnsible },
  { name: "Prometheus", icon: siPrometheus },
  { name: "Grafana", icon: siGrafana },
  { name: "Helm", icon: siHelm },
  { name: "ArgoCD", icon: siArgo },
  { name: "GitOps" },
  { name: "Snyk", icon: siSnyk },
  { name: "SonarQube", icon: siSonarqubeserver },
  { name: "OWASP ZAP", icon: siOwasp },
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

      <ScrollReveal delay={60}>
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">
          DevOps &amp; Cloud
        </p>
        <p className="mt-1 text-xs text-muted/70">AWS mainly EC2, S3, IAM, and EKS.</p>
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {DEVOPS_CLOUD.map((tool) => (
            <SkillTile key={tool.name} name={tool.name} icon={tool.icon} />
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={120}>
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
