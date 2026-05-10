import type { Sample } from "./types"

const sample: Sample = {
  id: "card-basic",
  kind: "atom",
  title: "Basic card",
  description: "Card with header (title + description) and content body.",
  componentName: "CardBasic",
  relatedComponent: "card",
  group: "examples",
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: { className: "max-w-sm" }, children: ["header", "content"] },
      header: { type: "CardHeader", props: {}, children: ["title", "desc"] },
      title: { type: "CardTitle", props: { text: "Card title" }, children: [] },
      desc: { type: "CardDescription", props: { text: "A short description that sits under the title." }, children: [] },
      content: { type: "CardContent", props: {}, children: ["body"] },
      body: { type: "Text", props: { content: "Body content sits here.", size: "sm" }, children: [] },
    },
  },
}

export default sample
