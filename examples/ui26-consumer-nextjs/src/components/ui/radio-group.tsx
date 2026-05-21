import { forwardRef, type HTMLAttributes, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { radioGroup, radioGroupItem } from "./radio-group.tv";

export type RadioGroupProps = HTMLAttributes<HTMLDivElement>;

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="radiogroup" className={cn(radioGroup(), className)} {...props} />
  ),
);
RadioGroup.displayName = "RadioGroup";

export type RadioGroupItemProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="radio"
      className={cn(radioGroupItem(), className)}
      {...props}
    />
  ),
);
RadioGroupItem.displayName = "RadioGroupItem";
