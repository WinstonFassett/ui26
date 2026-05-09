import type { Sample } from "./types"

const sample: Sample = {
  id: "alert-variants",
  kind: "atom",
  title: "Alert variants",
  description: "All alert variants in one column — default, destructive, warning, success.",
  componentName: "AlertVariants",
  relatedComponent: "alert",
  group: "variants",
  spec: {
    root: "col",
    elements: {
      col: {
        type: "Stack",
        props: { direction: "col", className: "gap-3" },
        children: ["a1", "a2", "a3", "a4"],
      },
      a1: { type: "Alert", props: {}, children: ["a1t", "a1d"] },
      a1t: { type: "AlertTitle", props: { text: "Heads up" }, children: [] },
      a1d: { type: "AlertDescription", props: { text: "You can add components using the CLI." }, children: [] },
      a2: { type: "Alert", props: { variant: "destructive" }, children: ["a2t", "a2d"] },
      a2t: { type: "AlertTitle", props: { text: "Error" }, children: [] },
      a2d: { type: "AlertDescription", props: { text: "Your session has expired. Please log in again." }, children: [] },
      a3: { type: "Alert", props: { variant: "warning" }, children: ["a3t", "a3d"] },
      a3t: { type: "AlertTitle", props: { text: "Warning" }, children: [] },
      a3d: { type: "AlertDescription", props: { text: "This action cannot be undone once confirmed." }, children: [] },
      a4: { type: "Alert", props: { variant: "success" }, children: ["a4t", "a4d"] },
      a4t: { type: "AlertTitle", props: { text: "Success" }, children: [] },
      a4d: { type: "AlertDescription", props: { text: "Your changes have been saved." }, children: [] },
    },
  },
}

export default sample
