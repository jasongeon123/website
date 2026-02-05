"use client";

import { useState, useCallback } from "react";
import { FaPaintBrush, FaChartLine, FaCode, FaTruck, FaVrCardboard, FaBrain, FaCoffee, FaGamepad, FaRobot, FaUtensils } from "react-icons/fa";
import { projects } from "@/data/content";
import type { Project } from "@/data/content";
import ScrollReveal from "./ScrollReveal";
import ProjectModal from "./ProjectModal";

export function getTagClass(tag: string) {
  const t = tag.toLowerCase();

  if (t.includes("react") || t.includes("next") || t.includes("typescript") || t.includes("tailwind")) return "react";
  if (t.includes("electron")) return "electron";
  if (t.includes("python") || t.includes("flask") || t.includes("fastapi")) return "python";
  if (t.includes("node")) return "node";
  if (t.includes("postgre") || t.includes("prisma") || t.includes("sql") || t.includes("mongo")) return "postgresql";
  if (t.includes("tensorflow") || t.includes("pytorch") || t.includes("ml") || t.includes("isolation")) return "ml";
  if (t.includes("stripe") || t.includes("alpaca") || t.includes("websocket") || t.includes("nextauth")) return "stripe";
  if (t.includes("railway") || t.includes("jenkins") || t.includes("docker")) return "railway";
  if (t.includes("unity") || t.includes("c#") || t.includes("arcore") || t.includes("vuforia")) return "unity";

  return "default";
}

const icons: Record<string, React.ReactNode> = {
  FaPaintBrush: <FaPaintBrush className="icon" />,
  FaChartLine: <FaChartLine className="icon" />,
  FaCode: <FaCode className="icon" />,
  FaTruck: <FaTruck className="icon" />,
  FaVrCardboard: <FaVrCardboard className="icon" />,
  FaBrain: <FaBrain className="icon" />,
  FaCoffee: <FaCoffee className="icon" />,
  FaGamepad: <FaGamepad className="icon" />,
  FaRobot: <FaRobot className="icon" />,
  FaUtensils: <FaUtensils className="icon" />,
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="maxWidth">
        <h2 className="title">Projects</h2>

        <div className="serv-content">
          {projects.map((project, i) => (
            <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
              <div
                className="card tilt-card"
                onClick={() => setSelectedProject(project)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="box">
                  {icons[project.icon]}
                  <div className="text">{project.title}</div>
                  <p>{project.description}</p>
                  {project.tags && (
                    <div className="tags">
                      {project.tags.map((tag, j) => (
                        <span key={j} className={`tag ${getTagClass(tag)}`}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          icon={icons[selectedProject.icon]}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          getTagClass={getTagClass}
        />
      )}
    </section>
  );
}
