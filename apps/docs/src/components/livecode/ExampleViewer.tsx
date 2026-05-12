"use client";

import { useState } from "react";
import { BlockPreview } from "./BlockPreview";
import { SourcePane, type SourcePaneRegion } from "./SourcePane";
import { useFw } from "./fw-store";
import { CopyBtn } from "./CopyBtn";
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
  const [fw, setFw] = useFw();

  return (
    <div className="flex flex-col h-full bg-background">

      {/* metadata header */}
      <div className="flex items-start justify-between gap-6 px-5 py-4 border-b border-border flex-shrink-0">
        <div className="min-w-0">
          <div className="text-[15px] font-semibold text-foreground leading-tight mb-1">{title}</div>
          {description && (
            <p className="text-[12.5px] text-muted-foreground leading-snug max-w-[480px]">{description}</p>
          )}
          {deps && deps.length > 0 && (
            <div className="mt-1 font-mono text-[10px] tracking-wider text-muted-foreground">
              deps: {deps.join(", ")}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5 border border-border px-2.5 py-1.5 flex-shrink-0">
          <code className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">{cliCmd}</code>
          <CopyBtn text={cliCmd} label="Copy" />
        </div>
      </div>

      {/* tab bar */}
      <div className="flex items-stretch border-b border-border flex-shrink-0">
        <TabBtn active={tab === "preview"} onClick={() => setTab("preview")}>Preview</TabBtn>
        <TabBtn active={tab === "code"} onClick={() => setTab("code")}>Code</TabBtn>
        <span className="flex-1" />
      </div>

      {/* content */}
      <div className="flex-1 overflow-auto">
        {tab === "preview" ? (
          <div className="p-8 min-h-full flex items-center justify-center">
            <div className="w-full max-w-[800px]">
              <BlockPreview spec={spec} />
            </div>
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
        "px-4 py-2 font-mono text-[10px] uppercase tracking-wider",
        "border-b-[1.5px] -mb-px transition-colors",
        active
          ? "border-accent text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
