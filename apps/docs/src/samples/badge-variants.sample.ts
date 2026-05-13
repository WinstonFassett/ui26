import type { Sample } from "./types"

const sample: Sample = {
  id: "badge-variants",
  kind: "atom",
  title: "Badge variants",
  description: "All badge variants in one row — default, secondary, outline, ghost, destructive.",
  componentName: "BadgeVariants",
  relatedComponent: "badge",
  group: "variants",
  featured: true,
  span: "full",
  spec: {
    root: "row",
    elements: {
      row: {
        type: "Stack",
        props: { direction: "row", className: "flex-wrap items-center gap-1.5" },
        children: ["b1", "b2", "b3", "b4", "b5"],
      },
      b1: { type: "Badge", props: { text: "Badge" }, children: [] },
      b2: { type: "Badge", props: { text: "Badge", variant: "secondary" }, children: [] },
      b3: { type: "Badge", props: { text: "Badge", variant: "outline" }, children: [] },
      b4: { type: "Badge", props: { text: "Badge", variant: "ghost" }, children: [] },
      b5: { type: "Badge", props: { text: "Badge", variant: "destructive" }, children: [] },
    },
  },
}

export default sample
