import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { stack, type StackVariants } from "./stack.tv";

export type StackProps = HTMLAttributes<HTMLDivElement> & StackVariants;

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, gap, align, justify, wrap, ...props }, ref) => (
    <div
      {...(ref && { ref })}
      className={cn(stack({ direction, gap, align, justify, wrap }), className)}
      {...props}
    />
  ),
);
Stack.displayName = "Stack";
