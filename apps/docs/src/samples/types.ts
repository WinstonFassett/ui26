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

  relatedComponent?: string
  group?: string

  registryDependencies?: string[]
  indexable?: boolean
}

export interface SampleFilter {
  kind?: SampleKind
  relatedComponent?: string
  group?: string
  indexable?: boolean
}
