interface SectionDividerProps {
  tone?: "gold" | "cream";
  className?: string;
}

/**
 * Small ornamental flourish used between headings and content, echoing the
 * thin diamond-and-hairline motif in the reference design.
 */
export default function SectionDivider({ tone = "gold", className = "" }: SectionDividerProps) {
  const color = tone === "gold" ? "#c9a24b" : "#f7f0e3";

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-16 sm:w-24" style={{ backgroundColor: color, opacity: 0.6 }} />
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 0L11 7L18 9L11 11L9 18L7 11L0 9L7 7L9 0Z" fill={color} opacity={0.85} />
      </svg>
      <span className="h-px w-16 sm:w-24" style={{ backgroundColor: color, opacity: 0.6 }} />
    </div>
  );
}
