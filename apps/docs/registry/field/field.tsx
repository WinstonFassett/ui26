import { forwardRef, type HTMLAttributes, type LabelHTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { Label } from "../label/label";
import {
  field,
  fieldContent,
  fieldDescription,
  fieldError,
  fieldLabel,
  type FieldVariants,
} from "./field.tv";

export type FieldProps = HTMLAttributes<HTMLDivElement> & FieldVariants;

export const Field = forwardRef<HTMLDivElement, FieldProps>(
  ({ className, orientation, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      data-slot="field"
      data-orientation={orientation ?? "vertical"}
      className={cn(field({ orientation }), className)}
      {...props}
    />
  ),
);
Field.displayName = "Field";

export const FieldContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="field-content" className={cn(fieldContent(), className)} {...props} />
  ),
);
FieldContent.displayName = "FieldContent";

export const FieldLabel = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <Label ref={ref} data-slot="field-label" className={cn(fieldLabel(), className)} {...props} />
  ),
);
FieldLabel.displayName = "FieldLabel";

export const FieldDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} data-slot="field-description" className={cn(fieldDescription(), className)} {...props} />
  ),
);
FieldDescription.displayName = "FieldDescription";

export type FieldErrorProps = HTMLAttributes<HTMLDivElement>;

export const FieldError = forwardRef<HTMLDivElement, FieldErrorProps>(
  ({ className, children, ...props }, ref) => {
    if (!children) return null;
    return (
      <div
        ref={ref}
        role="alert"
        data-slot="field-error"
        className={cn(fieldError(), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
FieldError.displayName = "FieldError";
