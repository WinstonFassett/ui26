import type { Sample } from "./types"

const sample: Sample = {
  id: "activity-feed",
  kind: "block",
  title: "Activity feed",
  description: "Card with a stack of timeline entries — actor, action, timestamp. For project changelogs and audit panes.",
  componentName: "ActivityFeed",
  category: "Productivity",
  order: 1,
  featured: true,
  registryDependencies: ["card", "stack", "badge"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: {}, children: ["hdr", "content"] },
      hdr: { type: "CardHeader", props: {}, children: ["title", "desc"] },
      title: { type: "CardTitle", props: { text: "Recent activity" }, children: [] },
      desc: { type: "CardDescription", props: { text: "Last 7 days across all machines." }, children: [] },
      content: { type: "CardContent", props: {}, children: ["stack"] },
      stack: { type: "Stack", props: { direction: "col", gap: "3" }, children: ["r1", "r2", "r3"] },
      r1: { type: "Stack", props: { direction: "row", gap: "3", align: "center" }, children: ["b1", "t1", "ts1"] },
      b1: { type: "Badge", props: { text: "ship", variant: "default" }, children: [] },
      t1: { type: "Text", props: { content: "kai shipped Payment retry loop", size: "sm", className: "flex-1" }, children: [] },
      ts1: { type: "Text", props: { content: "3h", size: "xs", muted: true, mono: true }, children: [] },
      r2: { type: "Stack", props: { direction: "row", gap: "3", align: "center" }, children: ["b2", "t2", "ts2"] },
      b2: { type: "Badge", props: { text: "merge", variant: "secondary" }, children: [] },
      t2: { type: "Text", props: { content: "winston merged Field family port", size: "sm", className: "flex-1" }, children: [] },
      ts2: { type: "Text", props: { content: "5h", size: "xs", muted: true, mono: true }, children: [] },
      r3: { type: "Stack", props: { direction: "row", gap: "3", align: "center" }, children: ["b3", "t3", "ts3"] },
      b3: { type: "Badge", props: { text: "open", variant: "outline" }, children: [] },
      t3: { type: "Text", props: { content: "ai opened Investigate flaky checkout test", size: "sm", className: "flex-1" }, children: [] },
      ts3: { type: "Text", props: { content: "1d", size: "xs", muted: true, mono: true }, children: [] },
    },
  },
}

export default sample
