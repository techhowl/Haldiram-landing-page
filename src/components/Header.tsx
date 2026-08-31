"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const BRAND_URL = "https://www.haldirams.com";
const WHATSAPP_URL = "https://wa.me/919311916733";

/** Fire-and-forget dataLayer push; safe before GTM has loaded. */
function pushEvent(event: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event });
}

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
            GTM: the chat action carries id="button-chat" / class "button-chat"
            and pushes a `chat_with_us` dataLayer event. Its label spans are
            pointer-events-none so a click reports the anchor itself rather than
            the inner span, which is what Click ID / Click Classes read.
          */}
          {/* Labels shorten on phones so both actions still fit beside the logo */}
          <a
            id="button-chat"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => pushEvent("chat_with_us")}
            className="button-chat inline-flex items-center justify-center whitespace-nowrap rounded-full border border-burgundy px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-burgundy transition-colors duration-200 hover:bg-burgundy hover:text-cream-light sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.12em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <span className="pointer-events-none sm:hidden">Chat</span>
            <span className="pointer-events-none hidden sm:inline">Chat With Us</span>
          </a>

          <a
            href="#lead-form"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-gold/70 bg-gradient-to-b from-burgundy-light to-burgundy px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-cream-light transition-colors duration-200 hover:from-burgundy hover:to-burgundy-dark sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.12em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
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
