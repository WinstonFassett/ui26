import { createMachine, interpret } from "@xstate/fsm";

type DialogStateKey = "Closed" | "Opening" | "Open" | "Closing";
type DialogEvent = { type: "open" | "close" | "ready" | "done" | "reset" };

export type DialogEffectorHandlers = {
  OpenDialog:   () => void;
  CloseDialog:  () => void;
  AnimateClose: () => void;
};

export function createDialogMachine() {
  let handlers: DialogEffectorHandlers | null = null;

  const fsm = createMachine<object, DialogEvent, { value: DialogStateKey; context: object }>({
    initial: "Closed",
    context: {},
    states: {
      Closed:  { on: { open: "Opening", reset: "Closed" } },
      Opening: {
        on: { ready: "Open", close: "Closing", reset: "Closed" },
        entry: () => handlers?.OpenDialog(),
      },
      Open:    { on: { close: "Closing", reset: "Closed" } },
      Closing: {
        on: { done: "Closed", open: "Opening", reset: "Closed" },
        entry: () => { handlers?.CloseDialog(); handlers?.AnimateClose(); },
      },
    },
  });

  const service = interpret(fsm).start();

  return {
    getState() { return { key: service.state.value as DialogStateKey }; },
    send(event: DialogEvent["type"]) { service.send({ type: event }); },
    subscribe(fn: (ev: { type: string; from: { key: string }; to: { key: string } }) => void) {
      let prev = service.state.value as string;
      const { unsubscribe } = service.subscribe((state) => {
        if (state.value !== prev) {
          fn({ type: state.value as string, from: { key: prev }, to: { key: state.value as string } });
          prev = state.value as string;
        }
      });
      return unsubscribe;
    },
    _setHandlers(h: DialogEffectorHandlers | null) { handlers = h; },
    _stop() { service.stop(); },
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
