export type Certification = {
  slug: string;
  title: string;
  instructors: string[];
  platform: string;
  date: string;
  length: string;
  certUrl: string;
  /** Filename at public/certifications/<image>. */
  image: string;
  description: string[];
  skills: string[];
};

export const CERTIFICATIONS: Certification[] = [
  {
    slug: "decoding-devops",
    title: "Decoding DevOps – From Basics to Advanced Projects with AI",
    instructors: ["Imran Teli"],
    platform: "Udemy",
    date: "July 20, 2026",
    length: "63.5 total hours",
    certUrl: "https://ude.my/UC-4aca1af9-24df-452e-9e8d-03b163239349",
    image: "decoding-devops.jpg",
    description: [
      "This course starts with Linux fundamentals, Docker, Terraform, and Ansible, then moves into CI/CD with Jenkins, GitHub Actions, and GitLab CI. From there it covers core AWS services like VPC, Lambda, and Elastic Beanstalk, the CodePipeline, CodeBuild, and CodeDeploy stack, monitoring with Prometheus and Grafana, and finally Kubernetes, Helm, and GitOps with ArgoCD.",
      "The hands-on project running through all of it is vprofile, a login-based multi-tier Java app with MySQL for the database, Memcached for caching, and RabbitMQ as the message broker. I deployed it again and again as each new tool came up: first on a local VM, then on an EC2 instance, then through a CI/CD pipeline, and finally on Kubernetes using Helm on EKS with Terraform handling the infrastructure.",
    ],
    skills: [
      "Linux",
      "Docker",
      "Terraform",
      "Ansible",
      "Jenkins",
      "GitHub Actions",
      "GitLab CI",
      "AWS (VPC, Lambda, Elastic Beanstalk, CodePipeline/CodeBuild/CodeDeploy)",
      "Prometheus",
      "Grafana",
      "Kubernetes",
      "Helm",
      "ArgoCD",
    ],
  },
  {
    slug: "devsecops-jenkins-kubernetes-terraform-aws",
    title: "DevSecOps & DevOps with Jenkins, Kubernetes, Terraform & AWS",
    instructors: ["A Security Guru", "Raghu The Security Expert"],
    platform: "Udemy",
    date: "Aug. 11, 2026",
    length: "3.5 total hours",
    certUrl: "https://ude.my/UC-aef7866c-2899-44ef-9d1c-a044690ad793",
    image: "devsecops.jpg",
    description: [
      "This one walks through a full DevSecOps pipeline: provisioning infrastructure with Terraform, running CI/CD through Jenkins, static analysis with SonarCloud, dependency scanning with Snyk, deploying to EKS, dynamic scanning with OWASP ZAP, and feeding findings back into JIRA.",
      "Alongside the course itself I did a chunk of hands-on work on the side: built a Jenkins EC2 instance with Terraform, debugged a Java 17 to 21 upgrade, expanded an EBS volume and grew the filesystem to match, wrote a Jenkinsfile with a Maven build stage and a SonarCloud scan stage, fixed a broken two-stage Dockerfile, and got an EKS cluster deployed.",
    ],
    skills: ["Terraform", "Jenkins", "SonarCloud (SAST)", "Snyk (SCA)", "EKS", "OWASP ZAP (DAST)", "JIRA"],
  },
];

export function getCertification(slug: string) {
  return CERTIFICATIONS.find((c) => c.slug === slug);
}
