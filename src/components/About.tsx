import Image from "next/image";
import { aboutText } from "@/data/content";
import Stats from "./Stats";
import ResumePreview from "./ResumePreview";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="maxWidth">
        <ScrollReveal animation="fade-up">
          <h2 className="title">About Me</h2>
        </ScrollReveal>

        <div className="about-content">
          <div className="column left">
            <ScrollReveal animation="fade-left">
              <Image
                src="/images/35.jpg"
                alt="Geon Yoo"
                width={380}
                height={380}
                style={{ objectFit: "cover" }}
              />
            </ScrollReveal>
          </div>

          <div className="column right">
            <ScrollReveal animation="fade-right" delay={100}>
              <div className="text">{aboutText.title}</div>
              <p>{aboutText.story}</p>
              <div className="about-buttons">
                <ResumePreview />
              </div>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal animation="fade-up" delay={200}>
          <Stats />
        </ScrollReveal>
      </div>
    </section>
  );
}
