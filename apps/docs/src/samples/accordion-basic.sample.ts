import type { Sample } from "./types"

const sample: Sample = {
  id: "accordion-basic",
  kind: "atom",
  title: "Basic",
  description: "Three accordion items — third open by default.",
  componentName: "AccordionBasic",
  relatedComponent: "accordion",
  group: "basic",
  spec: {
    root: "accordion",
    elements: {
      accordion: { type: "Accordion", props: {}, children: ["item-1", "item-2", "item-3"] },
      "item-1": { type: "AccordionItem", props: {}, children: ["trigger-1", "content-1"] },
      "trigger-1": { type: "AccordionTrigger", props: { text: "Is it accessible?" }, children: [] },
      "content-1": { type: "AccordionContent", props: { text: "Yes. Uses native details/summary elements with built-in keyboard support and ARIA semantics." }, children: [] },
      "item-2": { type: "AccordionItem", props: {}, children: ["trigger-2", "content-2"] },
      "trigger-2": { type: "AccordionTrigger", props: { text: "Is it styled?" }, children: [] },
      "content-2": { type: "AccordionContent", props: { text: "Yes. Comes with default styles that match the design system and can be overridden with Tailwind classes." }, children: [] },
      "item-3": { type: "AccordionItem", props: { open: true }, children: ["trigger-3", "content-3"] },
      "trigger-3": { type: "AccordionTrigger", props: { text: "Can I open one by default?" }, children: [] },
      "content-3": { type: "AccordionContent", props: { text: "Yes. Pass the open prop to AccordionItem." }, children: [] },
    },
  },
}

export default sample
