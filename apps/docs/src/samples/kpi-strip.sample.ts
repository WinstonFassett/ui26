import type { Sample } from "./types"

const sample: Sample = {
  id: "kpi-strip",
  kind: "block",
  title: "KPI strip",
  description: "Three-column metric strip — label, value, delta — for dashboard headers and overview banners.",
  componentName: "KpiStrip",
  category: "Cards",
  order: 3,
  featured: true,
  registryDependencies: ["card", "grid"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: {}, children: ["content"] },
      content: { type: "CardContent", props: { className: "py-6" }, children: ["grid"] },
      grid: { type: "Grid", props: { className: "grid-cols-3 gap-6" }, children: ["k1", "k2", "k3"] },
      k1: { type: "Stack", props: { direction: "col", gap: "1" }, children: ["k1-lbl", "k1-val", "k1-delta"] },
      "k1-lbl": { type: "Text", props: { content: "MRR", size: "xs", mono: true, className: "uppercase tracking-wider text-muted-foreground" }, children: [] },
      "k1-val": { type: "Heading", props: { text: "$24.6k", level: "h3", className: "tabular-nums" }, children: [] },
      "k1-delta": { type: "Text", props: { content: "+12.4% vs last month", size: "xs", muted: true }, children: [] },
      k2: { type: "Stack", props: { direction: "col", gap: "1" }, children: ["k2-lbl", "k2-val", "k2-delta"] },
      "k2-lbl": { type: "Text", props: { content: "Active users", size: "xs", mono: true, className: "uppercase tracking-wider text-muted-foreground" }, children: [] },
      "k2-val": { type: "Heading", props: { text: "1,284", level: "h3", className: "tabular-nums" }, children: [] },
      "k2-delta": { type: "Text", props: { content: "+8.1% vs last month", size: "xs", muted: true }, children: [] },
      k3: { type: "Stack", props: { direction: "col", gap: "1" }, children: ["k3-lbl", "k3-val", "k3-delta"] },
      "k3-lbl": { type: "Text", props: { content: "Churn", size: "xs", mono: true, className: "uppercase tracking-wider text-muted-foreground" }, children: [] },
      "k3-val": { type: "Heading", props: { text: "0.6%", level: "h3", className: "tabular-nums" }, children: [] },
      "k3-delta": { type: "Text", props: { content: "−0.2pp vs last month", size: "xs", muted: true }, children: [] },
    },
  },
}

export default sample
