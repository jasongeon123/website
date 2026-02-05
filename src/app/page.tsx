import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Clouds from "@/components/Clouds";
import Preloader from "@/components/Preloader";
import SectionNavigator from "@/components/SectionNavigator";
import Terminal from "@/components/Terminal";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Preloader>
        <main id="main-content">
          <ScrollProgress />
          <Clouds />
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
          <Footer />
          <SectionNavigator />
        </main>
      </Preloader>
      <Terminal />
    </>
  );
}
