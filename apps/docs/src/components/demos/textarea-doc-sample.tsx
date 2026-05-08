"use client";

import { Textarea } from "@registry/textarea/textarea";
import { DemoSection } from "./doc-sample";
import { TEXTAREA_STATE_DEMOS } from "./textarea-demos";

const TILES: Record<string, React.ReactNode> = {
  default: <Textarea placeholder="Type here" rows={3} className="w-56" tabIndex={-1} />,
  invalid: <Textarea defaultValue="too short" aria-invalid rows={3} className="w-56" tabIndex={-1} />,
  disabled: <Textarea placeholder="Disabled" disabled rows={3} className="w-56" tabIndex={-1} />,
};

export function TextareaDocSample() {
  return (
    <DemoSection
      title="States"
      namePrefix="Textarea"
      demos={TEXTAREA_STATE_DEMOS}
      renderTile={(demo) => TILES[demo.id]}
    />
  );
}
