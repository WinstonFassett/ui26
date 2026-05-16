import { tv, type VariantProps } from "tailwind-variants";

export const heading = tv({
  base: "font-sans text-foreground",
  variants: {
    level: {
      h1: "text-3xl font-semibold tracking-tight",
      h2: "text-2xl font-semibold tracking-tight",
      h3: "text-xl font-semibold tracking-tight",
      h4: "text-lg font-medium",
    },
  },
  defaultVariants: {
    level: "h2",
  },
});

export type HeadingVariants = VariantProps<typeof heading>;
