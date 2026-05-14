import type { Sample } from "./types"

const sample: Sample = {
  id: "progress-values",
  kind: "atom",
  title: "Values",
  description: "Progress bar at 0%, 33%, 66%, and 100%.",
  componentName: "ProgressValues",
  relatedComponent: "progress",
  group: "values",
  spec: {
    root: "col",
    elements: {
      col: { type: "Stack", props: { direction: "col", className: "gap-3 max-w-sm w-full" }, children: ["p1", "p2", "p3", "p4"] },
      p1: { type: "Progress", props: { value: 0 }, children: [] },
      p2: { type: "Progress", props: { value: 33 }, children: [] },
      p3: { type: "Progress", props: { value: 66 }, children: [] },
      p4: { type: "Progress", props: { value: 100 }, children: [] },
    },
  },
}

export default sample
