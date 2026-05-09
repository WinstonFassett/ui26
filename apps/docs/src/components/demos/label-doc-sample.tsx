"use client";

import { Label } from "@registry/label/label";
import { Input } from "@registry/input/input";
import { Field, FieldLabel } from "@registry/field/field";
import { DemoSection } from "./doc-sample";
import type { Demo } from "./doc-sample";
import { getSamples } from "@/samples";
import type { Sample } from "@/samples/types";

const DEMOS: Demo[] = getSamples({ kind: "atom", relatedComponent: "label", group: "compositions" })
  .map((s: Sample) => ({ id: s.key ?? s.id, label: s.title, spec: s.spec }));

export function LabelDocSample() {
  return (
    <DemoSection
      title="Compositions"
      namePrefix="Label"
      demos={DEMOS}
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
