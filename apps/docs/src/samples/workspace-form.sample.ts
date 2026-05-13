import type { Sample } from "./types"

const sample: Sample = {
  id: "workspace-form",
  kind: "block",
  title: "Workspace form",
  description: "Two-column settings form — text fields, an inline error state, and a confidence slider.",
  componentName: "WorkspaceForm",
  category: "Forms",
  order: 2,
  span: "full",
  featured: true,
  registryDependencies: ["field", "input", "textarea", "label", "slider"],
  spec: {
    root: "form-grid",
    elements: {
      "form-grid": {
        type: "Grid",
        props: { className: "grid-cols-2 gap-7" },
        children: ["left-col", "right-col"],
      },
      "left-col": {
        type: "FieldGroup",
        props: {},
        children: ["f-workspace", "f-slug", "f-email", "f-search", "f-threshold"],
      },
      "f-workspace": {
        type: "Field",
        props: {},
        children: ["lbl-workspace", "in-workspace"],
      },
      "lbl-workspace": {
        type: "FieldLabel",
        props: { text: "Workspace name *" },
        children: [],
      },
      "in-workspace": {
        type: "Input",
        props: { value: "Acme Retrospective" },
        children: [],
      },
      "f-slug": {
        type: "Field",
        props: {},
        children: ["lbl-slug", "in-slug", "desc-slug"],
      },
      "lbl-slug": { type: "FieldLabel", props: { text: "Slug" }, children: [] },
      "in-slug": { type: "Input", props: { value: "acme-retro" }, children: [] },
      "desc-slug": {
        type: "FieldDescription",
        props: { text: "lowercase · dashes" },
        children: [],
      },
      "f-email": {
        type: "Field",
        props: {},
        children: ["lbl-email", "in-email", "err-email"],
      },
      "lbl-email": { type: "FieldLabel", props: { text: "Email" }, children: [] },
      "in-email": {
        type: "Input",
        props: { type: "email", placeholder: "you@company.com", invalid: true },
        children: [],
      },
      "err-email": {
        type: "FieldError",
        props: { text: "Already in use — try signing in instead" },
        children: [],
      },
      "f-search": {
        type: "Field",
        props: {},
        children: ["lbl-search", "in-search"],
      },
      "lbl-search": { type: "FieldLabel", props: { text: "Search" }, children: [] },
      "in-search": {
        type: "Input",
        props: { placeholder: "Search tickets, docs, people…" },
        children: [],
      },
      "f-threshold": {
        type: "Field",
        props: {},
        children: ["lbl-threshold", "sl-threshold"],
      },
      "lbl-threshold": {
        type: "FieldLabel",
        props: { text: "Confidence threshold" },
        children: [],
      },
      "sl-threshold": {
        type: "Slider",
        props: { min: 0, max: 100, value: 65 },
        children: [],
      },
      "right-col": {
        type: "FieldGroup",
        props: {},
        children: ["f-bug"],
      },
      "f-bug": {
        type: "Field",
        props: {},
        children: ["lbl-bug", "ta-bug", "desc-bug"],
      },
      "lbl-bug": {
        type: "FieldLabel",
        props: { text: "Bug description" },
        children: [],
      },
      "ta-bug": {
        type: "Textarea",
        props: {
          rows: 5,
          value:
            "After clicking 'Retry' in the paying state, the fetcher briefly flashes back to 'idle' before transitioning to 'loading'. Expected: direct paying → loading.",
        },
        children: [],
      },
      "desc-bug": {
        type: "FieldDescription",
        props: { text: "198/2000" },
        children: [],
      },
    },
  },
}

export default sample
