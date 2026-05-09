"use client";

import { Input } from "@registry/input/input";
import { DemoSection } from "./doc-sample";
import type { Demo } from "./doc-sample";
import { getSamples } from "@/samples";
import type { Sample } from "@/samples/types";

function toDemos(samples: Sample[]): Demo[] {
  return samples.map((s) => ({ id: s.key ?? s.id, label: s.title, spec: s.spec }));
}

const STATE_DEMOS = toDemos(getSamples({ kind: "atom", relatedComponent: "input", group: "states" }));
const TYPE_DEMOS = toDemos(getSamples({ kind: "atom", relatedComponent: "input", group: "types" }));

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
        demos={STATE_DEMOS}
        renderTile={(demo) => STATE_TILES[demo.id]}
      />
      <DemoSection
        title="Types"
        namePrefix="Input"
        demos={TYPE_DEMOS}
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
