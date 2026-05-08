import type { Demo } from "./doc-sample";

export const LABEL_DEMOS: Demo[] = [
  {
    id: "default",
    label: "Default",
    spec: { root: "l", elements: { l: { type: "Label", props: { text: "Email" } } } },
  },
  {
    id: "with-input",
    label: "With input",
    spec: {
      root: "f",
      elements: {
        f: { type: "Field", props: {}, children: ["lbl", "in"] },
        lbl: { type: "FieldLabel", props: { text: "Email", htmlFor: "email" }, children: [] },
        in: { type: "Input", props: { id: "email", type: "email", placeholder: "you@example.com" }, children: [] },
      },
    },
  },
  {
    id: "disabled-peer",
    label: "Disabled peer",
    spec: {
      root: "f",
      elements: {
        f: { type: "Field", props: {}, children: ["lbl", "in"] },
        lbl: { type: "FieldLabel", props: { text: "Email", htmlFor: "email-d" }, children: [] },
        in: { type: "Input", props: { id: "email-d", placeholder: "Disabled", disabled: true }, children: [] },
      },
    },
  },
];
