import type { Sample } from "./types"

const sample: Sample = {
  id: "accordion-card",
  kind: "block",
  title: "Accordion card",
  description: "FAQ card using native details/summary accordion — first item open by default.",
  componentName: "AccordionCard",
  category: "Feedback",
  order: 6,
  registryDependencies: ["card", "accordion"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: {}, children: ["header", "content"] },
      header: { type: "CardHeader", props: {}, children: ["label", "title"] },
      label: {
        type: "CardDescription",
        props: { text: "Accordion", className: "font-mono text-[10px] tracking-[0.08em] uppercase text-text-mute" },
        children: [],
      },
      title: { type: "CardTitle", props: { text: "FAQ" }, children: [] },
      content: { type: "CardContent", props: {}, children: ["accordion"] },
      accordion: { type: "Accordion", props: {}, children: ["item-1", "item-2", "item-3"] },

      "item-1": { type: "AccordionItem", props: { open: true }, children: ["trigger-1", "content-1"] },
      "trigger-1": {
        type: "AccordionTrigger",
        props: { text: "What is matchina?" },
        children: [],
      },
      "content-1": {
        type: "AccordionContent",
        props: { text: "A typed state-machine library — composable, framework-agnostic, zero config." },
        children: [],
      },

      "item-2": { type: "AccordionItem", props: {}, children: ["trigger-2", "content-2"] },
      "trigger-2": {
        type: "AccordionTrigger",
        props: { text: "How does persistence work?" },
        children: [],
      },
      "content-2": {
        type: "AccordionContent",
        props: { text: "Pass persist: 'key' to useMachine — survives remounts and page reloads." },
        children: [],
      },

      "item-3": { type: "AccordionItem", props: {}, children: ["trigger-3", "content-3"] },
      "trigger-3": {
        type: "AccordionTrigger",
        props: { text: "Is it accessible?" },
        children: [],
      },
      "content-3": {
        type: "AccordionContent",
        props: { text: "Yes — built on native details/summary, zero JS overhead." },
        children: [],
      },
    },
  },
}

export default sample
