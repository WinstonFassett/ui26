import { tv, type VariantProps } from "tailwind-variants";

export const dialogOverlay = tv({
  base: [
    "fixed inset-0 z-50 bg-black/50",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "duration-200",
  ],
});

export const dialogContent = tv({
  base: [
    "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 sm:max-w-lg",
    "rounded-lg border border-border bg-background p-6 shadow-lg outline-none",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
    "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
    "duration-200",
  ],
});

export const dialogTitle = tv({
  base: "text-lg font-semibold leading-none tracking-tight",
});

export const dialogDescription = tv({
  base: "text-sm text-muted-foreground",
});

export type DialogContentVariants = VariantProps<typeof dialogContent>;
