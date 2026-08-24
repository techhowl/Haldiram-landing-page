import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const latinka = localFont({
  src: [
    { path: "../fonts/Latinka-Light.ttf", weight: "300" },
    { path: "../fonts/Latinka-Regular.ttf", weight: "400" },
  ],
  variable: "--font-latinka",
  display: "swap",
});

const canela = localFont({
  src: "../fonts/Canela-Regular-Trial.otf",
  weight: "400",
  variable: "--font-canela",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://hampers.haldiram.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Festive Gifting Hampers by Haldiram's | Premium Corporate & Personal Hampers",
  description:
    "Discover Haldiram's festive gifting hampers — from employee and corporate gifting to personal celebrations. Premium Indian sweets, dry fruits, and wellness hampers delivered pan-India since 1937.",
  keywords: [
    "Haldiram's hampers",
    "festive gifting hampers",
    "corporate gift hampers",
    "Diwali hampers",
    "dry fruit hampers",
    "employee gifting",
  ],
  openGraph: {
    title: "Festive Gifting Hampers by Haldiram's",
    description:
      "Premium festive hampers for every celebration — from professional gifting to personal indulgence. Get a custom quote today.",
    url: siteUrl,
    siteName: "Haldiram's Gifting Hampers",
    images: [
      {
        url: "/images/hero/hero-hamper-box.svg",
        width: 1200,
        height: 900,
        alt: "Haldiram's festive gifting hamper box",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Festive Gifting Hampers by Haldiram's",
    description:
      "Premium festive hampers for every celebration. From professional to personal — explore the range and get a quote.",
    images: ["/images/hero/hero-hamper-box.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d3b3e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${latinka.variable} ${canela.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
