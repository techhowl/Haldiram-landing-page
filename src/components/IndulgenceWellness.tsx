import Image from "next/image";

interface WellnessCard {
  label: string;
  image: string;
}

const wellnessCards: WellnessCard[] = [
  { label: "Mithai Hampers", image: "/images/wellness/mithai-hampers.svg" },
  { label: "Dry Fruit Hampers", image: "/images/wellness/dry-fruit-hampers.svg" },
];

export default function IndulgenceWellness() {
  return (
    <section id="indulgence-wellness" className="relative bg-[#F8F4EB] py-16 sm:py-20 overflow-hidden">
      <Image
        src="/images/patterns/mandala-full.webp"
        alt=""
        aria-hidden="true"
        width={945}
        height={934}
        className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] sm:w-[680px] lg:w-[820px] h-auto opacity-15"
        style={{
          maskImage: "radial-gradient(circle, black 45%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle, black 45%, transparent 80%)",
        }}
      />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-10">
        <div className="flex justify-center">
          <Image
            src="/images/patterns/red.webp"
            alt=""
            aria-hidden="true"
            width={1020}
            height={226}
            className="w-40 sm:w-48 h-auto"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_0.75fr] gap-10 lg:gap-16 items-center">
          {/* Editorial text block */}
          <div className="max-w-xl pl-10 sm:pl-16 lg:pl-24">
            <h2 className="leading-[1.1] text-3xl sm:text-4xl lg:text-5xl">
              <span className="block font-latinka font-normal text-teal-deep">Ranging from Pure</span>
              <span className="block font-canela font-normal text-burgundy text-4xl sm:text-5xl lg:text-6xl">
                Indulgence
              </span>
              <span className="flex items-baseline pl-20 sm:pl-24 lg:pl-28 font-latinka font-normal text-teal-deep">
                <span className="whitespace-pre">To </span>
                <span>Wholesome</span>
              </span>
              <span className="flex items-baseline pl-20 sm:pl-24 lg:pl-28 font-canela font-normal text-burgundy text-4xl sm:text-5xl lg:text-6xl">
                <span
                  aria-hidden="true"
                  className="invisible whitespace-pre font-latinka text-3xl sm:text-4xl lg:text-5xl"
                >
                  To{" "}
                </span>
                <span>Wellness</span>
              </span>
            </h2>

            <span className="mt-6 block h-[3px] w-64 sm:w-80 lg:w-96 bg-burgundy" />

            <p className="mt-4 font-latinka font-normal text-teal-deep text-3xl sm:text-4xl">
              Explore our
              <br />
              complete range
            </p>
          </div>

          {/* Stacked image cards */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {wellnessCards.map((card) => (
              <div key={card.label} className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-card bg-cream-dark">
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-[#FFD279] text-burgundy text-xs sm:text-sm font-semibold uppercase tracking-wide leading-snug py-3 px-5">
                  {card.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
