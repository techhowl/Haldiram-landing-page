import Image from "next/image";
import CTAButton from "./CTAButton";

interface Feature {
  icon: string;
  titleLines: [string, string];
}

const features: Feature[] = [
  {
    icon: "/images/icons/express-delivery 1.png",
    titleLines: ["Delivering", "Pan India"],
  },
  {
    icon: "/images/icons/discount 1.png",
    titleLines: ["Special Discounts", "on Bulk Orders"],
  },
  {
    icon: "/images/icons/gift (1) 1.png",
    titleLines: ["Wide Range of Hampers", "for Every Need"],
  },
];

export default function BrandStory() {
  return (
    <section
      id="brand-story"
      className="relative bg-gradient-to-br from-[#084147] to-[#139EAD] py-16 sm:py-20 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-y-0 left-0 w-28 sm:w-40 lg:w-56 opacity-25"
        style={{
          backgroundImage: "url('/images/patterns/blue.png')",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
          backgroundPosition: "top center",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-y-0 right-0 w-28 sm:w-40 lg:w-56 opacity-25"
        style={{
          backgroundImage: "url('/images/patterns/blue.png')",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
          backgroundPosition: "top center",
        }}
      />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-10 text-center">
        <h2 className="font-latinka font-normal text-cream-light text-3xl sm:text-4xl lg:text-5xl leading-tight">
          At the heart of
          <br />
          every celebration
        </h2>
        <p className="mt-0 font-canela font-normal leading-none uppercase text-cream-light text-[72px] tracking-wide">
          Since 1937
        </p>

        <div className="mt-8 flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-0 w-full max-w-[220px] border-t border-dashed border-[#9fe3ec]/60" />
          <span className="text-[#9fe3ec]/80 text-base">✦</span>
          <span className="h-0 w-full max-w-[220px] border-t border-dashed border-[#9fe3ec]/60" />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {features.map((feature) => (
            <div
              key={feature.titleLines.join(" ")}
              className="flex flex-col items-center justify-center gap-4 w-[356px] h-[214px] rounded-2xl border border-white/25 bg-gradient-to-br from-white/20 via-white/5 to-white/[0.02] backdrop-blur-md px-6 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
            >
              <Image src={feature.icon} alt="" aria-hidden="true" width={72} height={72} className="w-16 h-16 sm:w-[72px] sm:h-[72px]" />
              <h3 className="font-latinka font-light text-cream-light text-[20px] leading-snug uppercase tracking-wide">
                {feature.titleLines[0]}
                <br />
                {feature.titleLines[1]}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <CTAButton variant="gold" type="button" className="rounded-xl">
            Get Quote
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
