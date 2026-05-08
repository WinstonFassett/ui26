import type { Demo } from './doc-sample'

export const BADGE_VARIANT_DEMOS: Demo[] = [
  { id: 'default',     label: 'Default',     spec: { root: 'b', elements: { b: { type: 'Badge', props: { text: 'Badge' } } } } },
  { id: 'secondary',   label: 'Secondary',   spec: { root: 'b', elements: { b: { type: 'Badge', props: { text: 'Badge', variant: 'secondary' } } } } },
  { id: 'outline',     label: 'Outline',     spec: { root: 'b', elements: { b: { type: 'Badge', props: { text: 'Badge', variant: 'outline' } } } } },
  { id: 'ghost',       label: 'Ghost',       spec: { root: 'b', elements: { b: { type: 'Badge', props: { text: 'Badge', variant: 'ghost' } } } } },
  { id: 'destructive', label: 'Destructive', spec: { root: 'b', elements: { b: { type: 'Badge', props: { text: 'Badge', variant: 'destructive' } } } } },
]
