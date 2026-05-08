"use client";

import { Alert, AlertTitle, AlertDescription } from "@registry/alert/alert";
import { DemoSection } from "./doc-sample";
import { ALERT_VARIANT_DEMOS } from "./alert-demos";

const COPY: Record<string, { title: string; body: string }> = {
  default: { title: "Heads up", body: "You can add components using the CLI." },
  destructive: { title: "Error", body: "Your session has expired." },
  warning: { title: "Warning", body: "This action cannot be undone." },
  success: { title: "Success", body: "Your changes have been saved." },
};

export function AlertDocSample() {
  return (
    <DemoSection
      title="Variants"
      namePrefix="Alert"
      demos={ALERT_VARIANT_DEMOS}
      renderTile={(demo) => {
        const { title, body } = COPY[demo.id];
        const v = demo.id as "default" | "destructive" | "warning" | "success";
        return (
          <Alert variant={v === "default" ? undefined : v} className="w-full max-w-xs text-left pointer-events-none">
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{body}</AlertDescription>
          </Alert>
        );
      }}
    />
  );
}
