/**
 * tabs-machine.vanilla.ts — DOM-agnostic state backend for Tabs.
 *
 * Layer 1: Pure state and behavior intent.
 * No DOM, no renderer, no framework. Testable with plain JS.
 */

export type Atom<T> = { get(): T; set(v: T): void; subscribe(fn: (v: T) => void): () => void };
function atom<T>(initial: T): Atom<T> {
  let val = initial;
  const ls = new Set<(v: T) => void>();
  return {
    get: () => val,
    set: (v) => { val = v; ls.forEach((fn) => fn(v)); },
    subscribe: (fn) => { ls.add(fn); return () => ls.delete(fn); },
  };
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TabsState {
  activeTab: string;
}

export type TabsSlot = "trigger" | "content";

export type SlotPropsMap = Record<string, string | boolean | number>;

// ---------------------------------------------------------------------------
// SLOT_PROPS — parameterized by (active?: boolean) since the active value is dynamic
// ---------------------------------------------------------------------------

export const SLOT_PROPS: Record<"active" | "inactive", Record<TabsSlot, SlotPropsMap>> = {
  active: {
    trigger: { "aria-selected": true,  "data-state": "active",   tabindex: 0 },
    content: { "data-state": "active" },
  },
  inactive: {
    trigger: { "aria-selected": false, "data-state": "inactive", tabindex: -1 },
    content: { "data-state": "inactive" },
  },
};

/** Read slot props for a given (value, activeValue) pair. */
export function getSlotProps(state: TabsState, slot: TabsSlot, value: string): SlotPropsMap {
  const isActive = state.activeTab === value;
  return SLOT_PROPS[isActive ? "active" : "inactive"][slot];
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export interface TabsContext {
  state: Atom<TabsState>;
  activateTab(value: string): void;
  isActive(value: string): boolean;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * createTabsMachine — creates a self-contained Tabs state context.
 *
 * @param initial - The tab value that should be active initially.
 *                  Positional, mirroring matchina's createMachine(states, transitions, initial).
 */
export function createTabsMachine(initial = ""): TabsContext {
  const state = atom<TabsState>({ activeTab: initial });

  return {
    state,
    activateTab(value: string) {
      if (state.get().activeTab === value) return;
      state.set({ activeTab: value });
    },
    isActive(value: string) {
      return state.get().activeTab === value;
    },
  };
}