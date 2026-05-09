import type { Sample } from "./types"

const sample: Sample = {
  id: "onboarding-card",
  kind: "block",
  title: "Onboarding card",
  description: "Step-by-step onboarding card with a progress bar and checklist of tasks.",
  componentName: "OnboardingCard",
  category: "Feedback",
  order: 5,
  registryDependencies: ["card", "progress", "checkbox"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: {}, children: ["header", "content"] },
      header: { type: "CardHeader", props: {}, children: ["label", "title"] },
      label: {
        type: "CardDescription",
        props: { text: "Onboarding", className: "font-mono text-[10px] tracking-[0.08em] uppercase text-text-mute" },
        children: [],
      },
      title: { type: "CardTitle", props: { text: "Connect your first machine" }, children: [] },
      content: { type: "CardContent", props: {}, children: ["inner"] },
      inner: {
        type: "Stack",
        props: { direction: "col", gap: "3" },
        children: ["progress-section", "step-1", "step-2", "step-3", "step-4"],
      },

      "progress-section": {
        type: "Stack",
        props: { direction: "col", gap: "0" },
        children: ["progress-hd", "progress-bar"],
      },
      "progress-hd": {
        type: "Stack",
        props: { direction: "row", justify: "between", className: "mb-1.5" },
        children: ["step-label", "step-pct"],
      },
      "step-label": {
        type: "Text",
        props: { content: "Step 2 of 4", mono: true, muted: true, className: "text-[10px] uppercase tracking-[0.06em]" },
        children: [],
      },
      "step-pct": {
        type: "Text",
        props: { content: "50%", mono: true, muted: true, className: "text-[10px]" },
        children: [],
      },
      "progress-bar": { type: "Progress", props: { value: 50, className: "h-1" }, children: [] },

      "step-1": {
        type: "Stack",
        props: { direction: "row", gap: "3", align: "center" },
        children: ["step-1-cb", "step-1-text"],
      },
      "step-1-cb":   { type: "Checkbox", props: { checked: true,  disabled: true  }, children: [] },
      "step-1-text": { type: "Text", props: { content: "Install matchina",                    className: "text-[13px]"             }, children: [] },

      "step-2": {
        type: "Stack",
        props: { direction: "row", gap: "3", align: "center" },
        children: ["step-2-cb", "step-2-text"],
      },
      "step-2-cb":   { type: "Checkbox", props: { checked: false, disabled: false }, children: [] },
      "step-2-text": { type: "Text", props: { content: "Define a machine",                    className: "text-[13px] font-medium" }, children: [] },

      "step-3": {
        type: "Stack",
        props: { direction: "row", gap: "3", align: "center" },
        children: ["step-3-cb", "step-3-text"],
      },
      "step-3-cb":   { type: "Checkbox", props: { checked: false, disabled: true  }, children: [] },
      "step-3-text": { type: "Text", props: { content: "Mount in your app",                   className: "text-[13px]", muted: true }, children: [] },

      "step-4": {
        type: "Stack",
        props: { direction: "row", gap: "3", align: "center" },
        children: ["step-4-cb", "step-4-text"],
      },
      "step-4-cb":   { type: "Checkbox", props: { checked: false, disabled: true  }, children: [] },
      "step-4-text": { type: "Text", props: { content: "Test transitions",                    className: "text-[13px]", muted: true }, children: [] },
    },
  },
}

export default sample
