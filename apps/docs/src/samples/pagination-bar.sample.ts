import type { Sample } from "./types"

const sample: Sample = {
  id: "pagination-bar",
  kind: "block",
  title: "Pagination bar",
  description: "Result count + page navigation row for a 128-item list.",
  componentName: "PaginationBar",
  category: "Navigation",
  order: 2,
  registryDependencies: ["pagination"],
  spec: {
    root: "row",
    elements: {
      row: {
        type: "Stack",
        props: { direction: "row", justify: "between", align: "center" },
        children: ["count", "pagination"],
      },
      count: {
        type: "Text",
        props: { content: "Showing 1–7 of 128 issues", mono: true, muted: true, className: "text-[11px]" },
        children: [],
      },
      pagination: { type: "Pagination", props: {}, children: ["content"] },
      content: {
        type: "PaginationContent",
        props: {},
        children: ["item-prev", "item-1", "item-2", "item-3", "item-ellipsis", "item-19", "item-next"],
      },
      "item-prev":     { type: "PaginationItem", props: {}, children: ["link-prev"] },
      "link-prev":     { type: "PaginationLink", props: { text: "«", href: "#" }, children: [] },
      "item-1":        { type: "PaginationItem", props: {}, children: ["link-1"] },
      "link-1":        { type: "PaginationLink", props: { text: "1", href: "#", isActive: true }, children: [] },
      "item-2":        { type: "PaginationItem", props: {}, children: ["link-2"] },
      "link-2":        { type: "PaginationLink", props: { text: "2", href: "#" }, children: [] },
      "item-3":        { type: "PaginationItem", props: {}, children: ["link-3"] },
      "link-3":        { type: "PaginationLink", props: { text: "3", href: "#" }, children: [] },
      "item-ellipsis": { type: "PaginationItem", props: {}, children: ["link-ellipsis"] },
      "link-ellipsis": { type: "PaginationLink", props: { text: "…", href: "#" }, children: [] },
      "item-19":       { type: "PaginationItem", props: {}, children: ["link-19"] },
      "link-19":       { type: "PaginationLink", props: { text: "19", href: "#" }, children: [] },
      "item-next":     { type: "PaginationItem", props: {}, children: ["link-next"] },
      "link-next":     { type: "PaginationLink", props: { text: "»", href: "#" }, children: [] },
    },
  },
}

export default sample
