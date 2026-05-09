import type { Sample } from "./types"

const sample: Sample = {
  id: "stats-card",
  kind: "block",
  title: "Stats card",
  description: "Card with a stack of label · value rows — for dashboards and recap surfaces.",
  componentName: "StatsCard",
  category: "Cards",
  order: 2,
  registryDependencies: ["card"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: {}, children: ["hdr", "content"] },
      hdr: { type: "CardHeader", props: {}, children: ["title", "desc"] },
      title: { type: "CardTitle", props: { text: "Weekly transitions" }, children: [] },
      desc: { type: "CardDescription", props: { text: "Past 7 days across all machines." }, children: [] },
      content: { type: "CardContent", props: {}, children: ["stack"] },
      stack: { type: "Stack", props: { direction: "col", gap: "2" }, children: ["s1", "s2", "s3"] },
      s1: { type: "Text", props: { content: "Transitions · 1,284 (+12%)", size: "sm" }, children: [] },
      s2: { type: "Text", props: { content: "Avg latency · 142ms (−6%)", size: "sm", muted: true }, children: [] },
      s3: { type: "Text", props: { content: "Error rate · 0.3% (+0.1%)", size: "sm", muted: true }, children: [] },
    },
  },
}

export default sample
