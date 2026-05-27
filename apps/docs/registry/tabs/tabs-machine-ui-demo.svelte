<script lang="ts">
  import TabsSvelte from "./tabs-machine-ui.svelte";
  import TabsListSvelte from "./tabs-list.svelte";
  import TabsTriggerSvelte from "./tabs-trigger.svelte";
  import TabsContentSvelte from "./tabs-content.svelte";

  // Demonstrates bind:value — parent state mirrors the active tab both ways.
  let value = $state("account");
</script>

<div class="flex flex-col gap-3">
  <div class="flex items-center gap-2 text-sm">
    <span class="text-muted-foreground">External state:</span>
    <code class="rounded bg-muted px-1.5 py-0.5">{value}</code>
    <button
      type="button"
      class="ml-auto text-xs underline text-muted-foreground hover:text-foreground"
      onclick={() => value = "settings"}
    >
      Jump to Settings
    </button>
  </div>

  <TabsSvelte bind:value>
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
</div>
