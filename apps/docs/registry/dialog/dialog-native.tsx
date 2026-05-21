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
import { cn } from "../lib/utils";
import { Button } from "../button/button";
import { dialogContent, dialogTitle, dialogDescription } from "./dialog.tv";
import { createDialogMachine, bindDialogEffects, type DialogMachine } from "./dialog-state.vanilla";
import { createFocusSaver } from "../lib/dom-behaviors";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const Ctx = createContext<DialogMachine | null>(null);

function useDialogMachine(): DialogMachine {
  const m = useContext(Ctx);
  if (!m) throw new Error("Dialog components must be inside <Dialog>");
  return m;
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

export interface DialogProps {
  children: ReactNode;
  machineRef?: React.RefObject<DialogMachine | null>;
}

export function Dialog({ children, machineRef }: DialogProps) {
  const machine = useMemo(() => createDialogMachine(), []);

  useEffect(() => {
    if (machineRef) machineRef.current = machine;
  }, [machine, machineRef]);

  return <Ctx.Provider value={machine}>{children}</Ctx.Provider>;
}

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------

export type DialogTriggerProps = HTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  dialogId?: string;
};

export function DialogTrigger({ children, className, dialogId, onClick, ...props }: DialogTriggerProps) {
  const machine = useDialogMachine();

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-controls={dialogId}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium hover:bg-muted",
        className
      )}
      onClick={(e) => {
        machine.send("open");
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Content — native <dialog> with showModal() / close()
// ---------------------------------------------------------------------------

export interface DialogContentProps {
  children: ReactNode;
  className?: string;
}

export function DialogContent({ children, className }: DialogContentProps) {
  const machine = useDialogMachine();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();

  const key = useSyncExternalStore(
    (cb) => machine.subscribe!(() => cb()),
    () => machine.getState().key,
    () => machine.getState().key,
  );
  const isClosing = key === "Closing";
  const isVisible = key === "Open" || key === "Opening" || isClosing;

  const focusSaver = useMemo(() => createFocusSaver(), []);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    const unsub = bindDialogEffects(machine, {
      SaveFocus:   () => focusSaver.activate(),
      RestoreFocus: () => focusSaver.deactivate(),
      OpenDialog: () => {
        el.showModal();
        requestAnimationFrame(() => machine.send("ready"));
      },
      CloseDialog: () => {
        el.close();
      },
      AnimateClose: () => {
        const style = getComputedStyle(el);
        if (style.animationName === "none") { machine.send("done"); return; }
        const onEnd = () => {
          machine.send("done");
          el.removeEventListener("animationend", onEnd);
        };
        el.addEventListener("animationend", onEnd);
      },
    }, { panel: el });

    function onNativeClose() {
      if (machine.getState().key === "Open") machine.send("close");
    }
    el.addEventListener("close", onNativeClose);

    return () => {
      unsub?.();
      el.removeEventListener("close", onNativeClose);
    };
  });

  if (!isVisible) return null;

  return (
    <dialog
      ref={dialogRef}
      id={titleId}
      aria-labelledby={`${titleId}-heading`}
      data-state={isClosing ? "closed" : "open"}
      className={cn(
        dialogContent(),
        "not-open:hidden backdrop:bg-black/50 backdrop:supports-backdrop-filter:backdrop-blur-sm",
        className
      )}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          machine.send("close");
        }
      }}
    >
      {children}
      <button
        type="button"
        className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Close"
        onClick={() => machine.send("close")}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
          <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" />
        </svg>
      </button>
    </dialog>
  );
}

// ---------------------------------------------------------------------------
// Close button
// ---------------------------------------------------------------------------

export function DialogClose({ children, className, ...props }: HTMLAttributes<HTMLButtonElement> & { children?: ReactNode }) {
  const machine = useDialogMachine();

  return (
    <Button
      variant="secondary"
      className={className}
      onClick={() => machine.send("close")}
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
  const machine = useDialogMachine();

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const attr = document.body.getAttribute("data-dialog-open");
      if (attr === id) machine.send("open");
      else if (machine.getState().key !== "Closed") machine.send("close");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-dialog-open"] });
    return () => observer.disconnect();
  }, [id, machine]);
}
