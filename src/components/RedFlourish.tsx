import Image from "next/image";

/**
 * The burgundy filigree that separates the hamper-category fold from the
 * indulgence/wellness fold. It sits between the two sections rather than
 * inside either one, so the spacing above and below it stays symmetrical.
 */
export default function RedFlourish() {
  return (
    <div className="bg-cream-light flex justify-center px-4">
      <Image
        src="/images/patterns/red.webp"
        alt=""
        aria-hidden="true"
        width={1020}
        height={226}
        className="w-36 sm:w-44 lg:w-48 h-auto"
      />
    </div>
  );
}
