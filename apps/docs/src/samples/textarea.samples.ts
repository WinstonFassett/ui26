import type { Sample } from "./types"

const samples: Sample[] = [
  {
    id: "textarea-state-default",
    kind: "atom",
    title: "Default",
    description: "Default textarea — multi-line text input.",
    componentName: "TextareaStateDefault",
    relatedComponent: "textarea",
    group: "states",
    key: "default",
    spec: { root: "ta", elements: { ta: { type: "Textarea", props: { placeholder: "Type here", rows: 4 } } } },
  },
  {
    id: "textarea-state-invalid",
    kind: "atom",
    title: "Invalid",
    description: "Invalid textarea — aria-invalid styling for validation errors.",
    componentName: "TextareaStateInvalid",
    relatedComponent: "textarea",
    group: "states",
    key: "invalid",
    spec: { root: "ta", elements: { ta: { type: "Textarea", props: { value: "too short", invalid: true, rows: 4 } } } },
  },
  {
    id: "textarea-state-disabled",
    kind: "atom",
    title: "Disabled",
    description: "Disabled textarea — read-only appearance, not focusable.",
    componentName: "TextareaStateDisabled",
    relatedComponent: "textarea",
    group: "states",
    key: "disabled",
    spec: { root: "ta", elements: { ta: { type: "Textarea", props: { placeholder: "Disabled", disabled: true, rows: 4 } } } },
  },
]

export default samples
