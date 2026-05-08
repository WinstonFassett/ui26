import type { Spec } from '@json-render/core'
import { twMerge } from 'tailwind-merge'

export type { Spec }
export type Framework = 'react' | 'svelte' | 'astro'

// Props that become slot/children content rather than attributes
const SLOT_PROP: Record<string, string> = {
  Button: 'label',
  Badge: 'text',
  Heading: 'text',
  Text: 'content',
  CardTitle: 'text',
  CardDescription: 'text',
  AlertTitle: 'text',
  AlertDescription: 'text',
  FieldLabel: 'text',
  FieldDescription: 'text',
  FieldError: 'text',
}

interface Lowered {
  type: string
  classes: string[]
  /** Drop these props from attribute serialization; they were absorbed into classes. */
  consumedProps: Set<string>
}

// Spec-only abstractions get lowered to HTML primitives in generated source.
// Text is currently the only one; twMerge resolves any size/className conflicts.
function lowerElement(type: string, props: Record<string, unknown>): Lowered | null {
  if (type === 'Text') {
    const parts: string[] = [
      typeof props.size === 'string' ? `text-${props.size}` : 'text-sm',
    ]
    if (props.muted) parts.push('text-muted-foreground')
    if (props.mono) parts.push('font-mono')
    if (typeof props.className === 'string') parts.push(props.className)
    return {
      type: 'p',
      classes: [twMerge(parts.join(' '))],
      consumedProps: new Set(['size','muted','mono','content','className']),
    }
  }
  return null
}

// Compound component subcomponents that share an import path on React.
// Key = subcomponent type, value = parent registry name (kebab).
const COMPOUND_PARENT: Record<string, string> = {
  CardHeader: 'card', CardTitle: 'card', CardDescription: 'card', CardContent: 'card', CardFooter: 'card',
  AlertTitle: 'alert', AlertDescription: 'alert',
  AvatarImage: 'avatar', AvatarFallback: 'avatar',
  AccordionItem: 'accordion', AccordionTrigger: 'accordion', AccordionContent: 'accordion',
  BreadcrumbList: 'breadcrumb', BreadcrumbItem: 'breadcrumb', BreadcrumbLink: 'breadcrumb', BreadcrumbPage: 'breadcrumb', BreadcrumbSeparator: 'breadcrumb',
  PaginationContent: 'pagination', PaginationItem: 'pagination', PaginationLink: 'pagination',
  RadioGroupItem: 'radio-group',
  FieldContent: 'field', FieldLabel: 'field', FieldDescription: 'field', FieldError: 'field',
}

function kebab(s: string) {
  return s.replace(/([A-Z])/g, (m, _g, offset: number) => (offset > 0 ? '-' : '') + m.toLowerCase())
}

function isHtmlPrimitive(type: string): boolean {
  // HTML elements start lowercase; component types are PascalCase.
  return /^[a-z]/.test(type)
}

function parentRegistry(type: string): string {
  return COMPOUND_PARENT[type] ?? kebab(type)
}

function escapeJsxText(s: string): string {
  return String(s).replace(/[<>{}]/g, (c) => `{'${c}'}`)
}

function serializeAttrs(props: Record<string, unknown>, slotProp: string | undefined, fw: Framework): string {
  const classKey = fw === 'react' ? 'className' : 'class'
  return Object.entries(props)
    .filter(([k, v]) => k !== slotProp && v !== null && v !== undefined && v !== false)
    .map(([k, v]) => {
      const key = k === 'className' ? classKey : k === 'class' ? classKey : k
      if (typeof v === 'string') return `${key}="${v}"`
      if (typeof v === 'boolean') return v ? key : ''
      return `${key}={${JSON.stringify(v)}}`
    })
    .filter(Boolean)
    .join(' ')
}

function renderElement(spec: Spec, id: string, depth: number, fw: Framework): string {
  const el = spec.elements[id]
  const propsRaw = el.props as Record<string, unknown>

  const lowered = lowerElement(el.type, propsRaw)
  const emitType = lowered ? lowered.type : el.type

  // Strip props consumed by lowering; emit their collapsed classes as className.
  let effectiveProps: Record<string, unknown> = propsRaw
  if (lowered) {
    effectiveProps = Object.fromEntries(
      Object.entries(propsRaw).filter(([k]) => !lowered.consumedProps.has(k))
    )
    if (lowered.classes.length > 0) {
      effectiveProps.className = lowered.classes.join(' ')
    }
  }

  const slotProp = SLOT_PROP[el.type]
  const attrs = serializeAttrs(effectiveProps, slotProp, fw)
  const pad = '  '.repeat(depth)
  const openTag = `<${emitType}${attrs ? ' ' + attrs : ''}>`

  const childInner = '  '.repeat(depth + 1)
  const childLines: string[] = []
  if (slotProp && propsRaw[slotProp]) {
    const text = String(propsRaw[slotProp])
    childLines.push(`${childInner}${fw === 'react' ? escapeJsxText(text) : text}`)
  }
  for (const cid of el.children ?? []) childLines.push(renderElement(spec, cid, depth + 1, fw))

  if (childLines.length === 0) return `${pad}<${emitType}${attrs ? ' ' + attrs : ''} />`
  if (childLines.length === 1 && !childLines[0].includes('\n')) return `${pad}${openTag}${childLines[0].trim()}</${emitType}>`
  return `${pad}${openTag}\n${childLines.join('\n')}\n${pad}</${emitType}>`
}

function usedComponentTypes(spec: Spec): string[] {
  return [...new Set(Object.values(spec.elements).map(e => {
    const lowered = lowerElement(e.type, e.props as Record<string, unknown>)
    return lowered ? lowered.type : e.type
  }))]
    .filter((t) => !isHtmlPrimitive(t))
}

function buildImports(spec: Spec, fw: Framework): string {
  const types = usedComponentTypes(spec)
  if (fw === 'react') {
    // Group by parent registry so compound subcomponents share one import line.
    const groups = new Map<string, string[]>()
    for (const t of types) {
      const key = parentRegistry(t)
      const list = groups.get(key) ?? []
      list.push(t)
      groups.set(key, list)
    }
    return [...groups.entries()]
      .map(([reg, names]) => `import { ${names.join(', ')} } from "@/components/ui/${reg}"`)
      .join('\n')
  }
  if (fw === 'svelte') {
    return types.map((n) => `import ${n} from "$lib/components/ui/${kebab(n)}.svelte"`).join('\n')
  }
  return types.map((n) => `import ${n} from "@/components/ui/${kebab(n)}.astro"`).join('\n')
}

export function specToCode(spec: Spec, fw: Framework, componentName = 'Demo'): string {
  const imports = buildImports(spec, fw)
  const markup = renderElement(spec, spec.root, fw === 'react' ? 2 : 0, fw)

  if (fw === 'react') {
    return `${imports}\n\nexport function ${componentName}() {\n  return (\n${markup}\n  )\n}\n`
  }
  if (fw === 'svelte') {
    const indented = imports.split('\n').map(l => `  ${l}`).join('\n')
    return `<script lang="ts">\n${indented}\n</script>\n\n${markup}\n`
  }
  return `---\n${imports}\n---\n\n${markup}\n`
}

export const FRAMEWORKS: Framework[] = ['react', 'svelte', 'astro']

export const FRAMEWORK_LABELS: Record<Framework, string> = {
  react: 'React',
  svelte: 'Svelte',
  astro: 'Astro',
}

export const FRAMEWORK_EXTS: Record<Framework, string> = {
  react: 'tsx',
  svelte: 'svelte',
  astro: 'astro',
}

export interface CodeFile {
  language: string
  filename: string
  code: string
}

export function specToFiles(
  spec: Spec,
  name = 'Demo',
  filenameStem = name,
): Record<Framework, CodeFile> {
  return {
    react:  { language: 'tsx',    filename: `${filenameStem}.tsx`,    code: specToCode(spec, 'react', name) },
    svelte: { language: 'svelte', filename: `${filenameStem}.svelte`, code: specToCode(spec, 'svelte') },
    astro:  { language: 'astro',  filename: `${filenameStem}.astro`,  code: specToCode(spec, 'astro') },
  }
}
