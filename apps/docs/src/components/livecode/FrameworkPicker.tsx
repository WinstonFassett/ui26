"use client";

import { cn } from "@/lib/utils";
import { FRAMEWORKS, FRAMEWORK_LABELS } from "@/lib/spec-to-code";
import { useFw, useJsonActive } from "./fw-store";

export function FrameworkPicker({ className }: { className?: string }) {
  const [fw, setFw] = useFw();
  const [jsonActive, setJsonActive] = useJsonActive();

  return (
    <div className={cn("inline-flex items-center border border-border bg-card", className)}>
      <span className="px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground border-r border-border">
        framework
      </span>
      {FRAMEWORKS.map((f) => {
        const on = !jsonActive && fw === f;
        return (
          <button
            key={f}
            type="button"
            onClick={() => setFw(f)}
            className={cn(
              "px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors",
              on
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {FRAMEWORK_LABELS[f]}
          </button>
        );
      })}
      <button
        type="button"
        onClick={() => setJsonActive(!jsonActive)}
        className={cn(
          "px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors border-l border-border",
          jsonActive
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        JSON
      </button>
    </div>
  );
}
