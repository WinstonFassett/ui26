export interface AccordionTriggerProps {
  class?: string;
}

import { accordionTrigger } from "../../apps/docs/registry/accordion/accordion.tv";

function AccordionTrigger(props: AccordionTriggerProps) {
  return (
    <>
      <summary class={accordionTrigger()}>
        <slot></slot>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </summary>
    </>
  );
}

export default AccordionTrigger;
