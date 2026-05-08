"use client";

import { Switch } from "@registry/switch/switch";
import { Field, FieldLabel } from "@registry/field/field";
import { DemoSection } from "./doc-sample";
import { SWITCH_STATE_DEMOS, SWITCH_LABEL_DEMOS } from "./switch-demos";

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
        demos={SWITCH_STATE_DEMOS}
        renderTile={(demo) => STATE_TILES[demo.id]}
      />
      <DemoSection
        title="Composition"
        demos={SWITCH_LABEL_DEMOS}
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
