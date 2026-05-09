import type { Sample } from "./types"

// Note: button-default.sample.ts handles the steel-thread variant default entry.
// Remaining variants + all sizes live here.

const samples: Sample[] = [
  // Variants
  {
    id: "button-secondary",
    kind: "atom",
    title: "Secondary",
    description: "Secondary button — lower visual weight than default, for supporting actions.",
    componentName: "ButtonSecondary",
    relatedComponent: "button",
    group: "variants",
    key: "secondary",
    spec: { root: "btn", elements: { btn: { type: "Button", props: { label: "Button", variant: "secondary" } } } },
  },
  {
    id: "button-outline",
    kind: "atom",
    title: "Outline",
    description: "Outline button — border only, for tertiary actions that shouldn't compete visually.",
    componentName: "ButtonOutline",
    relatedComponent: "button",
    group: "variants",
    key: "outline",
    spec: { root: "btn", elements: { btn: { type: "Button", props: { label: "Button", variant: "outline" } } } },
  },
  {
    id: "button-ghost",
    kind: "atom",
    title: "Ghost",
    description: "Ghost button — no border or background, for inline or toolbar actions.",
    componentName: "ButtonGhost",
    relatedComponent: "button",
    group: "variants",
    key: "ghost",
    spec: { root: "btn", elements: { btn: { type: "Button", props: { label: "Button", variant: "ghost" } } } },
  },
  {
    id: "button-destructive",
    kind: "atom",
    title: "Destructive",
    description: "Destructive button — red fill for irreversible actions like delete.",
    componentName: "ButtonDestructive",
    relatedComponent: "button",
    group: "variants",
    key: "destructive",
    spec: { root: "btn", elements: { btn: { type: "Button", props: { label: "Button", variant: "destructive" } } } },
  },
  // Sizes
  {
    id: "button-size-sm",
    kind: "atom",
    title: "sm",
    description: "Small button — for dense toolbars and inline actions.",
    componentName: "ButtonSizeSm",
    relatedComponent: "button",
    group: "sizes",
    key: "sm",
    spec: { root: "btn", elements: { btn: { type: "Button", props: { label: "Button", size: "sm" } } } },
  },
  {
    id: "button-size-default",
    kind: "atom",
    title: "default",
    description: "Default button size — standard 36px height.",
    componentName: "ButtonSizeDefault",
    relatedComponent: "button",
    group: "sizes",
    key: "default",
    spec: { root: "btn", elements: { btn: { type: "Button", props: { label: "Button" } } } },
  },
  {
    id: "button-size-lg",
    kind: "atom",
    title: "lg",
    description: "Large button — for hero CTAs and prominent single actions.",
    componentName: "ButtonSizeLg",
    relatedComponent: "button",
    group: "sizes",
    key: "lg",
    spec: { root: "btn", elements: { btn: { type: "Button", props: { label: "Button", size: "lg" } } } },
  },
  {
    id: "button-size-icon",
    kind: "atom",
    title: "icon",
    description: "Icon button — square, for icon-only actions.",
    componentName: "ButtonSizeIcon",
    relatedComponent: "button",
    group: "sizes",
    key: "icon",
    spec: { root: "btn", elements: { btn: { type: "Button", props: { label: "⚡", size: "icon" } } } },
  },
]

export default samples
