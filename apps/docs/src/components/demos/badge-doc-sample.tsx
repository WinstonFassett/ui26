"use client";

import { Badge } from "@registry/badge/badge";
import { DemoSection } from "./doc-sample";
import { BADGE_VARIANT_DEMOS } from "./badge-demos";

export function BadgeDocSample() {
  return (
    <DemoSection
      title="Variants"
      demos={BADGE_VARIANT_DEMOS}
      renderTile={(demo) => (
        <Badge variant={demo.id as "default" | "secondary" | "outline" | "ghost" | "destructive"}>
          Badge
        </Badge>
      )}
    />
  )
}
