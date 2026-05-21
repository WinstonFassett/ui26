import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { switchRoot, switchThumb } from "./switch.tv";

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  rootClassName?: string;
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, rootClassName, ...props }, ref) => (
    <label className={cn(switchRoot(), rootClassName)}>
      <input
        ref={ref}
        type="checkbox"
        className={cn("peer sr-only", className)}
        {...props}
      />
      <span className={switchThumb()} />
    </label>
  ),
);
Switch.displayName = "Switch";
