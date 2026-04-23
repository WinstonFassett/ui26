import { tv, type VariantProps } from "tailwind-variants";

export const card = tv({
  base: "bg-card text-card-foreground flex flex-col gap-4 rounded-lg border py-5 shadow-[var(--shadow-sm)]",
});

export const cardHeader = tv({
  base: "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1 px-5",
});

export const cardTitle = tv({
  base: "leading-none font-semibold tracking-[-0.01em]",
});

export const cardDescription = tv({
  base: "text-muted-foreground text-sm leading-snug",
});

export const cardContent = tv({
  base: "px-5 text-sm",
});

export const cardFooter = tv({
  base: "flex items-center px-5 [.border-t]:pt-5",
});

export type CardVariants = VariantProps<typeof card>;
