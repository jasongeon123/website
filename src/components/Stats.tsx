"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/content";

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="stats-section" ref={sectionRef}>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-item ${isVisible ? "animate" : ""}`} style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
