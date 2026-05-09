"use client";

import { BlockPreview } from "@/components/livecode/BlockPreview";
import { DemoCodeBlock } from "./doc-sample";
import { CARD_DEMOS } from "./card-demos";

export function CardDocSample() {
  return (
    <>
      {CARD_DEMOS.map((demo) => (
        <section key={demo.id} className="not-content my-8">
          <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {demo.label}
          </p>
          <div className="border border-border p-6 max-w-md">
            <BlockPreview spec={demo.spec} />
          </div>
          <div className="mt-4">
            <DemoCodeBlock spec={demo.spec} demoName={demo.id} namePrefix="Card" />
          </div>
        </section>
      ))}
    </>
  );
}
