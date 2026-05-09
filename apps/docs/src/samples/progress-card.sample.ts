import type { Sample } from "./types"

const sample: Sample = {
  id: "progress-card",
  kind: "block",
  title: "Progress card",
  description: "Upload queue with three progress rows — label/percentage header and a Progress bar per file.",
  componentName: "ProgressCard",
  category: "Feedback",
  order: 4,
  registryDependencies: ["card", "progress"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: {}, children: ["header", "content"] },
      header: { type: "CardHeader", props: {}, children: ["label", "title"] },
      label: {
        type: "CardDescription",
        props: { text: "Progress", className: "font-mono text-[10px] tracking-[0.08em] uppercase text-text-mute" },
        children: [],
      },
      title: { type: "CardTitle", props: { text: "Upload queue" }, children: [] },
      content: { type: "CardContent", props: {}, children: ["rows"] },
      rows: {
        type: "Stack",
        props: { direction: "col", gap: "3" },
        children: ["row-1", "row-2", "row-3"],
      },

      "row-1": { type: "Stack", props: { direction: "col", gap: "0" }, children: ["row-1-hd", "row-1-bar"] },
      "row-1-hd": {
        type: "Stack",
        props: { direction: "row", justify: "between", className: "mb-1.5" },
        children: ["row-1-name", "row-1-pct"],
      },
      "row-1-name": { type: "Text", props: { content: "checkout.ts", mono: true, muted: true, className: "text-[10px]" }, children: [] },
      "row-1-pct":  { type: "Text", props: { content: "100%",        mono: true, muted: true, className: "text-[10px]" }, children: [] },
      "row-1-bar":  { type: "Progress", props: { value: 100, variant: "success" }, children: [] },

      "row-2": { type: "Stack", props: { direction: "col", gap: "0" }, children: ["row-2-hd", "row-2-bar"] },
      "row-2-hd": {
        type: "Stack",
        props: { direction: "row", justify: "between", className: "mb-1.5" },
        children: ["row-2-name", "row-2-pct"],
      },
      "row-2-name": { type: "Text", props: { content: "fetcher.ts", mono: true, muted: true, className: "text-[10px]" }, children: [] },
      "row-2-pct":  { type: "Text", props: { content: "72%",        mono: true, muted: true, className: "text-[10px]" }, children: [] },
      "row-2-bar":  { type: "Progress", props: { value: 72 }, children: [] },

      "row-3": { type: "Stack", props: { direction: "col", gap: "0" }, children: ["row-3-hd", "row-3-bar"] },
      "row-3-hd": {
        type: "Stack",
        props: { direction: "row", justify: "between", className: "mb-1.5" },
        children: ["row-3-name", "row-3-pct"],
      },
      "row-3-name": { type: "Text", props: { content: "auth.ts",    mono: true, muted: true, className: "text-[10px]" }, children: [] },
      "row-3-pct":  { type: "Text", props: { content: "38%",        mono: true, muted: true, className: "text-[10px]" }, children: [] },
      "row-3-bar":  { type: "Progress", props: { value: 38, variant: "destructive" }, children: [] },
    },
  },
}

export default sample
