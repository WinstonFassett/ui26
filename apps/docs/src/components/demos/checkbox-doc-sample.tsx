"use client";

import { Checkbox } from "@registry/checkbox/checkbox";
import { Field, FieldLabel } from "@registry/field/field";
import { DemoSection } from "./doc-sample";
import { CHECKBOX_STATE_DEMOS, CHECKBOX_LABEL_DEMOS } from "./checkbox-demos";

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
        demos={CHECKBOX_STATE_DEMOS}
        renderTile={(demo) => STATE_TILES[demo.id]}
      />
      <DemoSection
        title="Composition"
        demos={CHECKBOX_LABEL_DEMOS}
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
