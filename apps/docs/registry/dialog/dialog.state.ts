import { defineStates, defineEffects, createMachine, bindEffects } from "matchina";

export const dialogEffects = defineEffects({
  OpenDialog:   undefined,
  CloseDialog:  undefined,
  AnimateClose: undefined,
});

export function createDialogMachine() {
  const states = defineStates({
    Closed:  undefined,
    Opening: () => ({ effects: [dialogEffects.OpenDialog()] }),
    Open:    undefined,
    Closing: () => ({ effects: [dialogEffects.CloseDialog(), dialogEffects.AnimateClose()] }),
  });

  return createMachine(
    states,
    {
      Closed:  { open:  "Opening", reset: "Closed" },
      Opening: { ready: "Open",    close: "Closing", reset: "Closed" },
      Open:    { close: "Closing", reset: "Closed" },
      Closing: { done:  "Closed",  open:  "Opening", reset: "Closed" },
    },
    "Closed"
  );
}

export type DialogMachine = ReturnType<typeof createDialogMachine>;

export type DialogEffectorHandlers = {
  OpenDialog:   () => void;
  CloseDialog:  () => void;
  AnimateClose: () => void;
};

export function bindDialogEffects(
  machine: DialogMachine,
  handlers: DialogEffectorHandlers
) {
  return bindEffects(machine, (s) => (s as any)?.data?.effects, handlers);
}
