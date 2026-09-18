"use client";
import styles from "../page.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© 2026 Edo Forum Abuja</p>
      <div>
        <a href="/about">About</a>
        <a href="/members">Members</a>
        <a href="/contact">Contact</a>
      </div>
    </footer>
  );
}