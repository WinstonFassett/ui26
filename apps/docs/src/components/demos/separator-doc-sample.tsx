"use client";

import { BlockPreview } from "@/components/livecode/BlockPreview";
import { DemoCodeBlock } from "./doc-sample";
import { getSample } from "@/samples";

const SAMPLE = getSample("separator-examples")!;

export function SeparatorDocSample() {
  return (
    <section className="not-content my-8">
      <div className="border border-border p-6">
        <BlockPreview spec={SAMPLE.spec} />
      </div>
      <div className="mt-4">
        <DemoCodeBlock spec={SAMPLE.spec} demoName={SAMPLE.componentName} />
      </div>
    </section>
  );
}
