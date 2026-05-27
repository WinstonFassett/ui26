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
        props: { direction: "row", className: "items-center gap-6" },
        children: ["f1", "f2", "f3", "f4"],
      },
      f1: { type: "Field", props: { orientation: "horizontal" }, children: ["c1", "l1"] },
      c1: { type: "Checkbox", props: { id: "cbs-1" }, children: [] },
      l1: { type: "FieldLabel", props: { text: "Default", htmlFor: "cbs-1" }, children: [] },
      f2: { type: "Field", props: { orientation: "horizontal" }, children: ["c2", "l2"] },
      c2: { type: "Checkbox", props: { id: "cbs-2", checked: true }, children: [] },
      l2: { type: "FieldLabel", props: { text: "Checked", htmlFor: "cbs-2" }, children: [] },
      f3: { type: "Field", props: { orientation: "horizontal", className: "opacity-50" }, children: ["c3", "l3"] },
      c3: { type: "Checkbox", props: { id: "cbs-3", disabled: true }, children: [] },
      l3: { type: "FieldLabel", props: { text: "Disabled", htmlFor: "cbs-3" }, children: [] },
      f4: { type: "Field", props: { orientation: "horizontal", className: "opacity-50" }, children: ["c4", "l4"] },
      c4: { type: "Checkbox", props: { id: "cbs-4", disabled: true, checked: true }, children: [] },
      l4: { type: "FieldLabel", props: { text: "Disabled checked", htmlFor: "cbs-4" }, children: [] },
    },
  },
}

export default sample
