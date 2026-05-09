import type { Sample } from "./types"

const sample: Sample = {
  id: "confirm-dialog",
  kind: "block",
  title: "Confirm dialog",
  description: "Destructive action confirmation — title, description, typed confirmation input, and danger/cancel buttons.",
  componentName: "ConfirmDialog",
  category: "Forms",
  order: 10,
  registryDependencies: ["card", "field", "input", "checkbox", "button"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: { className: "max-w-sm" }, children: ["hdr", "content", "footer"] },
      hdr: { type: "CardHeader", props: {}, children: ["title"] },
      title: { type: "CardTitle", props: { text: "Delete state machine?" }, children: [] },
      content: { type: "CardContent", props: {}, children: ["body-stack"] },
      "body-stack": { type: "Stack", props: { direction: "col", gap: "4" }, children: ["body", "fld", "agree"] },
      body: {
        type: "Text",
        props: {
          content: "This will permanently remove checkout and all 14 connected effects.",
          size: "sm",
          muted: true,
        },
        children: [],
      },
      fld: { type: "Field", props: {}, children: ["lbl", "inp"] },
      lbl: { type: "FieldLabel", props: { text: "Type 'checkout' to confirm" }, children: [] },
      inp: { type: "Input", props: { placeholder: "checkout" }, children: [] },
      agree: { type: "Field", props: { orientation: "horizontal" }, children: ["chk", "aglbl"] },
      chk: { type: "Checkbox", props: {}, children: [] },
      aglbl: { type: "FieldLabel", props: { text: "I understand this cannot be undone." }, children: [] },
      footer: { type: "CardFooter", props: { className: "justify-end gap-2" }, children: ["cancel", "del"] },
      cancel: { type: "Button", props: { label: "Cancel", variant: "ghost" }, children: [] },
      del: { type: "Button", props: { label: "Delete machine", variant: "destructive" }, children: [] },
    },
  },
}

export default sample
