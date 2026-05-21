import { forwardRef, type HTMLAttributes, type AnchorHTMLAttributes, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import {
  breadcrumb,
  breadcrumbList,
  breadcrumbItem,
  breadcrumbLink,
  breadcrumbPage,
  breadcrumbSeparator,
  breadcrumbEllipsis,
} from "./breadcrumb.tv";

export const Breadcrumb = forwardRef<HTMLElement, ComponentPropsWithoutRef<"nav"> & { separator?: React.ReactNode }>(
  ({ className, ...props }, ref) => (
    <nav {...(ref && { ref })} aria-label="breadcrumb" className={cn(breadcrumb(), className)} {...props} />
  ),
);
Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbList = forwardRef<HTMLOListElement, HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol {...(ref && { ref })} className={cn(breadcrumbList(), className)} {...props} />
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = forwardRef<HTMLLIElement, HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li {...(ref && { ref })} className={cn(breadcrumbItem(), className)} {...props} />
  ),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a {...(ref && { ref })} className={cn(breadcrumbLink(), className)} {...props} />
  ),
);
BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      {...(ref && { ref })}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(breadcrumbPage(), className)}
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export const BreadcrumbSeparator = ({ children, className, ...props }: HTMLAttributes<HTMLLIElement>) => (
  <li role="presentation" aria-hidden="true" className={cn(breadcrumbSeparator(), className)} {...props}>
    {children ?? (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m9 18 6-6-6-6" />
      </svg>
    )}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export const BreadcrumbEllipsis = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span role="presentation" aria-hidden="true" className={cn(breadcrumbEllipsis(), className)} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
    </svg>
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
