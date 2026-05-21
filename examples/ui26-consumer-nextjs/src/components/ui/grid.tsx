import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { grid, type GridVariants } from "./grid.tv";

export type GridProps = HTMLAttributes<HTMLDivElement> & GridVariants;

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(grid({ cols, gap }), className)}
      {...props}
    />
  ),
);
Grid.displayName = "Grid";
