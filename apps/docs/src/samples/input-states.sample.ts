import type { Sample } from "./types"

const sample: Sample = {
  id: "input-states",
  kind: "atom",
  title: "Input states",
  description: "All input states in one column — default, invalid, disabled, file.",
  componentName: "InputStates",
  relatedComponent: "input",
  group: "states",
  spec: {
    root: "col",
    elements: {
      col: {
        type: "Stack",
        props: { direction: "col", className: "gap-2 max-w-sm" },
        children: ["i1", "i2", "i3", "i4"],
      },
      i1: { type: "Input", props: { placeholder: "Type here" }, children: [] },
      i2: { type: "Input", props: { value: "not-an-email", invalid: true }, children: [] },
      i3: { type: "Input", props: { placeholder: "Disabled", disabled: true }, children: [] },
      i4: { type: "Input", props: { type: "file" }, children: [] },
    },
  },
}

export default sample
