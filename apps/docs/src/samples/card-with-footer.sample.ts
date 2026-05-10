import type { Sample } from "./types"

const sample: Sample = {
  id: "card-with-footer",
  kind: "atom",
  title: "Card with footer",
  description: "Card with header, content, and an action footer.",
  componentName: "CardWithFooter",
  relatedComponent: "card",
  group: "examples",
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: { className: "max-w-sm" }, children: ["header", "content", "footer"] },
      header: { type: "CardHeader", props: {}, children: ["title", "desc"] },
      title: { type: "CardTitle", props: { text: "Upgrade your plan" }, children: [] },
      desc: { type: "CardDescription", props: { text: "Unlock more projects and seats." }, children: [] },
      content: { type: "CardContent", props: {}, children: ["body"] },
      body: { type: "Text", props: { content: "$19/month, cancel anytime.", size: "sm", muted: true }, children: [] },
      footer: { type: "CardFooter", props: {}, children: ["btn"] },
      btn: { type: "Button", props: { label: "Upgrade" }, children: [] },
    },
  },
}

export default sample
