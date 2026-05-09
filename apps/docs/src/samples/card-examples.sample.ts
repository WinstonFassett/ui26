import type { Sample } from "./types"

const sample: Sample = {
  id: "card-examples",
  kind: "atom",
  title: "Card examples",
  description: "Basic card and card with footer — the two canonical card compositions.",
  componentName: "CardExamples",
  relatedComponent: "card",
  group: "examples",
  spec: {
    root: "row",
    elements: {
      row: {
        type: "Stack",
        props: { direction: "row", className: "flex-wrap items-start gap-4" },
        children: ["c1", "c2"],
      },
      c1: { type: "Card", props: { className: "max-w-sm" }, children: ["c1h", "c1c"] },
      c1h: { type: "CardHeader", props: {}, children: ["c1t", "c1d"] },
      c1t: { type: "CardTitle", props: { text: "Card title" }, children: [] },
      c1d: { type: "CardDescription", props: { text: "A short description that sits under the title." }, children: [] },
      c1c: { type: "CardContent", props: {}, children: ["c1b"] },
      c1b: { type: "Text", props: { content: "Body content sits here.", size: "sm" }, children: [] },
      c2: { type: "Card", props: { className: "max-w-sm" }, children: ["c2h", "c2c", "c2f"] },
      c2h: { type: "CardHeader", props: {}, children: ["c2t", "c2d"] },
      c2t: { type: "CardTitle", props: { text: "Upgrade your plan" }, children: [] },
      c2d: { type: "CardDescription", props: { text: "Unlock more projects and seats." }, children: [] },
      c2c: { type: "CardContent", props: {}, children: ["c2b"] },
      c2b: { type: "Text", props: { content: "$19/month, cancel anytime.", size: "sm", muted: true }, children: [] },
      c2f: { type: "CardFooter", props: {}, children: ["c2btn"] },
      c2btn: { type: "Button", props: { label: "Upgrade" }, children: [] },
    },
  },
}

export default sample
