"use client";

import { Renderer, JSONUIProvider } from "@json-render/react";
import { registry } from "@/components/demos/json-render/registry";
import type { Spec } from "@/lib/spec-to-code";

export function BlockPreview({ spec }: { spec: Spec }) {
  return (
    <JSONUIProvider registry={registry} initialState={spec.state}>
      <Renderer spec={spec} registry={registry} />
    </JSONUIProvider>
  );
}
