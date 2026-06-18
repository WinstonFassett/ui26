export interface AccordionProps {
  class?: string;
}

function Accordion(props: AccordionProps) {
  return (
    <>
      <div class="w-full">
        <slot></slot>
      </div>
    </>
  );
}

export default Accordion;
