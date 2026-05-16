import {
  createContext,
  useContext,
  useRef,
  useMemo,
  type ReactNode,
  type HTMLAttributes,
  type RefObject,
} from "react";
import { useMachine } from "matchina/react";
import { computePosition, flip, shift, offset, autoUpdate } from "@floating-ui/dom";
import { cn } from "../lib/utils";
import { tooltipContent } from "./tooltip.tv";
import { createTooltipMachine, bindTooltipEffects, type TooltipMachine } from "./tooltip.state";

interface TooltipCtx {
  machine: TooltipMachine;
  triggerRef: RefObject<HTMLElement | null>;
  floatingRef: RefObject<HTMLDivElement | null>;
}

const Ctx = createContext<TooltipCtx | null>(null);

function useTooltipCtx(): TooltipCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("Tooltip components must be inside <Tooltip>");
  return c;
}

export interface TooltipProps {
  children: ReactNode;
  openDelay?: number;
  closeDelay?: number;
  sideOffset?: number;
}

export function Tooltip({ children, openDelay = 600, closeDelay = 300, sideOffset = 4 }: TooltipProps) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);

  const ctx = useMemo<TooltipCtx>(() => {
    const m = createTooltipMachine(openDelay, closeDelay);
    let cleanupPositioner: (() => void) | null = null;

    bindTooltipEffects(m, {
      StartOpenDelay: () => {
        const id = setTimeout(() => m.send("open"), openDelay);
        return () => clearTimeout(id);
      },
      StartCloseDelay: () => {
        const id = setTimeout(() => m.send("close"), closeDelay);
        return () => clearTimeout(id);
      },
      StartPositioner: () => {
        requestAnimationFrame(() => {
          const trigger = triggerRef.current;
          const floating = floatingRef.current;
          if (!trigger || !floating) { m.send("ready"); return; }

          const update = () =>
            computePosition(trigger, floating, {
              placement: "top",
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

  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
}

export interface TooltipTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function TooltipTrigger({ children, className, ...props }: TooltipTriggerProps) {
  const { machine, triggerRef } = useTooltipCtx();

  return (
    <button
      ref={triggerRef as RefObject<HTMLButtonElement>}
      type="button"
      aria-describedby="tooltip"
      className={cn("inline-flex", className)}
      onMouseEnter={() => machine.send("enter")}
      onMouseLeave={() => machine.send("leave")}
      onFocus={() => machine.send("enter")}
      onBlur={() => machine.send("leave")}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TooltipContentProps {
  children?: ReactNode;
  className?: string;
}

export function TooltipContent({ children, className }: TooltipContentProps) {
  const { machine, floatingRef } = useTooltipCtx();
  useMachine(machine);

  const key = machine.getState().key;
  const isVisible = key === "Open" || key === "Opening" || key === "CloseDelay";
  const isClosing = key === "Closing";

  return (
    <div
      ref={floatingRef}
      role="tooltip"
      id="tooltip"
      data-state={isClosing ? "closed" : "open"}
      hidden={!isVisible && !isClosing}
      className={cn("absolute", tooltipContent(), className)}
      style={{ left: "var(--x)", top: "var(--y)" }}
    >
      {children}
    </div>
  );
}
