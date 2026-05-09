import type { Sample } from "./types"

const sample: Sample = {
  id: "empty-state",
  kind: "block",
  title: "Empty state",
  description: "Centered empty state — eyebrow, headline, helper copy, primary CTA. For zero-data screens.",
  componentName: "EmptyState",
  category: "Marketing",
  order: 2,
  featured: true,
  registryDependencies: ["card", "stack", "heading", "button"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: { className: "text-center" }, children: ["content"] },
      content: { type: "CardContent", props: { className: "py-14" }, children: ["stack"] },
      stack: { type: "Stack", props: { direction: "col", gap: "3", align: "center" }, children: ["eb", "hd", "body", "btn"] },
      eb: { type: "Text", props: { content: "no projects yet", size: "xs", mono: true, className: "uppercase tracking-wider text-muted-foreground" }, children: [] },
      hd: { type: "Heading", props: { text: "Start your first project", level: "h2" }, children: [] },
      body: { type: "Text", props: { content: "Projects organize machines, tickets, and team activity. You can rename them anytime.", size: "sm", muted: true, className: "max-w-sm" }, children: [] },
      btn: { type: "Button", props: { label: "New project" }, children: [] },
    },
  },
}

export default sample
