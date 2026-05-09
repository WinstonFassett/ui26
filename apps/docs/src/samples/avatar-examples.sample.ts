import type { Sample } from "./types"

const sample: Sample = {
  id: "avatar-examples",
  kind: "atom",
  title: "Avatar sizes",
  description: "All four avatar sizes with fallback initials — sm, default, lg, xl.",
  componentName: "AvatarExamples",
  relatedComponent: "avatar",
  group: "sizes",
  spec: {
    root: "row",
    elements: {
      row: {
        type: "Stack",
        props: { direction: "row", className: "items-end gap-3" },
        children: ["a1", "a2", "a3", "a4"],
      },
      a1: { type: "Avatar", props: { size: "sm" }, children: ["f1"] },
      f1: { type: "AvatarFallback", props: { text: "SM" }, children: [] },
      a2: { type: "Avatar", props: { size: "default" }, children: ["f2"] },
      f2: { type: "AvatarFallback", props: { text: "MD" }, children: [] },
      a3: { type: "Avatar", props: { size: "lg" }, children: ["f3"] },
      f3: { type: "AvatarFallback", props: { text: "LG" }, children: [] },
      a4: { type: "Avatar", props: { size: "xl" }, children: ["f4"] },
      f4: { type: "AvatarFallback", props: { text: "XL" }, children: [] },
    },
  },
}

export default sample
