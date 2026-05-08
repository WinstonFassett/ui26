"use client";

import { useEffect, useState } from "react";
import { SourcePane, type SourcePaneRegion } from "./SourcePane";
import { useFw } from "./fw-store";

export interface DockRegion extends SourcePaneRegion {}

const NARROW_QUERY = "(max-width: 1099px)";

function setBodyDrawer(open: boolean) {
  if (typeof document === "undefined") return;
  document.body.dataset.railOpen = open ? "true" : "false";
}

export function ClickDockShell({ regions }: { regions: DockRegion[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [fw, setFw] = useFw();

  // Listen for region clicks anywhere in the document.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest?.("[data-region-id]");
      if (!target) return;
      const id = target.getAttribute("data-region-id");
      if (!id) return;
      if (!regions.some((r) => r.id === id)) return;
      setOpenId(id);

      // On narrow screens, open the drawer.
      if (window.matchMedia(NARROW_QUERY).matches) {
        setBodyDrawer(true);
      }
    };
    document.addEventListener("click", handler);

    // Deselect on Escape.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenId(null);
        setBodyDrawer(false);
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("keydown", onKey);
    };
  }, [regions]);

  // Mark active region in the DOM via data-region-active.
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-region-id]");
    els.forEach((el) => {
      const id = el.getAttribute("data-region-id");
      el.dataset.regionActive = id === openId ? "true" : "false";
    });
  }, [openId]);

  const active = regions.find((r) => r.id === openId) ?? null;

  const onClose = () => {
    setOpenId(null);
    setBodyDrawer(false);
  };

  if (!active) {
    // Empty state — rail visible at desktop, drawer hidden at narrow (no openId means no drawer trigger fired).
    return (
      <div className="h-full bg-card border border-border flex flex-col items-center justify-center text-center p-6">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          source rail
        </div>
        <p className="text-[13px] text-muted-foreground max-w-[260px] leading-snug">
          Click any block to see its source. Switch frameworks above.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      <button
        type="button"
        aria-label="Close source panel"
        onClick={onClose}
        className="ks-rail-close absolute right-2 top-2 z-10 inline-flex items-center justify-center w-7 h-7 border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/40"
      >
        ✕
      </button>
      <SourcePane region={active} fw={fw} setFw={setFw} className="min-h-0" />
    </div>
  );
}
