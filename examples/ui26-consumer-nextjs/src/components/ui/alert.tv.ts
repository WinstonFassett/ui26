import { tv, type VariantProps } from "tailwind-variants";

export const alert = tv({
  base: [
    "relative w-full rounded-lg border border-border bg-card px-4 py-3 text-sm",
    "[&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
    "[&>svg~*]:pl-7",
  ],
  variants: {
    variant: {
      default: "text-foreground",
      destructive:
        "border-destructive/50 text-destructive [&>svg]:text-destructive",
      warning:
        "border-warning/50 text-warning [&>svg]:text-warning",
      success:
        "border-success/50 text-success [&>svg]:text-success",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const alertTitle = tv({
  base: "mb-1 font-medium leading-none tracking-tight",
});

export const alertDescription = tv({
  base: "text-sm [&_p]:leading-relaxed opacity-90",
});

export type AlertVariants = VariantProps<typeof alert>;
