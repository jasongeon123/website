"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/content";

function parseStat(number: string): { target: number; suffix: string } {
  const match = number.match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: "" };
  return { target: parseInt(match[1], 10), suffix: match[2] };
}

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const rafRef = useRef<number>(0);

  const parsed = stats.map((s) => parseStat(s.number));
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    parsed.map(() => 0)
  );

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

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    let start: number | null = null;

    function animate(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues(parsed.map((p) => Math.round(eased * p.target)));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [isVisible]);

  return (
    <div className="stats-section" ref={sectionRef}>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`stat-item ${isVisible ? "animate" : ""}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="stat-number">
              {animatedValues[index]}
              {parsed[index].suffix}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
