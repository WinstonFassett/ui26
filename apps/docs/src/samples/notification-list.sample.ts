import type { Sample } from "./types"

const sample: Sample = {
  id: "notification-list",
  kind: "block",
  title: "Notification list",
  description: "Card containing a stack of toast-style notifications with tonal left-border accents.",
  componentName: "NotificationList",
  category: "Productivity",
  order: 10,
  featured: true,
  registryDependencies: ["card", "stack"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: { className: "max-w-sm" }, children: ["hdr", "content"] },
      hdr: { type: "CardHeader", props: {}, children: ["title"] },
      title: { type: "CardTitle", props: { text: "Notifications" }, children: [] },
      content: { type: "CardContent", props: {}, children: ["list"] },
      list: { type: "Stack", props: { direction: "col", gap: "2" }, children: ["n1", "n2", "n3", "n4"] },

      n1: { type: "Stack", props: { direction: "row", gap: "3", align: "start", className: "border border-border rounded px-3 py-2.5 border-l-2 border-l-success" }, children: ["i1", "b1", "x1"] },
      i1: { type: "Text", props: { content: "✓", mono: true, className: "text-success text-[13px]" }, children: [] },
      b1: { type: "Stack", props: { direction: "col", gap: "0.5", className: "flex-1" }, children: ["t1", "s1"] },
      t1: { type: "Text", props: { content: "Machine deployed", size: "sm" }, children: [] },
      s1: { type: "Text", props: { content: "checkout@2.1.0 · 1.2kb gzipped", size: "xs", muted: true }, children: [] },
      x1: { type: "Text", props: { content: "✕", mono: true, muted: true, className: "text-[11px]" }, children: [] },

      n2: { type: "Stack", props: { direction: "row", gap: "3", align: "start", className: "border border-border rounded px-3 py-2.5 border-l-2 border-l-warn" }, children: ["i2", "b2", "x2"] },
      i2: { type: "Text", props: { content: "⚠", mono: true, className: "text-warn text-[13px]" }, children: [] },
      b2: { type: "Stack", props: { direction: "col", gap: "0.5", className: "flex-1" }, children: ["t2", "s2"] },
      t2: { type: "Text", props: { content: "Effect timed out", size: "sm" }, children: [] },
      s2: { type: "Text", props: { content: "fetchUser() exceeded 3s — retrying", size: "xs", muted: true }, children: [] },
      x2: { type: "Text", props: { content: "✕", mono: true, muted: true, className: "text-[11px]" }, children: [] },

      n3: { type: "Stack", props: { direction: "row", gap: "3", align: "start", className: "border border-border rounded px-3 py-2.5 border-l-2 border-l-destructive" }, children: ["i3", "b3", "x3"] },
      i3: { type: "Text", props: { content: "✕", mono: true, className: "text-destructive text-[13px]" }, children: [] },
      b3: { type: "Stack", props: { direction: "col", gap: "0.5", className: "flex-1" }, children: ["t3", "s3"] },
      t3: { type: "Text", props: { content: "Type error in transitions", size: "sm" }, children: [] },
      s3: { type: "Text", props: { content: 'paying.fail → "falied" — did you mean "failed"?', size: "xs", muted: true }, children: [] },
      x3: { type: "Text", props: { content: "✕", mono: true, muted: true, className: "text-[11px]" }, children: [] },

      n4: { type: "Stack", props: { direction: "row", gap: "3", align: "start", className: "border border-border rounded px-3 py-2.5 border-l-2 border-l-info" }, children: ["i4", "b4", "x4"] },
      i4: { type: "Text", props: { content: "ℹ", mono: true, className: "text-info text-[13px]" }, children: [] },
      b4: { type: "Stack", props: { direction: "col", gap: "0.5", className: "flex-1" }, children: ["t4", "s4"] },
      t4: { type: "Text", props: { content: "Claude finished rollup", size: "sm" }, children: [] },
      s4: { type: "Text", props: { content: "42 tickets → 7 changelog entries · Review now ↗", size: "xs", muted: true }, children: [] },
      x4: { type: "Text", props: { content: "✕", mono: true, muted: true, className: "text-[11px]" }, children: [] },
    },
  },
}

export default sample
