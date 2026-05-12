"use client";

import { useState } from "react";
import { BlockPreview } from "./BlockPreview";
import { SourcePane, type SourcePaneRegion } from "./SourcePane";
import { useFw } from "./fw-store";
import { cn } from "@/lib/utils";
import type { Spec } from "@/lib/spec-to-code";

type Tab = "preview" | "code";

export function ExampleViewer({
  spec,
  region,
  title,
  description,
  cliCmd,
  deps,
}: {
  spec: Spec;
  region: SourcePaneRegion;
  title: string;
  description?: string;
  cliCmd: string;
  deps?: string[];
}) {
  const [tab, setTab] = useState<Tab>("preview");
  const [copied, setCopied] = useState(false);
  const [fw, setFw] = useFw();

  const copy = () => {
    navigator.clipboard?.writeText(cliCmd).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 900);
  };

  return (
    <div className="flex flex-col h-full bg-background">

      {/* single toolbar: tabs | spacer | copy */}
      <div className="flex items-stretch h-9 border-b border-border flex-shrink-0 min-w-0">
        <div className="flex items-stretch">
          <TabBtn active={tab === "preview"} onClick={() => setTab("preview")}>Preview</TabBtn>
          <TabBtn active={tab === "code"} onClick={() => setTab("code")}>Code</TabBtn>
        </div>

        <div className="flex-1" />

        <button
          type="button"
          onClick={copy}
          title={cliCmd}
          className={cn(
            "flex items-center gap-1.5 px-3 border-l border-border font-mono text-[10px] tracking-wider transition-colors flex-shrink-0",
            copied
              ? "text-accent"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {copied ? (
            <span>✓</span>
          ) : (
            <svg width="11" height="11" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <rect x="2.5" y="2.5" width="5.5" height="5.5" />
              <path d="M1 6V1h5" />
            </svg>
          )}
          <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* content */}
      <div className="flex-1 min-h-0 overflow-auto">
        {tab === "preview" ? (
          <div className="flex flex-col h-full">
            <div className="flex-1 p-8 flex items-center justify-center">
              <div className="w-full max-w-[800px]">
                <BlockPreview spec={spec} />
              </div>
            </div>
            {(description || (deps && deps.length > 0)) && (
              <div className="flex-shrink-0 px-5 py-2.5 border-t border-border flex items-baseline gap-4">
                {description && (
                  <p className="text-[11.5px] text-muted-foreground leading-snug">{description}</p>
                )}
                {deps && deps.length > 0 && (
                  <span className="font-mono text-[10px] text-muted-foreground/60 whitespace-nowrap flex-shrink-0">
                    {deps.join(" · ")}
                  </span>
                )}
              </div>
            )}
          </div>
        ) : (
          <SourcePane region={region} fw={fw} setFw={setFw} className="h-full" />
        )}
      </div>

    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 h-full font-mono text-[10px] uppercase tracking-wider",
        "border-b-[1.5px] transition-colors",
        active
          ? "border-accent text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
