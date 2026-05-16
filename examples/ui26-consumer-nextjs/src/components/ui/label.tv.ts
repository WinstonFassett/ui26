import { tv, type VariantProps } from "tailwind-variants";

export const label = tv({
  base: [
    "flex items-center gap-2 text-xs leading-none font-medium tracking-[0.01em] uppercase text-muted-foreground select-none",
    "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  ],
  variants: {},
});

export type LabelVariants = VariantProps<typeof label>;
