import { tv, type VariantProps } from "tailwind-variants";

export const badge = tv({
  base: [
    "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap select-none",
    "rounded-full border border-transparent px-2 py-0.5 text-xs font-medium",
    "transition-[color,box-shadow]",
    "outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30",
    "aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20",
    "[&>svg]:pointer-events-none [&>svg]:size-3",
  ],
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      outline: "border-border text-foreground",
      ghost: "text-foreground",
      destructive: "bg-destructive text-destructive-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type BadgeVariants = VariantProps<typeof badge>;
