import type { Sample } from "./types"

const sample: Sample = {
  id: "skeleton-card",
  kind: "block",
  title: "Skeleton card",
  description: "Card showing a skeleton loading state with avatar placeholder, text rows, and a content block.",
  componentName: "SkeletonCard",
  category: "Cards",
  order: 5,
  registryDependencies: ["card", "skeleton"],
  spec: {
    root: "card",
    elements: {
      card: { type: "Card", props: {}, children: ["hdr", "content"] },
      hdr: { type: "CardHeader", props: {}, children: ["desc", "title"] },
      desc: { type: "CardDescription", props: { text: "Loading state" }, children: [] },
      title: { type: "CardTitle", props: { text: "Skeleton" }, children: [] },
      content: { type: "CardContent", props: {}, children: ["body"] },
      body: { type: "Stack", props: { direction: "col", gap: "3" }, children: ["row", "line1", "line2", "block"] },
      row: { type: "Stack", props: { direction: "row", gap: "3", align: "center" }, children: ["avatar-skel", "text-group"] },
      "avatar-skel": { type: "Skeleton", props: { className: "size-9 rounded-full shrink-0" }, children: [] },
      "text-group": { type: "Stack", props: { direction: "col", gap: "1", className: "flex-1" }, children: ["name-skel", "role-skel"] },
      "name-skel": { type: "Skeleton", props: { className: "h-3 w-3/4" }, children: [] },
      "role-skel": { type: "Skeleton", props: { className: "h-3 w-1/2" }, children: [] },
      line1: { type: "Skeleton", props: { className: "h-3 w-full" }, children: [] },
      line2: { type: "Skeleton", props: { className: "h-3 w-5/6" }, children: [] },
      block: { type: "Skeleton", props: { className: "h-20 w-full rounded-md" }, children: [] },
    },
  },
}

export default sample
