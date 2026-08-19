export type NavItem = {
  label: string;
  /** Where clicking this item navigates to. */
  href: string;
  /** The homepage section this item corresponds to, for scroll-spy highlighting. */
  sectionId: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Projects", href: "/projects", sectionId: "projects" },
  { label: "Skills", href: "/#skills", sectionId: "skills" },
  { label: "Experience", href: "/experience", sectionId: "experience" },
  { label: "Deploy", href: "/#deployment", sectionId: "deployment" },
  { label: "Certs", href: "/certifications", sectionId: "certifications" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];
