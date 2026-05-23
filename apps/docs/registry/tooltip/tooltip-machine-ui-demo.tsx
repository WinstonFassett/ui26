import { Button } from "../button/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip-machine-ui";

export function TooltipDemo() {
  return (
    <div className="relative inline-block">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>This is a tooltip.</TooltipContent>
      </Tooltip>
    </div>
  );
}
