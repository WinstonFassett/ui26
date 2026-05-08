import type { Spec } from "@/lib/spec-to-code";
import type { Demo } from "./doc-sample";

function alertSpec(variant: "default" | "destructive" | "warning" | "success", title: string, body: string): Spec {
  return {
    root: "a",
    elements: {
      a: { type: "Alert", props: variant === "default" ? {} : { variant }, children: ["title", "desc"] },
      title: { type: "AlertTitle", props: { text: title }, children: [] },
      desc: { type: "AlertDescription", props: { text: body }, children: [] },
    },
  };
}

export const ALERT_VARIANT_DEMOS: Demo[] = [
  {
    id: "default",
    label: "Default",
    spec: alertSpec("default", "Heads up", "You can add components using the CLI."),
  },
  {
    id: "destructive",
    label: "Destructive",
    spec: alertSpec("destructive", "Error", "Your session has expired. Please log in again."),
  },
  {
    id: "warning",
    label: "Warning",
    spec: alertSpec("warning", "Warning", "This action cannot be undone once confirmed."),
  },
  {
    id: "success",
    label: "Success",
    spec: alertSpec("success", "Success", "Your changes have been saved."),
  },
];
