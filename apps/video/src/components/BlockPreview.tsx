"use client";

import { Renderer, JSONUIProvider } from "@json-render/react";
import { registry } from "@/json-render/registry";
import type { Spec } from "@json-render/core";

export function BlockPreview({ spec }: { spec: Spec }) {
  return (
    <JSONUIProvider registry={registry} initialState={spec.state}>
      <Renderer spec={spec} registry={registry} />
    </JSONUIProvider>
  );
}
