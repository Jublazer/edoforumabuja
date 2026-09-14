"use client";

import Image from "next/image";
import { useEffect } from "react";
import styles from "../page.module.css";

const memberships = [
  {
    title: "Community Member",
    price: "₦5,000",
    perks: ["Member newsletter", "Event updates", "Community access"],
  },
  {
    title: "Supporter Circle",
    price: "₦15,000",
    perks: ["Everything in Community Member", "Priority event invites", "Mentorship access"],
  },
  {
    title: "Patron Partner",
    price: "₦50,000",
    perks: ["Everything in Supporter Circle", "Leadership recognition", "Impact reporting"],
  },
];

const donations = [
  { title: "Education Fund", amount: "₦10,000", text: "Support youth scholarships, learning materials, and mentorship opportunities." },
  { title: "Community Relief", amount: "₦25,000", text: "Help provide emergency support and direct assistance to families in need." },
  { title: "Cultural Heritage", amount: "₦50,000", text: "Fund events, heritage showcases, and cultural preservation activities." },
];

const memberPhotos = [
  "/images/member1.jpeg",
  "/images/member2.jpeg",
  "/images/member3.jpeg",
  "/images/member4.jpeg",
];

export default function MembersPage() {
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

        <a href="/contact" className={styles.primaryButton}>
          Become a member
        </a>
      </header>

      <section data-reveal className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Membership</span>
          <h2>Join a community designed for growth, connection, and impact.</h2>
        </div>

        <div className={styles.memberShowcase}>
          <div className={styles.showcaseText}>
            <p className={styles.programEyebrow}>Why join?</p>
            <h3>Access a network built for leaders, families, and future changemakers.</h3>
            <p>From learning and advocacy to professional opportunities and cultural pride, members help one another thrive.</p>
          </div>
          <div className={styles.showcaseImageWrap}>
            <Image src="/images/member4.jpeg" alt="Edo Forum Abuja members" width={700} height={500} />
          </div>
        </div>

        <div className={styles.programGrid}>
          {memberships.map((tier) => (
            <article key={tier.title} className={styles.programCard}>
              <p className={styles.programEyebrow}>{tier.price}</p>
              <h3>{tier.title}</h3>
              <ul className={styles.benefitList}>
                {tier.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section data-reveal className={styles.sectionAlt}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Community gallery</span>
          <h2>Meet the people making this movement stronger every day.</h2>
        </div>

        <div className={styles.memberPhotoGrid}>
          {memberPhotos.map((src, index) => (
            <div key={src} className={styles.memberPhotoCard}>
              <Image src={src} alt={`Member highlight ${index + 1}`} width={600} height={420} />
            </div>
          ))}
        </div>
      </section>

      <section data-reveal className={styles.sectionAlt}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Support the mission</span>
          <h2>Make a direct contribution to initiatives that create lasting outcomes.</h2>
        </div>

        <div className={styles.programGrid}>
          {donations.map((donation) => (
            <article key={donation.title} className={styles.programCard}>
              <p className={styles.programEyebrow}>{donation.amount}</p>
              <h3>{donation.title}</h3>
              <p>{donation.text}</p>
              <a href="/contact" className={styles.secondaryButton}>Donate now</a>
            </article>
          ))}
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
