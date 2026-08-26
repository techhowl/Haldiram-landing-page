import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const GTM_ID = "GTM-W5MQ7WDJ";
const META_PIXEL_ID = "1078060101579921";
const LINKEDIN_PARTNER_ID = "10784833";

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
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body
        className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${latinka.variable} ${canela.variable} font-sans antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Meta Pixel Code */}
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            alt=""
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>

        {/* LinkedIn Insight Tag */}
        <Script id="linkedin-insight-init" strategy="afterInteractive">
          {`_linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            alt=""
            style={{ display: "none" }}
            src={`https://px.ads.linkedin.com/collect/?pid=${LINKEDIN_PARTNER_ID}&fmt=gif`}
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
