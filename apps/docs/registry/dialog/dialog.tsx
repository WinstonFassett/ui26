import {
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
import { dialogOverlay, dialogContent, dialogTitle, dialogDescription } from "./dialog.tv";
import { createDialogMachine, bindDialogEffects, type DialogMachine } from "./dialog.state";

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
}

export function Dialog({ children }: DialogProps) {
  const machine = useMemo(() => {
    const m = createDialogMachine();

    // Radix manages focus trap / scroll lock / portal — we just reflect state
    bindDialogEffects(m, {
      OpenDialog:   () => { /* Radix handles it via open prop */ m.send("ready"); },
      CloseDialog:  () => { /* Radix handles cleanup via open prop */ },
      AnimateClose: () => {
        // Radix drives exit animation via data-state; we wait for it
        // Minimal delay to let CSS animation complete, then confirm done
        setTimeout(() => m.send("done"), 150);
      },
    });

    return m;
  }, []);

  useMachine(machine);
  const key = machine.getState().key;
  const isOpen = key === "Open" || key === "Opening" || key === "Closing";

  return (
    <Ctx.Provider value={machine}>
      <DialogPrimitive.Root
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) machine.send("close");
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

export interface DialogTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function DialogTrigger({ children, className, ...props }: DialogTriggerProps) {
  const machine = useDialogMachine();

  return (
    <DialogPrimitive.Trigger
      className={cn(
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
  useMachine(machine);
  const key = machine.getState().key;
  const isClosing = key === "Closing";

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={dialogOverlay()} data-state={isClosing ? "closed" : "open"} />
      <DialogPrimitive.Content
        className={cn(dialogContent(), className)}
        data-state={isClosing ? "closed" : "open"}
        onEscapeKeyDown={() => machine.send("close")}
        onPointerDownOutside={() => machine.send("close")}
      >
        {children}
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
    <button
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium hover:bg-muted",
        className
      )}
      onClick={() => machine.send("close")}
      {...props}
    >
      {children ?? "Close"}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

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
