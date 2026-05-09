import type { Sample, SampleFilter } from "./types"

const modules = import.meta.glob<{ default: Sample }>("./*.sample.ts", { eager: true })

const ALL: Sample[] = Object.values(modules).map((m) => m.default)

const BY_ID = new Map(ALL.map((s) => [s.id, s]))

if (BY_ID.size !== ALL.length) {
  const seen = new Set<string>()
  const dupes = ALL.map((s) => s.id).filter((id) => (seen.has(id) ? true : (seen.add(id), false)))
  throw new Error(`Duplicate sample ids: ${dupes.join(", ")}`)
}

export function getSamples(filter: SampleFilter = {}): Sample[] {
  return ALL.filter((s) => {
    if (filter.kind && s.kind !== filter.kind) return false
    if (filter.relatedComponent && s.relatedComponent !== filter.relatedComponent) return false
    if (filter.group && s.group !== filter.group) return false
    if (filter.indexable !== undefined && (s.indexable ?? true) !== filter.indexable) return false
    return true
  })
}

export function getSample(id: string): Sample | undefined {
  return BY_ID.get(id)
}

export type { Sample, SampleFilter, SampleKind } from "./types"
