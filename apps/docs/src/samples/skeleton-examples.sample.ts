import type { Sample } from "./types"

const sample: Sample = {
  id: "skeleton-examples",
  kind: "atom",
  title: "Skeleton loading state",
  description: "Typical card skeleton with avatar, name lines, body lines, and an image block.",
  componentName: "SkeletonExamples",
  relatedComponent: "skeleton",
  group: "examples",
  spec: {
    root: "card",
    elements: {
      card: {
        type: "Card",
        props: { className: "w-64" },
        children: ["body"],
      },
      body: { type: "CardContent", props: {}, children: ["col"] },
      col: {
        type: "Stack",
        props: { direction: "col", className: "gap-3 pt-2" },
        children: ["hrow", "l1", "l2", "block"],
      },
      hrow: {
        type: "Stack",
        props: { direction: "row", className: "items-center gap-3" },
        children: ["avatar", "lines"],
      },
      avatar: {
        type: "Skeleton",
        props: { className: "size-9 rounded-full shrink-0" },
        children: [],
      },
      lines: {
        type: "Stack",
        props: { direction: "col", className: "gap-1.5 flex-1" },
        children: ["ln1", "ln2"],
      },
      ln1: { type: "Skeleton", props: { className: "h-3 w-3/4" }, children: [] },
      ln2: { type: "Skeleton", props: { className: "h-3 w-1/2" }, children: [] },
      l1: { type: "Skeleton", props: { className: "h-3 w-full" }, children: [] },
      l2: { type: "Skeleton", props: { className: "h-3 w-5/6" }, children: [] },
      block: {
        type: "Skeleton",
        props: { className: "h-20 w-full rounded-md" },
        children: [],
      },
    },
  },
}

export default sample
