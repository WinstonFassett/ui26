export interface AccordionProps {
  class?: string;
}

export default function Accordion(props: AccordionProps) {
  return (
    <div class="w-full">
      <slot />
    </div>
  );
}
