"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface WordPair {
  from: string;
  to: string;
}

const WORD_PAIRS: WordPair[] = [
  { from: "Professional", to: "Personal" },
  { from: "Clients", to: "Cousins" },
  { from: "Team", to: "Tribe" },
];

const CYCLE_MS = 5000;

export default function AnimatedFromTo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORD_PAIRS.length);
    }, CYCLE_MS);
    return () => clearInterval(interval);
  }, []);

  const pair = WORD_PAIRS[index];

  return (
    <h2 className="font-display leading-tight flex items-center justify-center gap-3 min-[375px]:gap-6 sm:gap-8 lg:gap-10">
      <span className="flex flex-col items-start">
        <span className="font-latinka font-normal text-teal-deep text-base min-[375px]:text-xl sm:text-2xl lg:text-3xl">From</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={pair.from}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-block text-burgundy font-semibold text-2xl min-[375px]:text-4xl sm:text-5xl lg:text-6xl"
          >
            {pair.from}
          </motion.span>
        </AnimatePresence>
      </span>

      <span aria-hidden="true" className="h-10 min-[375px]:h-16 sm:h-20 lg:h-24 w-px bg-teal-deep/40" />

      <span className="flex flex-col items-start">
        <span className="font-latinka font-normal text-teal-deep text-base min-[375px]:text-xl sm:text-2xl lg:text-3xl">To</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={pair.to}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-block text-burgundy font-semibold text-2xl min-[375px]:text-4xl sm:text-5xl lg:text-6xl"
          >
            {pair.to}
          </motion.span>
        </AnimatePresence>
      </span>
    </h2>
  );
}
