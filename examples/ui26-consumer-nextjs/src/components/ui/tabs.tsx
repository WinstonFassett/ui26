"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type HTMLAttributes,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { tabsList, tabsTrigger, tabsContent } from "./tabs.tv";
import { createTabsState, type TabsContext, type TabsState } from "./tabs.state";

const TabsCtx = createContext<TabsContext | null>(null);

function useTabsCtx(): TabsContext | null {
  return useContext(TabsCtx);
}

const EMPTY_STATE: TabsState = { activeTab: "" };

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

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  children?: ReactNode;
}

export function Tabs({ defaultValue, className, children, ...props }: TabsProps) {
  const ctx = createTabsState(defaultValue);
  return (
    <TabsCtx.Provider value={ctx}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsCtx.Provider>
  );
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> { children?: ReactNode; }

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <div role="tablist" className={cn(tabsList(), className)} {...props} />
  );
}

export interface TabsTriggerProps extends ComponentPropsWithoutRef<"button"> {
  value: string;
  children?: ReactNode;
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

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children?: ReactNode;
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
