import { defineStates, defineEffects, createMachine, bindEffects } from "matchina";

// ---------------------------------------------------------------------------
// Effects — the contract between machine and effector
// ---------------------------------------------------------------------------

export const popoverEffects = defineEffects({
  StartPositioner: undefined,
  StopPositioner:  undefined,
  AnimateClose:    undefined,
});

// ---------------------------------------------------------------------------
// Machine factory — states inside so each instance is independent
// ---------------------------------------------------------------------------

export function createPopoverMachine() {
  const states = defineStates({
    Closed:  undefined,
    Opening: () => ({ effects: [popoverEffects.StartPositioner()] }),
    Open:    undefined,
    Closing: () => ({ effects: [popoverEffects.StopPositioner(), popoverEffects.AnimateClose()] }),
  });

  return createMachine(
    states,
    {
      Closed:  { open:  "Opening" },
      Opening: { ready: "Open",    close: "Closing" },
      Open:    { close: "Closing" },
      Closing: { done:  "Closed",  open:  "Opening" },
    },
    "Closed"
  );
}

export type PopoverMachine = ReturnType<typeof createPopoverMachine>;

// ---------------------------------------------------------------------------
// Effector binder
// ---------------------------------------------------------------------------

export type PopoverEffectorHandlers = {
  StartPositioner: () => void;
  StopPositioner:  () => void;
  AnimateClose:    () => void;
};

export function bindPopoverEffects(
  machine: PopoverMachine,
  handlers: PopoverEffectorHandlers
) {
  return bindEffects(machine, (s) => (s as any)?.data?.effects, handlers);
}
