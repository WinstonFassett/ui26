import type { Spec } from '@json-render/core'

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
}

// json-render abstractions that should be emitted as HTML primitives in
// generated source — consumers don't have Stack/Grid/Text/Heading installed.
const GAP_CLASS: Record<string, string> = {
  '0': 'gap-0', '1': 'gap-1', '2': 'gap-2', '3': 'gap-3',
  '4': 'gap-4', '5': 'gap-5', '6': 'gap-6', '8': 'gap-8',
}

interface Lowered {
  type: string
  classes: string[]
  /** Drop these props from attribute serialization; they were absorbed into classes. */
  consumedProps: Set<string>
}

function lowerElement(type: string, props: Record<string, unknown>): Lowered | null {
  if (type === 'Stack') {
    const cls = ['flex']
    cls.push(props.direction === 'row' ? 'flex-row' : 'flex-col')
    if (typeof props.gap === 'string' && GAP_CLASS[props.gap]) cls.push(GAP_CLASS[props.gap])
    else cls.push('gap-4')
    if (props.align === 'center') cls.push('items-center')
    else if (props.align === 'start') cls.push('items-start')
    else if (props.align === 'end') cls.push('items-end')
    else if (props.align === 'stretch') cls.push('items-stretch')
    if (props.justify === 'center') cls.push('justify-center')
    else if (props.justify === 'between') cls.push('justify-between')
    else if (props.justify === 'end') cls.push('justify-end')
    if (props.wrap) cls.push('flex-wrap')
    if (typeof props.className === 'string') cls.push(props.className)
    return { type: 'div', classes: cls, consumedProps: new Set(['direction','gap','align','justify','wrap','className']) }
  }
  if (type === 'Grid') {
    const cls = ['grid']
    if (props.cols === '2') cls.push('grid-cols-2')
    else if (props.cols === '3') cls.push('grid-cols-3')
    else if (props.cols === '4') cls.push('grid-cols-4')
    if (typeof props.gap === 'string' && GAP_CLASS[props.gap]) cls.push(GAP_CLASS[props.gap])
    else cls.push('gap-4')
    if (typeof props.className === 'string') cls.push(props.className)
    return { type: 'div', classes: cls, consumedProps: new Set(['cols','gap','className']) }
  }
  if (type === 'Text') {
    const cls: string[] = []
    if (typeof props.size === 'string') cls.push(`text-${props.size}`)
    else cls.push('text-sm')
    if (props.muted) cls.push('text-muted-foreground')
    if (props.mono) cls.push('font-mono')
    return { type: 'p', classes: cls, consumedProps: new Set(['size','muted','mono','content']) }
  }
  if (type === 'Heading') {
    const level = (typeof props.level === 'string' ? props.level : 'h2') as 'h1'|'h2'|'h3'|'h4'
    const sizeMap: Record<string, string> = {
      h1: 'text-3xl font-bold tracking-tight',
      h2: 'text-2xl font-semibold tracking-tight',
      h3: 'text-xl font-semibold',
      h4: 'text-lg font-medium',
    }
    return { type: level, classes: sizeMap[level].split(' '), consumedProps: new Set(['level','text']) }
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

  // Lower json-render abstractions to HTML primitives.
  const lowered = lowerElement(el.type, propsRaw)
  const emitType = lowered ? lowered.type : el.type

  // Build effective props: strip lowered-consumed keys, fold lowering classes into class.
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
