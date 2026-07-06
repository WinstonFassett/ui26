import { tv, type VariantProps } from "tailwind-variants";

export const avatarRoot = tv({
  base: "relative flex shrink-0 overflow-hidden rounded-full",
  variants: {
    size: {
      sm: "size-8",
      default: "size-10",
      lg: "size-12",
      xl: "size-16",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const avatarImage = tv({
  base: "aspect-square size-full object-cover",
});

export const avatarFallback = tv({
  base: [
    "flex size-full items-center justify-center rounded-full bg-muted",
    "text-muted-foreground text-sm font-medium select-none",
  ],
});

export type AvatarVariants = VariantProps<typeof avatarRoot>;
