"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade-up" | "fade-left" | "fade-right" | "zoom-in" | "fade";
  delay?: number;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      element.classList.add("revealed");
      return;
    }

    const section = element.closest("section");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.classList.add("revealed");
            }, delay);
          } else {
            element.classList.remove("revealed");
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`scroll-reveal ${animation}`}>
      {children}
    </div>
  );
}
