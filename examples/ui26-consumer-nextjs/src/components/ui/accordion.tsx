import { forwardRef, type Ref, type HTMLAttributes, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { accordionItem, accordionTrigger, accordionContent, accordionContentInner } from "./accordion.tv";

export type AccordionProps = HTMLAttributes<HTMLDivElement>;

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("w-full", className)} {...props} />
  ),
);
Accordion.displayName = "Accordion";

export type AccordionItemProps = ComponentPropsWithoutRef<"details">;

export const AccordionItem = forwardRef<HTMLDetailsElement, AccordionItemProps>(
  ({ className, ...props }, ref) => (
    <details ref={ref} className={cn(accordionItem(), className)} {...props} />
  ),
);
AccordionItem.displayName = "AccordionItem";

export type AccordionTriggerProps = HTMLAttributes<HTMLElement>;

export const AccordionTrigger = forwardRef<HTMLElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <summary
      ref={ref as Ref<HTMLElement>}
      className={cn(accordionTrigger(), className)}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-200 details-open:rotate-180"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </summary>
  ),
);
AccordionTrigger.displayName = "AccordionTrigger";

export type AccordionContentProps = HTMLAttributes<HTMLDivElement>;

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(accordionContent(), className)} {...props}>
      <div className={cn(accordionContentInner())}>{children}</div>
    </div>
  ),
);
AccordionContent.displayName = "AccordionContent";
