import { tv, type VariantProps } from "tailwind-variants";

export const checkbox = tv({
  base: [
    "size-[14px] shrink-0 cursor-pointer accent-primary rounded-[3px]",
    "focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "aria-invalid:outline aria-invalid:outline-[1.5px] aria-invalid:outline-destructive",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  ],
  variants: {},
});

export type CheckboxVariants = VariantProps<typeof checkbox>;
