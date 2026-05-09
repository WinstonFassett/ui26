"use client";

import { Checkbox } from "@registry/checkbox/checkbox";
import { Field, FieldLabel } from "@registry/field/field";
import { DemoSection } from "./doc-sample";
import type { Demo } from "./doc-sample";
import { getSamples } from "@/samples";
import type { Sample } from "@/samples/types";

function toDemos(samples: Sample[]): Demo[] {
  return samples.map((s) => ({ id: s.key ?? s.id, label: s.title, spec: s.spec }));
}

const STATE_DEMOS = toDemos(getSamples({ kind: "atom", relatedComponent: "checkbox", group: "states" }));
const COMPOSITION_DEMOS = toDemos(getSamples({ kind: "atom", relatedComponent: "checkbox", group: "composition" }));

const STATE_TILES: Record<string, React.ReactNode> = {
  default: <Checkbox tabIndex={-1} />,
  checked: <Checkbox defaultChecked tabIndex={-1} />,
  disabled: <Checkbox disabled tabIndex={-1} />,
  "disabled-checked": <Checkbox disabled defaultChecked tabIndex={-1} />,
};

export function CheckboxDocSample() {
  return (
    <>
      <DemoSection
        title="States"
        namePrefix="Checkbox"
        demos={STATE_DEMOS}
        renderTile={(demo) => STATE_TILES[demo.id]}
      />
      <DemoSection
        title="Composition"
        namePrefix="Checkbox"
        demos={COMPOSITION_DEMOS}
        renderTile={() => (
          <Field orientation="horizontal" className="pointer-events-none">
            <Checkbox tabIndex={-1} />
            <FieldLabel>Accept terms</FieldLabel>
          </Field>
        )}
      />
    </>
  );
}
