import { defineStates, defineEffects, createMachine, bindEffects, withSubscribe } from "matchina";

export type SlotPropsMap = Record<string, Record<string, string | boolean | number>>;

export const dialogEffects = defineEffects({
  OpenDialog:   undefined,
  CloseDialog:  undefined,
  AnimateClose: undefined,
  SlotProps:    (props: SlotPropsMap) => props,
});

const closed  = () => ({ effects: [dialogEffects.SlotProps({ trigger: { "aria-expanded": false }, panel: { "data-state": "closed" } })] });
const opening = () => ({ effects: [dialogEffects.OpenDialog(), dialogEffects.SlotProps({ trigger: { "aria-expanded": true }, panel: { "data-state": "open" } })] });
const open    = () => ({ effects: [dialogEffects.SlotProps({ trigger: { "aria-expanded": true }, panel: { "data-state": "open" } })] });
const closing = () => ({ effects: [dialogEffects.CloseDialog(), dialogEffects.AnimateClose(), dialogEffects.SlotProps({ trigger: { "aria-expanded": false }, panel: { "data-state": "closed" } })] });

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
  OpenDialog:   () => void;
  CloseDialog:  () => void;
  AnimateClose: () => void;
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
  });
}
