import { tv, type VariantProps } from "tailwind-variants";

export const dropdownContent = tv({
  base: [
    "z-50 min-w-[8rem] overflow-hidden rounded-[var(--radius,0.375rem)] border border-border bg-popover p-1 text-popover-foreground shadow-md",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  ],
});

export const dropdownItem = tv({
  base: [
    "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
    "transition-colors hover:bg-accent hover:text-accent-foreground",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  ],
});

export const dropdownSeparator = tv({
  base: "-mx-1 my-1 h-px bg-muted",
});

export const dropdownLabel = tv({
  base: "px-2 py-1.5 text-xs font-semibold text-muted-foreground",
});

export type DropdownContentVariants = VariantProps<typeof dropdownContent>;
export type DropdownItemVariants = VariantProps<typeof dropdownItem>;
