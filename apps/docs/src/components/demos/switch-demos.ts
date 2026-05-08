import type { Demo } from "./doc-sample";

export const SWITCH_STATE_DEMOS: Demo[] = [
  {
    id: "default",
    label: "Default",
    spec: { root: "sw", elements: { sw: { type: "Switch", props: {} } } },
  },
  {
    id: "checked",
    label: "Checked",
    spec: { root: "sw", elements: { sw: { type: "Switch", props: { checked: true } } } },
  },
  {
    id: "disabled",
    label: "Disabled",
    spec: { root: "sw", elements: { sw: { type: "Switch", props: { disabled: true } } } },
  },
  {
    id: "disabled-checked",
    label: "Disabled · checked",
    spec: { root: "sw", elements: { sw: { type: "Switch", props: { disabled: true, checked: true } } } },
  },
];

export const SWITCH_LABEL_DEMOS: Demo[] = [
  {
    id: "with-label",
    label: "With label",
    spec: {
      root: "f",
      elements: {
        f: { type: "Field", props: { orientation: "horizontal" }, children: ["sw", "lbl"] },
        sw: { type: "Switch", props: { id: "notify" }, children: [] },
        lbl: { type: "FieldLabel", props: { text: "Notifications", htmlFor: "notify" }, children: [] },
      },
    },
  },
];
