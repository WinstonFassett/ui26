import type { Sample } from "./types"

const sample: Sample = {
  id: "avatar-row",
  kind: "block",
  title: "Avatar row",
  description: "Team avatar strip showing members alongside size variants — sm, default, lg, xl.",
  componentName: "AvatarRow",
  category: "People",
  order: 1,
  registryDependencies: ["avatar", "stack"],
  spec: {
    root: "row",
    elements: {
      row: {
        type: "Stack",
        props: { direction: "col", gap: "4", className: "px-0.5" },
        children: ["team-label", "team-avatars", "divider", "sizes-label", "sizes-avatars"],
      },
      "team-label": {
        type: "Text",
        props: { content: "Team", mono: true, muted: true, className: "text-[10px] uppercase tracking-[0.06em] shrink-0" },
        children: [],
      },
      "team-avatars": {
        type: "Stack",
        props: { direction: "row", gap: "2", align: "center" },
        children: ["av-jr", "av-km", "av-ap", "av-ls", "members-count"],
      },
      "av-jr": { type: "Avatar", props: { size: "sm" }, children: ["fb-jr"] },
      "fb-jr": { type: "AvatarFallback", props: { text: "JR" }, children: [] },
      "av-km": { type: "Avatar", props: { size: "sm" }, children: ["fb-km"] },
      "fb-km": { type: "AvatarFallback", props: { text: "KM" }, children: [] },
      "av-ap": { type: "Avatar", props: { size: "sm" }, children: ["fb-ap"] },
      "fb-ap": { type: "AvatarFallback", props: { text: "AP" }, children: [] },
      "av-ls": { type: "Avatar", props: { size: "sm" }, children: ["fb-ls"] },
      "fb-ls": { type: "AvatarFallback", props: { text: "LS" }, children: [] },
      "members-count": {
        type: "Text",
        props: { content: "+12 members", mono: true, muted: true, className: "text-[11px] ml-1" },
        children: [],
      },
      divider: {
        type: "Stack",
        props: { direction: null, gap: "0", className: "h-px w-full bg-border" },
        children: [],
      },
      "sizes-label": {
        type: "Text",
        props: { content: "Sizes", mono: true, muted: true, className: "text-[10px] uppercase tracking-[0.06em] shrink-0" },
        children: [],
      },
      "sizes-avatars": {
        type: "Stack",
        props: { direction: "row", gap: "2", align: "end" },
        children: ["av-sm", "av-md", "av-lg", "av-xl"],
      },
      "av-sm": { type: "Avatar", props: { size: "sm" }, children: ["fb-sm"] },
      "fb-sm": { type: "AvatarFallback", props: { text: "SM" }, children: [] },
      "av-md": { type: "Avatar", props: {}, children: ["fb-md"] },
      "fb-md": { type: "AvatarFallback", props: { text: "MD" }, children: [] },
      "av-lg": { type: "Avatar", props: { size: "lg" }, children: ["fb-lg"] },
      "fb-lg": { type: "AvatarFallback", props: { text: "LG" }, children: [] },
      "av-xl": { type: "Avatar", props: { size: "xl" }, children: ["fb-xl"] },
      "fb-xl": { type: "AvatarFallback", props: { text: "XL" }, children: [] },
    },
  },
}

export default sample
