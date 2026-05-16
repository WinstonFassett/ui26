import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";

export function TooltipDemo() {
  return (
    <div className="relative inline-block">
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>This is a tooltip.</TooltipContent>
      </Tooltip>
    </div>
  );
}
