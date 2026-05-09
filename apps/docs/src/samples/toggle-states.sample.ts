import type { Sample } from "./types"

const sample: Sample = {
  id: "toggle-states",
  kind: "atom",
  title: "Toggle states",
  description: "All toggle variants and sizes in one row — default, pressed, outline, ghost, icon, sm, disabled.",
  componentName: "ToggleStates",
  relatedComponent: "toggle",
  group: "states",
  spec: {
    root: "row",
    elements: {
      row: {
        type: "Stack",
        props: { direction: "row", className: "items-center gap-2 flex-wrap" },
        children: ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"],
      },
      t1: { type: "Toggle", props: { label: "Bold" }, children: [] },
      t2: { type: "Toggle", props: { label: "Italic", pressed: true }, children: [] },
      t3: { type: "Toggle", props: { label: "Underline", variant: "outline" }, children: [] },
      t4: { type: "Toggle", props: { label: "Code", variant: "ghost" }, children: [] },
      t5: { type: "Toggle", props: { label: "B", size: "icon" }, children: [] },
      t6: { type: "Toggle", props: { label: "I", size: "icon", pressed: true }, children: [] },
      t7: { type: "Toggle", props: { label: "sm", size: "sm", pressed: true }, children: [] },
      t8: { type: "Toggle", props: { label: "Disabled", disabled: true }, children: [] },
    },
  },
}

export default sample
