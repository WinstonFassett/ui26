"use client";

import { cn } from "@/lib/utils";
import { FRAMEWORKS, FRAMEWORK_LABELS } from "@/lib/spec-to-code";
import { useFw } from "./fw-store";

export function FrameworkPicker({ className }: { className?: string }) {
  const [fw, setFw] = useFw();

  return (
    <div className={cn("inline-flex items-center border border-border bg-card", className)}>
      <span className="px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground border-r border-border">
        framework
      </span>
      {FRAMEWORKS.map((f) => (
        <button
          key={f}
          type="button"
          onClick={() => setFw(f)}
          className={cn(
            "px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors",
            fw === f
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {FRAMEWORK_LABELS[f]}
        </button>
      ))}
    </div>
  );
}
