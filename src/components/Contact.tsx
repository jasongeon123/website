"use client";

import { useState, useEffect, FormEvent } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { personalInfo } from "@/data/content";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (cooldown > 0) return;

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "36b666c1-0297-4631-868e-0a52654f7275",
          ...form,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setCooldown(60);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function updateForm(field: string, value: string) {
    setForm({ ...form, [field]: value });
  }

  return (
    <section className="contact" id="contact">
      <div className="maxWidth">
        <h2 className="title">Contact Me</h2>

        <div className="contact-content">
          <div className="column left">
            <div className="text">Get in Touch</div>
            <p>I would love feedback and things I can improve on.</p>

            <div className="icons">
              <div className="row">
                <FaUser className="icon" />
                <div className="info">
                  <div className="head">Name</div>
                  <div className="sub-title">{personalInfo.name}</div>
                </div>
              </div>
              <div className="row">
                <FaEnvelope className="icon" />
                <div className="info">
                  <div className="head">Email</div>
                  <div className="sub-title">{personalInfo.email}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="column right">
            <div className="text">Message me</div>

            {status === "success" ? (
              <div className="success-message">
                <p>Thank you! Your message has been sent.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => setStatus("idle")}
                  disabled={cooldown > 0}
                >
                  {cooldown > 0 ? `Wait ${cooldown}s` : "Send another message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="fields">
                  <div className="field name">
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={form.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                    />
                  </div>
                  <div className="field email">
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={form.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Subject"
                    required
                    value={form.subject}
                    onChange={(e) => updateForm("subject", e.target.value)}
                  />
                </div>
                <div className="field textarea">
                  <textarea
                    placeholder="Message.."
                    required
                    value={form.message}
                    onChange={(e) => updateForm("message", e.target.value)}
                  />
                </div>
                <div className="button-area">
                  <button type="submit" disabled={status === "sending" || cooldown > 0}>
                    {status === "sending" ? "Sending..." : cooldown > 0 ? `Wait ${cooldown}s` : "Send message"}
                  </button>
                </div>
                {status === "error" && (
                  <p className="error-message">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
