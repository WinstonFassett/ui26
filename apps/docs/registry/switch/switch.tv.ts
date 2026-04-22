import { tv, type VariantProps } from "tailwind-variants";

export const switchRoot = tv({
  base: [
    "relative inline-flex h-[1.15rem] w-8 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-input px-[2px] shadow-xs transition-colors",
    "has-[:checked]:bg-primary",
    "has-[:focus-visible]:border-ring has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50",
    "has-[:disabled]:pointer-events-none has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
    "has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:ring-[3px] has-[[aria-invalid=true]]:ring-destructive/20",
  ],
});

export const switchThumb = tv({
  base: [
    "pointer-events-none block size-4 rounded-full bg-background ring-0 transition-transform",
    "translate-x-0 peer-checked:translate-x-3",
  ],
});

export type SwitchVariants = VariantProps<typeof switchRoot>;
