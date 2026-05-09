"use client";

import { Textarea } from "@registry/textarea/textarea";
import { DemoSection } from "./doc-sample";
import type { Demo } from "./doc-sample";
import { getSamples } from "@/samples";
import type { Sample } from "@/samples/types";

const STATE_DEMOS: Demo[] = getSamples({ kind: "atom", relatedComponent: "textarea", group: "states" })
  .map((s: Sample) => ({ id: s.key ?? s.id, label: s.title, spec: s.spec }));

const TILES: Record<string, React.ReactNode> = {
  default: <Textarea placeholder="Type here" rows={3} className="w-56" tabIndex={-1} />,
  invalid: <Textarea defaultValue="too short" aria-invalid rows={3} className="w-56" tabIndex={-1} />,
  disabled: <Textarea placeholder="Disabled" disabled rows={3} className="w-56" tabIndex={-1} />,
};

export function TextareaDocSample() {
  return (
    <DemoSection
      title="States"
      namePrefix="Textarea"
      demos={STATE_DEMOS}
      renderTile={(demo) => TILES[demo.id]}
    />
  );
}
