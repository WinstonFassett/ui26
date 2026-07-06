import { tv, type VariantProps } from "tailwind-variants";

export const toggle = tv({
  base: [
    "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap select-none bg-transparent text-foreground",
    "rounded-lg text-sm font-medium tracking-[-0.005em]",
    "transition-[background-color,box-shadow] duration-150",
    "outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5",
  ],
  variants: {
    variant: {
      default: [
        "border border-border bg-transparent hover:bg-muted/50 text-muted-foreground",
        "aria-pressed:bg-muted aria-pressed:text-foreground aria-pressed:border-foreground/20",
      ],
      outline: [
        "border border-border bg-transparent hover:bg-border/5",
        "aria-pressed:bg-muted aria-pressed:border-foreground/30",
      ],
      ghost: [
        "hover:bg-muted/50 text-muted-foreground",
        "aria-pressed:bg-muted aria-pressed:text-foreground",
      ],
    },
    size: {
      default: "h-8 px-3",
      sm: "h-7 px-2.5 text-xs",
      lg: "h-9 px-4",
      icon: "h-8 w-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type ToggleVariants = VariantProps<typeof toggle>;
