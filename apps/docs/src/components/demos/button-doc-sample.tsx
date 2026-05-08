"use client";

import { Button } from "@registry/button/button";
import { DemoSection } from "./doc-sample";
import { BUTTON_VARIANT_DEMOS, BUTTON_SIZE_DEMOS } from "./button-demos";

export function ButtonDocSample() {
  return (
    <>
      <DemoSection
        title="Variants"
        namePrefix="Button"
        demos={BUTTON_VARIANT_DEMOS}
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
