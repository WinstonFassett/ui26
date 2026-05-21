import { tv, type VariantProps } from "tailwind-variants";

export const slider = tv({
  base: [
    "w-full cursor-pointer accent-primary",
    "h-2 rounded-full appearance-none bg-muted",
    "focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
});

export type SliderVariants = VariantProps<typeof slider>;
