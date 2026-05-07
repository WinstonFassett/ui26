import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { skeleton } from "./skeleton.tv";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(skeleton(), className)} {...props} />
  ),
);
Skeleton.displayName = "Skeleton";
