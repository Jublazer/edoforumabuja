import Link from "next/link";
import styles from "../../page.module.css";

export default function DonationSuccessPage({
  searchParams,
}: {
  searchParams?: { amount?: string; payment?: string };
}) {
  const amount = searchParams?.amount ? Number(searchParams.amount) : 0;
  const paymentMethod = searchParams?.payment === "paystack" ? "Paystack" : "Bank transfer";

  return (
    <main className={styles.successPage}>
      <div className={styles.successCard}>
        <p className={styles.eyebrow}>Thank you</p>
        <h1>Your contribution matters.</h1>
        <p>
          We are grateful for your generosity and support for Edo Forum Abuja. Your donation will help us
          strengthen community programs, youth opportunities, and cultural initiatives across Abuja.
        </p>

        <div className={styles.successGrid}>
          <div className={styles.successMeta}>
            <strong>Donation amount</strong>
            <span>₦{amount.toLocaleString("en-NG")}</span>
          </div>
          <div className={styles.successMeta}>
            <strong>Payment method</strong>
            <span>{paymentMethod}</span>
          </div>
        </div>

        <div className={styles.heroActions} style={{ marginTop: 28 }}>
          <Link href="/" className={styles.primaryButton}>
            Return home
          </Link>
          <Link href="/members" className={styles.secondaryButton}>
            Explore membership
          </Link>
        </div>
      </div>
    </main>
  );
}
