export type NavItem = { label: string } & ({ id: string } | { href: string });

export const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About" },
  { href: "/experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { id: "deployment", label: "Deploy" },
  { href: "/certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];
