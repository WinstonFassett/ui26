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


export function InputDocSample() {
  return (
    <>
      <DemoSection
        title="States"
        namePrefix="Input"
        demos={STATE_DEMOS}
        renderTile={() => (
          <div className="flex flex-col gap-1">
            <Input placeholder="Type here" className="w-40" tabIndex={-1} />
            <Input defaultValue="not-an-email" aria-invalid className="w-40" tabIndex={-1} />
            <Input placeholder="Disabled" disabled className="w-40" tabIndex={-1} />
          </div>
        )}
      />
      <DemoSection
        title="Types"
        namePrefix="Input"
        demos={TYPE_DEMOS}
        renderTile={() => (
          <div className="flex flex-col gap-1">
            <Input type="text" placeholder="Text" className="w-40" tabIndex={-1} />
            <Input type="email" placeholder="you@company.com" className="w-40" tabIndex={-1} />
            <Input type="password" placeholder="Password" className="w-40" tabIndex={-1} />
            <Input type="search" placeholder="Search…" className="w-40" tabIndex={-1} />
          </div>
        )}
      />
    </>
  );
}
