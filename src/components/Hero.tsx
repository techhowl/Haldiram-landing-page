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
      <div className="relative w-full aspect-[1572/2089] sm:aspect-[5760/3400]">
        <Image
          src="/images/hero/mobile-banner.png"
          alt="Open Haldiram's festive hamper box filled with sweets and dry fruits, set against a deep teal curtain backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:hidden"
        />
        <Image
          src="/images/hero/banner-1.webp"
          alt="Open Haldiram's festive hamper box filled with sweets and dry fruits, set against a deep teal curtain backdrop"
          fill
          priority
          sizes="100vw"
          className="hidden sm:block object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/40 via-transparent to-teal-deep/10" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/30 sm:hidden"
        />

        {/* Heading + CTA over the photograph */}
        <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-6 min-[1360px]:p-10">
          <div className="w-full sm:max-w-md min-[1360px]:max-w-2xl">
            <motion.p
              initial="hidden"
              animate="show"
              custom={0}
              variants={fadeUp}
              className="font-canela font-normal text-2xl sm:text-3xl min-[1360px]:text-[48px] text-gold mb-0.5 sm:mb-1 text-shadow-gold whitespace-nowrap"
            >
              Festive
            </motion.p>
            <motion.h1
              initial="hidden"
              animate="show"
              custom={0.15}
              variants={fadeUp}
              className="inline-block font-canela font-normal uppercase bg-gradient-to-r from-[#FFD279] to-[#BD8B28] bg-clip-text text-transparent text-shadow-gold text-[36px] sm:text-5xl min-[1360px]:text-[72px] leading-[1.1] tracking-wide whitespace-nowrap"
            >
              Gifting Hampers
            </motion.h1>

            {/* Mobile: a rule beside "by Haldiram's" instead of the desktop spacer-aligned line */}
            <motion.div
              initial="hidden"
              animate="show"
              custom={0.3}
              variants={fadeUp}
              className="sm:hidden flex items-center gap-2 mt-[5px] mb-[16px]"
            >
              <span className="h-px flex-1 bg-gold/40" aria-hidden="true" />
              <span className="font-canela font-normal text-gold text-shadow-gold text-xl leading-[1.1] tracking-wide whitespace-nowrap">
                by Haldiram&rsquo;s
              </span>
            </motion.div>
            <motion.p
              initial="hidden"
              animate="show"
              custom={0.3}
              variants={fadeUp}
              className="hidden sm:flex items-baseline mt-[5px] mb-[16px] font-canela font-normal text-gold text-shadow-gold sm:text-3xl min-[1360px]:text-[48px] leading-[1.1] tracking-wide whitespace-nowrap"
            >
              <span
                aria-hidden="true"
                className="inline-block invisible h-0 overflow-hidden leading-[0] whitespace-pre uppercase sm:text-5xl min-[1360px]:text-[72px]"
              >
                Gifting{" "}
              </span>
              <span className="sm:ml-14 min-[1360px]:ml-20">by Haldiram&rsquo;s</span>
            </motion.p>
            <motion.p
              initial="hidden"
              animate="show"
              custom={0.45}
              variants={fadeUp}
              className="text-center sm:text-right mr-1 sm:mr-1 min-[1360px]:mr-1 font-latinka font-normal text-cream-light text-sm sm:text-base min-[1360px]:text-[20px] text-shadow-gold whitespace-nowrap"
            >
              Let the taste of tradition{" "}
              <br className="hidden sm:block" />
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
      <div className="bg-gradient-to-b from-black to-[#084147] sm:bg-none px-4 sm:px-6 py-3 sm:py-8 flex justify-center min-[1360px]:absolute min-[1360px]:inset-y-0 min-[1360px]:right-24 min-[1360px]:py-0 min-[1360px]:px-0 min-[1360px]:items-center min-[1360px]:justify-end min-[1360px]:z-10">
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
