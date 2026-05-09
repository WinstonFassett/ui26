"use client";

import { Alert, AlertTitle, AlertDescription } from "@registry/alert/alert";
import { DemoSection } from "./doc-sample";
import type { Demo } from "./doc-sample";
import { getSamples } from "@/samples";
import type { Sample } from "@/samples/types";

const COPY: Record<string, { title: string; body: string }> = {
  default: { title: "Heads up", body: "You can add components using the CLI." },
  destructive: { title: "Error", body: "Your session has expired." },
  warning: { title: "Warning", body: "This action cannot be undone." },
  success: { title: "Success", body: "Your changes have been saved." },
};

const VARIANT_DEMOS: Demo[] = getSamples({ kind: "atom", relatedComponent: "alert", group: "variants" })
  .map((s: Sample) => ({ id: s.key ?? s.id, label: s.title, spec: s.spec }));

export function AlertDocSample() {
  return (
    <DemoSection
      title="Variants"
      namePrefix="Alert"
      demos={VARIANT_DEMOS}
      renderTile={() => (
        <div className="flex flex-col gap-2 w-full max-w-xs pointer-events-none">
          {(["default", "destructive", "warning", "success"] as const).map((v) => (
            <Alert key={v} variant={v === "default" ? undefined : v} className="py-2 text-left">
              <AlertTitle className="text-xs">{COPY[v].title}</AlertTitle>
            </Alert>
          ))}
        </div>
      )}
    />
  );
}
