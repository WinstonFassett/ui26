import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../_shared/lib/cn";
import { button, type ButtonVariants } from "./Button.tv";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> &
  ButtonVariants;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(button({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
