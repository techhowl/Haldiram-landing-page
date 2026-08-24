export default function Header() {
  return (
    <header className="relative bg-cream-light h-9 sm:h-12 border-b border-gold/40">
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-20">
        <div className="bg-burgundy border border-gold/70 rounded-full px-6 py-2 shadow-card">
          <span className="font-display text-gold text-sm sm:text-base tracking-wide">
            Haldiram&rsquo;s
          </span>
        </div>
      </div>
    </header>
  );
}
