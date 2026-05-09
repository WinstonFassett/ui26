import type { Sample } from "./types"

const sample: Sample = {
  id: "label-compositions",
  kind: "atom",
  title: "Label compositions",
  description: "Standalone label, label+input field, and disabled-peer behavior.",
  componentName: "LabelCompositions",
  relatedComponent: "label",
  group: "compositions",
  spec: {
    root: "col",
    elements: {
      col: {
        type: "Stack",
        props: { direction: "col", className: "gap-4 max-w-sm" },
        children: ["l1", "f1", "f2"],
      },
      l1: { type: "Label", props: { text: "Email" }, children: [] },
      f1: { type: "Field", props: {}, children: ["f1l", "f1i"] },
      f1l: { type: "FieldLabel", props: { text: "Email", htmlFor: "email" }, children: [] },
      f1i: { type: "Input", props: { id: "email", type: "email", placeholder: "you@example.com" }, children: [] },
      f2: { type: "Field", props: {}, children: ["f2l", "f2i"] },
      f2l: { type: "FieldLabel", props: { text: "Disabled peer", htmlFor: "email-d" }, children: [] },
      f2i: { type: "Input", props: { id: "email-d", placeholder: "Disabled", disabled: true }, children: [] },
    },
  },
}

export default sample
