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
    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight">
      <span className="text-teal-deep">From </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={pair.from}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="inline-block text-burgundy font-semibold"
        >
          {pair.from}
        </motion.span>
      </AnimatePresence>
      <span className="text-teal-deep"> | To </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={pair.to}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="inline-block text-burgundy font-semibold"
        >
          {pair.to}
        </motion.span>
      </AnimatePresence>
    </h2>
  );
}
