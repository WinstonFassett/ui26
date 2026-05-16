import { tv, type VariantProps } from "tailwind-variants";

export const grid = tv({
  base: "grid",
  variants: {
    cols: {
      "2": "grid-cols-2",
      "3": "grid-cols-3",
      "4": "grid-cols-4",
    },
    gap: {
      "2": "gap-2",
      "3": "gap-3",
      "4": "gap-4",
      "5": "gap-5",
      "6": "gap-6",
    },
  },
  defaultVariants: {
    gap: "4",
  },
});

export type GridVariants = VariantProps<typeof grid>;
