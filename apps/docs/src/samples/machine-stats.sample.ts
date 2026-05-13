import type { Sample } from "./types"

const sample: Sample = {
  id: "machine-stats",
  kind: "block",
  title: "Machine stats",
  description: "Analytics panel with tab bar, 7-day bar chart, separator, and three stat callouts.",
  componentName: "MachineStats",
  category: "Productivity",
  order: 4,
  registryDependencies: ["separator"],
  spec: {
    root: "panel",
    state: {},
    elements: {
      panel: {
        type: "Stack",
        props: { direction: "col", gap: "0", className: "border border-border rounded bg-card overflow-hidden" },
        children: ["tab-row", "body"],
      },

      // ── Tab row ────────────────────────────────────────────────────────────
      "tab-row": {
        type: "Stack",
        props: { direction: "row", gap: "0", className: "border-b border-border pl-3.5" },
        children: ["tab-overview", "tab-states", "tab-transitions", "tab-effects", "tab-history"],
      },
      "tab-overview":     { type: "Text", props: { content: "Overview",     className: "px-4 py-3 text-[13px] text-foreground font-medium border-b-[1.5px] border-accent -mb-px" }, children: [] },
      "tab-states":       { type: "Text", props: { content: "States",       className: "px-4 py-3 text-[13px] text-muted-foreground -mb-px" }, children: [] },
      "tab-transitions":  { type: "Text", props: { content: "Transitions",  className: "px-4 py-3 text-[13px] text-muted-foreground -mb-px" }, children: [] },
      "tab-effects":      { type: "Text", props: { content: "Effects",      className: "px-4 py-3 text-[13px] text-muted-foreground -mb-px" }, children: [] },
      "tab-history":      { type: "Text", props: { content: "History",      className: "px-4 py-3 text-[13px] text-muted-foreground -mb-px" }, children: [] },

      // ── Body ───────────────────────────────────────────────────────────────
      body: {
        type: "Stack",
        props: { direction: "col", gap: "0", className: "p-5" },
        children: ["chart-label", "chart", "divider", "stats-grid"],
      },
      "chart-label": {
        type: "Text",
        props: { content: "Daily transitions · past 7 days", mono: true, muted: true, className: "text-[10px] tracking-[0.08em] uppercase mb-2" },
        children: [],
      },

      // ── Bar chart — 7 explicit columns ────────────────────────────────────
      chart: {
        type: "Stack",
        props: { direction: "row", align: "end", gap: "0", className: "gap-1.5 h-20" },
        children: ["bc-m", "bc-t", "bc-w", "bc-th", "bc-f", "bc-s", "bc-su"],
      },
      "bc-m":  { type: "Stack", props: { direction: "col", align: "center", gap: "1", className: "flex-1" }, children: ["bar-m",  "dl-m"]  },
      "bc-t":  { type: "Stack", props: { direction: "col", align: "center", gap: "1", className: "flex-1" }, children: ["bar-t",  "dl-t"]  },
      "bc-w":  { type: "Stack", props: { direction: "col", align: "center", gap: "1", className: "flex-1" }, children: ["bar-w",  "dl-w"]  },
      "bc-th": { type: "Stack", props: { direction: "col", align: "center", gap: "1", className: "flex-1" }, children: ["bar-th", "dl-th"] },
      "bc-f":  { type: "Stack", props: { direction: "col", align: "center", gap: "1", className: "flex-1" }, children: ["bar-f",  "dl-f"]  },
      "bc-s":  { type: "Stack", props: { direction: "col", align: "center", gap: "1", className: "flex-1" }, children: ["bar-s",  "dl-s"]  },
      "bc-su": { type: "Stack", props: { direction: "col", align: "center", gap: "1", className: "flex-1" }, children: ["bar-su", "dl-su"] },

      "bar-m":  { type: "Stack", props: { direction: "col", gap: "0", className: "h-[36px] w-full border bg-secondary border-border" }, children: [] },
      "bar-t":  { type: "Stack", props: { direction: "col", gap: "0", className: "h-[42px] w-full border bg-secondary border-border" }, children: [] },
      "bar-w":  { type: "Stack", props: { direction: "col", gap: "0", className: "h-[58px] w-full border bg-secondary border-border" }, children: [] },
      "bar-th": { type: "Stack", props: { direction: "col", gap: "0", className: "h-[31px] w-full border bg-secondary border-border" }, children: [] },
      "bar-f":  { type: "Stack", props: { direction: "col", gap: "0", className: "h-[77px] w-full border bg-secondary border-border" }, children: [] },
      "bar-s":  { type: "Stack", props: { direction: "col", gap: "0", className: "h-[64px] w-full border bg-secondary border-border" }, children: [] },
      "bar-su": { type: "Stack", props: { direction: "col", gap: "0", className: "h-[81px] w-full border bg-accent border-accent"    }, children: [] },

      "dl-m":  { type: "Text", props: { content: "M", mono: true, muted: true, className: "text-[9px]" }, children: [] },
      "dl-t":  { type: "Text", props: { content: "T", mono: true, muted: true, className: "text-[9px]" }, children: [] },
      "dl-w":  { type: "Text", props: { content: "W", mono: true, muted: true, className: "text-[9px]" }, children: [] },
      "dl-th": { type: "Text", props: { content: "T", mono: true, muted: true, className: "text-[9px]" }, children: [] },
      "dl-f":  { type: "Text", props: { content: "F", mono: true, muted: true, className: "text-[9px]" }, children: [] },
      "dl-s":  { type: "Text", props: { content: "S", mono: true, muted: true, className: "text-[9px]" }, children: [] },
      "dl-su": { type: "Text", props: { content: "S", mono: true, muted: true, className: "text-[9px]" }, children: [] },

      divider: { type: "Separator", props: { className: "my-4" }, children: [] },

      // ── Stats grid — 3 explicit stat columns ──────────────────────────────
      "stats-grid": {
        type: "Grid",
        props: { cols: "3", gap: "4" },
        children: ["stat-transitions", "stat-latency", "stat-errors"],
      },
      "stat-transitions": { type: "Stack", props: { direction: "col", gap: "0" }, children: ["sl-transitions", "sv-transitions", "sd-transitions"] },
      "stat-latency":     { type: "Stack", props: { direction: "col", gap: "0" }, children: ["sl-latency",     "sv-latency",     "sd-latency"]     },
      "stat-errors":      { type: "Stack", props: { direction: "col", gap: "0" }, children: ["sl-errors",      "sv-errors",      "sd-errors"]      },

      "sl-transitions": { type: "Text", props: { content: "Transitions", mono: true, muted: true, className: "text-[10px] tracking-[0.06em] uppercase" }, children: [] },
      "sv-transitions": { type: "Text", props: { content: "1,284",       className: "font-serif italic font-medium text-[28px] tracking-[-0.02em] mt-1" }, children: [] },
      "sd-transitions": { type: "Text", props: { content: "+12%",        className: "font-mono text-[10px] mt-0.5 text-success" }, children: [] },

      "sl-latency": { type: "Text", props: { content: "Avg latency", mono: true, muted: true, className: "text-[10px] tracking-[0.06em] uppercase" }, children: [] },
      "sv-latency": { type: "Text", props: { content: "142ms",        className: "font-serif italic font-medium text-[28px] tracking-[-0.02em] mt-1" }, children: [] },
      "sd-latency": { type: "Text", props: { content: "-6%",          className: "font-mono text-[10px] mt-0.5 text-success" }, children: [] },

      "sl-errors": { type: "Text", props: { content: "Error rate", mono: true, muted: true, className: "text-[10px] tracking-[0.06em] uppercase" }, children: [] },
      "sv-errors": { type: "Text", props: { content: "0.3%",        className: "font-serif italic font-medium text-[28px] tracking-[-0.02em] mt-1" }, children: [] },
      "sd-errors": { type: "Text", props: { content: "+0.1%",       className: "font-mono text-[10px] mt-0.5 text-destructive" }, children: [] },
    },
  },
}

export default sample
