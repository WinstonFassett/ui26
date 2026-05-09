import type { Spec } from "@/lib/spec-to-code"

export type SampleKind = "atom" | "block"

export interface Sample {
  id: string
  kind: SampleKind
  title: string
  description: string
  componentName: string
  spec: Spec

  prose?: string

  // atom fields
  relatedComponent?: string
  group?: string
  key?: string          // local id within (relatedComponent, group) — used by renderTile for prop binding

  // block fields
  registryDependencies?: string[]
  category?: string     // section grouping on /blocks
  order?: number        // within-category sort, lower = first
  featured?: boolean    // include in homepage teaser
  indexable?: boolean   // default true; false = exists but hidden from /blocks index
}

export interface SampleFilter {
  kind?: SampleKind
  relatedComponent?: string
  group?: string
  featured?: boolean
  indexable?: boolean
}
