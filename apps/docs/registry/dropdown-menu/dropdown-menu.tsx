import {
  createContext,
  useContext,
  useRef,
  useMemo,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
  type HTMLAttributes,
  type RefObject,
} from "react";
import { computePosition, flip, shift, offset, autoUpdate } from "@floating-ui/dom";
import { Slot } from "radix-ui";
import { cn } from "../lib/utils";
import { dropdownContent, dropdownItem, dropdownSeparator, dropdownLabel } from "./dropdown-menu.tv";
import { createDropdownMachine, bindDropdownEffects, type DropdownMachine } from "./dropdown-menu-state.vanilla";

interface DropdownCtx {
  machine: DropdownMachine;
  triggerRef: RefObject<HTMLElement | null>;
  floatingRef: RefObject<HTMLDivElement | null>;
}

const Ctx = createContext<DropdownCtx | null>(null);

function useDropdownCtx(): DropdownCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("DropdownMenu components must be inside <DropdownMenu>");
  return c;
}

export interface DropdownMenuProps {
  children: ReactNode;
  sideOffset?: number;
}

export function DropdownMenu({ children, sideOffset = 4 }: DropdownMenuProps) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);

  const ctx = useMemo<DropdownCtx>(() => {
    const m = createDropdownMachine();
    let cleanupPositioner: (() => void) | null = null;

    bindDropdownEffects(m, {
      StartPositioner: () => {
        requestAnimationFrame(() => {
          const trigger = triggerRef.current;
          const floating = floatingRef.current;
          if (!trigger || !floating) { m.send("ready"); return; }

          const update = () =>
            computePosition(trigger, floating, {
              placement: "bottom-start",
              middleware: [offset(sideOffset), flip(), shift({ padding: 8 })],
            }).then(({ x, y, placement }) => {
              floating.style.setProperty("--x", `${x}px`);
              floating.style.setProperty("--y", `${y}px`);
              floating.dataset.side = placement.split("-")[0];
              if (m.getState().key === "Opening") m.send("ready");
            });

          cleanupPositioner = autoUpdate(trigger, floating, update);
        });
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

    return { machine: m, triggerRef, floatingRef };
  }, []);

  // Close on outside click
  useEffect(() => {
    const { machine, triggerRef, floatingRef } = ctx;
    const handleClick = (e: MouseEvent) => {
      const key = machine.getState().key;
      if (key !== "Open" && key !== "Opening") return;
      if (
        triggerRef.current?.contains(e.target as Node) ||
        floatingRef.current?.contains(e.target as Node)
      ) return;
      machine.send("close");
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ctx]);

  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
}

export type DropdownMenuTriggerProps = HTMLAttributes<HTMLButtonElement> & { children: ReactNode; asChild?: boolean };

export function DropdownMenuTrigger({ children, className, asChild = false, ...props }: DropdownMenuTriggerProps) {
  const { machine, triggerRef } = useDropdownCtx();
  const key = useSyncExternalStore(
    (cb) => machine.subscribe(() => cb()),
    () => machine.getState().key,
  );
  const isOpen = key === "Open" || key === "Opening";

  const chevron = (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const shared = {
    ref: triggerRef as RefObject<HTMLButtonElement>,
    "aria-haspopup": "menu" as const,
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
      className={cn("inline-flex h-8 items-center justify-center gap-1 rounded-lg border border-border bg-background px-3 text-sm font-medium hover:bg-muted", className)}
      {...shared}
    >
      {children}
      {chevron}
    </button>
  );
}

export interface DropdownMenuContentProps {
  children: ReactNode;
  className?: string;
}

export function DropdownMenuContent({ children, className }: DropdownMenuContentProps) {
  const { machine, floatingRef } = useDropdownCtx();
  const key = useSyncExternalStore(
    (cb) => machine.subscribe(() => cb()),
    () => machine.getState().key,
  );
  const isOpen = key === "Open" || key === "Opening";
  const isClosing = key === "Closing";

  return (
    <div
      ref={floatingRef}
      role="menu"
      data-state={isClosing ? "closed" : "open"}
      hidden={!isOpen && !isClosing}
      className={cn("absolute", dropdownContent(), className)}
      style={{ left: "var(--x)", top: "var(--y)" }}
    >
      {children}
    </div>
  );
}

export interface DropdownMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
}

export function DropdownMenuItem({ children, className, disabled, onSelect, onClick, ...props }: DropdownMenuItemProps) {
  const { machine } = useDropdownCtx();

  return (
    <div
      role="menuitem"
      data-disabled={disabled || undefined}
      className={cn(dropdownItem(), className)}
      onClick={(e) => {
        if (disabled) return;
        onSelect?.();
        machine.send("close");
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div role="separator" className={cn(dropdownSeparator(), className)} />;
}

export function DropdownMenuLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(dropdownLabel(), className)}>{children}</div>;
}
