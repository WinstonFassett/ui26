import type { Spec } from "@/lib/spec-to-code";
import type { Demo } from "./doc-sample";

export const INPUT_STATE_DEMOS: Demo[] = [
  {
    id: "default",
    label: "Default",
    spec: { root: "in", elements: { in: { type: "Input", props: { placeholder: "Type here" } } } },
  },
  {
    id: "invalid",
    label: "Invalid",
    spec: {
      root: "in",
      elements: { in: { type: "Input", props: { value: "not-an-email", invalid: true } } },
    },
  },
  {
    id: "disabled",
    label: "Disabled",
    spec: {
      root: "in",
      elements: { in: { type: "Input", props: { placeholder: "Disabled", disabled: true } } },
    },
  },
  {
    id: "file",
    label: "File",
    spec: { root: "in", elements: { in: { type: "Input", props: { type: "file" } } } },
  },
];

export const INPUT_TYPE_DEMOS: Demo[] = [
  {
    id: "text",
    label: "text",
    spec: {
      root: "in",
      elements: { in: { type: "Input", props: { type: "text", placeholder: "Plain text" } } },
    },
  },
  {
    id: "email",
    label: "email",
    spec: {
      root: "in",
      elements: { in: { type: "Input", props: { type: "email", placeholder: "you@company.com" } } },
    },
  },
  {
    id: "password",
    label: "password",
    spec: { root: "in", elements: { in: { type: "Input", props: { type: "password", placeholder: "••••••••" } } } },
  },
  {
    id: "search",
    label: "search",
    spec: { root: "in", elements: { in: { type: "Input", props: { type: "search", placeholder: "Search…" } } } },
  },
];
