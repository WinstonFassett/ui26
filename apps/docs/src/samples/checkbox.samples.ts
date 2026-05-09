import type { Sample } from "./types"

const samples: Sample[] = [
  {
    id: "checkbox-state-default",
    kind: "atom",
    title: "Default",
    description: "Unchecked checkbox — default state.",
    componentName: "CheckboxStateDefault",
    relatedComponent: "checkbox",
    group: "states",
    key: "default",
    spec: { root: "cb", elements: { cb: { type: "Checkbox", props: {} } } },
  },
  {
    id: "checkbox-state-checked",
    kind: "atom",
    title: "Checked",
    description: "Checked checkbox — selected state.",
    componentName: "CheckboxStateChecked",
    relatedComponent: "checkbox",
    group: "states",
    key: "checked",
    spec: { root: "cb", elements: { cb: { type: "Checkbox", props: { checked: true } } } },
  },
  {
    id: "checkbox-state-disabled",
    kind: "atom",
    title: "Disabled",
    description: "Disabled unchecked checkbox — not interactive.",
    componentName: "CheckboxStateDisabled",
    relatedComponent: "checkbox",
    group: "states",
    key: "disabled",
    spec: { root: "cb", elements: { cb: { type: "Checkbox", props: { disabled: true } } } },
  },
  {
    id: "checkbox-state-disabled-checked",
    kind: "atom",
    title: "Disabled · checked",
    description: "Disabled checked checkbox — locked in selected state.",
    componentName: "CheckboxStateDisabledChecked",
    relatedComponent: "checkbox",
    group: "states",
    key: "disabled-checked",
    spec: { root: "cb", elements: { cb: { type: "Checkbox", props: { disabled: true, checked: true } } } },
  },
  {
    id: "checkbox-with-label",
    kind: "atom",
    title: "With label",
    description: "Checkbox composed with a FieldLabel — the standard usage pattern.",
    componentName: "CheckboxWithLabel",
    relatedComponent: "checkbox",
    group: "composition",
    key: "with-label",
    spec: {
      root: "f",
      elements: {
        f: { type: "Field", props: { orientation: "horizontal" }, children: ["cb", "lbl"] },
        cb: { type: "Checkbox", props: { id: "tos" }, children: [] },
        lbl: { type: "FieldLabel", props: { text: "Accept terms", htmlFor: "tos" }, children: [] },
      },
    },
  },
]

export default samples
