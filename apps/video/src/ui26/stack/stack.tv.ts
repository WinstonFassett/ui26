import { tv, type VariantProps } from "tailwind-variants";

export const stack = tv({
  base: "flex",
  variants: {
    direction: {
      row: "flex-row",
      col: "flex-col",
    },
    gap: {
      "0": "gap-0",
      "1": "gap-1",
      "2": "gap-2",
      "3": "gap-3",
      "4": "gap-4",
      "5": "gap-5",
      "6": "gap-6",
      "8": "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
    wrap: {
      true: "flex-wrap",
    },
  },
  defaultVariants: {
    direction: "col",
    gap: "4",
  },
});

export type StackVariants = VariantProps<typeof stack>;
