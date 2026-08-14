import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import TopBar from "@/components/TopBar";
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

export const metadata: Metadata = {
  title: "Arslan Asad Qazi, DevOps & Cloud Engineer",
  description:
    "Portfolio of Arslan Asad Qazi, a final-year Computer Science student focused on DevOps, Cloud, and DevSecOps engineering.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${cabinetGrotesk.variable} ${generalSans.variable} antialiased`}
    >
      <body className="bg-ink text-offwhite font-body">
        <TopBar />
        {children}
      </body>
    </html>
  );
}
