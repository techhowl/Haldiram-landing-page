"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CTAButton from "./CTAButton";
import LeadForm from "./LeadForm";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay },
  }),
};

export default function Hero() {
  return (
    <section id="hero" className="relative isolate bg-teal-deep overflow-hidden">
      {/*
        The banner is sized to the source photo's exact aspect ratio
        (5760x3400) at every breakpoint, so object-cover never actually has
        to crop anything and the photo always fills edge-to-edge with no
        letterboxing on any side.
      */}
      <div className="relative w-full aspect-[5760/3400]">
        <Image
          src="/images/hero/banner-1.webp"
          alt="Open Haldiram's festive hamper box filled with sweets and dry fruits, set against a deep teal curtain backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/40 via-transparent to-teal-deep/10" />

        {/* Heading + CTA over the photograph */}
        <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-6 lg:p-10">
          <div className="max-w-[75%] sm:max-w-md lg:max-w-2xl">
            <motion.p
              initial="hidden"
              animate="show"
              custom={0}
              variants={fadeUp}
              className="font-canela font-normal text-base sm:text-3xl lg:text-[48px] text-gold mb-0.5 sm:mb-1 text-shadow-gold whitespace-nowrap"
            >
              Festive
            </motion.p>
            <motion.h1
              initial="hidden"
              animate="show"
              custom={0.15}
              variants={fadeUp}
              className="inline-block font-canela font-normal uppercase bg-gradient-to-r from-[#FFD279] to-[#BD8B28] bg-clip-text text-transparent text-shadow-gold text-2xl sm:text-5xl lg:text-[72px] leading-[1.1] tracking-wide whitespace-nowrap"
            >
              Gifting Hampers
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="show"
              custom={0.3}
              variants={fadeUp}
              className="flex items-baseline mt-[5px] mb-[16px] font-canela font-normal text-gold text-shadow-gold text-base sm:text-3xl lg:text-[48px] leading-[1.1] tracking-wide whitespace-nowrap"
            >
              <span
                aria-hidden="true"
                className="invisible inline-block h-0 overflow-hidden leading-[0] whitespace-pre uppercase text-2xl sm:text-5xl lg:text-[72px]"
              >
                Gifting{" "}
              </span>
              <span className="ml-8 sm:ml-14 lg:ml-20">by Haldiram&rsquo;s</span>
            </motion.p>
            <motion.p
              initial="hidden"
              animate="show"
              custom={0.45}
              variants={fadeUp}
              className="text-right mr-1 sm:mr-1 lg:mr-1 font-latinka font-normal text-cream-light text-xs sm:text-base lg:text-[20px] text-shadow-gold whitespace-nowrap"
            >
              Let the taste of tradition
              <br />
              sweeten your celebrations
            </motion.p>
          </div>
        </div>
      </div>

      {/*
        Lead form: normal flow below the banner on small/medium screens;
        absolutely overlaid on the right side of the banner at `lg`, where
        it no longer contributes to the section's flow height.
      */}
      <div className="px-4 sm:px-6 py-8 flex justify-center lg:absolute lg:inset-y-0 lg:right-24 lg:py-0 lg:px-0 lg:items-center lg:justify-end lg:z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
        >
          <LeadForm />
        </motion.div>
      </div>
    </section>
  );
}
