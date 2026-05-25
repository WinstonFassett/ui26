import { createMachine, interpret } from "@xstate/fsm";

export type DialogStateKey = "Closed" | "Open";
export type DialogEvent = "open" | "close" | "settle" | "reset";

export type DialogSnapshot = {
  key: DialogStateKey;
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

export function isOpening(ev: DialogChangeEvent | null, snap: DialogSnapshot): boolean {
  if (!snap.transitioning) return false;
  return ev?.to.key === "Open";
}

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

/**
 * @param initial Starting state key — only `Closed` or `Open`.
 *   Transient transitions are tracked via `snapshot.transitioning`, not separate keys.
 */
export function createDialogMachine(initial: DialogStateKey = "Closed") {
  let handlers: DialogEffectorHandlers | null = null;
  let slotRefs: DialogSlotRefs | null = null;
  let transitioning = false;
  let lastEvent: DialogChangeEvent | null = null;
  const listeners = new Set<(ev: DialogChangeEvent) => void>();

  function applySlotProps(props: SlotPropsMap) {
    if (!slotRefs) return;
    for (const [slot, attrs] of Object.entries(props)) {
      const el = slotRefs[slot as keyof DialogSlotRefs];
      if (!el) continue;
      for (const [attr, val] of Object.entries(attrs)) {
        if (val === false) el.removeAttribute(attr);
        else el.setAttribute(attr, String(val));
      }
    }
  }

  const fsm = createMachine<object, { type: DialogEvent }, { value: DialogStateKey; context: object }>({
    initial,
    context: {},
    states: {
      Closed: {
        on: { open: "Open", reset: "Closed" },
        entry: () => {
          applySlotProps(SLOT_PROPS.Closed);
          handlers?.ReleaseFocus?.();
          handlers?.UnlockScroll?.();
          handlers?.ShowBackground?.();
          handlers?.CloseDialog();
          handlers?.AnimateClose();
        },
      },
      Open: {
        on: { close: "Closed", reset: "Closed" },
        entry: () => {
          applySlotProps(SLOT_PROPS.Open);
          handlers?.SaveFocus?.();
          handlers?.LockScroll?.();
          handlers?.HideBackground?.();
          handlers?.TrapFocus?.();
          handlers?.OpenDialog();
        },
      },
    },
  });

  const service = interpret(fsm).start();

  service.subscribe((state) => {
    // initial state callback fires too; skip noop transitions
    // but allow the initial entry effects already to have run via createMachine
  });

  function snap(): DialogSnapshot {
    return { key: service.state.value as DialogStateKey, transitioning };
  }

  function send(event: DialogEvent) {
    const prev = snap();

    if (event === "settle") {
      if (!transitioning) return;
      transitioning = false;
      const cur = snap();
      const ev: DialogChangeEvent = { type: "settle", from: prev, to: cur };
      lastEvent = ev;
      listeners.forEach((fn) => fn(ev));
      if (cur.key === "Closed") handlers?.RestoreFocus?.();
      return;
    }

    if (event === "reset") {
      transitioning = false;
      service.send({ type: "reset" });
      const cur = snap();
      const ev: DialogChangeEvent = { type: "reset", from: prev, to: cur };
      lastEvent = ev;
      listeners.forEach((fn) => fn(ev));
      return;
    }

    // open / close
    if (event === "open" && prev.key === "Open" && !prev.transitioning) return;
    if (event === "close" && prev.key === "Closed" && !prev.transitioning) return;
    transitioning = true;
    service.send({ type: event });
    const cur = snap();
    const ev: DialogChangeEvent = { type: event, from: prev, to: cur };
    lastEvent = ev;
    listeners.forEach((fn) => fn(ev));
  }

  return {
    getSnapshot(): DialogSnapshot { return snap(); },
    /** @deprecated use getSnapshot */
    getState(): { key: DialogStateKey } { return { key: service.state.value as DialogStateKey }; },
    getLastEvent(): DialogChangeEvent | null { return lastEvent; },
    send,
    subscribe(fn: (ev: DialogChangeEvent) => void) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    _bind(h: DialogEffectorHandlers, refs?: DialogSlotRefs) {
      handlers = h;
      slotRefs = refs ?? null;
      if (slotRefs) applySlotProps(SLOT_PROPS[service.state.value as DialogStateKey]);
      return () => { handlers = null; slotRefs = null; };
    },
    _stop() { service.stop(); },
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
