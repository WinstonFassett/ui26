import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { badge, type BadgeVariants } from "./badge.tv";

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
