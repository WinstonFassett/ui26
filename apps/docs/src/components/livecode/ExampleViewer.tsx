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
  const [fw, setFw] = useFw();

  return (
    <div className="flex flex-col h-full bg-background">

      {/* title card + tabs — always visible so user can always switch tabs */}
      <div className="flex items-center justify-between gap-4 px-3.5 py-3 border-b border-border shrink-0">
        <div className="min-w-0">
          {tab === "preview" ? (
            <>
              <div className="font-mono text-[9px] uppercase tracking-widest text-accent mb-0.5">
                {region.section}
              </div>
              <div className="text-[13px] font-semibold text-foreground truncate">
                {title}
              </div>
            </>
          ) : (
            <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              {region.section} / {title}
            </div>
          )}
        </div>
        <div className="flex items-center shrink-0">
          <TabBtn active={tab === "preview"} onClick={() => setTab("preview")}>Preview</TabBtn>
          <TabBtn active={tab === "code"} onClick={() => setTab("code")}>Code</TabBtn>
        </div>
      </div>

      {/* content */}
      <div className="flex-1 min-h-0 overflow-auto">
        {tab === "preview" ? (
          <div className="flex flex-col h-full">
            <div className="flex-1 p-8 flex items-center justify-center">
              <div className="w-full max-w-200">
                <BlockPreview spec={spec} />
              </div>
            </div>
            {(description || (deps && deps.length > 0)) && (
              <div className="shrink-0 px-5 py-2.5 border-t border-border flex items-baseline gap-4">
                {description && (
                  <p className="text-[11.5px] text-muted-foreground leading-snug">{description}</p>
                )}
                {deps && deps.length > 0 && (
                  <span className="font-mono text-[10px] text-muted-foreground/60 whitespace-nowrap shrink-0">
                    {deps.join(" · ")}
                  </span>
                )}
              </div>
            )}
          </div>
        ) : (
          <SourcePane region={region} fw={fw} setFw={setFw} hideHeader className="h-full" />
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
        "px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider",
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
