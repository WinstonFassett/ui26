import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../_shared/lib/cn";
import { input } from "./Input.tv";

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
