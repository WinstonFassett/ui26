import type { Sample } from "./types"

const sample: Sample = {
  id: "context-menu",
  kind: "block",
  title: "Context menu",
  description: "Ticket action context menu with keyboard shortcuts, grouped by separator — right-click pattern.",
  componentName: "ContextMenu",
  category: "Overlays",
  order: 1,
  registryDependencies: ["separator"],
  spec: {
    root: "container",
    elements: {
      container: {
        type: "Stack",
        props: { direction: "col", gap: "0", className: "border border-border rounded bg-card overflow-hidden" },
        children: ["header", "item-open", "item-tab", "item-copy", "sep1", "item-assign", "item-dup", "sep2", "item-delete", "spacer"],
      },
      header: {
        type: "Stack",
        props: { direction: "col", gap: "1", className: "px-5 pt-5 pb-2.5" },
        children: ["label", "title"],
      },
      label: {
        type: "Text",
        props: { content: "Menu (right-click)", mono: true, muted: true, className: "text-[10px] tracking-[0.08em] uppercase" },
        children: [],
      },
      title: { type: "Heading", props: { text: "Ticket actions", level: "h3" }, children: [] },

      "item-open": {
        type: "Stack",
        props: { direction: "row", gap: "2", align: "center", className: "px-4 py-1.5 bg-muted" },
        children: ["ico-open", "lbl-open", "key-open"],
      },
      "ico-open": { type: "Text", props: { content: "↵", mono: true, muted: true, className: "text-[11px] w-3.5 shrink-0" }, children: [] },
      "lbl-open": { type: "Text", props: { content: "Open", className: "flex-1 text-[13px]" }, children: [] },
      "key-open": { type: "Text", props: { content: "↵", mono: true, muted: true, className: "text-[10px]" }, children: [] },

      "item-tab": {
        type: "Stack",
        props: { direction: "row", gap: "2", align: "center", className: "px-4 py-1.5" },
        children: ["ico-tab", "lbl-tab", "key-tab"],
      },
      "ico-tab": { type: "Text", props: { content: "↗", mono: true, muted: true, className: "text-[11px] w-3.5 shrink-0" }, children: [] },
      "lbl-tab": { type: "Text", props: { content: "Open in new tab", className: "flex-1 text-[13px]" }, children: [] },
      "key-tab": { type: "Text", props: { content: "⌘↵", mono: true, muted: true, className: "text-[10px]" }, children: [] },

      "item-copy": {
        type: "Stack",
        props: { direction: "row", gap: "2", align: "center", className: "px-4 py-1.5" },
        children: ["ico-copy", "lbl-copy", "key-copy"],
      },
      "ico-copy": { type: "Text", props: { content: "⎘", mono: true, muted: true, className: "text-[11px] w-3.5 shrink-0" }, children: [] },
      "lbl-copy": { type: "Text", props: { content: "Copy link", className: "flex-1 text-[13px]" }, children: [] },
      "key-copy": { type: "Text", props: { content: "⌘C", mono: true, muted: true, className: "text-[10px]" }, children: [] },

      sep1: { type: "Separator", props: { orientation: "horizontal", className: "mx-2" }, children: [] },

      "item-assign": {
        type: "Stack",
        props: { direction: "row", gap: "2", align: "center", className: "px-4 py-1.5" },
        children: ["ico-assign", "lbl-assign", "key-assign"],
      },
      "ico-assign": { type: "Text", props: { content: "↑", mono: true, muted: true, className: "text-[11px] w-3.5 shrink-0" }, children: [] },
      "lbl-assign": { type: "Text", props: { content: "Assign to…", className: "flex-1 text-[13px]" }, children: [] },
      "key-assign": { type: "Text", props: { content: "A", mono: true, muted: true, className: "text-[10px]" }, children: [] },

      "item-dup": {
        type: "Stack",
        props: { direction: "row", gap: "2", align: "center", className: "px-4 py-1.5" },
        children: ["ico-dup", "lbl-dup", "key-dup"],
      },
      "ico-dup": { type: "Text", props: { content: "⧉", mono: true, muted: true, className: "text-[11px] w-3.5 shrink-0" }, children: [] },
      "lbl-dup": { type: "Text", props: { content: "Duplicate", className: "flex-1 text-[13px]" }, children: [] },
      "key-dup": { type: "Text", props: { content: "D", mono: true, muted: true, className: "text-[10px]" }, children: [] },

      sep2: { type: "Separator", props: { orientation: "horizontal", className: "mx-2" }, children: [] },

      "item-delete": {
        type: "Stack",
        props: { direction: "row", gap: "2", align: "center", className: "px-4 py-1.5" },
        children: ["ico-del", "lbl-del", "key-del"],
      },
      "ico-del": { type: "Text", props: { content: "✕", className: "text-[11px] w-3.5 shrink-0 font-mono text-destructive" }, children: [] },
      "lbl-del": { type: "Text", props: { content: "Delete", className: "flex-1 text-[13px] text-destructive" }, children: [] },
      "key-del": { type: "Text", props: { content: "⌫", className: "text-[10px] font-mono text-destructive" }, children: [] },

      spacer: {
        type: "Stack",
        props: { direction: "col", gap: "0", className: "h-4" },
        children: [],
      },
    },
  },
}

export default sample
