"use client";

import { Switch } from "@registry/switch/switch";
import { Field, FieldLabel } from "@registry/field/field";
import { DemoSection } from "./doc-sample";
import type { Demo } from "./doc-sample";
import { getSamples } from "@/samples";
import type { Sample } from "@/samples/types";

function toDemos(samples: Sample[]): Demo[] {
  return samples.map((s) => ({ id: s.key ?? s.id, label: s.title, spec: s.spec }));
}

const STATE_DEMOS = toDemos(getSamples({ kind: "atom", relatedComponent: "switch", group: "states" }));
const COMPOSITION_DEMOS = toDemos(getSamples({ kind: "atom", relatedComponent: "switch", group: "composition" }));

const STATE_TILES: Record<string, React.ReactNode> = {
  default: <Switch tabIndex={-1} />,
  checked: <Switch defaultChecked tabIndex={-1} />,
  disabled: <Switch disabled tabIndex={-1} />,
  "disabled-checked": <Switch disabled defaultChecked tabIndex={-1} />,
};

export function SwitchDocSample() {
  return (
    <>
      <DemoSection
        title="States"
        namePrefix="Switch"
        demos={STATE_DEMOS}
        renderTile={(demo) => STATE_TILES[demo.id]}
      />
      <DemoSection
        title="Composition"
        namePrefix="Switch"
        demos={COMPOSITION_DEMOS}
        renderTile={() => (
          <Field orientation="horizontal" className="pointer-events-none">
            <Switch tabIndex={-1} />
            <FieldLabel>Notifications</FieldLabel>
          </Field>
        )}
      />
    </>
  );
}
