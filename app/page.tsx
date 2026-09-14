"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const stats = [
  { value: "1,200+", label: "Members connected" },
  { value: "18", label: "Programs each year" },
  { value: "15", label: "Community partners" },
];

const focusAreas = [
  {
    title: "Cultural pride",
    text: "Promote Edo heritage, language, celebrations, and shared identity across generations.",
  },
  {
    title: "Youth empowerment",
    text: "Support education, career development, and leadership opportunities for young professionals.",
  },
  {
    title: "Community growth",
    text: "Create spaces for networking, business collaboration, and stronger local impact.",
  },
];

const programs = [
  {
    eyebrow: "Community leadership",
    title: "Advocacy & Policy",
    text: "We bring voices together to address social, economic, and civic issues affecting Edo people in Abuja.",
  },
  {
    eyebrow: "Culture & heritage",
    title: "Heritage Celebrations",
    text: "From cultural festivals to learning events, we keep tradition alive while building belonging.",
  },
  {
    eyebrow: "Career & business",
    title: "Youth & Enterprise",
    text: "We create networking, mentorship, and growth opportunities for students, professionals, and entrepreneurs.",
  },
];

const events = [
  {
    month: "Sep",
    date: "20",
    title: "Edo Youth Leadership Forum",
    description: "A gathering of young professionals, students, and innovators discussing growth and opportunity.",
  },
  {
    month: "Oct",
    date: "05",
    title: "Abuja Edo Cultural Night",
    description: "An evening of music, food, storytelling, and cultural pride for families and friends.",
  },
  {
    month: "Nov",
    date: "18",
    title: "Business & Networking Mixer",
    description: "Meet entrepreneurs, investors, and professionals building meaningful connections.",
  },
];

const donationAmounts = ["5,000", "15,000", "25,000", "50,000"];

export default function Home() {
  const [donationOpen, setDonationOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("25000");
  const [donationMode, setDonationMode] = useState<"paystack" | "bank">("paystack");

  const bankDetails = {
    bankName: "Zenith Bank Nigeria Plc",
    accountName: "Edo Forum Abuja",
    accountNumber: "1012345678",
    sortCode: "057",
  };

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

  const handleDonationSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanValue = selectedAmount.replace(/[^\d]/g, "");
    const parsedAmount = Number(cleanValue || 0);

    if (!parsedAmount || parsedAmount < 1000) {
      window.alert("Please choose a donation amount of at least ₦1,000.");
      return;
    }

    if (donationMode === "bank") {
      window.location.href = `/donate/success?amount=${parsedAmount}`;
      return;
    }

    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    if (publicKey && typeof window !== "undefined") {
      const loadScript = (src: string) =>
        new Promise<void>((resolve, reject) => {
          const existingScript = document.querySelector(`script[src="${src}"]`);
          if (existingScript) {
            resolve();
            return;
          }

          const script = document.createElement("script");
          script.src = src;
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Unable to load payment gateway."));
          document.body.appendChild(script);
        });

      try {
        if (!(window as any).PaystackPop) {
          await loadScript("https://js.paystack.co/v1/inline.js");
        }

        const handler = (window as any).PaystackPop.setup({
          key: publicKey,
          email: "support@edoforumabuja.org",
          amount: parsedAmount * 100,
          currency: "NGN",
          ref: `EFA-${Date.now()}`,
          metadata: {
            custom_fields: [
              {
                display_name: "Donation purpose",
                variable_name: "donation_purpose",
                value: "Edo Forum Abuja community support",
              },
            ],
          },
          callback: () => {
            setDonationOpen(false);
            window.location.href = `/donate/success?amount=${parsedAmount}&payment=paystack`;
          },
          onClose: () => {
            setDonationOpen(false);
          },
        });

        handler.openIframe();
        return;
      } catch (error) {
        console.error(error);
      }
    }

    const subject = encodeURIComponent("Donation support for Edo Forum Abuja");
    const body = encodeURIComponent(
      `Hello Edo Forum Abuja, I would like to support the community with ₦${parsedAmount}. Please share the donation details.`,
    );

    window.location.href = `mailto:donations@edoforumabuja.org?subject=${subject}&body=${body}`;
    setDonationOpen(false);
  };

  return (
    <main className={styles.page}>
      <button type="button" className={styles.floatingDonationButton} onClick={() => setDonationOpen(true)}>
        Donate
      </button>

      <header data-reveal className={styles.topbar}>
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
          <a href="/about">About</a>
          <a href="/members">Members</a>
          <a href="/contact">Contact</a>
        </nav>

        <a href="/members" className={styles.primaryButton}>
          Become a Member
        </a>
      </header>

      <section data-reveal className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>A thriving Edo community in Abuja</span>
          <h1>Building belonging, opportunity, and pride for Edo people in the capital.</h1>
          <p>
            Edo Forum Abuja connects families, professionals, students, and entrepreneurs in a vibrant
            community focused on culture, leadership, and collective progress.
          </p>

          <div className={styles.heroActions}>
            <a href="/members" className={styles.primaryButton}>
              Join the community
            </a>
            <a href="/about" className={styles.secondaryButton}>
              Explore programs
            </a>
          </div>

          <div className={styles.statGrid}>
            {stats.map((item) => (
              <div key={item.label} className={styles.statCard}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.heroVisual} aria-label="Feature media showcase">
          <div className={styles.visualPanel}>
            <div className={styles.heroCollage}>
              <div className={styles.featureImageLarge}>
                <Image src="/images/member4.jpeg" alt="Edo community gathering" width={800} height={840} />
              </div>

              <div className={styles.featureStack}>
                <div className={styles.featureImageSmall}>
                  <Image src="/images/member1.jpeg" alt="Community member portrait" width={520} height={360} />
                </div>
                <div className={styles.featureImageSmall}>
                  <Image src="/images/cert1.jpeg" alt="Community recognition certificate" width={520} height={360} />
                </div>
              </div>
            </div>

            <div className={styles.videoBadge}>
              <span>Community spotlight</span>
              <strong>Abuja Edo Connect</strong>
            </div>
          </div>
        </div>
      </section>

      <section data-reveal id="about" className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Why we exist</span>
          <h2>We grow a stronger Edo presence in Abuja.</h2>
        </div>

        <div className={styles.focusGrid}>
          {focusAreas.map((area) => (
            <article key={area.title} className={styles.infoCard}>
              <div className={styles.cardIcon}>{area.title.charAt(0)}</div>
              <h3>{area.title}</h3>
              <p>{area.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section data-reveal id="programs" className={styles.sectionAlt}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Programs</span>
          <h2>Opportunities that support individuals, families, and communities.</h2>
        </div>

        <div className={styles.programGrid}>
          {programs.map((program) => (
            <article key={program.title} className={styles.programCard}>
              <p className={styles.programEyebrow}>{program.eyebrow}</p>
              <h3>{program.title}</h3>
              <p>{program.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section data-reveal className={styles.gallerySection}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Community moments</span>
          <h2>Moments of connection, culture, and progress.</h2>
        </div>
        <div className={styles.galleryGrid}>
          <div className={styles.galleryCard}>
            <Image src="/images/member2.jpeg" alt="Member community moment" width={600} height={420} />
          </div>
          <div className={styles.galleryCard}>
            <Image src="/images/member3.jpeg" alt="Edo community gathering" width={600} height={420} />
          </div>
        </div>
      </section>

      <section data-reveal id="events" className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>Upcoming events</span>
          <h2>Join the next event and meet your community.</h2>
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

      <section data-reveal id="join" className={styles.ctaSection}>
        <div>
          <span className={styles.eyebrow}>Get involved</span>
          <h2>Stand with Edo Forum Abuja and help shape a stronger future.</h2>
        </div>
        <div className={styles.ctaActions}>
          <a href="/members" className={styles.primaryButton}>
            Join members
          </a>
          <a href="/contact" className={styles.secondaryButton}>
            Contact us
          </a>
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

      {donationOpen ? (
        <div className={styles.donationModalBackdrop} onClick={() => setDonationOpen(false)}>
          <div className={styles.donationModal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.donationHeader}>
              <div>
                <p className={styles.eyebrow}>Support the mission</p>
                <h3>Invest in community impact</h3>
              </div>
              <button type="button" className={styles.closeButton} onClick={() => setDonationOpen(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleDonationSubmit} className={styles.donationForm}>
              <div className={styles.donationTabs}>
                <button
                  type="button"
                  className={donationMode === "paystack" ? styles.donationTabActive : styles.donationTab}
                  onClick={() => setDonationMode("paystack")}
                >
                  Card / Paystack
                </button>
                <button
                  type="button"
                  className={donationMode === "bank" ? styles.donationTabActive : styles.donationTab}
                  onClick={() => setDonationMode("bank")}
                >
                  Bank transfer
                </button>
              </div>

              <div className={styles.donationAmountGrid}>
                {donationAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className={selectedAmount === amount.replace(/,/g, "") ? styles.amountChipActive : styles.amountChip}
                    onClick={() => setSelectedAmount(amount.replace(/,/g, ""))}
                  >
                    ₦{amount}
                  </button>
                ))}
              </div>

              <label className={styles.donationField}>
                Custom amount
                <input
                  type="number"
                  min="1000"
                  step="1000"
                  value={selectedAmount}
                  onChange={(event) => setSelectedAmount(event.target.value)}
                />
              </label>

              {donationMode === "bank" ? (
                <div className={styles.bankInfoBox}>
                  <p>Bank: {bankDetails.bankName}</p>
                  <p>Account Name: {bankDetails.accountName}</p>
                  <p>Account Number: {bankDetails.accountNumber}</p>
                  <p>Sort Code: {bankDetails.sortCode}</p>
                </div>
              ) : null}

              <button type="submit" className={styles.primaryButton}>
                {donationMode === "bank" ? "Confirm bank transfer" : "Donate now"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
