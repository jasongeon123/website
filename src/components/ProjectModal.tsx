"use client";

import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import type { Project } from "@/data/content";

interface ProjectModalProps {
  project: Project;
  icon: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  getTagClass: (tag: string) => string;
}

export default function ProjectModal({
  project,
  icon,
  isOpen,
  onClose,
  getTagClass,
}: ProjectModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cs = project.caseStudy;

  return (
    <div
      className="project-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="project-modal">
        <div className="project-modal-header">
          <div className="project-modal-title">
            {icon}
            <h3>{project.title}</h3>
          </div>
          <button className="project-modal-close" onClick={onClose} aria-label="Close">
            <FaTimes />
          </button>
        </div>

        <div className="project-modal-body">
          <p className="project-modal-description">{project.description}</p>

          {cs && (
            <>
              <div className="project-modal-section">
                <h4>Problem</h4>
                <p>{cs.problem}</p>
              </div>

              <div className="project-modal-section">
                <h4>Solution</h4>
                <p>{cs.solution}</p>
              </div>

              <div className="project-modal-section">
                <h4>Key Features</h4>
                <ul>
                  {cs.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="project-modal-section">
                <h4>Outcome</h4>
                <p>{cs.outcome}</p>
              </div>
            </>
          )}

          {project.tags && (
            <div className="project-modal-tags">
              {project.tags.map((tag, j) => (
                <span key={j} className={`tag ${getTagClass(tag)}`}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {project.link && (
          <div className="project-modal-footer">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-modal-link"
            >
              View Live Project
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
