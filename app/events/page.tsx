import styles from "../page.module.css";

const events = [
  {
    month: "Sep",
    date: "20",
    title: "Edo Youth Leadership Forum",
    description: "A major gathering for young leaders, students, and professionals to discuss opportunity, innovation, and civic responsibility.",
  },
  {
    month: "Oct",
    date: "05",
    title: "Abuja Edo Cultural Night",
    description: "A celebration of Edo heritage through music, food, storytelling, fashion, and community fellowship.",
  },
  {
    month: "Nov",
    date: "18",
    title: "Business & Networking Mixer",
    description: "Meet entrepreneurs, professionals, and community stakeholders to build collaborations and new partnerships.",
  },
  {
    month: "Dec",
    date: "10",
    title: "Family Community Day",
    description: "A joyful day of fun, connection, and intergenerational bonding for members and their families.",
  },
];

export default function EventsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.brandWrap}>
          <div className={styles.brandMark}>E</div>
          <div>
            <p className={styles.brandName}>Edo Forum Abuja</p>
            <span className={styles.tagline}>Unity • Culture • Progress</span>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/events">Events</a>
          <a href="/contact">Contact</a>
        </nav>

        <a href="/contact" className={styles.primaryButton}>
          Reserve a spot
        </a>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Upcoming events</span>
          <h2>Join meaningful experiences that strengthen community ties.</h2>
        </div>

        <div className={styles.eventGrid}>
          {events.map((event) => (
            <article key={event.title} className={styles.eventCard}>
              <div className={styles.dateBox}>
                <span>{event.month}</span>
                <strong>{event.date}</strong>
              </div>
              <div className={styles.eventBody}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>How to participate</span>
          <h2>Be part of the next gathering and meet your network.</h2>
        </div>
        <div className={styles.programGrid}>
          <article className={styles.programCard}>
            <p className={styles.programEyebrow}>Step 1</p>
            <h3>Register</h3>
            <p>Let us know you are attending and any accessibility or support needs.</p>
          </article>
          <article className={styles.programCard}>
            <p className={styles.programEyebrow}>Step 2</p>
            <h3>Attend</h3>
            <p>Join the conversation, connect with new people, and enjoy the experience.</p>
          </article>
          <article className={styles.programCard}>
            <p className={styles.programEyebrow}>Step 3</p>
            <h3>Follow up</h3>
            <p>Stay connected with us after the event through future opportunities and updates.</p>
          </article>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© 2026 Edo Forum Abuja</p>
        <div>
          <a href="/about">About</a>
          <a href="/events">Events</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </main>
  );
}
