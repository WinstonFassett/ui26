import {
  forwardRef,
  type FieldsetHTMLAttributes,
  type HTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Separator } from "./separator";
import {
  field,
  fieldContent,
  fieldDescription,
  fieldError,
  fieldGroup,
  fieldLabel,
  fieldLegend,
  fieldSeparator,
  fieldSet,
  fieldTitle,
  type FieldLegendVariants,
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

export const FieldGroup = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="field-group" className={cn(fieldGroup(), className)} {...props} />
  ),
);
FieldGroup.displayName = "FieldGroup";

export const FieldSet = forwardRef<HTMLFieldSetElement, FieldsetHTMLAttributes<HTMLFieldSetElement>>(
  ({ className, ...props }, ref) => (
    <fieldset ref={ref} data-slot="field-set" className={cn(fieldSet(), className)} {...props} />
  ),
);
FieldSet.displayName = "FieldSet";

export type FieldLegendProps = HTMLAttributes<HTMLLegendElement> & FieldLegendVariants;

export const FieldLegend = forwardRef<HTMLLegendElement, FieldLegendProps>(
  ({ className, variant, ...props }, ref) => (
    <legend
      ref={ref}
      data-slot="field-legend"
      data-variant={variant ?? "legend"}
      className={cn(fieldLegend({ variant }), className)}
      {...props}
    />
  ),
);
FieldLegend.displayName = "FieldLegend";

export const FieldTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="field-title" className={cn(fieldTitle(), className)} {...props} />
  ),
);
FieldTitle.displayName = "FieldTitle";

export type FieldSeparatorProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export const FieldSeparator = forwardRef<HTMLDivElement, FieldSeparatorProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="field-separator"
      data-content={!!children}
      className={cn(fieldSeparator(), className)}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          data-slot="field-separator-content"
          className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
        >
          {children}
        </span>
      )}
    </div>
  ),
);
FieldSeparator.displayName = "FieldSeparator";
