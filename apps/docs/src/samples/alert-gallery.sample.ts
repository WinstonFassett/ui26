import type { Sample } from "./types"

const sample: Sample = {
  id: "alert-gallery",
  kind: "block",
  title: "Alert gallery",
  description: "Four alert variants — default, success, warning, destructive — in a 2-column grid.",
  componentName: "AlertGallery",
  category: "Feedback",
  order: 1,
  span: "full",
  featured: true,
  registryDependencies: ["alert", "grid"],
  spec: {
    root: "grid",
    elements: {
      grid: { type: "Grid", props: { className: "grid-cols-2 gap-3" }, children: ["a1", "a2", "a3", "a4"] },
      a1: { type: "Alert", props: {}, children: ["a1t", "a1d"] },
      a1t: { type: "AlertTitle", props: { text: "Heads up" }, children: [] },
      a1d: { type: "AlertDescription", props: { text: "You can now publish machines to the edge network." }, children: [] },
      a2: { type: "Alert", props: { variant: "success" }, children: ["a2t", "a2d"] },
      a2t: { type: "AlertTitle", props: { text: "Deployed" }, children: [] },
      a2d: { type: "AlertDescription", props: { text: "checkout@2.1.0 is live — 1.2 kb gzipped." }, children: [] },
      a3: { type: "Alert", props: { variant: "warning" }, children: ["a3t", "a3d"] },
      a3t: { type: "AlertTitle", props: { text: "Breaking change in 2.0" }, children: [] },
      a3d: { type: "AlertDescription", props: { text: "The send() API now returns a promise — update your callers." }, children: [] },
      a4: { type: "Alert", props: { variant: "destructive" }, children: ["a4t", "a4d"] },
      a4t: { type: "AlertTitle", props: { text: "Type error" }, children: [] },
      a4d: { type: "AlertDescription", props: { text: 'paying.fail → "falied" — did you mean "failed"?' }, children: [] },
    },
  },
}

export default sample
