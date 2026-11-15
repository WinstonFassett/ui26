import { Toggle } from "@ui-sdk/react/toggle";

export default function SdkToggle() {
  return (
    <Toggle
      data-testid="sdk-toggle"
      defaultPressed={false}
      className="rounded-md border px-3 py-2 text-sm aria-pressed:bg-foreground aria-pressed:text-background"
    >
      UI SDK toggle
    </Toggle>
  );
}
