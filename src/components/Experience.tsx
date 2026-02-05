"use client";

import { useCallback } from "react";
import Image from "next/image";
import { experiences } from "@/data/content";
import ScrollReveal from "./ScrollReveal";

export default function Experience() {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "";
  }, []);

  return (
    <section className="experience" id="experience">
      <div className="maxWidth">
        <h2 className="title">My Job Experience</h2>

        <div className="serv-content">
          {experiences.map((exp, i) => (
            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
              <a href={exp.link} target="_blank" rel="noopener noreferrer" className="card tilt-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
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
