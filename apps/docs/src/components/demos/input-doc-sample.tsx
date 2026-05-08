"use client";

import { Input } from "@registry/input/input";
import { DemoSection } from "./doc-sample";
import { INPUT_STATE_DEMOS, INPUT_TYPE_DEMOS } from "./input-demos";

const STATE_TILES: Record<string, React.ReactNode> = {
  default: <Input placeholder="Type here" className="w-44" tabIndex={-1} />,
  invalid: <Input defaultValue="not-an-email" aria-invalid className="w-44" tabIndex={-1} />,
  disabled: <Input placeholder="Disabled" disabled className="w-44" tabIndex={-1} />,
  file: <Input type="file" className="w-44 text-xs" tabIndex={-1} />,
};

export function InputDocSample() {
  return (
    <>
      <DemoSection
        title="States"
        namePrefix="Input"
        demos={INPUT_STATE_DEMOS}
        renderTile={(demo) => STATE_TILES[demo.id]}
      />
      <DemoSection
        title="Types"
        namePrefix="Input"
        demos={INPUT_TYPE_DEMOS}
        renderTile={(demo) => (
          <Input
            type={demo.id as "text" | "email" | "password" | "search"}
            placeholder={demo.id === "search" ? "Search…" : demo.id === "email" ? "you@company.com" : undefined}
            className="w-44"
            tabIndex={-1}
          />
        )}
      />
    </>
  );
}
