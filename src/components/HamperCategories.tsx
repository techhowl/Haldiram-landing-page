"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";
import AnimatedFromTo from "./AnimatedFromTo";

interface HamperCategory {
  title: string;
  image: string;
  href: string;
}

const hamperCategories: HamperCategory[] = [
  {
    title: "Employee Gifting Hampers",
    image: "/images/hero/section2-1.png",
    href: "#employee-gifting",
  },
  {
    title: "Special Partners & Clients Gifting Hampers",
    image: "/images/hero/section2-2.png",
    href: "#partners-clients-gifting",
  },
  {
    title: "Personal Festive Hampers",
    image: "/images/hero/section2-3.png",
    href: "#personal-festive",
  },
];

export default function HamperCategories() {
  return (
    <section id="hamper-categories" className="relative bg-cream-light py-16 sm:py-20 overflow-hidden">
      {/* Decorative half-mandala motifs bleeding flush from the left/right edges */}
      <Image
        src="/images/patterns/mand-left.webp"
        alt=""
        aria-hidden="true"
        width={945}
        height={1870}
        className="hidden sm:block pointer-events-none select-none absolute left-0 top-1/2 -translate-y-1/2 w-[220px] sm:w-[280px] lg:w-[340px] h-auto opacity-60"
      />
      <Image
        src="/images/patterns/mand-right.webp"
        alt=""
        aria-hidden="true"
        width={945}
        height={1870}
        className="hidden sm:block pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 w-[220px] sm:w-[280px] lg:w-[340px] h-auto opacity-60"
      />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-10">
        <div className="text-center">
          <AnimatedFromTo />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="mt-4 flex justify-center"
          >
            <span className="inline-block whitespace-normal sm:whitespace-nowrap text-center bg-burgundy text-cream-light font-latinka font-normal text-base leading-snug sm:text-3xl lg:text-4xl px-5 py-3 sm:px-12 sm:py-5 rounded-2xl max-w-[92vw] sm:max-w-none">
              Hampers to celebrate every connection.
            </span>
          </motion.div>

          <SectionDivider className="mt-8 mb-2" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6"
        >
          {hamperCategories.map((category) => (
            <motion.a
              key={category.title}
              href={category.href}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group block rounded-2xl overflow-hidden shadow-card focus-visible:outline-2 focus-visible:outline-gold"
            >
              <div className="relative w-full aspect-[4/5] bg-cream-dark">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 flex items-center min-h-[76px] sm:min-h-[88px] bg-[#FFD279] text-burgundy text-sm sm:text-base font-semibold uppercase tracking-wide leading-snug py-4 px-5">
                  {category.title}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
