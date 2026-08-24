import type { ButtonHTMLAttributes } from "react";

type Variant = "solid" | "outline" | "gold";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  solid:
    "bg-gradient-to-b from-burgundy-light to-burgundy text-cream-light border border-gold/70 hover:from-burgundy hover:to-burgundy-dark",
  outline:
    "bg-transparent text-gold border border-gold hover:bg-gold hover:text-teal-deep",
  gold:
    "bg-gradient-to-b from-gold-light to-gold text-burgundy-dark border border-gold-dark/60 hover:from-gold hover:to-gold-dark",
};

export default function CTAButton({
  children,
  variant = "solid",
  className = "",
  ...props
}: CTAButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-semibold tracking-[0.15em] uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
