import type { Sample } from "./types"

const sample: Sample = {
  id: "textarea-states",
  kind: "atom",
  title: "Textarea states",
  description: "All textarea states in one column — default, invalid, disabled.",
  componentName: "TextareaStates",
  relatedComponent: "textarea",
  group: "states",
  spec: {
    root: "col",
    elements: {
      col: {
        type: "Stack",
        props: { direction: "col", className: "gap-2 max-w-sm" },
        children: ["t1", "t2", "t3"],
      },
      t1: { type: "Textarea", props: { placeholder: "Type here", rows: 3 }, children: [] },
      t2: { type: "Textarea", props: { value: "too short", invalid: true, rows: 3 }, children: [] },
      t3: { type: "Textarea", props: { placeholder: "Disabled", disabled: true, rows: 3 }, children: [] },
    },
  },
}

export default sample
