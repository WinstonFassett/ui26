import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs-machine-ui";

// Uncontrolled — `defaultValue` initializes; clicks update internal state.
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

// Controlled — parent owns `value`; prop API only, no machine import.
export function TabsControlledDemo() {
  const [value, setValue] = React.useState("account");
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">External state:</span>
        <code className="rounded bg-muted px-1.5 py-0.5">{value}</code>
        <button
          type="button"
          className="ml-auto text-xs underline text-muted-foreground hover:text-foreground"
          onClick={() => setValue("settings")}
        >
          Jump to Settings
        </button>
      </div>
      <Tabs value={value} onValueChange={setValue}>
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
    </div>
  );
}
