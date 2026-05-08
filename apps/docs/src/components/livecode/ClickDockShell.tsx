"use client";

import { useEffect, useRef, useState } from "react";
import { SourcePane, type SourcePaneRegion } from "./SourcePane";
import { useFw } from "./fw-store";

export interface DockRegion extends SourcePaneRegion {}

const NARROW_QUERY = "(max-width: 1099px)";

export function ClickDockShell({ regions }: { regions: DockRegion[] }) {
  const [openId, setOpenId] = useState(regions[0]?.id);
  const [fw, setFw] = useFw();
  const railRef = useRef<HTMLDivElement>(null);

  // Listen for region clicks anywhere in the document.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest?.("[data-region-id]");
      if (!target) return;
      const id = target.getAttribute("data-region-id");
      if (!id) return;
      if (!regions.some((r) => r.id === id)) return;
      setOpenId(id);

      // On narrow screens, scroll the rail into view so the user sees the source.
      if (window.matchMedia(NARROW_QUERY).matches && railRef.current) {
        railRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [regions]);

  // Mark active region in the DOM via data-region-active.
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-region-id]");
    els.forEach((el) => {
      const id = el.getAttribute("data-region-id");
      el.dataset.regionActive = id === openId ? "true" : "false";
    });
  }, [openId]);

  const active = regions.find((r) => r.id === openId) ?? regions[0];
  if (!active) return null;

  return (
    <div ref={railRef} className="h-full">
      <SourcePane region={active} fw={fw} setFw={setFw} className="min-h-0" />
    </div>
  );
}
