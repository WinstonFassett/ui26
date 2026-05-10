import type { Sample } from "./types"

const sample: Sample = {
  id: "breadcrumb-basic",
  kind: "atom",
  title: "Basic",
  description: "Three-segment breadcrumb — Home / Components / current page.",
  componentName: "BreadcrumbBasic",
  relatedComponent: "breadcrumb",
  group: "basic",
  spec: {
    root: "breadcrumb",
    elements: {
      breadcrumb: { type: "Breadcrumb", props: {}, children: ["list"] },
      list: { type: "BreadcrumbList", props: {}, children: ["item-1", "sep-1", "item-2", "sep-2", "item-3"] },
      "item-1": { type: "BreadcrumbItem", props: {}, children: ["link-1"] },
      "link-1": { type: "BreadcrumbLink", props: { text: "Home", href: "#" }, children: [] },
      "sep-1": { type: "BreadcrumbSeparator", props: {}, children: [] },
      "item-2": { type: "BreadcrumbItem", props: {}, children: ["link-2"] },
      "link-2": { type: "BreadcrumbLink", props: { text: "Components", href: "#" }, children: [] },
      "sep-2": { type: "BreadcrumbSeparator", props: {}, children: [] },
      "item-3": { type: "BreadcrumbItem", props: {}, children: ["page"] },
      page: { type: "BreadcrumbPage", props: { text: "Breadcrumb" }, children: [] },
    },
  },
}

export default sample
