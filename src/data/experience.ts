export type Experience = {
  slug: string;
  org: string;
  role: string;
  summary: string;
  description: string[];
  devopsConnection: string;
  /** Filenames at public/leadership/<image>, in display order. */
  images?: string[];
  /** Filename of a featured portrait shown uncropped, standing apart from the collage. */
  standoutImage?: string;
  /** Link to a public post confirming the role (e.g. an official announcement). */
  verifyHref?: string;
};

export const EXPERIENCE: Experience[] = [
  {
    slug: "procom-26",
    org: "PROCOM'26",
    role: "UI/UX Co-Head",
    summary:
      "Co-headed UI/UX for PROCOM'26, leading a team of designers and coordinating with developers to ship an event platform used by 5,000+ participants on schedule.",
    description: [
      "PROCOM'26 is a tech event under the Sheikhani Group, built around competitions, workshops, and industry networking for students. Arslan co-headed UI/UX for the event platform, leading a small team of designers through the interface work.",
      "The harder part was staying in sync with the development team as the platform came together, since design decisions had to hold up once they were actually built. The platform shipped on schedule and has been used by more than 5,000 participants.",
    ],
    devopsConnection:
      "Running UI/UX for an event platform isn't that different from running a deployment: a team depending on your part landing on time, a deadline that doesn't move, and constant coordination with people who don't share your exact priorities. Staying in sync with developers while leading design is the same coordination muscle DevOps work leans on.",
    images: ["procom1.jpg", "procom2.jpg", "procom3.jpg"],
    standoutImage: "procom4.jpg",
    verifyHref: "https://www.instagram.com/p/DSIJVoHjPyU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    slug: "developers-student-club",
    org: "Developer's Student Club",
    role: "UI/UX Co-Lead & Instructor",
    summary:
      "Co-led UI/UX at the Developer's Student Club and co-taught wireframing and lo-fi prototyping to about 25 to 30 students, in person and virtually.",
    description: [
      "At the Developer's Student Club, Arslan co-led the UI/UX track and worked as an instructor, teaching wireframing and lo-fi prototyping to about 25 to 30 students.",
      "Sessions ran both in person and virtually, which meant the material had to hold up on its own, without him in the room to walk people through it individually.",
    ],
    devopsConnection:
      "Teaching a process to a room of 25 to 30 students means breaking it into steps someone else can actually follow without you standing next to them. That's the same instinct behind writing a deploy runbook or documenting a pipeline: if only you can run it, it doesn't scale.",
    images: ["dsc1.jpg"],
    verifyHref: "https://www.instagram.com/p/DHgwtYlNp-7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
];

export function getExperience(slug: string) {
  return EXPERIENCE.find((e) => e.slug === slug);
}
