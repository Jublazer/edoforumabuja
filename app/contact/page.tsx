"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const whatsappLink =
    process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK || "https://wa.me/2348066364741?text=Hello%20Edo%20Forum%20Abuja";

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your message.");
      }

      setStatus("success");
      setMessage("Your message has been sent successfully. We will reach out soon.");
      form.reset();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unable to send your message.";
      setStatus("error");
      setMessage(errorMessage);
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.brandWrap}>
          <div className={styles.brandLogoWrap}>
            <Image src="/images/logo.jpeg" alt="Edo Forum Abuja logo" width={44} height={44} />
          </div>
          <div>
            <p className={styles.brandName}>Edo Forum Abuja</p>
            <span className={styles.tagline}>Unity • Culture • Progress</span>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/members">Members</a>
          <a href="/contact">Contact</a>
        </nav>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="mailto:hello@edoforumabuja.org" className={styles.primaryButton}>
            Email us
          </a>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className={styles.secondaryButton}>
            WhatsApp group
          </a>
        </div>
      </header>

      <section data-reveal className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Contact</span>
          <h2>Reach out and get connected with the community.</h2>
        </div>

        <div className={styles.programGrid}>
          <article className={styles.programCard}>
            <p className={styles.programEyebrow}>Email</p>
            <h3>hello@edoforumabuja.org</h3>
            <p>For partnerships, membership requests, and event inquiries.</p>
          </article>
          <article className={styles.programCard}>
            <p className={styles.programEyebrow}>Phone</p>
            <h3>+234 806 636 4741</h3>
            <p>Speak with the team to learn how to get involved and support the community.</p>
          </article>
          <article className={styles.programCard}>
            <p className={styles.programEyebrow}>Location</p>
            <h3>Abuja, Nigeria</h3>
            <p>We host meetups, networking sessions, and cultural gatherings across the capital.</p>
          </article>
        </div>
      </section>

      <section data-reveal className={styles.sectionAlt}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Send a message</span>
          <h2>We would love to hear from you.</h2>
        </div>

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <label>
              Full name
              <input type="text" name="name" placeholder="Your name" required />
            </label>
            <label>
              Email address
              <input type="email" name="email" placeholder="you@example.com" required />
            </label>
          </div>
          <label>
            Subject
            <input type="text" name="subject" placeholder="How can we help?" required />
          </label>
          <label>
            Message
            <textarea name="message" rows={5} placeholder="Tell us more about your interest..." required />
          </label>
          <button type="submit" className={styles.primaryButton} disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send message"}
          </button>
          {message ? (
            <p className={status === "success" ? styles.successText : styles.errorText}>{message}</p>
          ) : null}
        </form>
      </section>
      <div>
        
        <Footer />
      </div>
    </main>
  );
}
