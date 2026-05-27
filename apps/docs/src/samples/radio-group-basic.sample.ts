import type { Sample } from "./types"

const sample: Sample = {
  id: "radio-group-basic",
  kind: "atom",
  title: "Basic",
  description: "Three radio options — Free, Pro, Enterprise — in a vertical group.",
  componentName: "RadioGroupBasic",
  relatedComponent: "radio-group",
  group: "basic",
  spec: {
    root: "group",
    elements: {
      group: { type: "RadioGroup", props: {}, children: ["field-free", "field-pro", "field-enterprise"] },
      "field-free": { type: "Field", props: { orientation: "horizontal" }, children: ["item-free", "label-free"] },
      "item-free": { type: "RadioGroupItem", props: { id: "plan-free", name: "plan", value: "free", defaultChecked: true }, children: [] },
      "label-free": { type: "FieldLabel", props: { text: "Free", htmlFor: "plan-free" }, children: [] },
      "field-pro": { type: "Field", props: { orientation: "horizontal" }, children: ["item-pro", "label-pro"] },
      "item-pro": { type: "RadioGroupItem", props: { id: "plan-pro", name: "plan", value: "pro" }, children: [] },
      "label-pro": { type: "FieldLabel", props: { text: "Pro", htmlFor: "plan-pro" }, children: [] },
      "field-enterprise": { type: "Field", props: { orientation: "horizontal" }, children: ["item-enterprise", "label-enterprise"] },
      "item-enterprise": { type: "RadioGroupItem", props: { id: "plan-enterprise", name: "plan", value: "enterprise" }, children: [] },
      "label-enterprise": { type: "FieldLabel", props: { text: "Enterprise", htmlFor: "plan-enterprise" }, children: [] },
    },
  },
}

export default sample
