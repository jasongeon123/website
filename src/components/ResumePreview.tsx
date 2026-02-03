"use client";

import { useState } from "react";
import { FaEye, FaDownload, FaTimes } from "react-icons/fa";

export default function ResumePreview() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/images/resume.pdf";
    link.download = "resume.pdf";
    link.click();
  };

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

      {isOpen && (
        <div className="resume-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="resume-modal" onClick={(e) => e.stopPropagation()}>
            <div className="resume-modal-header">
              <h3>Resume</h3>
              <div className="resume-modal-actions">
                <a href="/images/resume.pdf" download className="download-btn">
                  <FaDownload /> Download
                </a>
                <button className="close-btn" onClick={() => setIsOpen(false)}>
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
      )}
    </>
  );
}
