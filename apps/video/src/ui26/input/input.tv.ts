import { tv, type VariantProps } from "tailwind-variants";

export const input = tv({
  base: [
    "flex h-8 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-sm text-foreground",
    "shadow-[var(--shadow-xs)] transition-[color,box-shadow,border-color] duration-150 outline-none",
    "selection:bg-primary selection:text-primary-foreground",
    "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
    "placeholder:text-muted-foreground",
    "focus-visible:border-ring focus-visible:ring-[1.5px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "aria-invalid:border-destructive aria-invalid:ring-[1.5px] aria-invalid:ring-destructive",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  ],
  variants: {},
});

export type InputVariants = VariantProps<typeof input>;
