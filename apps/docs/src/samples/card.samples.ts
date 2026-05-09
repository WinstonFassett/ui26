import type { Sample } from "./types"

const samples: Sample[] = [
  {
    id: "card-basic",
    kind: "atom",
    title: "Basic card",
    description: "Minimal card with header and content — the foundation for all card compositions.",
    componentName: "CardBasic",
    relatedComponent: "card",
    group: "examples",
    key: "basic",
    spec: {
      root: "card",
      elements: {
        card: { type: "Card", props: {}, children: ["hdr", "content"] },
        hdr: { type: "CardHeader", props: {}, children: ["title", "desc"] },
        title: { type: "CardTitle", props: { text: "Card title" }, children: [] },
        desc: { type: "CardDescription", props: { text: "A short description that sits under the title." }, children: [] },
        content: { type: "CardContent", props: {}, children: ["body"] },
        body: { type: "Text", props: { content: "Body content sits here.", size: "sm" }, children: [] },
      },
    },
  },
  {
    id: "card-with-footer",
    kind: "atom",
    title: "With footer",
    description: "Card with header, content, and a footer CTA row.",
    componentName: "CardWithFooter",
    relatedComponent: "card",
    group: "examples",
    key: "with-footer",
    spec: {
      root: "card",
      elements: {
        card: { type: "Card", props: {}, children: ["hdr", "content", "footer"] },
        hdr: { type: "CardHeader", props: {}, children: ["title", "desc"] },
        title: { type: "CardTitle", props: { text: "Upgrade your plan" }, children: [] },
        desc: { type: "CardDescription", props: { text: "Unlock more projects and seats." }, children: [] },
        content: { type: "CardContent", props: {}, children: ["body"] },
        body: { type: "Text", props: { content: "$19/month, cancel anytime.", size: "sm", muted: true }, children: [] },
        footer: { type: "CardFooter", props: {}, children: ["btn"] },
        btn: { type: "Button", props: { label: "Upgrade" }, children: [] },
      },
    },
  },
]

export default samples
