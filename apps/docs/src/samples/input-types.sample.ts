import type { Sample } from "./types"

const sample: Sample = {
  id: "input-types",
  kind: "atom",
  title: "Input types",
  description: "Common input types — text, email, password, search.",
  componentName: "InputTypes",
  relatedComponent: "input",
  group: "types",
  spec: {
    root: "col",
    elements: {
      col: {
        type: "Stack",
        props: { direction: "col", className: "gap-2 max-w-sm" },
        children: ["i1", "i2", "i3", "i4"],
      },
      i1: { type: "Input", props: { type: "text", placeholder: "Plain text" }, children: [] },
      i2: { type: "Input", props: { type: "email", placeholder: "you@company.com" }, children: [] },
      i3: { type: "Input", props: { type: "password", placeholder: "••••••••" }, children: [] },
      i4: { type: "Input", props: { type: "search", placeholder: "Search…" }, children: [] },
    },
  },
}

export default sample
