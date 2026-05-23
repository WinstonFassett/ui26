import { defineStates, defineEffects, createMachine, bindEffects, withSubscribe } from "matchina";

export const tooltipEffects = defineEffects({
  StartOpenDelay:  undefined,
  StartCloseDelay: undefined,
  StartPositioner: undefined,
  StopPositioner:  undefined,
  AnimateClose:    undefined,
});

export function createTooltipMachine(openDelay = 600, closeDelay = 300) {
  const states = defineStates({
    Closed:      undefined,
    OpenDelay:   () => ({ effects: [tooltipEffects.StartOpenDelay()] }),
    Opening:     () => ({ effects: [tooltipEffects.StartPositioner()] }),
    Open:        undefined,
    CloseDelay:  () => ({ effects: [tooltipEffects.StartCloseDelay()] }),
    Closing:     () => ({ effects: [tooltipEffects.StopPositioner(), tooltipEffects.AnimateClose()] }),
  });

  return withSubscribe(createMachine(
    states,
    {
      Closed:     { enter: "OpenDelay",  reset: "Closed" },
      OpenDelay:  { open:  "Opening",    leave: "Closed",    reset: "Closed" },
      Opening:    { ready: "Open",       leave: "CloseDelay", reset: "Closed" },
      Open:       { leave: "CloseDelay", reset: "Closed" },
      CloseDelay: { close: "Closing",    enter: "Open",      reset: "Closed" },
      Closing:    { done:  "Closed",     enter: "OpenDelay", reset: "Closed" },
    },
    "Closed"
  ));
}

export type TooltipMachine = ReturnType<typeof createTooltipMachine>;

export type TooltipEffectorHandlers = {
  StartOpenDelay:  () => (() => void) | void;
  StartCloseDelay: () => (() => void) | void;
  StartPositioner: () => void;
  StopPositioner:  () => void;
  AnimateClose:    () => void;
};

export function bindTooltipEffects(
  machine: TooltipMachine,
  handlers: TooltipEffectorHandlers
) {
  return bindEffects(machine, (s) => (s as any)?.data?.effects, handlers);
}
