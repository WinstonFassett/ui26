"use client";

import type { ComponentProps } from "react";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@ui-sdk/react/tabs";
import { cn } from "../lib/utils";
import { tabsList, tabsTrigger, tabsContent } from "../tabs/tabs.tv";

// UI SDK marks the selected tab with `data-selected`; tabs.tv.ts styles `data-[state=active]`.
// Classes must be literal so Tailwind sees them. Underline variant: add the same mapping.
const selected = "data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow";

export { Tabs };

export function UiSdkTabsList({ className, ...props }: ComponentProps<typeof TabsList>) {
  return <TabsList className={cn(tabsList(), className as string)} {...props} />;
}

export function UiSdkTabsTrigger({ className, ...props }: ComponentProps<typeof TabsTab>) {
  return <TabsTab className={cn(tabsTrigger(), selected, className as string)} {...props} />;
}

export function UiSdkTabsContent({ className, ...props }: ComponentProps<typeof TabsPanel>) {
  return <TabsPanel className={cn(tabsContent(), className as string)} {...props} />;
}
