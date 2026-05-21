import { tv, type VariantProps } from "tailwind-variants";

export const textarea = tv({
  base: [
    "flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-2.5 py-1.5 text-sm text-foreground",
    "shadow-[var(--shadow-xs)] transition-[color,box-shadow,border-color] duration-150 outline-none",
    "placeholder:text-muted-foreground",
    "focus-visible:border-ring focus-visible:ring-[1.5px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "aria-invalid:border-destructive aria-invalid:ring-[1.5px] aria-invalid:ring-destructive",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  ],
  variants: {},
});

export type TextareaVariants = VariantProps<typeof textarea>;
