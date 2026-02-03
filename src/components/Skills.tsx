"use client";

import { skills, skillsDescription } from "@/data/content";
import ScrollReveal from "./ScrollReveal";

const categoryToTags: Record<string, string[]> = {
  frontend: ["react", "electron"],
  backend: ["python", "node"],
  ml: ["ml"],
  database: ["postgresql"],
  game: ["unity"],
  devops: ["railway"],
};

export default function Skills() {
  function handleSkillClick(category: string) {
    const section = document.getElementById("projects");
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      const tags = document.querySelectorAll(".projects .tag");
      const matchTags = categoryToTags[category] || [];

      tags.forEach((tag) => {
        tag.classList.remove("highlight");

        const matches = matchTags.some((t) => tag.className.includes(t));
        if (matches) tag.classList.add("highlight");
      });

      setTimeout(() => {
        tags.forEach((tag) => tag.classList.remove("highlight"));
      }, 2000);
    }, 600);
  }

  return (
    <section className="skills" id="skills">
      <div className="maxWidth">
        <div className="title">My Skills</div>

        <div className="skills-content">
          <ScrollReveal animation="fade-left">
            <div className="column left">
              <div className="text">My creative skills & experiences.</div>
              <p>{skillsDescription}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-right" delay={100}>
            <div className="column right">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className={`bars ${skill.category}`}
                  onClick={() => handleSkillClick(skill.category)}
                >
                  <div className="info">
                    <span>{skill.name}</span>
                  </div>
                  <span className="view-link">View Projects →</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
