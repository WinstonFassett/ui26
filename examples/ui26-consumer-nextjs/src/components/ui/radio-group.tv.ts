import { tv, type VariantProps } from "tailwind-variants";

export const radioGroup = tv({
  base: "grid gap-2",
});

export const radioGroupItem = tv({
  base: [
    "size-4 shrink-0 cursor-pointer accent-primary rounded-full",
    "focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  ],
});

export type RadioGroupVariants = VariantProps<typeof radioGroup>;
