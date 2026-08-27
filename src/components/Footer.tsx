"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

interface ContactPoint {
  label: string;
  phone: string;
}

const contacts: ContactPoint[] = [
  { label: "Nagpur", phone: "9370124444" },
  { label: "Corporate Office", phone: "80050 55661" },
  { label: "Maharashtra", phone: "8956272839" },
  { label: "Gujarat", phone: "8956272840" },
  { label: "Hyderabad", phone: "8956272841" },
  { label: "Bangalore", phone: "8956272842" },
];

const EMAIL = "gifting@haldirams.com";

const BRAND_URL = "https://www.haldirams.com";

interface SocialLink {
  name: string;
  href: string;
  /** 24x24 brand glyph, drawn with currentColor so it picks up the hover state */
  path: string;
}

const socials: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/haldirams_restaurants/",
    path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.846-10.405a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/HaldiramsIndiaOfficial",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@haldiramsofficial",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/919311916733",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.465 3.488",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/haldirams-foods-international-private-limited/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-cream-light">
      {/* Mirrors the cyan rule under the header so the page is book-ended */}
      <div className="h-2 bg-[#17B4D6]" />

      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
              className="mx-auto h-9 sm:h-11 w-auto"
            />
          </a>

          <h2 className="mt-4 sm:mt-6 font-canela font-normal text-burgundy text-2xl sm:text-3xl lg:text-4xl">
            Contact Us
          </h2>

          <SectionDivider className="mt-3 sm:mt-4" />
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-x-4 gap-y-5 sm:gap-x-6 sm:gap-y-6"
        >
          {contacts.map((contact) => (
            <motion.li
              key={contact.label}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              className="flex flex-col items-center gap-1"
            >
              <span className="font-latinka font-normal uppercase tracking-[0.12em] text-teal-deep/80 text-[10px] sm:text-xs">
                {contact.label}
              </span>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="font-latinka font-normal text-burgundy text-sm sm:text-base lg:text-lg hover:text-burgundy-light transition-colors duration-200 whitespace-nowrap"
              >
                {contact.phone}
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="mt-6 sm:mt-8 flex flex-col items-center gap-1"
        >
          <span className="font-latinka font-normal uppercase tracking-[0.12em] text-teal-deep/80 text-[10px] sm:text-xs">
            Email
          </span>
          <a
            href={`mailto:${EMAIL}`}
            className="font-latinka font-normal text-burgundy text-sm sm:text-base lg:text-lg hover:text-burgundy-light transition-colors duration-200 break-all"
          >
            {EMAIL}
          </a>
        </motion.p>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4"
        >
          {socials.map((social) => (
            <motion.li
              key={social.name}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
              }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-burgundy/30 text-burgundy hover:bg-burgundy hover:text-cream-light hover:border-burgundy transition-colors duration-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                >
                  <path d={social.path} />
                </svg>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </footer>
  );
}
