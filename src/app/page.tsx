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

export default function Home() {
  return (
    <Preloader>
      <main>
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
  );
}
