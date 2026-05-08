"use client";

import { useState } from "react";
import { Renderer, JSONUIProvider } from "@json-render/react";
import { registry } from "./registry";
import type { Spec } from "@json-render/core";

interface Props {
  spec: Spec;
  showSpec?: boolean;
}

export function JsonRenderDemo({ spec, showSpec = false }: Props) {
  const [visible, setVisible] = useState(showSpec);

  return (
    <div className="not-content rounded-lg border bg-card overflow-hidden">
      <div className="p-6">
        <JSONUIProvider registry={registry}>
          <Renderer spec={spec} registry={registry} />
        </JSONUIProvider>
      </div>
      <div className="border-t px-4 py-2 flex items-center justify-between bg-muted/40">
        <span className="text-xs text-muted-foreground font-mono">json-render spec</span>
        <button
          onClick={() => setVisible((v) => !v)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {visible ? "hide" : "show"} spec
        </button>
      </div>
      {visible && (
        <pre className="overflow-x-auto p-4 text-xs bg-muted/20 border-t font-mono leading-relaxed text-foreground/80">
          {JSON.stringify(spec, null, 2)}
        </pre>
      )}
    </div>
  );
}
