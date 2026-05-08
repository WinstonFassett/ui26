import { cn } from "@/lib/utils";

export function PlayroomLink({
  href,
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href ?? "#"}
      className={cn(
        "inline-flex items-center gap-1.5 py-1 font-mono text-[10px] uppercase tracking-wider",
        "text-muted-foreground hover:text-foreground",
        "border-b border-border/50",
        className
      )}
    >
      Playroom
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M3 1H1v6h6V5M5 1h2v2M5 3l2.4-2.4" />
      </svg>
    </a>
  );
}
