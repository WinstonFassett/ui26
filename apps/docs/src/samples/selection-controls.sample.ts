import type { Sample } from "./types"

// RadioGroupItem is not in the json-render registry, so the "Radio group"
// column approximates items with Checkbox. Update when RadioGroupItem is added.
const sample: Sample = {
  id: "selection-controls",
  kind: "block",
  title: "Selection controls",
  description: "Three-column composition showing Checkbox, Switch, and radio-style option lists in realistic settings patterns.",
  componentName: "SelectionControls",
  category: "Forms",
  order: 3,
  span: "full",
  registryDependencies: ["checkbox", "switch", "field", "stack", "grid"],
  spec: {
    root: "col-grid",
    elements: {
      "col-grid": {
        type: "Grid",
        props: { className: "grid-cols-3 gap-7" },
        children: ["checkbox-col", "switch-col", "radio-col"],
      },

      // ── Checkbox column ──────────────────────────────────────────────────
      "checkbox-col": {
        type: "Stack",
        props: { direction: "col", gap: "4" },
        children: ["cb-heading", "cb-list"],
      },
      "cb-heading": {
        type: "Text",
        props: { content: "Checkbox", mono: true, size: "xs", className: "uppercase tracking-[0.06em] text-muted-foreground" },
        children: [],
      },
      "cb-list": {
        type: "Stack",
        props: { direction: "col", gap: "3" },
        children: ["cb-item1", "cb-item2", "cb-item3"],
      },
      "cb-item1": {
        type: "Field",
        props: { orientation: "horizontal" },
        children: ["cb1", "cb-lbl1"],
      },
      cb1: { type: "Checkbox", props: { checked: true }, children: [] },
      "cb-lbl1": {
        type: "FieldTitle",
        props: { text: "Enable streaming responses" },
        children: [],
      },
      "cb-item2": {
        type: "Field",
        props: { orientation: "horizontal" },
        children: ["cb2", "cb-lbl2"],
      },
      cb2: { type: "Checkbox", props: {}, children: [] },
      "cb-lbl2": {
        type: "FieldTitle",
        props: { text: "Allow guest edits" },
        children: [],
      },
      "cb-item3": {
        type: "Field",
        props: { orientation: "horizontal", className: "opacity-50" },
        children: ["cb3", "cb-lbl3"],
      },
      cb3: { type: "Checkbox", props: { checked: true, disabled: true }, children: [] },
      "cb-lbl3": {
        type: "FieldTitle",
        props: { text: "Legacy sync (enterprise)" },
        children: [],
      },

      // ── Switch column ────────────────────────────────────────────────────
      "switch-col": {
        type: "Stack",
        props: { direction: "col", gap: "4" },
        children: ["sw-heading", "sw-list"],
      },
      "sw-heading": {
        type: "Text",
        props: { content: "Switch", mono: true, size: "xs", className: "uppercase tracking-[0.06em] text-muted-foreground" },
        children: [],
      },
      "sw-list": {
        type: "Stack",
        props: { direction: "col", gap: "3" },
        children: ["sw-item1", "sw-item2", "sw-item3"],
      },
      "sw-item1": {
        type: "Field",
        props: { orientation: "horizontal" },
        children: ["sw1", "sw-lbl1"],
      },
      sw1: { type: "Switch", props: { checked: true }, children: [] },
      "sw-lbl1": {
        type: "FieldTitle",
        props: { text: "Claude suggestions" },
        children: [],
      },
      "sw-item2": {
        type: "Field",
        props: { orientation: "horizontal" },
        children: ["sw2", "sw-lbl2"],
      },
      sw2: { type: "Switch", props: {}, children: [] },
      "sw-lbl2": {
        type: "FieldTitle",
        props: { text: "Auto-run effects in dev" },
        children: [],
      },
      "sw-item3": {
        type: "Field",
        props: { orientation: "horizontal" },
        children: ["sw3", "sw-lbl3"],
      },
      sw3: { type: "Switch", props: { checked: true }, children: [] },
      "sw-lbl3": {
        type: "FieldTitle",
        props: { text: "Telemetry" },
        children: [],
      },

      // ── Radio column (Checkbox approximation until RadioGroupItem is in registry) ──
      "radio-col": {
        type: "Stack",
        props: { direction: "col", gap: "4" },
        children: ["rd-heading", "rd-list"],
      },
      "rd-heading": {
        type: "Text",
        props: { content: "Radio group", mono: true, size: "xs", className: "uppercase tracking-[0.06em] text-muted-foreground" },
        children: [],
      },
      "rd-list": {
        type: "Stack",
        props: { direction: "col", gap: "3" },
        children: ["rd-item1", "rd-item2", "rd-item3"],
      },
      "rd-item1": {
        type: "Field",
        props: { orientation: "horizontal" },
        children: ["rd1", "rd-lbl1"],
      },
      rd1: { type: "Checkbox", props: { checked: true }, children: [] },
      "rd-lbl1": {
        type: "FieldTitle",
        props: { text: "Free — up to 3 machines" },
        children: [],
      },
      "rd-item2": {
        type: "Field",
        props: { orientation: "horizontal" },
        children: ["rd2", "rd-lbl2"],
      },
      rd2: { type: "Checkbox", props: {}, children: [] },
      "rd-lbl2": {
        type: "FieldTitle",
        props: { text: "Pro · $19/mo" },
        children: [],
      },
      "rd-item3": {
        type: "Field",
        props: { orientation: "horizontal", className: "opacity-50" },
        children: ["rd3", "rd-lbl3"],
      },
      rd3: { type: "Checkbox", props: { disabled: true }, children: [] },
      "rd-lbl3": {
        type: "FieldTitle",
        props: { text: "Enterprise" },
        children: [],
      },
    },
  },
}

export default sample
