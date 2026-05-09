import type { Sample } from "./types"

const sample: Sample = {
  id: "tooltip-card",
  kind: "block",
  title: "Tooltip card",
  description: "Hover state demo — one button with an absolutely-positioned tooltip bubble, two plain buttons alongside.",
  componentName: "TooltipCard",
  category: "Feedback",
  order: 7,
  registryDependencies: ["card", "button"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: {}, children: ["header", "content"] },
      header: { type: "CardHeader", props: {}, children: ["label", "title"] },
      label: {
        type: "CardDescription",
        props: { text: "Tooltip", className: "font-mono text-[10px] tracking-[0.08em] uppercase text-text-mute" },
        children: [],
      },
      title: { type: "CardTitle", props: { text: "Hover states" }, children: [] },
      content: { type: "CardContent", props: {}, children: ["row"] },
      row: {
        type: "Stack",
        props: { direction: "row", gap: "5", align: "center", className: "py-5" },
        children: ["relative-container", "docs-btn", "cmd-btn"],
      },

      // Button with tooltip above it
      "relative-container": {
        type: "Stack",
        props: { direction: "col", gap: "0", className: "relative" },
        children: ["assign-btn", "tooltip-bubble"],
      },
      "assign-btn": { type: "Button", props: { label: "↑ Assign", variant: "outline" }, children: [] },
      "tooltip-bubble": {
        type: "Stack",
        props: {
          direction: "row",
          gap: "0",
          align: "center",
          className: "absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-foreground text-background px-2 py-1 whitespace-nowrap",
        },
        children: ["tooltip-label", "tooltip-key"],
      },
      "tooltip-label": { type: "Text", props: { content: "Assign ticket", className: "text-[11px]" }, children: [] },
      "tooltip-key":   { type: "Text", props: { content: "A", className: "text-[11px] ml-1 font-mono text-text-mute" }, children: [] },

      "docs-btn": { type: "Button", props: { label: "🕮 Docs", variant: "outline" }, children: [] },
      "cmd-btn":  { type: "Button", props: { label: "⌘ ⌘K",  variant: "outline" }, children: [] },
    },
  },
}

export default sample
