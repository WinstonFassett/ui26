import { forwardRef, type LabelHTMLAttributes } from "react";
import { cn } from "../_shared/lib/cn";
import { label } from "./Label.tv";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn(label(), className)} {...props} />
  ),
);
Label.displayName = "Label";
