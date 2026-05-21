import { tv, type VariantProps } from "tailwind-variants";

export const progressRoot = tv({
  base: "relative h-2 w-full overflow-hidden rounded-full bg-muted",
});

export const progressIndicator = tv({
  base: "h-full w-full flex-1 transition-all duration-300 ease-out",
  variants: {
    variant: {
      default: "bg-primary",
      destructive: "bg-destructive",
      success: "bg-success",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ProgressVariants = VariantProps<typeof progressIndicator>;
