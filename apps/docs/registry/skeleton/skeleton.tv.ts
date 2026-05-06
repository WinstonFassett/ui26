import { tv, type VariantProps } from "tailwind-variants";

export const skeleton = tv({
  base: "animate-pulse rounded-md bg-muted",
});

export type SkeletonVariants = VariantProps<typeof skeleton>;
