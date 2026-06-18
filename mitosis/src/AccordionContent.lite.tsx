import { accordionContent, accordionContentInner } from '../../apps/docs/registry/accordion/accordion.tv';

export interface AccordionContentProps {
  class?: string;
}

export default function AccordionContent(props: AccordionContentProps) {
  return (
    <div class={accordionContent()}>
      <div class={accordionContentInner()}>
        <slot />
      </div>
    </div>
  );
}
