import { accordionItem } from '../../apps/docs/registry/accordion/accordion.tv';

export interface AccordionItemProps {
  open?: boolean;
  class?: string;
}

export default function AccordionItem(props: AccordionItemProps) {
  return (
    <details open={props.open} class={accordionItem()}>
      <slot />
    </details>
  );
}
