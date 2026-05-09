"use client";

import { Button } from "@registry/button/button";
import { DemoSection } from "./doc-sample";
import type { Demo } from "./doc-sample";
import { BUTTON_VARIANT_DEMOS, BUTTON_SIZE_DEMOS } from "./button-demos";
import { getSamples } from "@/samples";

const SAMPLE_VARIANTS: Demo[] = getSamples({ kind: "atom", relatedComponent: "button", group: "variants" })
  .map((s) => ({ id: s.id.replace(/^button-/, ""), label: s.title, spec: s.spec }));

const VARIANT_DEMOS: Demo[] = (() => {
  const byId = new Map<string, Demo>();
  for (const d of BUTTON_VARIANT_DEMOS) byId.set(d.id, d);
  for (const s of SAMPLE_VARIANTS) byId.set(s.id, s);
  return [...byId.values()];
})();

export function ButtonDocSample() {
  return (
    <>
      <DemoSection
        title="Variants"
        namePrefix="Button"
        demos={VARIANT_DEMOS}
        renderTile={(demo) => (
          <Button
            variant={demo.id as "default" | "secondary" | "outline" | "ghost" | "destructive"}
            size="sm"
            tabIndex={-1}
            className="pointer-events-none"
          >
            Aa
          </Button>
        )}
      />
      <DemoSection
        title="Sizes"
        namePrefix="Button"
        demos={BUTTON_SIZE_DEMOS}
        renderTile={(demo) => (
          <Button
            size={demo.id as "sm" | "default" | "lg" | "icon"}
            tabIndex={-1}
            className="pointer-events-none"
          >
            {demo.id === "icon" ? "⚡" : "Aa"}
          </Button>
        )}
      />
    </>
  )
}
