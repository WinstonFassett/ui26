import { tv, type VariantProps } from "tailwind-variants";

export const card = tv({
  base: "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
});

export const cardHeader = tv({
  base: "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6",
});

export const cardTitle = tv({
  base: "leading-none font-semibold",
});

export const cardDescription = tv({
  base: "text-muted-foreground text-sm",
});

export const cardContent = tv({
  base: "px-6",
});

export const cardFooter = tv({
  base: "flex items-center px-6 [.border-t]:pt-6",
});

export type CardVariants = VariantProps<typeof card>;
