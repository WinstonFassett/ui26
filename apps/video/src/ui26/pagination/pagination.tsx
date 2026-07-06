import { forwardRef, type HTMLAttributes, type AnchorHTMLAttributes, type ComponentPropsWithoutRef } from "react";
import { cn } from "../lib/utils";
import {
  pagination,
  paginationContent,
  paginationItem,
  paginationLink,
  paginationEllipsis,
  type PaginationLinkVariants,
} from "./pagination.tv";

export const Pagination = ({ className, ...props }: ComponentPropsWithoutRef<"nav">) => (
  <nav role="navigation" aria-label="pagination" className={cn(pagination(), className)} {...props} />
);
Pagination.displayName = "Pagination";

export const PaginationContent = forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn(paginationContent(), className)} {...props} />
  ),
);
PaginationContent.displayName = "PaginationContent";

export const PaginationItem = forwardRef<HTMLLIElement, HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn(paginationItem(), className)} {...props} />
  ),
);
PaginationItem.displayName = "PaginationItem";

export type PaginationLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & PaginationLinkVariants;

export const PaginationLink = ({ className, isActive, ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(paginationLink({ isActive }), className)}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

export const PaginationPrevious = ({ className, ...props }: PaginationLinkProps) => (
  <PaginationLink aria-label="Go to previous page" className={cn("gap-1 pl-2.5", className)} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

export const PaginationNext = ({ className, ...props }: PaginationLinkProps) => (
  <PaginationLink aria-label="Go to next page" className={cn("gap-1 pr-2.5", className)} {...props}>
    <span>Next</span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

export const PaginationEllipsis = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span aria-hidden className={cn(paginationEllipsis(), className)} {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
    </svg>
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";
