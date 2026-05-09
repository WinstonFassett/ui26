import type { Sample } from "./types"

const sample: Sample = {
  id: "switch-states",
  kind: "atom",
  title: "Switch states",
  description: "All switch states in one row — default, checked, disabled, disabled+checked.",
  componentName: "SwitchStates",
  relatedComponent: "switch",
  group: "states",
  spec: {
    root: "row",
    elements: {
      row: {
        type: "Stack",
        props: { direction: "row", className: "items-center gap-4" },
        children: ["s1", "s2", "s3", "s4"],
      },
      s1: { type: "Switch", props: {}, children: [] },
      s2: { type: "Switch", props: { checked: true }, children: [] },
      s3: { type: "Switch", props: { disabled: true }, children: [] },
      s4: { type: "Switch", props: { disabled: true, checked: true }, children: [] },
    },
  },
}

export default sample
