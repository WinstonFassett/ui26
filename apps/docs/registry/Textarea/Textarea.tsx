import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../_shared/lib/cn";
import { textarea } from "./Textarea.tv";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(textarea(), className)} {...props} />
  ),
);
Textarea.displayName = "Textarea";
