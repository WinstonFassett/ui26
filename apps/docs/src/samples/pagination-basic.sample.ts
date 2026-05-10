import type { Sample } from "./types"

const sample: Sample = {
  id: "pagination-basic",
  kind: "atom",
  title: "Basic",
  description: "Five-page pagination with active state on page 2.",
  componentName: "PaginationBasic",
  relatedComponent: "pagination",
  group: "basic",
  spec: {
    root: "pagination",
    elements: {
      pagination: { type: "Pagination", props: {}, children: ["content"] },
      content: { type: "PaginationContent", props: {}, children: ["item-prev", "item-1", "item-2", "item-3", "item-next"] },
      "item-prev": { type: "PaginationItem", props: {}, children: ["link-prev"] },
      "link-prev": { type: "PaginationLink", props: { text: "«", href: "#" }, children: [] },
      "item-1": { type: "PaginationItem", props: {}, children: ["link-1"] },
      "link-1": { type: "PaginationLink", props: { text: "1", href: "#" }, children: [] },
      "item-2": { type: "PaginationItem", props: {}, children: ["link-2"] },
      "link-2": { type: "PaginationLink", props: { text: "2", href: "#", isActive: true }, children: [] },
      "item-3": { type: "PaginationItem", props: {}, children: ["link-3"] },
      "link-3": { type: "PaginationLink", props: { text: "3", href: "#" }, children: [] },
      "item-next": { type: "PaginationItem", props: {}, children: ["link-next"] },
      "link-next": { type: "PaginationLink", props: { text: "»", href: "#" }, children: [] },
    },
  },
}

export default sample
