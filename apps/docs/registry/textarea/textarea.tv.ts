import { tv, type VariantProps } from "tailwind-variants";

export const textarea = tv({
  base: [
    "flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base md:text-sm",
    "shadow-xs transition-[color,box-shadow] outline-none",
    "placeholder:text-muted-foreground",
    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30",
    "aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  ],
  variants: {},
});

export type TextareaVariants = VariantProps<typeof textarea>;
