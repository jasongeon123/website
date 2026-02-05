"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { personalInfo, skills, projects } from "@/data/content";

interface HistoryEntry {
  type: "input" | "output";
  text: string;
}

const COMMANDS: Record<string, string> = {
  help: "Available commands: help, about, skills, projects, contact, ls, cd <section>, clear, exit, sudo hire geon\n  (Toggle terminal: type -+-+)",
  about:
    "Hey! I'm Geon — a software engineer who loves building things that matter. UCSD grad, ML enthusiast, and currently making 100K+ UPS drivers' lives easier. When I'm not coding, I'm probably losing at card counting (ironic, given I built a trainer for it).",
  contact: `Email: ${personalInfo.email}\nGitHub: ${personalInfo.github}\nLinkedIn: ${personalInfo.linkedin}`,
};

const SECTIONS = ["home", "about", "projects", "skills", "experience", "contact"];

function processCommand(input: string): string {
  const trimmed = input.trim().toLowerCase();

  if (trimmed === "help") return COMMANDS.help;
  if (trimmed === "about") return COMMANDS.about;
  if (trimmed === "contact") return COMMANDS.contact;

  if (trimmed === "skills") {
    return skills.map((s) => `  ${s.name}`).join("\n");
  }

  if (trimmed === "projects") {
    return projects.map((p, i) => `  ${i + 1}. ${p.title} — ${p.description}`).join("\n");
  }

  if (trimmed === "ls") {
    return SECTIONS.map((s) => `  ${s}/`).join("\n");
  }

  if (trimmed.startsWith("cd ")) {
    const target = trimmed.slice(3).trim().replace("/", "");
    if (SECTIONS.includes(target)) {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return `Navigating to ${target}... (closing terminal)`;
      }
    }
    return `cd: no such section: ${target}. Try 'ls' to see available sections.`;
  }

  if (trimmed === "sudo hire geon") {
    return "✓ Permission granted. Hiring Geon... Done!\n  Just kidding — but you should totally reach out: geonjason@gmail.com";
  }

  if (trimmed === "clear" || trimmed === "exit") return "";

  return `command not found: ${input.trim()}. Type 'help' for available commands.`;
}

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);
  const keysRef = useRef<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    // Sequence: minus, plus, minus, plus (-, =, -, =)
    const SEQUENCE = ["m", "p", "m", "p"];

    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "TEXTAREA") return;
      if (tag === "INPUT" && !(e.target as HTMLElement).classList.contains("terminal-input")) return;

      // Map both e.code and e.key to detect minus/plus reliably
      const isMinus = e.code === "Minus" || e.key === "-" || e.key === "_";
      const isPlus = e.code === "Equal" || e.key === "+" || e.key === "=";

      if (isMinus || isPlus) {
        e.preventDefault();
        keysRef.current.push(isMinus ? "m" : "p");

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => { keysRef.current = []; }, 2000);

        if (keysRef.current.length >= SEQUENCE.length) {
          const last4 = keysRef.current.slice(-4);
          if (last4.every((k, i) => k === SEQUENCE[i])) {
            keysRef.current = [];
            setIsOpen((prev) => !prev);
          }
        }
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const trimmed = currentInput.trim().toLowerCase();
    const newHistory: HistoryEntry[] = [
      ...history,
      { type: "input", text: currentInput },
    ];

    if (trimmed === "clear") {
      setHistory([]);
      setCurrentInput("");
      return;
    }

    if (trimmed === "exit") {
      setHistory([]);
      setCurrentInput("");
      close();
      return;
    }

    const output = processCommand(currentInput);

    if (trimmed.startsWith("cd ") && output.includes("closing terminal")) {
      newHistory.push({ type: "output", text: output });
      setHistory(newHistory);
      setCurrentInput("");
      setTimeout(close, 600);
      return;
    }

    if (output) {
      newHistory.push({ type: "output", text: output });
    }

    setHistory(newHistory);
    setCurrentInput("");
  }

  if (!isOpen) return null;

  return (
    <div
      className="terminal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red" onClick={close}>
              <svg viewBox="0 0 12 12"><path d="M3.5 3.5l5 5M8.5 3.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </span>
            <span className="dot yellow" onClick={close}>
              <svg viewBox="0 0 12 12"><path d="M2.5 6h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </span>
            <span className="dot green">
              <svg viewBox="0 0 12 12"><path d="M3 9L6 3l3 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
            </span>
          </div>
          <div className="terminal-title">geon@portfolio ~ bash</div>
          <div className="terminal-dots" style={{ visibility: "hidden" }}>
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>

        <div className="terminal-body" ref={bodyRef}>
          <div className="terminal-line output">
            Welcome! Type &apos;help&apos; for available commands.
          </div>
          {history.map((entry, i) => (
            <div key={i} className={`terminal-line ${entry.type}`}>
              {entry.type === "input" ? (
                <>
                  <span className="terminal-prompt">geon@portfolio:~$</span>{" "}
                  {entry.text}
                </>
              ) : (
                entry.text.split("\n").map((line, j) => (
                  <div key={j}>{line}</div>
                ))
              )}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="terminal-input-line">
            <span className="terminal-prompt">geon@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className="terminal-input"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
