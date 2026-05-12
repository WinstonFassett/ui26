import type { Sample } from "./types"
import type { Spec } from "@/lib/spec-to-code"

const TOKENS = [
  { name: "background", bg: "bg-background" },
  { name: "foreground", bg: "bg-foreground" },
  { name: "card",       bg: "bg-card" },
  { name: "muted",      bg: "bg-muted" },
  { name: "border",     bg: "bg-border" },
  { name: "accent",     bg: "bg-accent" },
  { name: "success",    bg: "bg-success" },
  { name: "warn",       bg: "bg-warn" },
  { name: "info",       bg: "bg-info" },
  { name: "purple",     bg: "bg-purple" },
  { name: "destructive",bg: "bg-destructive" },
  { name: "ring",       bg: "bg-ring" },
]

const elements: Spec["elements"] = {}
const swatchIds: string[] = []

for (const { name, bg } of TOKENS) {
  const id = `sw-${name}`
  const colorId = `col-${name}`
  const nameId = `nm-${name}`
  const varId = `vr-${name}`
  swatchIds.push(id)

  elements[id] = {
    type: "Stack",
    props: { direction: "col", className: "border border-border rounded overflow-hidden" },
    children: [colorId, nameId],
  }
  elements[colorId] = {
    type: "Stack",
    props: { direction: "col", className: `h-[52px] border-b border-border ${bg}` },
    children: [],
  }
  elements[nameId] = {
    type: "Stack",
    props: { direction: "col", className: "px-2.5 py-2 gap-0.5" },
    children: [varId, `tx-${name}`],
  }
  elements[varId] = {
    type: "Text",
    props: { content: name, mono: true, className: "text-[11px] text-foreground" },
    children: [],
  }
  elements[`tx-${name}`] = {
    type: "Text",
    props: { content: `--${name}`, mono: true, muted: true, className: "text-[10px]" },
    children: [],
  }
}

const spec: Spec = {
  root: "grid",
  elements: {
    grid: {
      type: "Grid",
      props: { className: "grid-cols-6 gap-2.5" },
      children: swatchIds,
    },
    ...elements,
  },
}

const sample: Sample = {
  id: "color-palette",
  kind: "block",
  title: "Color palette",
  description: "Semantic color token swatches — background, foreground, card, accent, status tones. Reflects the active theme.",
  componentName: "ColorPalette",
  category: "Design System",
  order: 5,
  span: "full",
  registryDependencies: ["stack", "grid"],
  spec,
}

export default sample
