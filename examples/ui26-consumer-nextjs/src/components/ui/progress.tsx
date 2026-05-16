import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { progressRoot, progressIndicator, type ProgressVariants } from "./progress.tv";

export type ProgressProps = HTMLAttributes<HTMLDivElement> &
  ProgressVariants & {
    value?: number;
    max?: number;
  };

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn(progressRoot(), className)}
      {...props}
    >
      <div
        className={cn(progressIndicator({ variant }))}
        style={{ transform: `translateX(-${100 - (value / max) * 100}%)` }}
      />
    </div>
  ),
);
Progress.displayName = "Progress";
