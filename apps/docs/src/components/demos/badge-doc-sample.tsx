"use client";

import { Badge } from "@registry/badge/badge";
import { DemoSection } from "./doc-sample";
import type { Demo } from "./doc-sample";
import { getSamples } from "@/samples";
import type { Sample } from "@/samples/types";

const VARIANT_DEMOS: Demo[] = getSamples({ kind: "atom", relatedComponent: "badge", group: "variants" })
  .map((s: Sample) => ({ id: s.key ?? s.id, label: s.title, spec: s.spec }));

export function BadgeDocSample() {
  return (
    <DemoSection
      title="Variants"
      namePrefix="Badge"
      demos={VARIANT_DEMOS}
      renderTile={(demo) => (
        <Badge variant={demo.id as "default" | "secondary" | "outline" | "ghost" | "destructive"}>
          Badge
        </Badge>
      )}
    />
  )
}
