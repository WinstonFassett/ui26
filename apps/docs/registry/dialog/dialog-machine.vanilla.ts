// Vanilla state implementation — no matchina, no external deps.
// Exports the same surface as dialog-machine.matchina.ts so components are swappable.

export type DialogStateKey = "Closed" | "Open";

export type DialogEvent = "open" | "close" | "settle" | "reset";

export type DialogSnapshot = {
  key: DialogStateKey;
  /** True between an open/close edge and its `settle` event — drives animation gating. */
  transitioning: boolean;
};

export type DialogChangeEvent = {
  type: DialogEvent;
  from: DialogSnapshot;
  to: DialogSnapshot;
};

export type SlotPropsMap = Record<string, Record<string, string | boolean | number>>;

export type DialogSlot = "trigger" | "panel";

export const SLOT_PROPS: Record<DialogStateKey, SlotPropsMap> = {
  Closed: { trigger: { "aria-expanded": false }, panel: { "data-state": "closed" } },
  Open:   { trigger: { "aria-expanded": true  }, panel: { "data-state": "open"   } },
};

export function getSlotProps(state: DialogStateKey, slot: DialogSlot) {
  return SLOT_PROPS[state]?.[slot] ?? {};
}

/** True when a transition is heading toward Open (i.e. the panel is appearing). */
export function isOpening(ev: DialogChangeEvent | null, snap: DialogSnapshot): boolean {
  if (!snap.transitioning) return false;
  return ev?.to.key === "Open";
}

/** True when a transition is heading toward Closed (i.e. the panel is dismissing). */
export function isClosing(ev: DialogChangeEvent | null, snap: DialogSnapshot): boolean {
  if (!snap.transitioning) return false;
  return ev?.to.key === "Closed";
}

export type DialogSlotRefs = {
  trigger?: Element | null;
  panel?:   Element | null;
};

export type DialogEffectorHandlers = {
  OpenDialog:    () => void;
  CloseDialog:   () => void;
  AnimateClose:  () => void;
  SaveFocus?:    () => void;
  RestoreFocus?: () => void;
  HideBackground?: () => void;
  ShowBackground?: () => void;
  LockScroll?:   () => void;
  UnlockScroll?: () => void;
  TrapFocus?:    () => void;
  ReleaseFocus?: () => void;
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

/**
 * Create a Dialog machine.
 *
 * @param initial Starting state key. Only `Closed` and `Open` are valid entry points —
 *   transient transitions are tracked via `snapshot.transitioning`, not separate keys.
 *   Pass `"Open"` when honoring `defaultOpen` to eliminate hydration flash.
 */
export function createDialogMachine(initial: DialogStateKey = "Closed") {
  let snap: DialogSnapshot = { key: initial, transitioning: false };
  let handlers: DialogEffectorHandlers | null = null;
  let slotRefs: DialogSlotRefs | null = null;
  let lastEvent: DialogChangeEvent | null = null;
  const listeners = new Set<(ev: DialogChangeEvent) => void>();

  function emit(type: DialogEvent, prev: DialogSnapshot) {
    const ev: DialogChangeEvent = { type, from: prev, to: snap };
    lastEvent = ev;
    listeners.forEach((fn) => fn(ev));
    if (slotRefs) applySlotProps(slotRefs, SLOT_PROPS[snap.key]);
  }

  function send(event: DialogEvent) {
    const prev = snap;

    if (event === "reset") {
      snap = { key: "Closed", transitioning: false };
      emit(event, prev);
      handlers?.RestoreFocus?.();
      return;
    }

    if (event === "open") {
      // Interruptible: opening while Closed OR while a close transition is in flight.
      if (snap.key === "Open" && !snap.transitioning) return;
      snap = { key: "Open", transitioning: true };
      emit(event, prev);
      handlers?.SaveFocus?.();
      handlers?.LockScroll?.();
      handlers?.HideBackground?.();
      handlers?.TrapFocus?.();
      handlers?.OpenDialog();
      return;
    }

    if (event === "close") {
      if (snap.key === "Closed" && !snap.transitioning) return;
      snap = { key: "Closed", transitioning: true };
      emit(event, prev);
      handlers?.ReleaseFocus?.();
      handlers?.UnlockScroll?.();
      handlers?.ShowBackground?.();
      handlers?.CloseDialog();
      handlers?.AnimateClose();
      return;
    }

    if (event === "settle") {
      if (!snap.transitioning) return;
      snap = { key: snap.key, transitioning: false };
      emit(event, prev);
      if (snap.key === "Closed") handlers?.RestoreFocus?.();
    }
  }

  return {
    getSnapshot(): DialogSnapshot { return snap; },
    /** @deprecated use getSnapshot — kept for back-compat during refactor. */
    getState(): { key: DialogStateKey } { return { key: snap.key }; },
    getLastEvent(): DialogChangeEvent | null { return lastEvent; },
    send,
    subscribe(fn: (ev: DialogChangeEvent) => void) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    _bind(h: DialogEffectorHandlers, refs?: DialogSlotRefs) {
      handlers = h;
      slotRefs = refs ?? null;
      // Apply current SLOT_PROPS so SSR-rendered markup matches.
      if (slotRefs) applySlotProps(slotRefs, SLOT_PROPS[snap.key]);
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
