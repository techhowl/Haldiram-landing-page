import Image from "next/image";
import CTAButton from "./CTAButton";
import LeadForm from "./LeadForm";

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
          <div className="max-w-[75%] sm:max-w-sm lg:max-w-xl">
            <p className="font-display text-base sm:text-2xl lg:text-3xl text-gold italic mb-0.5 sm:mb-1 text-shadow-gold whitespace-nowrap">
              Festive
            </p>
            <h1 className="font-serif font-bold text-gold-light text-shadow-gold text-xl sm:text-3xl lg:text-5xl leading-[1.1] tracking-wide uppercase whitespace-nowrap">
              Gifting Hampers
            </h1>
            <p className="font-display text-gold text-xs sm:text-lg lg:text-xl italic text-right -mt-0.5 sm:-mt-1 whitespace-nowrap">
              by Haldiram&rsquo;s
            </p>
            <p className="mt-1.5 sm:mt-4 text-cream-light text-[11px] sm:text-sm lg:text-base font-semibold text-center text-shadow-gold">
              Let the taste of tradition
              <br />
              sweeten your celebrations
            </p>
          </div>

          <div>
            <CTAButton variant="solid" className="rounded-full !px-4 !py-1.5 sm:!px-8 sm:!py-3 text-xs sm:text-sm">
              Get Quote
            </CTAButton>
          </div>
        </div>
      </div>

      {/*
        Lead form: normal flow below the banner on small/medium screens;
        absolutely overlaid on the right side of the banner at `lg`, where
        it no longer contributes to the section's flow height.
      */}
      <div className="px-4 sm:px-6 py-8 flex justify-center lg:absolute lg:inset-y-0 lg:right-24 lg:py-0 lg:px-0 lg:items-center lg:justify-end lg:z-10">
        <LeadForm />
      </div>
    </section>
  );
}
