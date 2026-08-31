"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

interface ThankYouModalProps {
  open: boolean;
  onClose: () => void;
  firstName?: string;
}

export default function ThankYouModal({
  open,
  onClose,
  firstName,
}: ThankYouModalProps) {
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<Element | null>(null);

  // Portals need a DOM to target, so nothing renders until after hydration.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    lastFocusedRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      (lastFocusedRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  /*
    Rendered through a portal rather than in place: the form sits inside a
    framer-motion wrapper that carries a transform, and a transformed ancestor
    makes `position: fixed` resolve against that ancestor instead of the
    viewport — the overlay would be trapped inside the hero.
  */
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-6"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="thank-you-title"
            aria-describedby="thank-you-body"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-[420px] sm:max-w-[460px] max-h-[90svh] overflow-y-auto rounded-2xl border border-gold/60 bg-cream-light px-6 py-8 sm:px-9 sm:py-10 text-center shadow-form"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-burgundy/70 transition-colors duration-200 hover:bg-burgundy hover:text-cream-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <Image
              src="/images/patterns/red.webp"
              alt=""
              aria-hidden="true"
              width={1020}
              height={226}
              className="mx-auto w-28 sm:w-32 h-auto"
            />

            <h2
              id="thank-you-title"
              className="mt-4 font-canela font-normal text-burgundy text-3xl sm:text-4xl"
            >
              Thank You{firstName ? `, ${firstName}` : ""}!
            </h2>

            <p
              id="thank-you-body"
              className="mt-3 font-latinka font-normal text-teal-deep text-sm sm:text-base leading-relaxed"
            >
              your enquiry has been received, our team will get in touch with you soon.
            </p>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
