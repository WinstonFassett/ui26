import { tv, type VariantProps } from "tailwind-variants";

export const pagination = tv({
  base: "mx-auto flex w-full justify-center",
});

export const paginationContent = tv({
  base: "flex flex-row items-center gap-1",
});

export const paginationItem = tv({
  base: "",
});

export const paginationLink = tv({
  base: [
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium",
    "h-9 w-9 transition-colors",
    "hover:bg-muted hover:text-foreground",
    "outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  variants: {
    isActive: {
      true: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
  },
});

export const paginationEllipsis = tv({
  base: "flex size-9 items-center justify-center text-muted-foreground",
});

export type PaginationVariants = VariantProps<typeof pagination>;
export type PaginationLinkVariants = VariantProps<typeof paginationLink>;
