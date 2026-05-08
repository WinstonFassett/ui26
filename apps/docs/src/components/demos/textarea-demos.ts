import type { Demo } from "./doc-sample";

export const TEXTAREA_STATE_DEMOS: Demo[] = [
  {
    id: "default",
    label: "Default",
    spec: { root: "ta", elements: { ta: { type: "Textarea", props: { placeholder: "Type here", rows: 4 } } } },
  },
  {
    id: "invalid",
    label: "Invalid",
    spec: {
      root: "ta",
      elements: { ta: { type: "Textarea", props: { value: "too short", invalid: true, rows: 4 } } },
    },
  },
  {
    id: "disabled",
    label: "Disabled",
    spec: {
      root: "ta",
      elements: { ta: { type: "Textarea", props: { placeholder: "Disabled", disabled: true, rows: 4 } } },
    },
  },
];
