import { Tabs, UiSdkTabsList, UiSdkTabsTrigger, UiSdkTabsContent } from "./tabs-uisdk";

export function TabsUiSdkDemo() {
  return (
    <Tabs defaultValue="account">
      <UiSdkTabsList aria-label="Settings">
        <UiSdkTabsTrigger value="account">Account</UiSdkTabsTrigger>
        <UiSdkTabsTrigger value="password">Password</UiSdkTabsTrigger>
        <UiSdkTabsTrigger value="settings">Settings</UiSdkTabsTrigger>
      </UiSdkTabsList>
      <UiSdkTabsContent value="account">
        <p className="text-sm text-muted-foreground pt-2">Manage your account details.</p>
      </UiSdkTabsContent>
      <UiSdkTabsContent value="password">
        <p className="text-sm text-muted-foreground pt-2">Update your password.</p>
      </UiSdkTabsContent>
      <UiSdkTabsContent value="settings">
        <p className="text-sm text-muted-foreground pt-2">Configure your settings.</p>
      </UiSdkTabsContent>
    </Tabs>
  );
}
