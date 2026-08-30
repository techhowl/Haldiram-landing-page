"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface WellnessCard {
  label: string;
  image: string;
}

const wellnessCards: WellnessCard[] = [
  { label: "Mithai Hampers", image: "/images/hero/section3-2.png" },
  { label: "Dry Fruit Hampers", image: "/images/hero/section3-1.png" },
];

export default function IndulgenceWellness() {
  return (
    <section id="indulgence-wellness" className="relative bg-cream-light py-6 sm:py-20 overflow-hidden">
      <Image
        src="/images/patterns/mandala-full.webp"
        alt=""
        aria-hidden="true"
        width={945}
        height={934}
        className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] sm:w-[680px] h-auto opacity-15"
        style={{
          maskImage: "radial-gradient(circle, black 45%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle, black 45%, transparent 80%)",
        }}
      />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_0.75fr] gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Editorial text block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl pl-6 sm:pl-12 md:pl-2 lg:pl-10 xl:pl-24"
          >
            <h2 className="leading-[1.1] text-2xl sm:text-4xl md:text-2xl lg:text-3xl xl:text-5xl">
              <span className="block font-latinka font-normal text-teal-deep">Ranging from Pure</span>
              <span className="block font-canela font-normal text-burgundy text-3xl sm:text-5xl md:text-3xl lg:text-4xl xl:text-6xl">
                Indulgence
              </span>
              <span className="flex items-baseline mt-2 sm:mt-3 pl-6 min-[375px]:pl-20 sm:pl-24 md:pl-10 lg:pl-16 xl:pl-28 font-latinka font-normal text-teal-deep">
                <span className="whitespace-pre">To </span>
                <span>Wholesome</span>
              </span>
              <span className="flex items-baseline pl-6 min-[375px]:pl-20 sm:pl-24 md:pl-10 lg:pl-16 xl:pl-28 font-canela font-normal text-burgundy text-3xl sm:text-5xl md:text-3xl lg:text-4xl xl:text-6xl">
                <span
                  aria-hidden="true"
                  className="invisible whitespace-pre font-latinka text-2xl sm:text-4xl md:text-2xl lg:text-3xl xl:text-5xl"
                >
                  To{" "}
                </span>
                <span>Wellness</span>
              </span>
            </h2>

            <span className="mt-2 sm:mt-6 block h-[3px] w-64 sm:w-80 md:w-56 lg:w-72 xl:w-96 bg-burgundy" />

            <p className="mt-1.5 sm:mt-4 font-latinka font-normal text-teal-deep text-2xl sm:text-4xl md:text-xl lg:text-2xl xl:text-4xl">
              Explore our
              <br />
              complete range
            </p>
          </motion.div>

          {/* Stacked image cards */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } },
            }}
            className="mx-auto w-full max-w-[520px] md:max-w-none flex flex-col gap-4 sm:gap-6 lg:gap-8"
          >
            {wellnessCards.map((card) => (
              <motion.div
                key={card.label}
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="group relative z-0 hover:z-10 w-full aspect-[16/9] rounded-lg sm:rounded-2xl overflow-hidden shadow-card hover:shadow-[0_20px_50px_-10px_rgba(13,59,62,0.5)] transition-shadow duration-300 bg-cream-dark"
              >
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center text-center bg-[#FFD279] text-burgundy text-[11px] sm:text-sm font-semibold uppercase tracking-[0.12em] sm:tracking-wide leading-tight sm:leading-snug py-2 px-3 sm:py-3 sm:px-5">
                  {card.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
