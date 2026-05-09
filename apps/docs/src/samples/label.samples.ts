import type { Sample } from "./types"

const samples: Sample[] = [
  {
    id: "label-default",
    kind: "atom",
    title: "Default",
    description: "Standalone label — associates text with a form element via htmlFor.",
    componentName: "LabelDefault",
    relatedComponent: "label",
    group: "compositions",
    key: "default",
    spec: { root: "l", elements: { l: { type: "Label", props: { text: "Email" } } } },
  },
  {
    id: "label-with-input",
    kind: "atom",
    title: "With input",
    description: "FieldLabel + Input inside a Field — the canonical label+field pattern.",
    componentName: "LabelWithInput",
    relatedComponent: "label",
    group: "compositions",
    key: "with-input",
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
    id: "label-disabled-peer",
    kind: "atom",
    title: "Disabled peer",
    description: "FieldLabel mutes automatically when its peer Input is disabled — peer-disabled CSS.",
    componentName: "LabelDisabledPeer",
    relatedComponent: "label",
    group: "compositions",
    key: "disabled-peer",
    spec: {
      root: "f",
      elements: {
        f: { type: "Field", props: {}, children: ["lbl", "in"] },
        lbl: { type: "FieldLabel", props: { text: "Email", htmlFor: "email-d" }, children: [] },
        in: { type: "Input", props: { id: "email-d", placeholder: "Disabled", disabled: true }, children: [] },
      },
    },
  },
]

export default samples
