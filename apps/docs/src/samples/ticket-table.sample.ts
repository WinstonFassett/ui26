import type { Sample } from "./types"

const GRID_ROW_CLS = "grid grid-cols-[24px_80px_1fr_120px_80px_100px_80px] items-center gap-2.5 px-4"

const sample: Sample = {
  id: "ticket-table",
  kind: "block",
  title: "Ticket table",
  description: "Issue list with repeat-driven rows — badge variants, checkbox state, and assignees driven by spec state.",
  componentName: "TicketTable",
  category: "Productivity",
  order: 3,
  registryDependencies: ["card", "badge", "button", "checkbox"],
  spec: {
    root: "container",
    state: {
      tickets: [
        { id: "MCN-142", title: "Payment retry loops past paying → idle briefly",  st: "In progress", stCls: "text-info",        p: "P1", pVariant: "outline",      pCls: "text-warn",    assignees: "KM · JR", u: "3m",        active: true  },
        { id: "MCN-141", title: "useMachine persist flag should accept a key",       st: "Review",      stCls: "text-warn",        p: "P2", pVariant: "outline",      pCls: "text-info",    assignees: "LS",      u: "1h"               },
        { id: "MCN-140", title: "Type inference breaks on nested effect() resolve",  st: "Blocked",     stCls: "text-destructive", p: "P0", pVariant: "destructive",  pCls: "",             assignees: "AP",      u: "2h"               },
        { id: "MCN-139", title: "Docs: examples/checkout.ts missing retry arrow",   st: "Draft",       stCls: "text-purple",      p: "P3", pVariant: "secondary",    pCls: "",             assignees: "KM",      u: "5h"               },
        { id: "MCN-138", title: "Add matchState narrow utility to public API",       st: "Shipping",    stCls: "text-success",     p: "P2", pVariant: "outline",      pCls: "text-info",    assignees: "JR · AP · LS", u: "yesterday" },
        { id: "MCN-137", title: "Playground: ⌘+Enter should run, not submit",       st: "In progress", stCls: "text-info",        p: "P2", pVariant: "outline",      pCls: "text-info",    assignees: "KM",      u: "yesterday"        },
        { id: "MCN-136", title: "createMachine throws on empty state set",           st: "Shipping",    stCls: "text-success",     p: "P1", pVariant: "outline",      pCls: "text-warn",    assignees: "AP",      u: "2d"               },
      ],
    },
    elements: {
      container: {
        type: "Stack",
        props: { direction: "col", gap: "0", className: "border border-border rounded bg-card overflow-hidden" },
        children: ["toolbar", "col-headers", "ticket-row"],
      },

      // ── Toolbar ────────────────────────────────────────────────────────────
      toolbar: {
        type: "Stack",
        props: { direction: "row", gap: "3", align: "center", className: "px-4 py-3 border-b border-border" },
        children: ["toolbar-title", "toolbar-badge", "toolbar-spacer", "btn-filter", "btn-sort", "btn-group", "btn-new"],
      },
      "toolbar-title": { type: "Text",   props: { content: "All issues", className: "text-[13px] font-semibold" }, children: [] },
      "toolbar-badge": { type: "Badge",  props: { text: "128", variant: "secondary" }, children: [] },
      "toolbar-spacer": { type: "Stack", props: { direction: "col", gap: "0", className: "flex-1" }, children: [] },
      "btn-filter": { type: "Button", props: { label: "⌕ Filter", variant: "ghost", size: "sm" }, children: [] },
      "btn-sort":   { type: "Button", props: { label: "↕ Sort",   variant: "ghost", size: "sm" }, children: [] },
      "btn-group":  { type: "Button", props: { label: "⊞ Group",  variant: "ghost", size: "sm" }, children: [] },
      "btn-new":    { type: "Button", props: { label: "＋ New",                      size: "sm" }, children: [] },

      // ── Column headers ─────────────────────────────────────────────────────
      "col-headers": {
        type: "Stack",
        props: { direction: "col", gap: "0", className: `${GRID_ROW_CLS} py-2 border-b border-border font-mono text-[10px] tracking-[0.06em] uppercase text-text-mute` },
        children: ["ch-empty", "ch-id", "ch-title", "ch-status", "ch-priority", "ch-assignees", "ch-updated"],
      },
      "ch-empty":     { type: "Text", props: { content: " " }, children: [] },
      "ch-id":        { type: "Text", props: { content: "ID" }, children: [] },
      "ch-title":     { type: "Text", props: { content: "Title" }, children: [] },
      "ch-status":    { type: "Text", props: { content: "Status" }, children: [] },
      "ch-priority":  { type: "Text", props: { content: "Priority" }, children: [] },
      "ch-assignees": { type: "Text", props: { content: "Assignees" }, children: [] },
      "ch-updated":   { type: "Text", props: { content: "Updated" }, children: [] },

      // ── Ticket row (repeated once per /tickets item) ────────────────────────
      "ticket-row": {
        type: "Stack",
        props: {
          direction: "col",
          gap: "0",
          className: {
            $cond: { $item: "active" },
            $then: `${GRID_ROW_CLS} py-2.5 border-b border-border bg-muted`,
            $else: `${GRID_ROW_CLS} py-2.5 border-b border-border`,
          },
        },
        repeat: { statePath: "/tickets", key: "id" },
        children: ["cell-cb", "cell-id", "cell-title", "cell-status", "cell-priority", "cell-assignees", "cell-updated"],
      },
      "cell-cb":         { type: "Checkbox", props: { checked: { $item: "active" } }, children: [] },
      "cell-id":         { type: "Text",     props: { content: { $item: "id" },        mono: true, muted: true, className: "text-[11px]" }, children: [] },
      "cell-title":      { type: "Text",     props: { content: { $item: "title" },     className: "text-[13px] tracking-[-0.005em]" }, children: [] },
      "cell-status":     { type: "Badge",    props: { text: { $template: "● ${st}" }, variant: "outline", className: { $item: "stCls" } }, children: [] },
      "cell-priority":   { type: "Badge",    props: { text: { $item: "p" },            variant: { $item: "pVariant" }, className: { $item: "pCls" } }, children: [] },
      "cell-assignees":  { type: "Text",     props: { content: { $item: "assignees" }, mono: true, muted: true, className: "text-[11px]" }, children: [] },
      "cell-updated":    { type: "Text",     props: { content: { $item: "u" },         mono: true, muted: true, className: "text-[11px]" }, children: [] },
    },
  },
}

export default sample
