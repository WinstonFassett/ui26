import { tv, type VariantProps } from "tailwind-variants";

export const tabsList = tv({
  base: ["text-muted-foreground"],
  variants: {
    variant: {
      pill: "inline-flex h-9 items-center justify-start rounded-lg bg-muted p-1",
      underline: "flex items-end gap-1 border-b border-border",
    },
  },
  defaultVariants: { variant: "pill" },
});

export const tabsTrigger = tv({
  base: [
    "inline-flex items-center justify-center whitespace-nowrap",
    "ring-offset-background transition-all cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  variants: {
    variant: {
      pill: [
        "rounded-md px-3 py-1 text-sm font-medium",
        "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      ],
      underline: [
        "px-4 pt-3 pb-1.5 -mb-px",
        "font-mono text-[10px] uppercase tracking-wider",
        "border-b-[1.5px] border-transparent",
        "hover:text-foreground",
        "data-[state=active]:border-accent data-[state=active]:text-foreground",
      ],
    },
  },
  defaultVariants: { variant: "pill" },
});

export const tabsContent = tv({
  base: [
    "mt-2 ring-offset-background",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  ],
});

export type TabsVariants = VariantProps<typeof tabsList>;
