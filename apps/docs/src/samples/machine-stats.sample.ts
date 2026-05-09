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
    state: {
      tabs: [
        { label: "Overview",    active: true,  count: ""   },
        { label: "States",      active: false, count: "5"  },
        { label: "Transitions", active: false, count: "6"  },
        { label: "Effects",     active: false, count: "2"  },
        { label: "History",     active: false, count: "42" },
      ],
      bars: [
        { cls: "h-[36px] w-full border bg-secondary border-border", day: "M" },
        { cls: "h-[42px] w-full border bg-secondary border-border", day: "T" },
        { cls: "h-[58px] w-full border bg-secondary border-border", day: "W" },
        { cls: "h-[31px] w-full border bg-secondary border-border", day: "T" },
        { cls: "h-[77px] w-full border bg-secondary border-border", day: "F" },
        { cls: "h-[64px] w-full border bg-secondary border-border", day: "S" },
        { cls: "h-[81px] w-full border bg-accent border-accent",    day: "S" },
      ],
      stats: [
        { l: "Transitions", v: "1,284", d: "+12%", dCls: "font-mono text-[10px] mt-0.5 text-success"     },
        { l: "Avg latency", v: "142ms",  d: "-6%",  dCls: "font-mono text-[10px] mt-0.5 text-success"     },
        { l: "Error rate",  v: "0.3%",   d: "+0.1%", dCls: "font-mono text-[10px] mt-0.5 text-destructive" },
      ],
    },
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
        children: ["tab-item"],
      },
      "tab-item": {
        type: "Stack",
        props: {
          direction: "row",
          gap: "1",
          align: "center",
          className: {
            $cond: { $item: "active" },
            $then: "px-4 py-3 text-[13px] text-foreground font-medium border-b-[1.5px] border-accent -mb-px",
            $else: "px-4 py-3 text-[13px] text-muted-foreground -mb-px",
          },
        },
        repeat: { statePath: "/tabs" },
        children: ["tab-label", "tab-count"],
      },
      "tab-label": { type: "Text", props: { content: { $item: "label" } }, children: [] },
      "tab-count": {
        type: "Text",
        props: {
          content: { $item: "count" },
          mono: true,
          className: {
            $cond: { $item: "count" },
            $then: "text-[10px] text-text-mute bg-muted px-1.5 border border-border",
            $else: "hidden",
          },
        },
        children: [],
      },

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

      // ── Bar chart ──────────────────────────────────────────────────────────
      chart: {
        type: "Stack",
        props: { direction: "row", align: "end", gap: "0", className: "gap-1.5 h-20" },
        children: ["bar-col"],
      },
      "bar-col": {
        type: "Stack",
        props: { direction: "col", align: "center", gap: "1", className: "flex-1" },
        repeat: { statePath: "/bars" },
        children: ["bar", "day-label"],
      },
      bar: {
        type: "Stack",
        props: { direction: "col", gap: "0", className: { $item: "cls" } },
        children: [],
      },
      "day-label": {
        type: "Text",
        props: { content: { $item: "day" }, mono: true, muted: true, className: "text-[9px]" },
        children: [],
      },

      divider: { type: "Separator", props: { className: "my-4" }, children: [] },

      // ── Stats grid ─────────────────────────────────────────────────────────
      "stats-grid": {
        type: "Grid",
        props: { cols: "3", gap: "4" },
        children: ["stat-item"],
      },
      "stat-item": {
        type: "Stack",
        props: { direction: "col", gap: "0" },
        repeat: { statePath: "/stats" },
        children: ["stat-label", "stat-value", "stat-delta"],
      },
      "stat-label": {
        type: "Text",
        props: { content: { $item: "l" }, mono: true, muted: true, className: "text-[10px] tracking-[0.06em] uppercase" },
        children: [],
      },
      "stat-value": {
        type: "Text",
        props: { content: { $item: "v" }, className: "font-serif italic font-medium text-[28px] tracking-[-0.02em] mt-1" },
        children: [],
      },
      "stat-delta": {
        type: "Text",
        props: { content: { $item: "d" }, className: { $item: "dCls" } },
        children: [],
      },
    },
  },
}

export default sample
