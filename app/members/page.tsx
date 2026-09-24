"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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

const executiveMembers = [
  { image: "/images/1.jpeg", name: "Dr. M. K. Moh'd Alokhose", role: "President", order: 1 },
  { image: "/images/7.jpeg", name: "Engr. Solomon Osazuwa", role: "Vice President", order: 2 },
  { image: "/images/8.jpeg", name: "James Femi Emmanuel", role: "General Secretary", order: 3 },
  { image: "/images/2.jpeg", name: "Usman Deeyat (Excellent)", role: "Publicity Secretary / Media", order: 4 },
  { image: "/images/4.jpeg", name: "Engr. John Eshofosimeh Sunday", role: "Organizing Secretary", order: 5 },
  { image: "/images/5.jpeg", name: "Pst. Ayo Aljanatu", role: "Assistant Secretary", order: 6 },
  { image: "/images/3.jpeg", name: "Victor Ofure", role: "Provost", order: 7 },
  { image: "/images/6.jpeg", name: "Hon. Johnson Olatunde Ayo", role: "Legal Adviser", order: 8 },
  { image: "/images/10.jpeg", name: "Madam Success", role: "Financial Secretary", order: 9 },
  { image: "/images/9.jpeg", name: "Fabia", role: "Mobilization Officer", order: 10 },
  { image: "/images/11.jpeg", name: "", role: "Organizing President", order: 11 },
].sort((a, b) => a.order - b.order);

const donationAmounts = ["5000", "15000", "25000", "50000"];

export default function MembersPage() {
  const [donationOpen, setDonationOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("25000");
  const [donationMode, setDonationMode] = useState<"paystack" | "bank">("paystack");
  const [isProcessing, setIsProcessing] = useState(false);

  const bankDetails = {
    bankName: "Zenith Bank Nigeria Plc",
    accountName: "Edo Forum Abuja",
    accountNumber: "1012345678",
    sortCode: "057",
  };

  const handleDonationSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanValue = selectedAmount.replace(/[^\d]/g, "");
    const parsedAmount = Number(cleanValue || 0);

    if (!parsedAmount || parsedAmount < 1000) {
      window.alert("Please choose a donation amount of at least ₦1,000.");
      return;
    }

    if (donationMode === "bank") {
      setDonationOpen(false);
      window.location.href = `/donate/success?amount=${parsedAmount}&payment=bank`;
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
        setIsProcessing(true);

        if (!(window as any).PaystackPop) {
          await loadScript("https://js.paystack.co/v1/inline.js");
        }

        const reference = `EFA-${Date.now()}`;
        const handler = (window as any).PaystackPop.setup({
          key: publicKey,
          email: "support@edoforumabuja.org",
          amount: parsedAmount * 100,
          currency: "NGN",
          ref: reference,
          metadata: {
            custom_fields: [
              {
                display_name: "Donation purpose",
                variable_name: "donation_purpose",
                value: "Edo Forum Abuja community support",
              },
            ],
          },
          callback: async (response: { reference?: string }) => {
            try {
              const verifyResponse = await fetch("/api/donate/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  reference: response.reference,
                  amount: parsedAmount,
                  email: "support@edoforumabuja.org",
                }),
              });

              const verifyData = await verifyResponse.json();

              if (!verifyResponse.ok || !verifyData.success) {
                throw new Error(verifyData.error || "Payment verification failed.");
              }

              setDonationOpen(false);
              window.location.href = `/donate/success?amount=${parsedAmount}&payment=paystack&reference=${encodeURIComponent(response.reference || reference)}`;
            } catch (error) {
              console.error(error);
              window.alert("We could not confirm your donation. Please contact donations@edoforumabuja.org for support.");
              setDonationOpen(false);
            } finally {
              setIsProcessing(false);
            }
          },
          onClose: () => {
            setDonationOpen(false);
            setIsProcessing(false);
          },
        });

        handler.openIframe();
        return;
      } catch (error) {
        console.error(error);
        setIsProcessing(false);
      }
    }

    const subject = encodeURIComponent("Donation support for Edo Forum Abuja");
    const body = encodeURIComponent(
      `Hello Edo Forum Abuja, I would like to support the community with ₦${parsedAmount}. Please share the donation details.`,
    );

    window.location.href = `mailto:donations@edoforumabuja.org?subject=${subject}&body=${body}`;
    setDonationOpen(false);
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
          <span className={styles.eyebrow}>Executive committee</span>
          <h2>Meet the leadership guiding Edo Forum Abuja.</h2>
        </div>

        <div className={styles.executiveGrid}>
          {executiveMembers.map((member) => (
            <article key={member.name} className={styles.executiveCard}>
              <div className={styles.executiveImageWrap}>
                <Image src={member.image} alt={member.name} width={600} height={420} />
              </div>
              <div className={styles.executiveInfo}>
                <span className={styles.executiveRole}>{member.role}</span>
                <h3>{member.name}</h3>
              </div>
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
              <button type="button" className={styles.secondaryButton} onClick={() => setDonationOpen(true)}>
                Donate now
              </button>
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
                    className={selectedAmount === amount ? styles.amountChipActive : styles.amountChip}
                    onClick={() => setSelectedAmount(amount)}
                  >
                    ₦{Number(amount).toLocaleString()}
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

              <button type="submit" className={styles.primaryButton} disabled={isProcessing}>
                {isProcessing
                  ? "Processing..."
                  : donationMode === "bank"
                    ? "Confirm bank transfer"
                    : "Donate now"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
