import { tv, type VariantProps } from "tailwind-variants";

export const accordionItem = tv({
  base: "border-b border-border",
});

export const accordionTrigger = tv({
  base: [
    "flex w-full items-center justify-between py-4 text-sm font-medium",
    "transition-all hover:underline text-left",
    "outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
    "[&[open]>details>summary>svg]:rotate-180",
    "cursor-pointer",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200",
  ],
});

export const accordionContent = tv({
  base: "overflow-hidden text-sm",
});

export const accordionContentInner = tv({
  base: "pb-4 pt-0",
});

export type AccordionVariants = VariantProps<typeof accordionItem>;
