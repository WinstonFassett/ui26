import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { slider } from "./slider.tv";

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="range"
      className={cn(slider(), className)}
      {...props}
    />
  ),
);
Slider.displayName = "Slider";
