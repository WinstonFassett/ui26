import type { Demo } from "./doc-sample";

export const CHECKBOX_STATE_DEMOS: Demo[] = [
  {
    id: "default",
    label: "Default",
    spec: { root: "cb", elements: { cb: { type: "Checkbox", props: {} } } },
  },
  {
    id: "checked",
    label: "Checked",
    spec: { root: "cb", elements: { cb: { type: "Checkbox", props: { checked: true } } } },
  },
  {
    id: "disabled",
    label: "Disabled",
    spec: { root: "cb", elements: { cb: { type: "Checkbox", props: { disabled: true } } } },
  },
  {
    id: "disabled-checked",
    label: "Disabled · checked",
    spec: { root: "cb", elements: { cb: { type: "Checkbox", props: { disabled: true, checked: true } } } },
  },
];

export const CHECKBOX_LABEL_DEMOS: Demo[] = [
  {
    id: "with-label",
    label: "With label",
    spec: {
      root: "f",
      elements: {
        f: { type: "Field", props: { orientation: "horizontal" }, children: ["cb", "lbl"] },
        cb: { type: "Checkbox", props: { id: "tos" }, children: [] },
        lbl: { type: "FieldLabel", props: { text: "Accept terms", htmlFor: "tos" }, children: [] },
      },
    },
  },
];
