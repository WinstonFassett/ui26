import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { alert, alertTitle, alertDescription, type AlertVariants } from "./alert.tv";

export type AlertProps = HTMLAttributes<HTMLDivElement> & AlertVariants;

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alert({ variant }), className)}
      {...props}
    />
  ),
);
Alert.displayName = "Alert";

export const AlertTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn(alertTitle(), className)} {...props} />
  ),
);
AlertTitle.displayName = "AlertTitle";

export const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(alertDescription(), className)} {...props} />
  ),
);
AlertDescription.displayName = "AlertDescription";
