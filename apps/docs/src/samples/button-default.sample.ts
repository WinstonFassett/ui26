import type { Sample } from "./types"

const sample: Sample = {
  id: "button-default",
  kind: "atom",
  title: "Default",
  description: "The default button — primary visual weight, used for the main affirmative action in a context.",
  componentName: "ButtonDefault",
  relatedComponent: "button",
  group: "variants",
  spec: {
    root: "btn",
    elements: {
      btn: { type: "Button", props: { label: "Button" } },
    },
  },
}

export default sample
