import { tv, type VariantProps } from "tailwind-variants";

export const breadcrumb = tv({
  base: "",
});

export const breadcrumbList = tv({
  base: "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
});

export const breadcrumbItem = tv({
  base: "inline-flex items-center gap-1.5",
});

export const breadcrumbLink = tv({
  base: "hover:text-foreground transition-colors",
});

export const breadcrumbPage = tv({
  base: "font-normal text-foreground",
});

export const breadcrumbSeparator = tv({
  base: "[&>svg]:size-3.5",
});

export const breadcrumbEllipsis = tv({
  base: "flex size-9 items-center justify-center",
});

export type BreadcrumbVariants = VariantProps<typeof breadcrumb>;
