export interface AccordionContentProps {
  class?: string;
}

import {
  accordionContent,
  accordionContentInner,
} from "../../apps/docs/registry/accordion/accordion.tv";

function AccordionContent(props: AccordionContentProps) {
  return (
    <>
      <div class={accordionContent()}>
        <div class={accordionContentInner()}>
          <slot></slot>
        </div>
      </div>
    </>
  );
}

export default AccordionContent;
