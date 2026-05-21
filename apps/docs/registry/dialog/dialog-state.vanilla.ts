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

export type DialogEffectorHandlers = {
  OpenDialog:   () => void;
  CloseDialog:  () => void;
  AnimateClose: () => void;
};

type KeyedState = { key: DialogStateKey };
type ChangeEvent = { type: string; from: KeyedState; to: KeyedState };

export function createDialogMachine() {
  let key: DialogStateKey = "Closed";
  let handlers: DialogEffectorHandlers | null = null;
  const listeners = new Set<(ev: ChangeEvent) => void>();

  function enter(next: DialogStateKey) {
    const from: KeyedState = { key };
    key = next;
    const ev: ChangeEvent = { type: next, from, to: { key } };
    listeners.forEach((fn) => fn(ev));
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
    _setHandlers(h: DialogEffectorHandlers) { handlers = h; },
  };
}

export type DialogMachine = ReturnType<typeof createDialogMachine>;

export function bindDialogEffects(
  machine: DialogMachine,
  h: DialogEffectorHandlers
): () => void {
  (machine as any)._setHandlers(h);
  return () => (machine as any)._setHandlers(null);
}
