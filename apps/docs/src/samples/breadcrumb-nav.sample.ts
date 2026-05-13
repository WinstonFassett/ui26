import type { Sample } from "./types"

const sample: Sample = {
  id: "breadcrumb-nav",
  kind: "block",
  title: "Breadcrumb nav",
  description: "Three-segment breadcrumb showing workspace > project > current page.",
  componentName: "BreadcrumbNav",
  category: "Navigation",
  order: 1,
  span: "full",
  registryDependencies: ["breadcrumb"],
  spec: {
    root: "breadcrumb",
    elements: {
      breadcrumb: { type: "Breadcrumb", props: {}, children: ["list"] },
      list: {
        type: "BreadcrumbList",
        props: {},
        children: ["item-1", "sep-1", "item-2", "sep-2", "item-3"],
      },
      "item-1":  { type: "BreadcrumbItem", props: {}, children: ["link-1"] },
      "link-1":  { type: "BreadcrumbLink", props: { text: "Workspace", href: "#" }, children: [] },
      "sep-1":   { type: "BreadcrumbSeparator", props: {}, children: [] },
      "item-2":  { type: "BreadcrumbItem", props: {}, children: ["link-2"] },
      "link-2":  { type: "BreadcrumbLink", props: { text: "Matchina", href: "#" }, children: [] },
      "sep-2":   { type: "BreadcrumbSeparator", props: {}, children: [] },
      "item-3":  { type: "BreadcrumbItem", props: {}, children: ["page"] },
      page:      { type: "BreadcrumbPage", props: { text: "All issues" }, children: [] },
    },
  },
}

export default sample
