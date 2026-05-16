import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { checkbox } from "./checkbox.tv";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={cn(checkbox(), className)}
      {...props}
    />
  ),
);
Checkbox.displayName = "Checkbox";
