"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { personalInfo, skills, projects } from "@/data/content";

interface HistoryEntry {
  type: "input" | "output";
  text: string;
}

const COMMANDS: Record<string, string> = {
  help: "Available commands: help, about, skills, projects, contact, ls, cd <section>, clear, exit, sudo hire geon\n  (Toggle terminal: Ctrl+Shift+T)",
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

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.ctrlKey && e.shiftKey && e.key === "T") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
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
            <span className="dot red" onClick={close} />
            <span className="dot yellow" />
            <span className="dot green" />
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
