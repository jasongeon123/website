"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { FaEye, FaDownload, FaTimes } from "react-icons/fa";

export default function ResumePreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, close]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/images/resume.pdf";
    link.download = "resume.pdf";
    link.click();
  };

  const modal = isOpen ? (
    <div
      className="resume-modal-overlay"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Resume preview"
    >
      <div className="resume-modal" onClick={(e) => e.stopPropagation()}>
        <div className="resume-modal-header">
          <h3>Resume</h3>
          <div className="resume-modal-actions">
            <a href="/images/resume.pdf" download className="download-btn">
              <FaDownload /> Download
            </a>
            <button className="close-btn" onClick={close} aria-label="Close">
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="resume-modal-body">
          <iframe
            src="/images/resume.pdf"
            title="Resume"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className="btn-group">
        <button type="button" className="btn btn-outline" onClick={() => setIsOpen(true)}>
          <FaEye />
          View Resume
        </button>
        <button type="button" className="btn btn-primary" onClick={handleDownload}>
          <FaDownload />
          Download CV
        </button>
      </div>
      {mounted && modal && createPortal(modal, document.body)}
    </>
  );
}
