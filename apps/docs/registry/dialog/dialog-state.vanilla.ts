// Vanilla state implementation — no matchina, no external deps.
// Exports the same surface as dialog-state.matchina.ts so components are swappable.

type DialogStateKey = "Closed" | "Opening" | "Open" | "Closing";

type DialogEvent = "open" | "close" | "ready" | "done" | "reset";

const TRANSITIONS: Record<DialogStateKey, Partial<Record<DialogEvent, DialogStateKey>>> = {
  Closed:  { open: "Opening", reset: "Closed" },
  Opening: { ready: "Open", close: "Closing", reset: "Closed" },
  Open:    { close: "Closing", reset: "Closed" },
  Closing: { done: "Closed", open: "Opening", reset: "Closed" },
};

export type SlotPropsMap = Record<string, Record<string, string | boolean | number>>;

export type DialogSlotRefs = {
  trigger?: Element | null;
  panel?:   Element | null;
};

export type DialogEffectorHandlers = {
  OpenDialog:   () => void;
  CloseDialog:  () => void;
  AnimateClose: () => void;
};

type KeyedState = { key: DialogStateKey };
type ChangeEvent = { type: string; from: KeyedState; to: KeyedState };

const SLOT_PROPS: Record<DialogStateKey, SlotPropsMap> = {
  Closed:  { trigger: { "aria-expanded": false }, panel: { "data-state": "closed" } },
  Opening: { trigger: { "aria-expanded": true  }, panel: { "data-state": "open"   } },
  Open:    { trigger: { "aria-expanded": true  }, panel: { "data-state": "open"   } },
  Closing: { trigger: { "aria-expanded": false }, panel: { "data-state": "closed" } },
};

function applySlotProps(refs: DialogSlotRefs, props: SlotPropsMap) {
  for (const [slot, attrs] of Object.entries(props)) {
    const el = refs[slot as keyof DialogSlotRefs];
    if (!el) continue;
    for (const [attr, val] of Object.entries(attrs)) {
      if (val === false) el.removeAttribute(attr);
      else el.setAttribute(attr, String(val));
    }
  }
}

export function createDialogMachine() {
  let key: DialogStateKey = "Closed";
  let handlers: DialogEffectorHandlers | null = null;
  let slotRefs: DialogSlotRefs | null = null;
  const listeners = new Set<(ev: ChangeEvent) => void>();

  function enter(next: DialogStateKey) {
    const from: KeyedState = { key };
    key = next;
    const ev: ChangeEvent = { type: next, from, to: { key } };
    listeners.forEach((fn) => fn(ev));
    if (slotRefs) applySlotProps(slotRefs, SLOT_PROPS[next]);
    if (next === "Opening") handlers?.OpenDialog();
    if (next === "Closing") { handlers?.CloseDialog(); handlers?.AnimateClose(); }
  }

  return {
    getState() { return { key }; },
    send(event: DialogEvent) {
      const next = TRANSITIONS[key]?.[event];
      if (next) enter(next);
    },
    subscribe(fn: (ev: ChangeEvent) => void) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    _bind(h: DialogEffectorHandlers, refs?: DialogSlotRefs) {
      handlers = h;
      slotRefs = refs ?? null;
      return () => { handlers = null; slotRefs = null; };
    },
  };
}

export type DialogMachine = ReturnType<typeof createDialogMachine>;

export function bindDialogEffects(
  machine: DialogMachine,
  h: DialogEffectorHandlers,
  slotRefs?: DialogSlotRefs,
): () => void {
  return (machine as any)._bind(h, slotRefs);
}
