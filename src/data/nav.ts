export type NavItem = { label: string } & ({ id: string } | { href: string });

export const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About" },
  { href: "/projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { id: "deployment", label: "Deploy" },
  { href: "/certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];
