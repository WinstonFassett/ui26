import type { Sample } from "./types"

const sample: Sample = {
  id: "checkbox-states",
  kind: "atom",
  title: "Checkbox states",
  description: "All checkbox states in one row — default, checked, disabled, disabled+checked.",
  componentName: "CheckboxStates",
  relatedComponent: "checkbox",
  group: "states",
  spec: {
    root: "row",
    elements: {
      row: {
        type: "Stack",
        props: { direction: "row", className: "items-center gap-4" },
        children: ["c1", "c2", "c3", "c4"],
      },
      c1: { type: "Checkbox", props: {}, children: [] },
      c2: { type: "Checkbox", props: { checked: true }, children: [] },
      c3: { type: "Checkbox", props: { disabled: true }, children: [] },
      c4: { type: "Checkbox", props: { disabled: true, checked: true }, children: [] },
    },
  },
}

export default sample
