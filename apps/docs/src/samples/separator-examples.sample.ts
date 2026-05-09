import type { Sample } from "./types"

const sample: Sample = {
  id: "separator-examples",
  kind: "atom",
  title: "Separator",
  description: "Horizontal divider in context — text above and below.",
  componentName: "SeparatorExamples",
  relatedComponent: "separator",
  group: "examples",
  spec: {
    root: "col",
    elements: {
      col: {
        type: "Stack",
        props: { direction: "col", className: "gap-3 w-48" },
        children: ["above", "sep", "below"],
      },
      above: { type: "Text", props: { content: "Above the fold" }, children: [] },
      sep: { type: "Separator", props: {}, children: [] },
      below: { type: "Text", props: { content: "Below the fold" }, children: [] },
    },
  },
}

export default sample
