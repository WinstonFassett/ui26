import type { Sample } from "./types"

const sample: Sample = {
  id: "tooltip-card",
  kind: "block",
  title: "Tooltip card",
  description: "Hover any button to see a delayed tooltip — Matchina state machine, Floating UI positioning.",
  componentName: "TooltipCard",
  category: "Feedback",
  order: 7,
  registryDependencies: ["card", "button", "tooltip"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: {}, children: ["header", "content"] },
      header: { type: "CardHeader", props: {}, children: ["label", "title"] },
      label: {
        type: "CardDescription",
        props: { text: "Tooltip", className: "font-mono text-[10px] tracking-[0.08em] uppercase text-muted-foreground" },
        children: [],
      },
      title: { type: "CardTitle", props: { text: "Hover states" }, children: [] },
      content: { type: "CardContent", props: {}, children: ["row"] },
      row: {
        type: "Stack",
        props: { direction: "row", gap: "5", align: "center", className: "py-5" },
        children: ["assign-tooltip", "docs-tooltip", "cmd-tooltip"],
      },

      // Assign button
      "assign-tooltip": {
        type: "Tooltip",
        props: {},
        children: ["assign-trigger", "assign-tip"],
      },
      "assign-trigger": {
        type: "TooltipTrigger",
        props: { asChild: true },
        children: ["assign-btn"],
      },
      "assign-btn": { type: "Button", props: { label: "↑ Assign", variant: "outline" }, children: [] },
      "assign-tip": {
        type: "TooltipContent",
        props: {},
        children: ["assign-tip-text"],
      },
      "assign-tip-text": { type: "Text", props: { content: "Assign ticket  A", className: "text-[11px]" }, children: [] },

      // Docs button
      "docs-tooltip": {
        type: "Tooltip",
        props: {},
        children: ["docs-trigger", "docs-tip"],
      },
      "docs-trigger": {
        type: "TooltipTrigger",
        props: { asChild: true },
        children: ["docs-btn"],
      },
      "docs-btn": { type: "Button", props: { label: "🕮 Docs", variant: "outline" }, children: [] },
      "docs-tip": {
        type: "TooltipContent",
        props: {},
        children: ["docs-tip-text"],
      },
      "docs-tip-text": { type: "Text", props: { content: "Open docs", className: "text-[11px]" }, children: [] },

      // Command palette button
      "cmd-tooltip": {
        type: "Tooltip",
        props: {},
        children: ["cmd-trigger", "cmd-tip"],
      },
      "cmd-trigger": {
        type: "TooltipTrigger",
        props: { asChild: true },
        children: ["cmd-btn"],
      },
      "cmd-btn": { type: "Button", props: { label: "⌘K", variant: "outline" }, children: [] },
      "cmd-tip": {
        type: "TooltipContent",
        props: {},
        children: ["cmd-tip-text"],
      },
      "cmd-tip-text": { type: "Text", props: { content: "Command palette  ⌘K", className: "text-[11px]" }, children: [] },
    },
  },
}

export default sample
