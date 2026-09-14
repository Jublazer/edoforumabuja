"use client";

import Image from "next/image";
import { useEffect } from "react";
import styles from "../page.module.css";

const values = [
  {
    title: "Our mission",
    text: "To build a united and empowered Edo community in Abuja that celebrates culture, supports progress, and creates opportunities for all generations.",
  },
  {
    title: "Our values",
    text: "We are guided by unity, integrity, service, and a belief that collective action can transform lives and communities.",
  },
  {
    title: "Our impact",
    text: "Through networking, advocacy, and cultural engagement, we help members discover purpose, connection, and practical support.",
  },
];

const certImages = ["/images/cert1.jpeg", "/images/cert2.jpeg", "/images/cert3.jpeg"];

export default function AboutPage() {
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

        <a href="/members" className={styles.primaryButton}>
          Join us
        </a>
      </header>

      <section data-reveal id="about" className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>About us</span>
          <h2>We are a community shaped by heritage, service, and ambition.</h2>
        </div>
        <div className={styles.focusGrid}>
          {values.map((item) => (
            <article key={item.title} className={styles.infoCard}>
              <div className={styles.cardIcon}>{item.title.charAt(0)}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section data-reveal className={styles.sectionAlt}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Recognition</span>
          <h2>Milestones, awards, and community impact we are proud of.</h2>
        </div>
        <div className={styles.certGrid}>
          {certImages.map((src, index) => (
            <div key={src} className={styles.certCard}>
              <Image src={src} alt={`Certificate ${index + 1}`} width={600} height={420} />
            </div>
          ))}
        </div>
      </section>

      <section data-reveal id="programs" className={styles.sectionAlt}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Programs</span>
          <h2>Opportunities that support individuals, families, and communities.</h2>
        </div>
        <div className={styles.programGrid}>
          <article className={styles.programCard}>
            <p className={styles.programEyebrow}>Support</p>
            <h3>For members</h3>
            <p>From family and social support to professional referrals and leadership opportunities, we care about real-world needs.</p>
          </article>
          <article className={styles.programCard}>
            <p className={styles.programEyebrow}>Representation</p>
            <h3>For the diaspora</h3>
            <p>We help Edo people in Abuja represent their identity with confidence while building stronger ties across generations.</p>
          </article>
          <article className={styles.programCard}>
            <p className={styles.programEyebrow}>Legacy</p>
            <h3>For future leaders</h3>
            <p>We invest in mentoring, youth engagement, and community values that help our next generation lead with purpose.</p>
          </article>
        </div>
      </section>

      <section data-reveal id="events" className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Events</span>
          <h2>Join meaningful experiences that strengthen community ties.</h2>
        </div>
        <div className={styles.eventGrid}>
          <article className={styles.eventCard}>
            <div className={styles.dateBox}>
              <span>Sep</span>
              <strong>20</strong>
            </div>
            <div className={styles.eventBody}>
              <h3>Edo Youth Leadership Forum</h3>
              <p>A major gathering for young leaders, students, and professionals to discuss opportunity, innovation, and civic responsibility.</p>
            </div>
          </article>
          <article className={styles.eventCard}>
            <div className={styles.dateBox}>
              <span>Oct</span>
              <strong>05</strong>
            </div>
            <div className={styles.eventBody}>
              <h3>Abuja Edo Cultural Night</h3>
              <p>A celebration of Edo heritage through music, food, storytelling, fashion, and community fellowship.</p>
            </div>
          </article>
          <article className={styles.eventCard}>
            <div className={styles.dateBox}>
              <span>Nov</span>
              <strong>18</strong>
            </div>
            <div className={styles.eventBody}>
              <h3>Business & Networking Mixer</h3>
              <p>Meet entrepreneurs, professionals, and community stakeholders to build collaborations and new partnerships.</p>
            </div>
          </article>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© 2026 Edo Forum Abuja</p>
        <div>
          <a href="/about">About</a>
          <a href="/members">Members</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </main>
  );
}
