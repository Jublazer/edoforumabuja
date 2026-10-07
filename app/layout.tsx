import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.edoindigenousforumfct.com"),
  title: {
    default: "Edo Indigenous Forum Abuja | Culture, Community & Progress",
    template: "%s | Edo Indigenous Forum Abuja",
  },
  description:
    "Edo Indigenous Forum Abuja (Edo Indigenous Forum FCT Abuja) brings Edo people together to celebrate heritage, strengthen community, and create opportunities in Abuja, Nigeria.",
  applicationName: "Edo Indigenous Forum Abuja",
  authors: [{ name: "Edo Indigenous Forum FCT Abuja" }],
  publisher: "Edo Indigenous Forum FCT Abuja",
  keywords: [
    "Edo Indigenous Forum Abuja",
    "Edo Indigenous Forum FCT Abuja",
    "Edo community in Abuja",
    "Edo culture and heritage",
    "Edo people in Nigeria",
    "Abuja community events",
    "Edo youth empowerment",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Edo Indigenous Forum Abuja",
    title: "Edo Indigenous Forum Abuja | Culture, Community & Progress",
    description:
      "A united Edo community in Abuja celebrating heritage, supporting progress, and creating opportunities for all generations.",
    url: "/",
    images: [{ url: "/images/logo.jpeg", alt: "Edo Indigenous Forum Abuja logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edo Indigenous Forum Abuja | Culture, Community & Progress",
    description:
      "A united Edo community in Abuja celebrating heritage, supporting progress, and creating opportunities for all generations.",
    images: [{ url: "/images/logo.jpeg", alt: "Edo Indigenous Forum Abuja logo" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/logo.jpeg", type: "image/jpeg" },
    ],
    shortcut: "/images/logo.jpeg",
    apple: "/images/logo.jpeg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
