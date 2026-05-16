import { Popover, PopoverTrigger, PopoverContent } from "./popover";

export function PopoverDemo() {
  return (
    <div className="relative inline-block">
      <Popover>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent>
          <p className="text-sm text-muted-foreground">This is a popover. It can contain any content.</p>
        </PopoverContent>
      </Popover>
    </div>
  );
}
