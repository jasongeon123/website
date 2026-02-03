import Image from "next/image";
import { experiences } from "@/data/content";
import ScrollReveal from "./ScrollReveal";

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="maxWidth">
        <div className="title">My Job Experience</div>

        <div className="serv-content">
          {experiences.map((exp, i) => (
            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
              <a href={exp.link} target="_blank" rel="noopener noreferrer" className="card">
                <div className="box">
                  <Image
                    src={exp.logo}
                    alt={exp.company}
                    width={120}
                    height={120}
                    className="companylogo"
                    unoptimized
                  />
                  <div className="text">{exp.company}</div>
                  <div className="text2">{exp.title}</div>
                  <div className="location">{exp.location} | {exp.period}</div>
                  <ul>
                    {exp.responsibilities.map((r, j) => (
                      <li key={j}>{r}</li>
                    ))}
                  </ul>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
