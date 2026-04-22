import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { input } from "./input.tv";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(input(), className)}
      {...props}
    />
  ),
);
Input.displayName = "Input";
