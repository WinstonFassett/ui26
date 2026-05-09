import type { Sample } from "./types"

function alertSpec(variant: "default" | "destructive" | "warning" | "success", title: string, body: string) {
  return {
    root: "a",
    elements: {
      a: { type: "Alert", props: variant === "default" ? {} : { variant }, children: ["title", "desc"] },
      title: { type: "AlertTitle", props: { text: title }, children: [] },
      desc: { type: "AlertDescription", props: { text: body }, children: [] },
    },
  }
}

const samples: Sample[] = [
  {
    id: "alert-default",
    kind: "atom",
    title: "Default",
    description: "Default alert — neutral tone for informational messages.",
    componentName: "AlertDefault",
    relatedComponent: "alert",
    group: "variants",
    key: "default",
    spec: alertSpec("default", "Heads up", "You can add components using the CLI."),
  },
  {
    id: "alert-destructive",
    kind: "atom",
    title: "Destructive",
    description: "Destructive alert — red tone for errors and critical states.",
    componentName: "AlertDestructive",
    relatedComponent: "alert",
    group: "variants",
    key: "destructive",
    spec: alertSpec("destructive", "Error", "Your session has expired. Please log in again."),
  },
  {
    id: "alert-warning",
    kind: "atom",
    title: "Warning",
    description: "Warning alert — amber tone for cautions and reversible risks.",
    componentName: "AlertWarning",
    relatedComponent: "alert",
    group: "variants",
    key: "warning",
    spec: alertSpec("warning", "Warning", "This action cannot be undone once confirmed."),
  },
  {
    id: "alert-success",
    kind: "atom",
    title: "Success",
    description: "Success alert — green tone for confirmations and completed actions.",
    componentName: "AlertSuccess",
    relatedComponent: "alert",
    group: "variants",
    key: "success",
    spec: alertSpec("success", "Success", "Your changes have been saved."),
  },
]

export default samples
