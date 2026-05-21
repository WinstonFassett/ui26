import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { toggle, type ToggleVariants } from "./toggle.tv";

export type ToggleProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ToggleVariants & {
    pressed?: boolean;
  };

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, pressed, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={pressed}
      className={cn(toggle({ variant, size }), className)}
      {...props}
    />
  ),
);
Toggle.displayName = "Toggle";
