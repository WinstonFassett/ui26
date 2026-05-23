import { Button } from "../button/button";
import { Popover, PopoverTrigger, PopoverContent } from "./popover-machine-ui";

export function PopoverDemo() {
  return (
    <div className="relative inline-block">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p className="text-sm text-muted-foreground">This is a popover. It can contain any content.</p>
        </PopoverContent>
      </Popover>
    </div>
  );
}
