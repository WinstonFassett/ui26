import { tv, type VariantProps } from "tailwind-variants";

export const checkbox = tv({
  base: [
    "size-4 shrink-0 cursor-pointer accent-primary",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50",
    "aria-invalid:outline aria-invalid:outline-2 aria-invalid:outline-destructive",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  ],
  variants: {},
});

export type CheckboxVariants = VariantProps<typeof checkbox>;
