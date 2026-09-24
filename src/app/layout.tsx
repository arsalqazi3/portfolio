import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import TopBar from "@/components/TopBar";
import WebMeshBackground from "@/components/WebMeshBackground";
import IntroPreloader from "@/components/IntroPreloader";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const cabinetGrotesk = localFont({
  variable: "--font-cabinet-grotesk",
  display: "swap",
  src: [
    { path: "../fonts/cabinet-grotesk/CabinetGrotesk-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/cabinet-grotesk/CabinetGrotesk-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/cabinet-grotesk/CabinetGrotesk-Extrabold.woff2", weight: "800", style: "normal" },
  ],
});

const generalSans = localFont({
  variable: "--font-general-sans",
  display: "swap",
  src: [
    { path: "../fonts/general-sans/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/general-sans/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/general-sans/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
  ],
});

const SITE_URL = "https://arslanasadqazi.is-a.dev";
const PROFILE_IMAGE = { url: "/profile.png", width: 1994, height: 1694, alt: "Arslan Asad Qazi" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Arslan Asad Qazi, DevOps & Cloud Engineer",
  description:
    "Portfolio of Arslan Asad Qazi, a final-year Computer Science student focused on DevOps, Cloud, and DevSecOps engineering.",
  keywords: ["Arslan Asad Qazi", "Arslan Qazi", "Arslan Asad", "DevOps Engineer", "Cloud Engineer", "DevSecOps"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Arslan Asad Qazi, DevOps & Cloud Engineer",
    description:
      "Portfolio of Arslan Asad Qazi, a final-year Computer Science student focused on DevOps, Cloud, and DevSecOps engineering.",
    url: SITE_URL,
    siteName: "Arslan Asad Qazi",
    images: [PROFILE_IMAGE],
    type: "website",
  },
  twitter: {
    card: "summary",
    images: [PROFILE_IMAGE.url],
    title: "Arslan Asad Qazi, DevOps & Cloud Engineer",
    description:
      "Portfolio of Arslan Asad Qazi, a final-year Computer Science student focused on DevOps, Cloud, and DevSecOps engineering.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arslan Asad Qazi",
  alternateName: ["Arslan Qazi", "Arslan Asad"],
  url: SITE_URL,
  image: `${SITE_URL}/profile.png`,
  jobTitle: "DevOps & Cloud Engineer",
  description:
    "Final-year Computer Science student focused on DevOps, Cloud, and DevSecOps engineering.",
  sameAs: [
    "https://github.com/arsalqazi3",
    "https://www.linkedin.com/in/arslanasadqazi123/",
    "https://www.upwork.com/freelancers/~01f940971bff1d657e",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${cabinetGrotesk.variable} ${generalSans.variable} antialiased`}
    >
      <body className="bg-ink text-offwhite font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "be3147a492364a2f8e1d26fc357d4eb7"}'
          strategy="afterInteractive"
        />
        <WebMeshBackground />
        <IntroPreloader />
        <div className="relative z-10">
          <TopBar />
          {children}
        </div>
      </body>
    </html>
  );
}
