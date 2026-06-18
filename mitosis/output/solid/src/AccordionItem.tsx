export interface AccordionItemProps {
  open?: boolean;
  class?: string;
}

import { accordionItem } from "../../apps/docs/registry/accordion/accordion.tv";

function AccordionItem(props: AccordionItemProps) {
  return (
    <>
      <details class={accordionItem()} open={props.open}>
        <slot></slot>
      </details>
    </>
  );
}

export default AccordionItem;
