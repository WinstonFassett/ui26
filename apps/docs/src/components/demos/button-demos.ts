import type { Spec } from '@/lib/spec-to-code'

export interface ButtonDemo {
  id: string
  label: string
  spec: Spec
}

export const BUTTON_VARIANT_DEMOS: ButtonDemo[] = [
  {
    id: 'default',
    label: 'Default',
    spec: { root: 'btn', elements: { btn: { type: 'Button', props: { label: 'Button' } } } },
  },
  {
    id: 'secondary',
    label: 'Secondary',
    spec: { root: 'btn', elements: { btn: { type: 'Button', props: { label: 'Button', variant: 'secondary' } } } },
  },
  {
    id: 'outline',
    label: 'Outline',
    spec: { root: 'btn', elements: { btn: { type: 'Button', props: { label: 'Button', variant: 'outline' } } } },
  },
  {
    id: 'ghost',
    label: 'Ghost',
    spec: { root: 'btn', elements: { btn: { type: 'Button', props: { label: 'Button', variant: 'ghost' } } } },
  },
  {
    id: 'destructive',
    label: 'Destructive',
    spec: { root: 'btn', elements: { btn: { type: 'Button', props: { label: 'Button', variant: 'destructive' } } } },
  },
]

export const BUTTON_SIZE_DEMOS: ButtonDemo[] = [
  {
    id: 'sm',
    label: 'sm',
    spec: { root: 'btn', elements: { btn: { type: 'Button', props: { label: 'Button', size: 'sm' } } } },
  },
  {
    id: 'default',
    label: 'default',
    spec: { root: 'btn', elements: { btn: { type: 'Button', props: { label: 'Button' } } } },
  },
  {
    id: 'lg',
    label: 'lg',
    spec: { root: 'btn', elements: { btn: { type: 'Button', props: { label: 'Button', size: 'lg' } } } },
  },
  {
    id: 'icon',
    label: 'icon',
    spec: { root: 'btn', elements: { btn: { type: 'Button', props: { label: '⚡', size: 'icon' } } } },
  },
]
