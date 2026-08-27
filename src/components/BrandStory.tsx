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
      className="relative bg-gradient-to-br from-[#084147] to-[#139EAD] py-6 min-[360px]:py-10 sm:py-20 lg:py-12 overflow-hidden min-h-screen min-h-svh flex items-center"
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

      <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-10 text-center w-full">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-latinka font-normal text-cream-light text-2xl min-[360px]:text-3xl min-[400px]:text-[32px] sm:text-4xl lg:text-5xl leading-tight"
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
          className="mt-1 font-canela font-normal leading-none uppercase text-cream-light text-5xl min-[360px]:text-6xl min-[400px]:text-[68px] sm:text-[72px] tracking-wide"
        >
          Since 1937
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="mt-6 lg:mt-6 hidden md:flex items-center justify-center gap-3"
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
          className="mt-6 min-[360px]:mt-8 md:mt-8 lg:mt-6 mx-auto max-w-[1140px] flex flex-col md:grid md:grid-cols-3 items-center justify-items-center gap-3 min-[360px]:gap-4 md:gap-4 lg:gap-6"
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
              className="flex flex-row md:flex-col items-center justify-start md:justify-center gap-4 w-full max-w-[356px] md:max-w-none md:h-[168px] lg:h-[190px] xl:h-[214px] rounded-xl lg:rounded-2xl border border-white/25 bg-gradient-to-br from-white/20 via-white/5 to-white/[0.02] backdrop-blur-md px-4 py-4 min-[360px]:px-5 min-[360px]:py-5 md:px-3 md:py-0 lg:px-6 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
            >
              <Image src={feature.icon} alt="" aria-hidden="true" width={72} height={72} className="shrink-0 w-10 h-10 md:w-11 md:h-11 lg:w-14 lg:h-14 xl:w-[72px] xl:h-[72px]" />
              <h3 className="font-latinka font-light text-cream-light text-left md:text-center text-[13px] min-[360px]:text-sm md:text-[13px] lg:text-base xl:text-[20px] leading-snug uppercase tracking-[0.12em] md:tracking-wide">
                <span className="md:hidden">{feature.titleLines.join(" ")}</span>
                <span className="hidden md:block">
                  {feature.titleLines[0]}
                  <br />
                  {feature.titleLines[1]}
                </span>
              </h3>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-6 min-[360px]:mt-8 md:mt-10 lg:mt-8"
        >
          <a href="#hero" className="block w-full max-w-[356px] mx-auto md:inline-block md:w-auto md:max-w-none">
            <CTAButton
              variant="gold"
              type="button"
              className="w-full md:w-auto rounded-xl !px-4 !py-3 min-[360px]:!py-4 !text-sm min-[360px]:!text-base md:!px-8 md:!py-3 md:!text-sm"
            >
              Get Quote
            </CTAButton>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
