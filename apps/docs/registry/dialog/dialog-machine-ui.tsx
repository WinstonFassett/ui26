"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useRef,
  useId,
  useSyncExternalStore,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils";
import { Button } from "../button/button";
import { dialogTitle, dialogDescription } from "./dialog.tv";
import {
  createDialogMachine,
  bindDialogEffects,
  getSlotProps,
  isClosing as isClosingHelper,
  type DialogMachine,
} from "./dialog-machine.vanilla";
import {
  createFocusSaver,
  createFocusTrap,
  createScrollLock,
  createBackgroundHider,
} from "../lib/dom-behaviors";

// ---------------------------------------------------------------------------
// Context — exposes the machine + controlled handler.
// ---------------------------------------------------------------------------

type DialogCtxShape = {
  machine: DialogMachine;
  onOpenChange?: (open: boolean) => void;
  isControlled: boolean;
};

const Ctx = createContext<DialogCtxShape | null>(null);

function useDialogCtx(): DialogCtxShape {
  const c = useContext(Ctx);
  if (!c) throw new Error("Dialog components must be inside <Dialog>");
  return c;
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

export interface DialogProps {
  /** Controlled open state. Pair with onOpenChange. */
  open?: boolean;
  /** Called whenever the dialog wants to open or close. */
  onOpenChange?: (open: boolean) => void;
  /** Initial open state in uncontrolled mode. */
  defaultOpen?: boolean;
  children: ReactNode;
  machineRef?: React.RefObject<DialogMachine | null>;
}

export function Dialog({ open, onOpenChange, defaultOpen = false, children, machineRef }: DialogProps) {
  const isControlled = open !== undefined;
  const initialKey = (isControlled ? open : defaultOpen) ? "Open" : "Closed";

  // Factory takes positional `initial` — eliminates first-paint flash when defaultOpen.
  const machine = useMemo(() => createDialogMachine(initialKey), []);

  useEffect(() => {
    if (machineRef) machineRef.current = machine;
  }, [machine, machineRef]);

  // Mirror controlled `open` prop into the machine on change.
  useEffect(() => {
    if (!isControlled) return;
    const current = machine.getSnapshot().key;
    if (open && current === "Closed") machine.send("open");
    else if (!open && current === "Open") machine.send("close");
  }, [machine, isControlled, open]);

  const ctxValue = useMemo<DialogCtxShape>(
    () => ({ machine, onOpenChange, isControlled }),
    [machine, onOpenChange, isControlled],
  );

  return <Ctx.Provider value={ctxValue}>{children}</Ctx.Provider>;
}

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------

export type DialogTriggerProps = HTMLAttributes<HTMLButtonElement> & { children: ReactNode };

export function DialogTrigger({ children, className, onClick, ...props }: DialogTriggerProps) {
  const { machine, onOpenChange, isControlled } = useDialogCtx();

  const snap = useSyncExternalStore(
    (cb) => machine.subscribe(() => cb()),
    () => machine.getSnapshot(),
    () => machine.getSnapshot(),
  );
  const triggerSlot = getSlotProps(snap.key, "trigger");

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium hover:bg-muted",
        className,
      )}
      {...triggerSlot}
      onClick={(e) => {
        onOpenChange?.(true);
        if (!isControlled) machine.send("open");
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Content — portal, overlay, panel, all DOM behaviors
// ---------------------------------------------------------------------------

export interface DialogContentProps {
  children: ReactNode;
  className?: string;
}

export function DialogContent({ children, className }: DialogContentProps) {
  const { machine, onOpenChange, isControlled } = useDialogCtx();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  const snap = useSyncExternalStore(
    (cb) => machine.subscribe(() => cb()),
    () => machine.getSnapshot(),
    () => machine.getSnapshot(),
  );
  const isOpen = snap.key === "Open";
  const lastEvent = machine.getLastEvent();
  const closing = isClosingHelper(lastEvent, snap);
  const isVisible = isOpen || closing;

  const focusSaver = useMemo(() => createFocusSaver(), []);
  const focusTrap = useMemo(() => createFocusTrap(() => panelRef.current), []);
  const scrollLock = useMemo(() => createScrollLock(), []);
  const bgHider = useMemo(() => createBackgroundHider(() => panelRef.current), []);

  useEffect(() => {
    if (!panelRef.current) return;

    const requestClose = () => {
      onOpenChange?.(false);
      if (!isControlled) machine.send("close");
    };

    const unsub = bindDialogEffects(
      machine,
      {
        SaveFocus:      () => focusSaver.activate(),
        RestoreFocus:   () => focusSaver.deactivate(),
        LockScroll:     () => scrollLock.activate(),
        UnlockScroll:   () => scrollLock.deactivate(),
        HideBackground: () => bgHider.activate(),
        ShowBackground: () => bgHider.deactivate(),
        TrapFocus:      () => focusTrap.activate(),
        ReleaseFocus:   () => focusTrap.deactivate(),
        OpenDialog: () => {
          // Settle the opening transition on the next frame.
          requestAnimationFrame(() => machine.send("settle"));
        },
        CloseDialog: () => {},
        AnimateClose: () => {
          const el = panelRef.current;
          if (!el) { machine.send("settle"); return; }
          const style = getComputedStyle(el);
          if (style.animationName === "none") { machine.send("settle"); return; }
          const onEnd = () => {
            machine.send("settle");
            el.removeEventListener("animationend", onEnd);
          };
          el.addEventListener("animationend", onEnd);
        },
      },
      { panel: panelRef.current },
    );

    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape" && machine.getSnapshot().key === "Open") {
        e.preventDefault();
        requestClose();
      }
    }
    document.addEventListener("keydown", onKeydown);

    function onPointerDown(e: PointerEvent) {
      if (machine.getSnapshot().key !== "Open") return;
      if (panelRef.current?.contains(e.target as Node)) return;
      requestClose();
    }
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      unsub?.();
      document.removeEventListener("keydown", onKeydown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  });

  if (!isVisible) return null;

  const requestClose = () => {
    onOpenChange?.(false);
    if (!isControlled) machine.send("close");
  };

  return createPortal(
    <>
      <div
        aria-hidden="true"
        data-state={closing ? "closed" : "open"}
        className="fixed inset-0 z-50 bg-black/50 supports-backdrop-filter:backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200"
      />
      <div
        ref={panelRef}
        id={titleId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${titleId}-heading`}
        data-state={closing ? "closed" : "open"}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 sm:max-w-lg",
          "rounded-lg border border-border bg-background p-6 shadow-lg outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "duration-200",
          className,
        )}
      >
        {children}
        <button
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Close"
          onClick={requestClose}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
            <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </>,
    document.body,
  );
}

// ---------------------------------------------------------------------------
// Close button
// ---------------------------------------------------------------------------

export function DialogClose({ children, className, ...props }: HTMLAttributes<HTMLButtonElement> & { children?: ReactNode }) {
  const { machine, onOpenChange, isControlled } = useDialogCtx();

  return (
    <Button
      variant="secondary"
      className={className}
      onClick={() => {
        onOpenChange?.(false);
        if (!isControlled) machine.send("close");
      }}
      {...props}
    >
      {children ?? "Close"}
    </Button>
  );
}

// ---------------------------------------------------------------------------
// Layout primitives
// ---------------------------------------------------------------------------

export function DialogHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-2 text-center sm:text-left", className)}>{children}</div>;
}

export function DialogFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}>{children}</div>;
}

export function DialogTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn(dialogTitle(), className)}>{children}</h2>;
}

export function DialogDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn(dialogDescription(), className)}>{children}</p>;
}

// ---------------------------------------------------------------------------
// Distant-trigger hook
// ---------------------------------------------------------------------------

export function useDialogBodyAttr(id: string) {
  const { machine } = useDialogCtx();

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const attr = document.body.getAttribute("data-dialog-open");
      if (attr === id) machine.send("open");
      else if (machine.getSnapshot().key !== "Closed") machine.send("close");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-dialog-open"] });
    return () => observer.disconnect();
  }, [id, machine]);
}
