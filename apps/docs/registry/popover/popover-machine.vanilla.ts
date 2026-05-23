// Vanilla state — no matchina, no external deps.
// Same surface as popover-machine.matchina.ts so components are swappable.

type PopoverStateKey = "Closed" | "Opening" | "Open" | "Closing";

type PopoverEvent = "open" | "close" | "ready" | "done" | "reset";

const TRANSITIONS: Record<PopoverStateKey, Partial<Record<PopoverEvent, PopoverStateKey>>> = {
  Closed:  { open:  "Opening" },
  Opening: { ready: "Open",   close: "Closing", reset: "Closed" },
  Open:    { close: "Closing", reset: "Closed" },
  Closing: { done:  "Closed", open:  "Opening", reset: "Closed" },
};

export type SlotPropsMap = Record<string, Record<string, string | boolean | number>>;

export type PopoverSlotRefs = {
  trigger?: Element | null;
  panel?:   Element | null;
};

export type PopoverEffectorHandlers = {
  StartPositioner: () => void;
  StopPositioner:  () => void;
  AnimateClose:    () => void;
};

type KeyedState = { key: PopoverStateKey };
type ChangeEvent = { type: string; from: KeyedState; to: KeyedState };

const SLOT_PROPS: Record<PopoverStateKey, SlotPropsMap> = {
  Closed:  { trigger: { "aria-expanded": false }, panel: { "data-state": "closed" } },
  Opening: { trigger: { "aria-expanded": true  }, panel: { "data-state": "open"   } },
  Open:    { trigger: { "aria-expanded": true  }, panel: { "data-state": "open"   } },
  Closing: { trigger: { "aria-expanded": false }, panel: { "data-state": "closed" } },
};

function applySlotProps(refs: PopoverSlotRefs, props: SlotPropsMap) {
  for (const [slot, attrs] of Object.entries(props)) {
    const el = refs[slot as keyof PopoverSlotRefs];
    if (!el) continue;
    for (const [attr, val] of Object.entries(attrs)) {
      if (val === false) el.removeAttribute(attr);
      else el.setAttribute(attr, String(val));
    }
  }
}

export function createPopoverMachine() {
  let key: PopoverStateKey = "Closed";
  let handlers: PopoverEffectorHandlers | null = null;
  let slotRefs: PopoverSlotRefs | null = null;
  const listeners = new Set<(ev: ChangeEvent) => void>();

  function enter(next: PopoverStateKey) {
    const from: KeyedState = { key };
    key = next;
    const ev: ChangeEvent = { type: next, from, to: { key } };
    listeners.forEach((fn) => fn(ev));
    if (slotRefs) applySlotProps(slotRefs, SLOT_PROPS[next]);
    if (next === "Opening") handlers?.StartPositioner();
    if (next === "Closing") { handlers?.StopPositioner(); handlers?.AnimateClose(); }
  }

  return {
    getState() { return { key }; },
    send(event: PopoverEvent) {
      const next = TRANSITIONS[key]?.[event];
      if (next) enter(next);
    },
    subscribe(fn: (ev: ChangeEvent) => void) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    _bind(h: PopoverEffectorHandlers, refs?: PopoverSlotRefs) {
      handlers = h;
      slotRefs = refs ?? null;
      return () => { handlers = null; slotRefs = null; };
    },
  };
}

export type PopoverMachine = ReturnType<typeof createPopoverMachine>;

export function bindPopoverEffects(
  machine: PopoverMachine,
  h: PopoverEffectorHandlers,
  slotRefs?: PopoverSlotRefs,
): () => void {
  return (machine as any)._bind(h, slotRefs);
}
