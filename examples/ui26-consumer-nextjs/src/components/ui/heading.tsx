import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { heading, type HeadingVariants } from "./heading.tv";

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & HeadingVariants;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = "h2", ...props }, ref) => {
    const Tag = level as "h1" | "h2" | "h3" | "h4";
    return (
      <Tag
        ref={ref}
        className={cn(heading({ level }), className)}
        {...props}
      />
    );
  },
);
Heading.displayName = "Heading";
