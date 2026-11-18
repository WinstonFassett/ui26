<script lang="ts">
  import { Tabs, TabsList, TabsTab, TabsPanel } from "@ui-sdk/svelte/tabs";
  import { cn } from "../lib/utils";
  import { tabsList, tabsTrigger, tabsContent } from "../tabs/tabs.tv";

  // UI SDK marks the selected tab with `data-selected`; tabs.tv.ts styles `data-[state=active]`.
  // Literal classes so Tailwind sees them.
  const trigger = cn(tabsTrigger(), "data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow");
</script>

<Tabs defaultValue="account">
  <TabsList aria-label="Settings" class={cn(tabsList())}>
    <TabsTab value="account" class={trigger}>Account</TabsTab>
    <TabsTab value="password" class={trigger}>Password</TabsTab>
    <TabsTab value="settings" class={trigger}>Settings</TabsTab>
  </TabsList>
  <TabsPanel value="account" class={tabsContent()}>
    <p class="text-sm text-muted-foreground pt-2">Manage your account details.</p>
  </TabsPanel>
  <TabsPanel value="password" class={tabsContent()}>
    <p class="text-sm text-muted-foreground pt-2">Update your password.</p>
  </TabsPanel>
  <TabsPanel value="settings" class={tabsContent()}>
    <p class="text-sm text-muted-foreground pt-2">Configure your settings.</p>
  </TabsPanel>
</Tabs>
