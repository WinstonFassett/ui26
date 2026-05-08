import { cn } from "@/lib/utils";
import { FRAMEWORKS, FRAMEWORK_LABELS, type Framework } from "@/lib/spec-to-code";

export function FwTabs({
  fw,
  setFw,
  fileLabel,
  className,
}: {
  fw: Framework;
  setFw: (fw: Framework) => void;
  fileLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-stretch border-b border-border", className)}>
      {FRAMEWORKS.map((f) => {
        const on = fw === f;
        return (
          <button
            key={f}
            type="button"
            onClick={() => setFw(f)}
            className={cn(
              "px-3 py-2 font-mono text-[10px] uppercase tracking-wider",
              "border-b-[1.5px] -mb-px transition-colors",
              on
                ? "border-accent text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {FRAMEWORK_LABELS[f]}
          </button>
        );
      })}
      <span className="flex-1" />
      {fileLabel && (
        <span className="self-center px-3 font-mono text-[10px] tracking-wider lowercase text-muted-foreground">
          {fileLabel}
        </span>
      )}
    </div>
  );
}
