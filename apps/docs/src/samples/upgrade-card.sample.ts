import type { Sample } from "./types"

const sample: Sample = {
  id: "upgrade-card",
  kind: "block",
  title: "Upgrade card",
  description: "Card with body copy and a footer CTA — for plan upgrades and conversion prompts.",
  componentName: "UpgradeCard",
  category: "Marketing",
  order: 1,
  registryDependencies: ["card", "button"],
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
}

export default sample
