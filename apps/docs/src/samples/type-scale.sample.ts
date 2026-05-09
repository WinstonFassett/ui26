import type { Sample } from "./types"
import type { Spec } from "@/lib/spec-to-code"

type SampleSpec =
  | { kind: "heading"; level: "h1" | "h2" | "h3" | "h4"; className?: string }
  | { kind: "text"; size?: "xs" | "sm" | "base" | "lg" | "xl"; muted?: boolean; mono?: boolean; className?: string }

const TS_ROWS: Array<{ tag: string; sample: string; metric: string; spec: SampleSpec }> = [
  { tag: "display/xl", sample: "Composable state.",                                                                metric: "60/500", spec: { kind: "heading", level: "h1", className: "font-serif italic font-medium text-6xl tracking-tight" } },
  { tag: "display/lg", sample: "State, without ceremony.",                                                         metric: "48/500", spec: { kind: "heading", level: "h1", className: "font-serif font-medium text-5xl tracking-tight" } },
  { tag: "h1",         sample: "Ticket: Payment retry loop",                                                      metric: "30/600", spec: { kind: "heading", level: "h1" } },
  { tag: "h2",         sample: "Transitions, guarded",                                                            metric: "24/600", spec: { kind: "heading", level: "h2" } },
  { tag: "body",       sample: "Matchina handles state transitions, effects, and pattern matching — end-to-end typed.", metric: "14/400", spec: { kind: "text", size: "sm", className: "leading-relaxed" } },
  { tag: "caption",    sample: "Last edited 3 hours ago by kai.",                                                  metric: "12/400", spec: { kind: "text", size: "xs", muted: true } },
  { tag: "mono/sm",    sample: "v0.4.0 · 2kb gzipped · 0 dependencies",                                           metric: "12/400", spec: { kind: "text", size: "xs", mono: true } },
  { tag: "eyebrow",    sample: "now · shipping · api reference",                                                   metric: "10/500", spec: { kind: "text", mono: true, className: "text-2xs uppercase tracking-wider text-muted-foreground" } },
]

const TS_GRID_CHILDREN: string[] = []
const TS_ELEMENTS: Record<string, { type: string; props: Record<string, unknown>; children: string[] }> = {}
for (let i = 0; i < TS_ROWS.length; i++) {
  const row = TS_ROWS[i]
  const tagId = `t${i}`, sampleId = `s${i}`, metricId = `z${i}`
  TS_GRID_CHILDREN.push(tagId, sampleId, metricId)
  TS_ELEMENTS[tagId] = {
    type: "Text",
    props: { content: row.tag, mono: true, className: "text-2xs uppercase tracking-wider text-muted-foreground" },
    children: [],
  }
  TS_ELEMENTS[sampleId] = row.spec.kind === "heading"
    ? { type: "Heading", props: { text: row.sample, level: row.spec.level, className: row.spec.className }, children: [] }
    : { type: "Text", props: { content: row.sample, size: row.spec.size, muted: row.spec.muted, mono: row.spec.mono, className: row.spec.className }, children: [] }
  TS_ELEMENTS[metricId] = {
    type: "Text",
    props: { content: row.metric, mono: true, className: "text-2xs text-muted-foreground" },
    children: [],
  }
}

const spec: Spec = {
  root: "grid",
  elements: {
    grid: {
      type: "Grid",
      props: { className: "grid-cols-[140px_1fr_80px] items-baseline gap-x-6 gap-y-4 pb-3 border-b border-border" },
      children: TS_GRID_CHILDREN,
    },
    ...TS_ELEMENTS,
  },
}

const sample: Sample = {
  id: "type-scale",
  kind: "block",
  title: "Type scale",
  description: "Eight-step type scale — display, headings, body, caption, mono, eyebrow. Tailwind named sizes throughout.",
  componentName: "TypeScale",
  category: "Editorial",
  order: 1,
  registryDependencies: ["heading", "stack"],
  spec,
}

export default sample
