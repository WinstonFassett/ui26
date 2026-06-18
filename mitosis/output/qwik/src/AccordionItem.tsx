import { accordionItem } from "../../apps/docs/registry/accordion/accordion.tv";

import { Fragment, component$, h } from "@builder.io/qwik";

export interface AccordionItemProps {
  open?: boolean;
  class?: string;
}
export const AccordionItem = component$((props: AccordionItemProps) => {
  return (
    <details open={props.open} class={accordionItem()}>
      <slot></slot>
    </details>
  );
});

export default AccordionItem;
