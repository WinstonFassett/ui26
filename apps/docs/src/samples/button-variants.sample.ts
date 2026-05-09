import type { Sample } from "./types"

const sample: Sample = {
  id: "button-variants",
  kind: "atom",
  title: "Button variants",
  description: "All button variants in one row — default, secondary, outline, ghost, destructive.",
  componentName: "ButtonVariants",
  relatedComponent: "button",
  group: "variants",
  spec: {
    root: "row",
    elements: {
      row: {
        type: "Stack",
        props: { direction: "row", className: "flex-wrap items-center gap-2" },
        children: ["b1", "b2", "b3", "b4", "b5"],
      },
      b1: { type: "Button", props: { label: "Button" }, children: [] },
      b2: { type: "Button", props: { label: "Button", variant: "secondary" }, children: [] },
      b3: { type: "Button", props: { label: "Button", variant: "outline" }, children: [] },
      b4: { type: "Button", props: { label: "Button", variant: "ghost" }, children: [] },
      b5: { type: "Button", props: { label: "Button", variant: "destructive" }, children: [] },
    },
  },
}

export default sample
