import type { Sample } from "./types"

const sample: Sample = {
  id: "button-sizes",
  kind: "atom",
  title: "Button sizes",
  description: "All button sizes in one row — sm, default, lg, icon.",
  componentName: "ButtonSizes",
  relatedComponent: "button",
  group: "sizes",
  spec: {
    root: "row",
    elements: {
      row: {
        type: "Stack",
        props: { direction: "row", className: "items-center gap-2" },
        children: ["s1", "s2", "s3", "s4"],
      },
      s1: { type: "Button", props: { label: "Button", size: "sm" }, children: [] },
      s2: { type: "Button", props: { label: "Button" }, children: [] },
      s3: { type: "Button", props: { label: "Button", size: "lg" }, children: [] },
      s4: { type: "Button", props: { label: "⚡", size: "icon" }, children: [] },
    },
  },
}

export default sample
