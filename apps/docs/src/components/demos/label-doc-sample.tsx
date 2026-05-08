"use client";

import { Label } from "@registry/label/label";
import { Input } from "@registry/input/input";
import { Field, FieldLabel } from "@registry/field/field";
import { DemoSection } from "./doc-sample";
import { LABEL_DEMOS } from "./label-demos";

export function LabelDocSample() {
  return (
    <DemoSection
      title="Compositions"
      namePrefix="Label"
      demos={LABEL_DEMOS}
      renderTile={(demo) => {
        if (demo.id === "default") {
          return <Label>Email</Label>;
        }
        if (demo.id === "with-input") {
          return (
            <Field className="pointer-events-none w-44">
              <FieldLabel>Email</FieldLabel>
              <Input type="email" placeholder="you@example.com" tabIndex={-1} />
            </Field>
          );
        }
        // disabled-peer
        return (
          <Field className="pointer-events-none w-44">
            <FieldLabel>Email</FieldLabel>
            <Input placeholder="Disabled" disabled tabIndex={-1} />
          </Field>
        );
      }}
    />
  );
}
