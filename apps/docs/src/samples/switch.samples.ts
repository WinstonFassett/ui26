import type { Sample } from "./types"

const samples: Sample[] = [
  {
    id: "switch-state-default",
    kind: "atom",
    title: "Default",
    description: "Switch in the off/unchecked state.",
    componentName: "SwitchStateDefault",
    relatedComponent: "switch",
    group: "states",
    key: "default",
    spec: { root: "sw", elements: { sw: { type: "Switch", props: {} } } },
  },
  {
    id: "switch-state-checked",
    kind: "atom",
    title: "Checked",
    description: "Switch in the on/checked state.",
    componentName: "SwitchStateChecked",
    relatedComponent: "switch",
    group: "states",
    key: "checked",
    spec: { root: "sw", elements: { sw: { type: "Switch", props: { checked: true } } } },
  },
  {
    id: "switch-state-disabled",
    kind: "atom",
    title: "Disabled",
    description: "Disabled switch — not interactive.",
    componentName: "SwitchStateDisabled",
    relatedComponent: "switch",
    group: "states",
    key: "disabled",
    spec: { root: "sw", elements: { sw: { type: "Switch", props: { disabled: true } } } },
  },
  {
    id: "switch-state-disabled-checked",
    kind: "atom",
    title: "Disabled · checked",
    description: "Disabled switch locked in the on state.",
    componentName: "SwitchStateDisabledChecked",
    relatedComponent: "switch",
    group: "states",
    key: "disabled-checked",
    spec: { root: "sw", elements: { sw: { type: "Switch", props: { disabled: true, checked: true } } } },
  },
  {
    id: "switch-with-label",
    kind: "atom",
    title: "With label",
    description: "Switch composed with a FieldLabel — the standard usage pattern.",
    componentName: "SwitchWithLabel",
    relatedComponent: "switch",
    group: "composition",
    key: "with-label",
    spec: {
      root: "f",
      elements: {
        f: { type: "Field", props: { orientation: "horizontal" }, children: ["sw", "lbl"] },
        sw: { type: "Switch", props: { id: "notify" }, children: [] },
        lbl: { type: "FieldLabel", props: { text: "Notifications", htmlFor: "notify" }, children: [] },
      },
    },
  },
]

export default samples
