"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SourcePane, type SourcePaneRegion } from "./SourcePane";
import { useFw } from "./fw-store";

export interface DockRegion extends SourcePaneRegion {}

const NARROW_QUERY = "(max-width: 1099px)";
const DRAG_CLOSE_THRESHOLD = 80;

function setBodyDrawer(open: boolean) {
  if (typeof document === "undefined") return;
  document.body.dataset.railOpen = open ? "true" : "false";
}

function getRailEl(): HTMLElement | null {
  return document.querySelector<HTMLElement>(".blocks-rail, .ks-rail");
}

export function ClickDockShell({ regions }: { regions: DockRegion[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [isNarrow, setIsNarrow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fw, setFw] = useFw();

  const grabberRef = useRef<HTMLButtonElement>(null);
  const touchStartY = useRef<number | null>(null);
  const lastDragDelta = useRef(0);

  const onClose = useCallback(() => {
    setOpenId(null);
    setBodyDrawer(false);
  }, []);

  // Client-side mount + narrow media query.
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia(NARROW_QUERY);
    setIsNarrow(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsNarrow(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // Activate region from URL hash on mount.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && regions.some((r) => r.id === hash)) {
      setOpenId(hash);
      setTimeout(() => {
        document.querySelector(`[data-region-id="${hash}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, []);

  // Listen for region clicks anywhere in the document.
  // On narrow: also close when clicking outside the rail.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const regionTarget = (e.target as Element | null)?.closest?.("[data-region-id]");
      if (regionTarget) {
        const id = regionTarget.getAttribute("data-region-id");
        if (id && regions.some((r) => r.id === id)) {
          setOpenId(id);
          if (window.matchMedia(NARROW_QUERY).matches) setBodyDrawer(true);
          return;
        }
      }
      // Close on narrow when clicking outside the rail
      if (window.matchMedia(NARROW_QUERY).matches) {
        const railEl = getRailEl();
        if (railEl && !railEl.contains(e.target as Node)) {
          onClose();
        }
      }
    };
    document.addEventListener("click", handler);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("keydown", onKey);
    };
  }, [regions, onClose]);

  // Mark active region in the DOM via data-region-active.
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-region-id]");
    els.forEach((el) => {
      el.dataset.regionActive = el.getAttribute("data-region-id") === openId ? "true" : "false";
    });
  }, [openId]);

  // Drag-to-close touch handlers on the grabber.
  useEffect(() => {
    const el = grabberRef.current;
    if (!el) return;

    const onStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      lastDragDelta.current = 0;
      const rail = getRailEl();
      if (rail) rail.style.transition = "none";
    };

    const onMove = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const delta = e.touches[0].clientY - touchStartY.current;
      if (delta > 0) {
        e.preventDefault();
        lastDragDelta.current = delta;
        const rail = getRailEl();
        if (rail) rail.style.transform = `translateY(${delta}px)`;
      }
    };

    const onEnd = () => {
      const rail = getRailEl();
      if (rail) {
        rail.style.transition = "";
        rail.style.transform = "";
      }
      if (lastDragDelta.current > DRAG_CLOSE_THRESHOLD) onClose();
      touchStartY.current = null;
      lastDragDelta.current = 0;
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, [onClose]);

  const active = regions.find((r) => r.id === openId) ?? null;

  return (
    <>
      {!active ? (
        <div className="h-full bg-card border border-border flex flex-col items-center justify-center text-center p-6">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
            source rail
          </div>
          <p className="text-[13px] text-muted-foreground max-w-[260px] leading-snug">
            Click any block to see its source. Switch frameworks above.
          </p>
        </div>
      ) : (
        <div className="h-full flex flex-col">
          {/* Drag handle — narrow viewports only. Drag down to close. */}
          <button
            ref={grabberRef}
            type="button"
            aria-label="Drag to close source drawer"
            className="ks-rail-grabber hidden self-center w-12 pt-1.5 pb-2 touch-none cursor-grab shrink-0"
          >
            <span className="block mx-auto h-1 w-10 rounded-full bg-muted-foreground/40" />
          </button>
          <SourcePane region={active} fw={fw} setFw={setFw} onClose={onClose} className="min-h-0 flex-1" />
        </div>
      )}
    </>
  );
}
