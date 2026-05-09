import type { Sample } from "./types"

const sample: Sample = {
  id: "badge-compositions",
  kind: "block",
  title: "Badge compositions",
  description: "Status, priority, and tag badge rows — realistic combinations showing variant × semantic-color usage.",
  componentName: "BadgeCompositions",
  category: "Feedback",
  order: 2,
  registryDependencies: ["badge", "stack", "grid"],
  spec: {
    root: "grid",
    elements: {
      grid: {
        type: "Grid",
        props: { className: "grid-cols-[180px_1fr] gap-x-6 gap-y-3.5 items-center" },
        children: [
          "lbl-status", "badges-status",
          "lbl-priority", "badges-priority",
          "lbl-tags", "badges-tags",
        ],
      },
      "lbl-status": {
        type: "Text",
        props: { content: "Status", mono: true, size: "xs", className: "uppercase tracking-[0.06em] text-muted-foreground" },
        children: [],
      },
      "badges-status": {
        type: "Stack",
        props: { direction: "row", gap: "1", wrap: true },
        children: ["bs1", "bs2", "bs3", "bs4", "bs5", "bs6", "bs7"],
      },
      bs1: { type: "Badge", props: { text: "Active" }, children: [] },
      bs2: { type: "Badge", props: { text: "● Shipping", variant: "outline", className: "text-success" }, children: [] },
      bs3: { type: "Badge", props: { text: "● Review", variant: "outline", className: "text-warn" }, children: [] },
      bs4: { type: "Badge", props: { text: "Blocked", variant: "destructive" }, children: [] },
      bs5: { type: "Badge", props: { text: "● In progress", variant: "outline", className: "text-info" }, children: [] },
      bs6: { type: "Badge", props: { text: "● Draft", variant: "outline", className: "text-purple" }, children: [] },
      bs7: { type: "Badge", props: { text: "Archived", variant: "secondary" }, children: [] },

      "lbl-priority": {
        type: "Text",
        props: { content: "Priority", mono: true, size: "xs", className: "uppercase tracking-[0.06em] text-muted-foreground" },
        children: [],
      },
      "badges-priority": {
        type: "Stack",
        props: { direction: "row", gap: "1" },
        children: ["bp1", "bp2", "bp3", "bp4"],
      },
      bp1: { type: "Badge", props: { text: "P0 · Critical", variant: "destructive" }, children: [] },
      bp2: { type: "Badge", props: { text: "P1 · High", variant: "outline", className: "text-warn" }, children: [] },
      bp3: { type: "Badge", props: { text: "P2 · Medium", variant: "outline", className: "text-info" }, children: [] },
      bp4: { type: "Badge", props: { text: "P3 · Low", variant: "secondary" }, children: [] },

      "lbl-tags": {
        type: "Text",
        props: { content: "Inline tags", mono: true, size: "xs", className: "uppercase tracking-[0.06em] text-muted-foreground" },
        children: [],
      },
      "badges-tags": {
        type: "Stack",
        props: { direction: "row", gap: "1", wrap: true },
        children: ["bt1", "bt2", "bt3", "bt4"],
      },
      bt1: { type: "Badge", props: { text: "#billing", variant: "secondary" }, children: [] },
      bt2: { type: "Badge", props: { text: "#fetcher", variant: "secondary" }, children: [] },
      bt3: { type: "Badge", props: { text: "#needs-repro", variant: "secondary" }, children: [] },
      bt4: { type: "Badge", props: { text: "+3", variant: "secondary" }, children: [] },
    },
  },
}

export default sample
