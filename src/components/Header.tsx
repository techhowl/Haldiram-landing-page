"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="relative bg-cream-light">
      <div className="flex items-center justify-center py-1.5 sm:py-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image
            src="/images/hero/logo.png"
            alt="Haldiram's"
            width={160}
            height={82}
            priority
            className="h-9 w-auto sm:h-12"
          />
        </motion.div>
      </div>
      <div className="h-2 bg-[#17B4D6]" />
    </header>
  );
}
