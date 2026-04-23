import { tv, type VariantProps } from "tailwind-variants";

export const switchRoot = tv({
  base: [
    "relative inline-flex h-[18px] w-[30px] shrink-0 cursor-pointer items-center rounded-full border border-border bg-input px-[2px] shadow-[var(--shadow-xs)] transition-colors duration-150",
    "has-[:checked]:bg-primary has-[:checked]:border-primary",
    "has-[:focus-visible]:ring-[1.5px] has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background",
    "has-[:disabled]:pointer-events-none has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
    "has-[[aria-invalid=true]]:ring-[1.5px] has-[[aria-invalid=true]]:ring-destructive",
  ],
});

export const switchThumb = tv({
  base: [
    "pointer-events-none block size-[12px] rounded-full bg-background ring-0 shadow-[var(--shadow-xs)] transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "translate-x-0 peer-checked:translate-x-3",
  ],
});

export type SwitchVariants = VariantProps<typeof switchRoot>;
