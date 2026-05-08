import { useState } from "react";
import { cn } from "@/lib/utils";

export function CopyBtn({
  text,
  label = "Copy",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [hit, setHit] = useState(false);

  const onClick = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard?.writeText(text).catch(() => {});
    }
    setHit(true);
    setTimeout(() => setHit(false), 900);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider",
        "border transition-colors",
        hit
          ? "bg-accent text-accent-foreground border-accent"
          : "bg-foreground text-background border-foreground hover:bg-foreground/90",
        className
      )}
    >
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="2.5" y="2.5" width="5.5" height="5.5" />
        <path d="M1 6V1h5" />
      </svg>
      {hit ? "Copied" : label}
    </button>
  );
}
