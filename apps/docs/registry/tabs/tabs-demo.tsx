import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs-machine-ui";

export function TabsDemo() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground pt-2">Manage your account details.</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground pt-2">Update your password.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm text-muted-foreground pt-2">Configure your settings.</p>
      </TabsContent>
    </Tabs>
  );
}
