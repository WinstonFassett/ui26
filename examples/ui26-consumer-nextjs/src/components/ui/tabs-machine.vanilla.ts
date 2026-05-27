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
  return { get: () => val, set: (v) => { val = v; ls.forEach(fn => fn(v)); }, subscribe: (fn) => { ls.add(fn); return () => ls.delete(fn); } };
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TabsState {
  activeTab: string;
}

export interface TabsContext {
  /** The atom holding the current state. */
  state: Atom<TabsState>;
  /** Activate a tab by its value string. */
  activateTab(value: string): void;
  /** Returns true if the given tab value is currently active. */
  isActive(value: string): boolean;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * createTabsState — creates a self-contained Tabs state context.
 *
 * @param defaultValue - The tab value that should be active initially.
 *
 * @example React
 * ```ts
 * const ctx = createTabsState("account");
 * // Pass ctx down via React context, then use ctx.state, ctx.activateTab, ctx.isActive
 * ```
 *
 * @example Svelte (Layer 1 → reactive store adapter)
 * ```ts
 * const ctx = createTabsState("account");
 *
 * // Svelte store protocol: { subscribe(fn: (value) => void): () => void }
 * // The matchina atom emits StoreChange<TabsState>, not plain TabsState.
 * // Bridge with a thin derived store:
 * const tabsStore = {
 *   subscribe(fn: (value: TabsState) => void) {
 *     fn(ctx.state.get()); // emit current value immediately (Svelte protocol)
 *     return ctx.state.subscribe((change) => fn(change.to));
 *   }
 * };
 * // In a .svelte file: $tabsStore.activeTab
 * ```
 *
 * @example Astro (islands, SSR-safe)
 * ```ts
 * // Astro components are server-rendered; state only matters client-side.
 * // In an Astro island (client:load), call createTabsState and wire the same
 * // way as the Svelte adapter above. Pass the initial activeTab as a prop from
 * // the Astro template so the server-rendered default matches hydration.
 * ```
 */
export function createTabsState(defaultValue: string): TabsContext {
  const state = atom<TabsState>({ activeTab: defaultValue });

  return {
    state,
    activateTab(value: string) {
      state.set({ activeTab: value });
    },
    isActive(value: string) {
      return state.get().activeTab === value;
    },
  };
}

// ---------------------------------------------------------------------------
// Dialog feasibility note (Layer 2 assessment — see assessment at bottom)
// ---------------------------------------------------------------------------
// Dialog needs the same atom pattern for open/closed state, PLUS a separate
// concern: DOM behavior (focus trap, scroll lock, portal). createTabsState
// proves the atom pattern works for Layer 1. Dialog will stress-test the
// Layer 2 seam. See inline assessment at end of file.
