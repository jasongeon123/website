"use client";

import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const sections = ["home", "about", "projects", "skills", "experience", "contact"];

export default function SectionNavigator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollPosition >= section.offsetTop) {
          setCurrentIndex(i);
          break;
        }
      }

      setIsAtBottom(currentIndex >= sections.length - 1);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentIndex]);

  const handleClick = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
      const nextSection = document.getElementById(sections[nextIndex]);
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <button
      className={`section-nav-btn ${isAtBottom ? "at-bottom" : ""}`}
      onClick={handleClick}
      aria-label={isAtBottom ? "Back to top" : "Next section"}
    >
      {isAtBottom ? <FaChevronUp /> : <FaChevronDown />}
    </button>
  );
}
