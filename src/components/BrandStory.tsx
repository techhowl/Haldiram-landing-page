"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

interface Feature {
  icon: string;
  titleLines: [string, string];
}

const features: Feature[] = [
  {
    icon: "/images/icons/express-delivery 1.png",
    titleLines: ["Delivering", "Pan India"],
  },
  {
    icon: "/images/icons/discount 1.png",
    titleLines: ["Special Discounts", "on Bulk Orders"],
  },
  {
    icon: "/images/icons/gift (1) 1.png",
    titleLines: ["Wide Range of Hampers", "for Every Need"],
  },
];

export default function BrandStory() {
  return (
    <section
      id="brand-story"
      className="relative bg-gradient-to-br from-[#084147] to-[#139EAD] py-16 sm:py-20 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-y-0 left-0 w-28 sm:w-40 lg:w-56 opacity-25"
        style={{
          backgroundImage: "url('/images/patterns/blue.png')",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
          backgroundPosition: "top center",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-y-0 right-0 w-28 sm:w-40 lg:w-56 opacity-25"
        style={{
          backgroundImage: "url('/images/patterns/blue.png')",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
          backgroundPosition: "top center",
        }}
      />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-latinka font-normal text-cream-light text-3xl sm:text-4xl lg:text-5xl leading-tight"
        >
          At the heart of
          <br />
          every celebration
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="mt-0 font-canela font-normal leading-none uppercase text-cream-light text-[72px] tracking-wide"
        >
          Since 1937
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-3"
          aria-hidden="true"
        >
          <span className="h-0 w-full max-w-[220px] border-t border-dashed border-[#9fe3ec]/60" />
          <span className="text-[#9fe3ec]/80 text-base">✦</span>
          <span className="h-0 w-full max-w-[220px] border-t border-dashed border-[#9fe3ec]/60" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.titleLines.join(" ")}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              whileHover={{ scale: 1.04, y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col items-center justify-center gap-4 w-[356px] h-[214px] rounded-2xl border border-white/25 bg-gradient-to-br from-white/20 via-white/5 to-white/[0.02] backdrop-blur-md px-6 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
            >
              <Image src={feature.icon} alt="" aria-hidden="true" width={72} height={72} className="w-16 h-16 sm:w-[72px] sm:h-[72px]" />
              <h3 className="font-latinka font-light text-cream-light text-[20px] leading-snug uppercase tracking-wide">
                {feature.titleLines[0]}
                <br />
                {feature.titleLines[1]}
              </h3>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-12"
        >
          <a href="#hero">
            <CTAButton variant="gold" type="button" className="rounded-xl">
              Get Quote
            </CTAButton>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
