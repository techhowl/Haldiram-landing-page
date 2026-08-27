"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
    /*
      Two layouts:
        < 768px  portrait banner on top, form stacked underneath
        >= 768px the landscape banner runs full-bleed and the form is overlaid
                 on the right, so the fold reads as one photograph rather than
                 a photo block bolted onto a form block.
    */
    <section id="hero" className="relative isolate bg-teal-deep overflow-hidden">
      {/*
        The banner is sized to the source photo's exact aspect ratio (5760x3400)
        wherever there is room, so object-cover has nothing to crop. The
        min-height ladder is what the overlaid form needs: from 768px up the form
        is taller than the pure ratio would make the banner, and the section's
        overflow-hidden would clip it, so the banner is floored at the form's
        height and object-cover takes the difference off the sides instead.
        Those crops are anchored left until xl, because the hamper boxes sit in
        the left half of the frame — keeping them in shot also leaves the form
        sitting on empty curtain.
      */}
      <div className="relative w-full aspect-[1572/2089] sm:aspect-[5760/3400] md:min-h-[700px] lg:min-h-[740px] xl:min-h-[800px]">
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
          className="hidden sm:block object-cover object-center md:object-left xl:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/40 via-transparent to-teal-deep/10" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/30 sm:hidden"
        />

        {/* Heading + CTA over the photograph */}
        <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-6 lg:p-8 xl:p-10 min-[1800px]:p-16">
          <div className="w-full sm:max-w-md lg:max-w-xl xl:max-w-2xl min-[1800px]:max-w-4xl">
            <motion.p
              initial="hidden"
              animate="show"
              custom={0}
              variants={fadeUp}
              className="font-canela font-normal text-2xl sm:text-3xl md:text-2xl lg:text-[34px] xl:text-[48px] min-[1800px]:text-[58px] min-[2200px]:text-[68px] text-gold mb-0.5 sm:mb-1 text-shadow-gold whitespace-nowrap"
            >
              Festive
            </motion.p>
            <motion.h1
              initial="hidden"
              animate="show"
              custom={0.15}
              variants={fadeUp}
              className="inline-block font-canela font-normal uppercase bg-gradient-to-r from-[#FFD279] to-[#BD8B28] bg-clip-text text-transparent text-shadow-gold text-[36px] sm:text-5xl md:text-[38px] lg:text-[52px] xl:text-[72px] min-[1800px]:text-[88px] min-[2200px]:text-[104px] leading-[1.1] tracking-wide whitespace-nowrap"
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
              className="hidden sm:flex items-baseline mt-[5px] mb-[16px] font-canela font-normal text-gold text-shadow-gold sm:text-3xl md:text-2xl lg:text-[34px] xl:text-[48px] min-[1800px]:text-[58px] min-[2200px]:text-[68px] leading-[1.1] tracking-wide whitespace-nowrap"
            >
              {/* Invisible spacer — tracks the h1 sizes exactly; it is what
                  aligns "by Haldiram's" under the end of "Gifting" */}
              <span
                aria-hidden="true"
                className="inline-block invisible h-0 overflow-hidden leading-[0] whitespace-pre uppercase sm:text-5xl md:text-[38px] lg:text-[52px] xl:text-[72px] min-[1800px]:text-[88px] min-[2200px]:text-[104px]"
              >
                Gifting{" "}
              </span>
              <span className="sm:ml-14 md:ml-10 lg:ml-14 xl:ml-20 min-[1800px]:ml-24 min-[2200px]:ml-28">
                by Haldiram&rsquo;s
              </span>
            </motion.p>
            <motion.p
              initial="hidden"
              animate="show"
              custom={0.45}
              variants={fadeUp}
              className="text-center sm:text-right mr-1 font-latinka font-normal text-cream-light text-sm sm:text-base md:text-sm lg:text-base xl:text-[20px] min-[1800px]:text-2xl min-[2200px]:text-[28px] text-shadow-gold whitespace-nowrap"
            >
              Let the taste of tradition{" "}
              <br className="hidden sm:block" />
              sweeten your celebrations
            </motion.p>
          </div>
        </div>
      </div>

      {/*
        Lead form: normal flow below the banner on phones; from md it is
        absolutely overlaid on the right of the banner and no longer
        contributes to the section's flow height.
      */}
      <div
        id="lead-form"
        className="bg-gradient-to-b from-black to-[#084147] sm:bg-none px-4 sm:px-6 py-3 sm:py-8 flex justify-center md:absolute md:inset-y-0 md:right-3 lg:right-6 xl:right-10 2xl:right-16 min-[1800px]:right-24 md:py-0 md:px-0 md:items-center md:justify-end md:z-10"
      >
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
