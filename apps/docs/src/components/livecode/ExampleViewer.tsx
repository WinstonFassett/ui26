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
}: {
  spec: Spec;
  region: SourcePaneRegion;
}) {
  const [tab, setTab] = useState<Tab>("preview");
  const [fw, setFw] = useFw();

  return (
    <div className="flex flex-col">
      <div className="flex items-stretch border border-border border-b-0 bg-card">
        <TabBtn active={tab === "preview"} onClick={() => setTab("preview")}>
          Preview
        </TabBtn>
        <TabBtn active={tab === "code"} onClick={() => setTab("code")}>
          Code
        </TabBtn>
        <span className="flex-1" />
      </div>

      {tab === "preview" ? (
        <div className="border border-border bg-card p-8 min-h-[280px] flex items-center justify-center">
          <div className="w-full max-w-[800px]">
            <BlockPreview spec={spec} />
          </div>
        </div>
      ) : (
        <SourcePane region={region} fw={fw} setFw={setFw} />
      )}
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
        "px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider",
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
