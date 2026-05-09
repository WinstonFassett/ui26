import type { Sample } from "./types"

// Steel-thread file — merged into button.samples.ts during bulk migration.
// Kept here to preserve the existing id 'button-default' in tests/registry.
const sample: Sample = {
  id: "button-default",
  kind: "atom",
  title: "Default",
  description: "The default button — primary visual weight, used for the main affirmative action.",
  componentName: "ButtonDefault",
  relatedComponent: "button",
  group: "variants",
  key: "default",
  spec: {
    root: "btn",
    elements: {
      btn: { type: "Button", props: { label: "Button" } },
    },
  },
}

export default sample
