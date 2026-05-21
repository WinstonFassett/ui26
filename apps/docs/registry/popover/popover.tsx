import {
  createContext,
  useContext,
  useRef,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
  type HTMLAttributes,
  type ComponentPropsWithoutRef,
} from "react";
import { Slot } from "radix-ui";
import { computePosition, flip, shift, offset, autoUpdate } from "@floating-ui/dom";
import { cn } from "../lib/utils";
import { popoverContent } from "./popover.tv";
import { createPopoverMachine, bindPopoverEffects, type PopoverMachine } from "./popover-state.vanilla";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const Ctx = createContext<PopoverMachine | null>(null);

function usePopoverMachine(): PopoverMachine {
  const m = useContext(Ctx);
  if (!m) throw new Error("Popover components must be inside <Popover>");
  return m;
}

function usePopoverStore(machine: PopoverMachine) {
  return useSyncExternalStore(
    (cb) => machine.subscribe(() => cb()),
    () => machine.getState().key,
    () => machine.getState().key,
  );
}

// ---------------------------------------------------------------------------
// Root — creates machine + binds effector with refs
// ---------------------------------------------------------------------------

export interface PopoverProps {
  children: ReactNode;
  sideOffset?: number;
}

export function Popover({ children, sideOffset = 4 }: PopoverProps) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);

  const machine = useMemo(() => {
    const m = createPopoverMachine();
    let cleanupPositioner: (() => void) | null = null;

    bindPopoverEffects(m, {
      StartPositioner: () => {
        // Defer one tick — refs attach after first render
        requestAnimationFrame(() => {
        const trigger = triggerRef.current;
        const floating = floatingRef.current;
        if (!trigger || !floating) { m.send("ready"); return; }

        const update = () =>
          computePosition(trigger, floating, {
            placement: "bottom",
            middleware: [offset(sideOffset), flip(), shift({ padding: 8 })],
          }).then(({ x, y, placement }) => {
            floating.style.setProperty("--x", `${x}px`);
            floating.style.setProperty("--y", `${y}px`);
            floating.dataset.side = placement.split("-")[0];
            if (m.getState().key === "Opening") m.send("ready");
          });

        cleanupPositioner = autoUpdate(trigger, floating, update);
        }); // end rAF
      },
      StopPositioner: () => {
        cleanupPositioner?.();
        cleanupPositioner = null;
      },
      AnimateClose: () => {
        const floating = floatingRef.current;
        if (!floating) { m.send("done"); return; }
        const style = getComputedStyle(floating);
        if (style.animationName === "none") { m.send("done"); return; }
        const onEnd = () => {
          m.send("done");
          floating.removeEventListener("animationend", onEnd);
        };
        floating.addEventListener("animationend", onEnd);
      },
    });

    return m;
  }, []);

  usePopoverStore(machine); // subscribe for re-renders

  return (
    <Ctx.Provider value={machine}>
      <PopoverRefs triggerRef={triggerRef} floatingRef={floatingRef}>
        {children}
      </PopoverRefs>
    </Ctx.Provider>
  );
}

// Ref context so Trigger/Content can register their DOM nodes
const RefsCtx = createContext<{
  triggerRef: React.RefObject<HTMLElement | null>;
  floatingRef: React.RefObject<HTMLDivElement | null>;
} | null>(null);

function PopoverRefs({ triggerRef, floatingRef, children }: {
  triggerRef: React.RefObject<HTMLElement | null>;
  floatingRef: React.RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  return <RefsCtx.Provider value={{ triggerRef, floatingRef }}>{children}</RefsCtx.Provider>;
}

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------

export type PopoverTriggerProps = ComponentPropsWithoutRef<"button"> & { asChild?: boolean };

export function PopoverTrigger({ className, children, asChild = false, ...props }: PopoverTriggerProps) {
  const machine = usePopoverMachine();
  const refs = useContext(RefsCtx);
  const stateKey = usePopoverStore(machine); // subscribe for re-renders
  const isOpen = stateKey === "Open" || stateKey === "Opening";

  const shared = {
    ref: (el: HTMLElement | null) => { if (refs) refs.triggerRef.current = el; },
    "aria-haspopup": "dialog" as const,
    "aria-expanded": isOpen,
    "data-state": isOpen ? "open" : "closed",
    onClick: () => isOpen ? machine.send("close") : machine.send("open"),
    ...props,
  };

  if (asChild) {
    return (
      <Slot.Root className={className} {...shared}>
        {children}
      </Slot.Root>
    );
  }

  return (
    <button
      type="button"
      className={cn("inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium hover:bg-muted", className)}
      {...shared}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export type PopoverContentProps = HTMLAttributes<HTMLDivElement>;

export function PopoverContent({ className, children, ...props }: PopoverContentProps) {
  const machine = usePopoverMachine();
  const refs = useContext(RefsCtx);
  const stateKey = usePopoverStore(machine); // subscribe for re-renders
  const isOpen = stateKey === "Open" || stateKey === "Opening";
  const isClosing = stateKey === "Closing";

  return (
    <div
      ref={(el) => { if (refs) refs.floatingRef.current = el; }}
      role="dialog"
      data-state={isClosing ? "closed" : "open"}
      hidden={!isOpen && !isClosing}
      className={cn("absolute", popoverContent(), className)}
      style={{ left: "var(--x)", top: "var(--y)" }}
      {...props}
    >
      {children}
    </div>
  );
}
