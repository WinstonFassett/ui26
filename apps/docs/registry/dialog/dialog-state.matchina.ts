import { defineStates, defineEffects, createMachine, bindEffects, withSubscribe } from "matchina";

export type SlotPropsMap = Record<string, Record<string, string | boolean | number>>;

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

const closed  = () => ({ effects: [
  dialogEffects.SlotProps({ trigger: { "aria-expanded": false }, panel: { "data-state": "closed" } }),
  dialogEffects.RestoreFocus(),
] });
const opening = () => ({ effects: [
  dialogEffects.SaveFocus(),
  dialogEffects.LockScroll(),
  dialogEffects.HideBackground(),
  dialogEffects.TrapFocus(),
  dialogEffects.OpenDialog(),
  dialogEffects.SlotProps({ trigger: { "aria-expanded": true }, panel: { "data-state": "open" } }),
] });
const open    = () => ({ effects: [
  dialogEffects.SlotProps({ trigger: { "aria-expanded": true }, panel: { "data-state": "open" } }),
] });
const closing = () => ({ effects: [
  dialogEffects.ReleaseFocus(),
  dialogEffects.UnlockScroll(),
  dialogEffects.ShowBackground(),
  dialogEffects.CloseDialog(),
  dialogEffects.AnimateClose(),
  dialogEffects.SlotProps({ trigger: { "aria-expanded": false }, panel: { "data-state": "closed" } }),
] });

export function createDialogMachine() {
  const states = defineStates({ Closed: closed, Opening: opening, Open: open, Closing: closing });

  return withSubscribe(createMachine(
    states,
    {
      Closed:  { open:  "Opening", reset: "Closed" },
      Opening: { ready: "Open",    close: "Closing", reset: "Closed" },
      Open:    { close: "Closing", reset: "Closed" },
      Closing: { done:  "Closed",  open:  "Opening", reset: "Closed" },
    },
    "Closed"
  ));
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
  return bindEffects(machine, (s) => (s as any)?.data?.effects, {
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
