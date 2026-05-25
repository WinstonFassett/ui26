"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type HTMLAttributes,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "../lib/utils";
import { tabsList, tabsTrigger, tabsContent } from "./tabs.tv";
import {
  createTabsMachine,
  getSlotProps,
  type TabsContext as TabsCtxShape,
  type TabsState,
} from "./tabs-machine.vanilla";

// ---------------------------------------------------------------------------
// Internal context — adds onValueChange so triggers can fan changes back out.
// ---------------------------------------------------------------------------

type InternalCtx = TabsCtxShape & { onValueChange?: (v: string) => void };

const TabsCtx = createContext<InternalCtx | null>(null);

// DOM attribute → React prop name (the contract uses HTML-style lowercase;
// React needs camelCase for synthetic props it owns).
const REACT_PROP_ALIAS: Record<string, string> = {
  tabindex: "tabIndex",
};
function toReactProps(p: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(p)) out[REACT_PROP_ALIAS[k] ?? k] = v;
  return out;
}

const EMPTY_STATE: TabsState = { activeTab: "" };

function useTabsState(ctx: InternalCtx | null): TabsState {
  return useSyncExternalStore(
    (onStoreChange) => (ctx ? ctx.state.subscribe(() => onStoreChange()) : () => {}),
    () => ctx?.state.get() ?? EMPTY_STATE,
    () => ctx?.state.get() ?? EMPTY_STATE,
  );
}

// ---------------------------------------------------------------------------
// Root — supports controlled (value+onValueChange) and uncontrolled (defaultValue).
// ---------------------------------------------------------------------------

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  /** Controlled active tab value. Pair with onValueChange. */
  value?: string;
  /** Called when a tab is activated (controlled or uncontrolled). */
  onValueChange?: (value: string) => void;
  /** Initial active tab in uncontrolled mode. */
  defaultValue?: string;
  children?: ReactNode;
}

export function Tabs({
  value,
  onValueChange,
  defaultValue = "",
  className,
  children,
  ...props
}: TabsProps) {
  const isControlled = value !== undefined;

  // Atom is the single internal source of truth in both modes.
  // In controlled mode the parent's `value` is mirrored in via effect.
  const ctx = useMemo(
    () => createTabsMachine(isControlled ? (value as string) : defaultValue),
    // Factory runs once per mount; subsequent value changes flow through the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Push controlled prop into the atom when it changes.
  useEffect(() => {
    if (!isControlled) return;
    if (ctx.state.get().activeTab !== value) {
      ctx.state.set({ activeTab: value as string });
    }
  }, [ctx, isControlled, value]);

  // Stable handler ref so context value is stable.
  const handlerRef = useRef(onValueChange);
  handlerRef.current = onValueChange;

  const internalCtx = useMemo<InternalCtx>(
    () => ({
      ...ctx,
      activateTab(v: string) {
        handlerRef.current?.(v);
        // In uncontrolled mode the atom is the source of truth; set directly.
        // In controlled mode the parent decides — if it doesn't update `value`,
        // the atom stays in sync with the parent via the effect above.
        if (!isControlled) ctx.activateTab(v);
      },
      onValueChange,
    }),
    [ctx, isControlled, onValueChange],
  );

  return (
    <TabsCtx.Provider value={internalCtx}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsCtx.Provider>
  );
}

// ---------------------------------------------------------------------------

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function TabsList({ className, ...props }: TabsListProps) {
  return <div role="tablist" className={cn(tabsList(), className)} {...props} />;
}

// ---------------------------------------------------------------------------

export interface TabsTriggerProps extends ComponentPropsWithoutRef<"button"> {
  value: string;
  children?: ReactNode;
}

export function TabsTrigger({ value, className, children, ...props }: TabsTriggerProps) {
  const ctx = useContext(TabsCtx);
  const state = useTabsState(ctx);
  const slotProps = toReactProps(getSlotProps(state, "trigger", value));

  return (
    <button
      role="tab"
      type="button"
      className={cn(tabsTrigger(), className)}
      onClick={() => ctx?.activateTab(value)}
      {...slotProps}
      {...props}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children?: ReactNode;
}

export function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const ctx = useContext(TabsCtx);
  const state = useTabsState(ctx);
  const isActive = ctx ? state.activeTab === value : true;
  const slotProps = toReactProps(getSlotProps(state, "content", value));

  return (
    <div
      role="tabpanel"
      hidden={!isActive}
      className={cn(tabsContent(), className)}
      {...slotProps}
      {...props}
    >
      {children}
    </div>
  );
}
