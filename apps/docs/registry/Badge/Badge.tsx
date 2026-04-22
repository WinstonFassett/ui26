import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../_shared/lib/cn";
import { badge, type BadgeVariants } from "./Badge.tv";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & BadgeVariants;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badge({ variant }), className)}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";
