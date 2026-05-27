import { defineStates, defineEffects, createMachine, bindEffects, withSubscribe } from "matchina";

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

export const dialogEffects = defineEffects({
  OpenDialog:      undefined,
  CloseDialog:     undefined,
  AnimateClose:    undefined,
  SlotProps:       (props: SlotPropsMap) => props,
  SaveFocus:       undefined,
  RestoreFocus:    undefined,
  HideBackground:  undefined,
  ShowBackground:  undefined,
  LockScroll:      undefined,
  UnlockScroll:    undefined,
  TrapFocus:       undefined,
  ReleaseFocus:    undefined,
});

const closed = () => ({ effects: [
  dialogEffects.SlotProps(SLOT_PROPS.Closed),
  dialogEffects.RestoreFocus(),
] });
const open = () => ({ effects: [
  dialogEffects.SlotProps(SLOT_PROPS.Open),
  dialogEffects.SaveFocus(),
  dialogEffects.LockScroll(),
  dialogEffects.HideBackground(),
  dialogEffects.TrapFocus(),
  dialogEffects.OpenDialog(),
] });

/**
 * @param initial Starting state key — only `Closed` or `Open`.
 *   Transient transitions are tracked via `snapshot.transitioning`, not separate keys.
 */
export function createDialogMachine(initial: DialogStateKey = "Closed") {
  const states = defineStates({ Closed: closed, Open: open });

  const machine = withSubscribe(createMachine(
    states,
    {
      Closed: { open: "Open",   reset: "Closed" },
      Open:   { close: "Closed", reset: "Closed" },
    },
    initial
  ));

  let transitioning = false;
  let lastEvent: DialogChangeEvent | null = null;
  const wrappers = new Set<(ev: DialogChangeEvent) => void>();

  function buildSnap(key: DialogStateKey): DialogSnapshot {
    return { key, transitioning };
  }

  (machine as any).subscribe((ev: any) => {
    const fromKey = ev?.from?.key as DialogStateKey;
    const toKey = ev?.to?.key as DialogStateKey;
    const type = (ev?.type as DialogEvent) ?? "open";
    if (type === "open" || type === "close") transitioning = true;
    const wrapped: DialogChangeEvent = {
      type,
      from: { key: fromKey, transitioning: false },
      to: { key: toKey, transitioning },
    };
    lastEvent = wrapped;
    wrappers.forEach((fn) => fn(wrapped));
  });

  function send(event: DialogEvent) {
    if (event === "settle") {
      if (!transitioning) return;
      transitioning = false;
      const key = (machine as any).getState().key as DialogStateKey;
      const wrapped: DialogChangeEvent = {
        type: "settle",
        from: { key, transitioning: true },
        to: { key, transitioning: false },
      };
      lastEvent = wrapped;
      wrappers.forEach((fn) => fn(wrapped));
      return;
    }
    (machine as any).send(event);
  }

  return {
    getSnapshot(): DialogSnapshot {
      return buildSnap((machine as any).getState().key as DialogStateKey);
    },
    /** @deprecated use getSnapshot */
    getState(): { key: DialogStateKey } {
      return { key: (machine as any).getState().key as DialogStateKey };
    },
    getLastEvent(): DialogChangeEvent | null { return lastEvent; },
    send,
    subscribe(fn: (ev: DialogChangeEvent) => void) {
      wrappers.add(fn);
      return () => wrappers.delete(fn);
    },
    _matchina: machine,
  };
}

export type DialogMachine = ReturnType<typeof createDialogMachine>;

export type DialogSlotRefs = {
  trigger?: Element | null;
  panel?:   Element | null;
};

export type DialogEffectorHandlers = {
  OpenDialog:      () => void;
  CloseDialog:     () => void;
  AnimateClose:    () => void;
  SaveFocus?:      () => void;
  RestoreFocus?:   () => void;
  HideBackground?: () => void;
  ShowBackground?: () => void;
  LockScroll?:     () => void;
  UnlockScroll?:   () => void;
  TrapFocus?:      () => void;
  ReleaseFocus?:   () => void;
};

export function bindDialogEffects(
  machine: DialogMachine,
  handlers: DialogEffectorHandlers,
  slotRefs?: DialogSlotRefs,
) {
  return bindEffects((machine as any)._matchina, (s: any) => s?.data?.effects, {
    ...handlers,
    SlotProps: (props: SlotPropsMap) => {
      if (!slotRefs) return;
      for (const [slot, attrs] of Object.entries(props)) {
        const el = slotRefs[slot as keyof DialogSlotRefs];
        if (!el) continue;
        for (const [attr, val] of Object.entries(attrs)) {
          if (val === false) el.removeAttribute(attr);
          else el.setAttribute(attr, String(val));
        }
      }
    },
    SaveFocus:      handlers.SaveFocus      ?? (() => {}),
    RestoreFocus:   handlers.RestoreFocus   ?? (() => {}),
    HideBackground: handlers.HideBackground ?? (() => {}),
    ShowBackground: handlers.ShowBackground ?? (() => {}),
    LockScroll:     handlers.LockScroll     ?? (() => {}),
    UnlockScroll:   handlers.UnlockScroll   ?? (() => {}),
    TrapFocus:      handlers.TrapFocus      ?? (() => {}),
    ReleaseFocus:   handlers.ReleaseFocus   ?? (() => {}),
  });
}
