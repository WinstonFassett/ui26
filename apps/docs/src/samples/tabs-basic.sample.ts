import type { Sample } from "./types"

const sample: Sample = {
  id: "tabs-basic",
  kind: "atom",
  title: "Basic",
  description: "Three tabs — Account active by default. Uncontrolled (prop API: defaultValue).",
  componentName: "TabsBasic",
  relatedComponent: "tabs",
  group: "basic",
  spec: {
    root: "tabs",
    elements: {
      tabs: { type: "Tabs", props: { defaultValue: "account" }, children: ["list", "content-account", "content-password", "content-settings"] },
      list: { type: "TabsList", props: {}, children: ["trigger-account", "trigger-password", "trigger-settings"] },
      "trigger-account":  { type: "TabsTrigger", props: { value: "account" },   children: ["label-account"] },
      "trigger-password": { type: "TabsTrigger", props: { value: "password" },  children: ["label-password"] },
      "trigger-settings": { type: "TabsTrigger", props: { value: "settings" },  children: ["label-settings"] },
      "label-account":    { type: "Text", props: { content: "Account" },   children: [] },
      "label-password":   { type: "Text", props: { content: "Password" },  children: [] },
      "label-settings":   { type: "Text", props: { content: "Settings" },  children: [] },
      "content-account":  { type: "TabsContent", props: { value: "account" },   children: ["body-account"] },
      "content-password": { type: "TabsContent", props: { value: "password" },  children: ["body-password"] },
      "content-settings": { type: "TabsContent", props: { value: "settings" },  children: ["body-settings"] },
      "body-account":  { type: "Text", props: { content: "Manage your account details and preferences." }, children: [] },
      "body-password": { type: "Text", props: { content: "Update your password and security settings." }, children: [] },
      "body-settings": { type: "Text", props: { content: "Configure notifications and display options." }, children: [] },
    },
  },
}

export default sample
