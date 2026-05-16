import {
  createContext,
  useContext,
  useSyncExternalStore,
  type HTMLAttributes,
  type ComponentPropsWithoutRef,
} from "react";
import { cn } from "../lib/utils";
import { tabsList, tabsTrigger, tabsContent } from "./tabs.tv";
import { createTabsState, type TabsContext, type TabsState } from "./tabs.state";

// ---------------------------------------------------------------------------
// React context bridge
// ---------------------------------------------------------------------------

const TabsCtx = createContext<TabsContext | null>(null);

function useTabsCtx(): TabsContext | null {
  return useContext(TabsCtx);
}

const EMPTY_STATE: TabsState = { activeTab: "" };

/** Subscribe the component to the atom using useSyncExternalStore. */
function useTabsState(ctx: TabsContext | null): TabsState {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (!ctx) return () => {};
      const unsub = ctx.state.subscribe(() => onStoreChange());
      return unsub;
    },
    () => ctx?.state.get() ?? EMPTY_STATE,
    () => ctx?.state.get() ?? EMPTY_STATE,
  );
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** The tab value that should be active on mount. */
  defaultValue: string;
}

export function Tabs({ defaultValue, className, children, ...props }: TabsProps) {
  // createTabsState is called once per mount — stable because defaultValue
  // is only read on initialization (uncontrolled pattern for now).
  const ctx = createTabsState(defaultValue);

  return (
    <TabsCtx.Provider value={ctx}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsCtx.Provider>
  );
}

// ---------------------------------------------------------------------------

export type TabsListProps = HTMLAttributes<HTMLDivElement>;

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={cn(tabsList(), className)}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------

export interface TabsTriggerProps extends ComponentPropsWithoutRef<"button"> {
  /** Must match a TabsContent value. */
  value: string;
}

export function TabsTrigger({ value, className, children, ...props }: TabsTriggerProps) {
  const ctx = useTabsCtx();
  const state = useTabsState(ctx);
  const isActive = state.activeTab === value;

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      className={cn(tabsTrigger(), className)}
      onClick={() => ctx?.activateTab(value)}
      {...props}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Must match a TabsTrigger value. */
  value: string;
}

export function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const ctx = useTabsCtx();
  const state = useTabsState(ctx);
  const isActive = ctx ? state.activeTab === value : true;

  return (
    <div
      role="tabpanel"
      data-state={isActive ? "active" : "inactive"}
      hidden={!isActive}
      className={cn(tabsContent(), className)}
      {...props}
    >
      {children}
    </div>
  );
}
