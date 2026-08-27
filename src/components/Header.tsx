"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const BRAND_URL = "https://www.haldirams.com";
const WHATSAPP_URL = "https://wa.me/919311916733";

export default function Header() {
  return (
    <header className="relative bg-cream-light">
      <div className="mx-auto flex max-w-content items-center justify-between gap-2 px-3 py-2 sm:gap-2 sm:px-3 sm:py-2 lg:px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="shrink-0"
        >
          <a
            href={BRAND_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Haldiram's home page"
            className="inline-block"
          >
            <Image
              src="/images/hero/logo.png"
              alt="Haldiram's"
              width={160}
              height={82}
              priority
              className="h-8 w-auto sm:h-11 lg:h-12"
            />
          </a>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="flex items-center gap-2 sm:gap-3"
        >
          {/*
            GTM hooks: each action carries a stable id, a gtm-* class and a
            data-gtm attribute, and its label spans are pointer-events-none so a
            click always reports the anchor itself rather than the inner span.
          */}
          {/* Labels shorten on phones so both actions still fit beside the logo */}
          <a
            id="btn-chat-with-us"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-gtm="chat-with-us"
            className="gtm-chat-with-us inline-flex items-center justify-center whitespace-nowrap rounded-full border border-burgundy px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-burgundy transition-colors duration-200 hover:bg-burgundy hover:text-cream-light sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.12em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <span className="pointer-events-none sm:hidden">Chat</span>
            <span className="pointer-events-none hidden sm:inline">Chat With Us</span>
          </a>

          <a
            id="btn-download-brochure"
            href="#lead-form"
            data-gtm="download-brochure"
            className="gtm-download-brochure inline-flex items-center justify-center whitespace-nowrap rounded-full border border-gold/70 bg-gradient-to-b from-burgundy-light to-burgundy px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-cream-light transition-colors duration-200 hover:from-burgundy hover:to-burgundy-dark sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.12em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <span className="pointer-events-none sm:hidden">Brochure</span>
            <span className="pointer-events-none hidden sm:inline">Download Brochure</span>
          </a>
        </motion.nav>
      </div>

      <div className="h-2 bg-[#17B4D6]" />
    </header>
  );
}
