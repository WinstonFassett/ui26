import type { Sample } from "./types"

const sample: Sample = {
  id: "progress-variants",
  kind: "atom",
  title: "Variants",
  description: "Default, destructive, and success variants at 60%.",
  componentName: "ProgressVariants",
  relatedComponent: "progress",
  group: "variants",
  spec: {
    root: "col",
    elements: {
      col: { type: "Stack", props: { direction: "col", className: "gap-3 max-w-sm w-full" }, children: ["p1", "p2", "p3"] },
      p1: { type: "Progress", props: { value: 60 }, children: [] },
      p2: { type: "Progress", props: { value: 60, variant: "destructive" }, children: [] },
      p3: { type: "Progress", props: { value: 60, variant: "success" }, children: [] },
    },
  },
}

export default sample
