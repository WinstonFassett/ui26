import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../_shared/lib/cn";
import { separator, type SeparatorVariants } from "./Separator.tv";

export type SeparatorProps = HTMLAttributes<HTMLDivElement> &
  SeparatorVariants & {
    decorative?: boolean;
  };

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation ?? "horizontal"}
      className={cn(separator({ orientation }), className)}
      {...props}
    />
  ),
);
Separator.displayName = "Separator";
