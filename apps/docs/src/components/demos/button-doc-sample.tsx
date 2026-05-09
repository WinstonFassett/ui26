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
        renderTile={() => (
          <div className="flex flex-wrap items-center gap-1">
            {(["default", "secondary", "outline", "ghost", "destructive"] as const).map((v) => (
              <Button key={v} variant={v} size="sm" tabIndex={-1} className="pointer-events-none">Aa</Button>
            ))}
          </div>
        )}
      />
      <DemoSection
        title="Sizes"
        namePrefix="Button"
        demos={SIZE_DEMOS}
        renderTile={() => (
          <div className="flex items-center gap-1">
            {(["sm", "default", "lg"] as const).map((s) => (
              <Button key={s} size={s} tabIndex={-1} className="pointer-events-none">Aa</Button>
            ))}
            <Button size="icon" tabIndex={-1} className="pointer-events-none">⚡</Button>
          </div>
        )}
      />
    </>
  )
}
