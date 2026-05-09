"use client";

import { Button } from "@registry/button/button";
import { DemoSection } from "./doc-sample";
import type { Demo } from "./doc-sample";
import { getSamples } from "@/samples";
import type { Sample } from "@/samples/types";

function toDemos(samples: Sample[]): Demo[] {
  return samples.map((s) => ({ id: s.key ?? s.id, label: s.title, spec: s.spec }));
}

const VARIANT_DEMOS = toDemos(getSamples({ kind: "atom", relatedComponent: "button", group: "variants" }));
const SIZE_DEMOS = toDemos(getSamples({ kind: "atom", relatedComponent: "button", group: "sizes" }));

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
        demos={SIZE_DEMOS}
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
