import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { useMachine } from "matchina/react";
import { cn } from "../lib/utils";
import { Button } from "../button/button";
import { dialogOverlay, dialogContent, dialogTitle, dialogDescription } from "./dialog.tv";
import { createDialogMachine, bindDialogEffects, type DialogMachine } from "./dialog-state.matchina";

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
// Root — machine owns open/closed, Radix owns DOM behavior (focus trap, portal)
// ---------------------------------------------------------------------------

export interface DialogProps {
  children: ReactNode;
  machineRef?: React.RefObject<DialogMachine | null>;
}

export function Dialog({ children, machineRef }: DialogProps) {
  const machine = useMemo(() => {
    const m = createDialogMachine();

    bindDialogEffects(m, {
      OpenDialog:   () => { m.send("ready"); },
      CloseDialog:  () => {},
      // Keep Radix mounted during Closing so its exit animation can run.
      // Radix sets data-state="closed" and animates out on its own.
      // We just wait for the animation duration then confirm done.
      AnimateClose: () => { setTimeout(() => m.send("done"), 200); },
    });

    return m;
  }, []);

  useEffect(() => {
    if (machineRef) machineRef.current = machine;
  }, [machine, machineRef]);

  useMachine(machine);
  const key = machine.getState().key;
  // Pass open=true during Closing so Radix stays mounted for exit animation
  const isOpen = key === "Open" || key === "Opening";
  const isClosing = key === "Closing";

  return (
    <Ctx.Provider value={machine}>
      <DialogPrimitive.Root
        open={isOpen || isClosing}
        onOpenChange={(open) => {
          if (!open && key === "Open") machine.send("close");
        }}
      >
        {children}
      </DialogPrimitive.Root>
    </Ctx.Provider>
  );
}

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------

export type DialogTriggerProps = HTMLAttributes<HTMLButtonElement> & { children: ReactNode; asChild?: boolean };

export function DialogTrigger({ children, className, asChild = false, ...props }: DialogTriggerProps) {
  const machine = useDialogMachine();

  return (
    <DialogPrimitive.Trigger
      asChild={asChild}
      className={asChild ? className : cn(
        "inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium hover:bg-muted",
        className
      )}
      onClick={() => machine.send("open")}
      {...props}
    >
      {children}
    </DialogPrimitive.Trigger>
  );
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export interface DialogContentProps {
  children: ReactNode;
  className?: string;
}

export function DialogContent({ children, className }: DialogContentProps) {
  const machine = useDialogMachine();

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={dialogOverlay()} />
      <DialogPrimitive.Content
        className={cn(dialogContent(), className)}
        onEscapeKeyDown={(e) => { e.preventDefault(); machine.send("close"); }}
        onPointerDownOutside={() => machine.send("close")}
      >
        {children}
        <button
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={() => machine.send("close")}
          aria-label="Close"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
            <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" />
          </svg>
        </button>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
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
  return (
    <div className={cn("flex flex-col gap-2 text-center sm:text-left", className)}>
      {children}
    </div>
  );
}

export function DialogFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}>
      {children}
    </div>
  );
}

export function DialogTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <DialogPrimitive.Title className={cn(dialogTitle(), className)}>
      {children}
    </DialogPrimitive.Title>
  );
}

export function DialogDescription({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <DialogPrimitive.Description className={cn(dialogDescription(), className)}>
      {children}
    </DialogPrimitive.Description>
  );
}

// ---------------------------------------------------------------------------
// Distant-trigger hook — watches body attribute, fires machine events
// Trigger side: document.body.setAttribute('data-dialog-open', id)
//               document.body.removeAttribute('data-dialog-open')
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
