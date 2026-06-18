import {
  accordionContent,
  accordionContentInner,
} from "../../apps/docs/registry/accordion/accordion.tv";

import { Fragment, component$, h } from "@builder.io/qwik";

export interface AccordionContentProps {
  class?: string;
}
export const AccordionContent = component$((props: AccordionContentProps) => {
  return (
    <div class={accordionContent()}>
      <div class={accordionContentInner()}>
        <slot></slot>
      </div>
    </div>
  );
});

export default AccordionContent;
