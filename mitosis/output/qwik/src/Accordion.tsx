import { Fragment, component$, h } from "@builder.io/qwik";

export interface AccordionProps {
  class?: string;
}
export const Accordion = component$((props: AccordionProps) => {
  return (
    <div class="w-full">
      <slot></slot>
    </div>
  );
});

export default Accordion;
