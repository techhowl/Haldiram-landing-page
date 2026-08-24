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
    image: "/images/hampers/employee-gifting-hampers.svg",
    href: "#employee-gifting",
  },
  {
    title: "Special Partners & Clients Gifting Hampers",
    image: "/images/hampers/partners-clients-gifting-hampers.svg",
    href: "#partners-clients-gifting",
  },
  {
    title: "Personal Festive Hampers",
    image: "/images/hampers/personal-festive-hampers.svg",
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

          <div className="mt-4 flex justify-center">
            <span className="inline-block bg-burgundy text-cream-light font-latinka font-normal text-lg sm:text-xl lg:text-2xl px-8 py-3 sm:px-10 sm:py-4 rounded-2xl">
              Hampers to celebrate every connection.
            </span>
          </div>

          <SectionDivider className="mt-8 mb-2" />
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6">
          {hamperCategories.map((category) => (
            <motion.a
              key={category.title}
              href={category.href}
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
                <div className="absolute bottom-0 left-0 right-0 bg-[#FFD279] text-burgundy text-sm sm:text-base font-semibold uppercase tracking-wide leading-snug py-4 px-5">
                  {category.title}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
