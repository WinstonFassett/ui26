import { tv, type VariantProps } from "tailwind-variants";

export const tabsList = tv({
  base: [
    "inline-flex h-9 items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground",
  ],
});

export const tabsTrigger = tv({
  base: [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1",
    "text-sm font-medium ring-offset-background transition-all",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
    "cursor-pointer",
  ],
});

export const tabsContent = tv({
  base: [
    "mt-2 ring-offset-background",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  ],
});

export type TabsVariants = VariantProps<typeof tabsList>;
