"use client";

import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isSticky ? "sticky" : ""}`}>
      <div className="maxWidth">
        <div id="logo">
          <a href="#home">
            &lt;<span>GY</span> /&gt;
          </a>
        </div>

        <ul className={`menu ${menuOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <ThemeToggle />
          <div className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
    </nav>
  );
}
