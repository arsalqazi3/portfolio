import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Deployment from "@/components/sections/Deployment";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Deployment />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
}
