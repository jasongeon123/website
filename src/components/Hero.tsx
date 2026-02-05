"use client";

import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { personalInfo, typingStrings } from "@/data/content";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const [particlesReady, setParticlesReady] = useState(false);
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: typingStrings,
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
      });
      return () => typed.destroy();
    }
  }, []);

  return (
    <section className="home" id="home">
      {particlesReady && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            interactivity: {
              events: { onHover: { enable: true, mode: "repulse" } },
              modes: { repulse: { distance: 100, duration: 0.4 } },
            },
            particles: {
              color: { value: "#ffffff" },
              links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.3, width: 1 },
              move: { enable: true, speed: 1.5 },
              number: { density: { enable: true }, value: 60 },
              opacity: { value: 0.3 },
              size: { value: { min: 1, max: 2 } },
            },
          }}
        />
      )}

      <div className="maxWidth">
        <div className="home-content">
          {personalInfo.available && (
            <div className="availability-badge">
              <span className="pulse"></span>
              Open to opportunities
            </div>
          )}

          <div className="text1">{greeting}, my name is</div>
          <h1 className="text2">{personalInfo.name}</h1>
          <div className="text3">
            And I&apos;m a <span ref={typedRef}></span>
          </div>

          <div className="social-links">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email">
              <FaEnvelope />
            </a>
          </div>

          <button
            className="cta-button"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Let&apos;s Work Together
          </button>
        </div>
      </div>
    </section>
  );
}
