<script lang="ts">
  import TabsSvelte from "./tabs-machine-ui.svelte";
  import TabsListSvelte from "./tabs-list.svelte";
  import TabsTriggerSvelte from "./tabs-trigger.svelte";
  import TabsContentSvelte from "./tabs-content.svelte";
</script>

<TabsSvelte defaultValue="account">
  <TabsListSvelte>
    <TabsTriggerSvelte value="account">Account</TabsTriggerSvelte>
    <TabsTriggerSvelte value="password">Password</TabsTriggerSvelte>
    <TabsTriggerSvelte value="settings">Settings</TabsTriggerSvelte>
  </TabsListSvelte>
  <TabsContentSvelte value="account">
    <p class="text-sm text-muted-foreground pt-2">Manage your account details.</p>
  </TabsContentSvelte>
  <TabsContentSvelte value="password">
    <p class="text-sm text-muted-foreground pt-2">Update your password.</p>
  </TabsContentSvelte>
  <TabsContentSvelte value="settings">
    <p class="text-sm text-muted-foreground pt-2">Configure your settings.</p>
  </TabsContentSvelte>
</TabsSvelte>
