// Vanilla state — no matchina, no external deps.
// Same surface as tooltip.state.ts so components are swappable.

type TooltipStateKey = "Closed" | "OpenDelay" | "Opening" | "Open" | "CloseDelay" | "Closing";

type TooltipEvent = "enter" | "leave" | "open" | "close" | "ready" | "done" | "reset";

const TRANSITIONS: Record<TooltipStateKey, Partial<Record<TooltipEvent, TooltipStateKey>>> = {
  Closed:     { enter: "OpenDelay",   reset: "Closed" },
  OpenDelay:  { open:  "Opening",     leave: "Closed",    reset: "Closed" },
  Opening:    { ready: "Open",        leave: "CloseDelay", reset: "Closed" },
  Open:       { leave: "CloseDelay",  reset: "Closed" },
  CloseDelay: { close: "Closing",     enter: "Open",      reset: "Closed" },
  Closing:    { done:  "Closed",      enter: "OpenDelay", reset: "Closed" },
};

export type SlotPropsMap = Record<string, Record<string, string | boolean | number>>;

export type TooltipSlotRefs = {
  trigger?: Element | null;
  panel?:   Element | null;
};

export type TooltipEffectorHandlers = {
  StartOpenDelay:  () => (() => void) | void;
  StartCloseDelay: () => (() => void) | void;
  StartPositioner: () => void;
  StopPositioner:  () => void;
  AnimateClose:    () => void;
};

type KeyedState = { key: TooltipStateKey };
type ChangeEvent = { type: string; from: KeyedState; to: KeyedState };

const SLOT_PROPS: Record<TooltipStateKey, SlotPropsMap> = {
  Closed:     { trigger: { "aria-expanded": false }, panel: { "data-state": "closed" } },
  OpenDelay:  { trigger: { "aria-expanded": false }, panel: { "data-state": "closed" } },
  Opening:    { trigger: { "aria-expanded": true  }, panel: { "data-state": "open"   } },
  Open:       { trigger: { "aria-expanded": true  }, panel: { "data-state": "open"   } },
  CloseDelay: { trigger: { "aria-expanded": true  }, panel: { "data-state": "open"   } },
  Closing:    { trigger: { "aria-expanded": false }, panel: { "data-state": "closed" } },
};

function applySlotProps(refs: TooltipSlotRefs, props: SlotPropsMap) {
  for (const [slot, attrs] of Object.entries(props)) {
    const el = refs[slot as keyof TooltipSlotRefs];
    if (!el) continue;
    for (const [attr, val] of Object.entries(attrs)) {
      if (val === false) el.removeAttribute(attr);
      else el.setAttribute(attr, String(val));
    }
  }
}

export function createTooltipMachine(openDelay = 600, closeDelay = 300) {
  let key: TooltipStateKey = "Closed";
  let handlers: TooltipEffectorHandlers | null = null;
  let slotRefs: TooltipSlotRefs | null = null;
  let cleanupDelay: (() => void) | null = null;
  const listeners = new Set<(ev: ChangeEvent) => void>();

  function enter(next: TooltipStateKey) {
    cleanupDelay?.();
    cleanupDelay = null;
    const from: KeyedState = { key };
    key = next;
    const ev: ChangeEvent = { type: next, from, to: { key } };
    listeners.forEach((fn) => fn(ev));
    if (slotRefs) applySlotProps(slotRefs, SLOT_PROPS[next]);
    if (next === "OpenDelay")  cleanupDelay = handlers?.StartOpenDelay()  ?? null;
    if (next === "CloseDelay") cleanupDelay = handlers?.StartCloseDelay() ?? null;
    if (next === "Opening")    handlers?.StartPositioner();
    if (next === "Closing")    { handlers?.StopPositioner(); handlers?.AnimateClose(); }
  }

  return {
    getState() { return { key }; },
    send(event: TooltipEvent) {
      const next = TRANSITIONS[key]?.[event];
      if (next) enter(next);
    },
    subscribe(fn: (ev: ChangeEvent) => void) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    _bind(h: TooltipEffectorHandlers, refs?: TooltipSlotRefs) {
      handlers = h;
      slotRefs = refs ?? null;
      return () => { handlers = null; slotRefs = null; cleanupDelay?.(); cleanupDelay = null; };
    },
  };
}

export type TooltipMachine = ReturnType<typeof createTooltipMachine>;

export function bindTooltipEffects(
  machine: TooltipMachine,
  h: TooltipEffectorHandlers,
  slotRefs?: TooltipSlotRefs,
): () => void {
  return (machine as any)._bind(h, slotRefs);
}
