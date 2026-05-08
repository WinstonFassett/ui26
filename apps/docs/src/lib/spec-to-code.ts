import type { Spec } from '@json-render/core'

export type { Spec }
export type Framework = 'react' | 'svelte' | 'astro'

// Props that become slot/children content rather than attributes
const SLOT_PROP: Record<string, string> = {
  Button: 'label',
  Badge: 'text',
  Heading: 'text',
  Text: 'content',
}

// Consumer-facing import path per framework
const importLine: Record<Framework, (name: string) => string> = {
  react:  (n) => `import { ${n} } from "@/components/ui/${kebab(n)}"`,
  svelte: (n) => `import ${n} from "$lib/components/ui/${n}.svelte"`,
  astro:  (n) => `import ${n} from "@/components/ui/${n}.astro"`,
}

function kebab(s: string) {
  return s.replace(/([A-Z])/g, (m, i) => (i > 0 ? '-' : '') + m.toLowerCase())
}

function serializeAttrs(props: Record<string, unknown>, slotProp?: string): string {
  return Object.entries(props)
    .filter(([k, v]) => k !== slotProp && v !== null && v !== undefined)
    .map(([k, v]) => typeof v === 'string' ? `${k}="${v}"` : `${k}={${JSON.stringify(v)}}`)
    .join(' ')
}

function renderElement(spec: Spec, id: string, depth: number): string {
  const el = spec.elements[id]
  const slotProp = SLOT_PROP[el.type]
  const attrs = serializeAttrs(el.props as Record<string, unknown>, slotProp)
  const pad = '  '.repeat(depth)
  const openTag = `<${el.type}${attrs ? ' ' + attrs : ''}>`

  const childLines: string[] = []
  if (slotProp && el.props[slotProp]) childLines.push(String(el.props[slotProp]))
  for (const cid of el.children ?? []) childLines.push(renderElement(spec, cid, depth + 1))

  if (childLines.length === 0) return `${pad}<${el.type}${attrs ? ' ' + attrs : ''} />`
  if (childLines.length === 1 && !childLines[0].includes('\n')) return `${pad}${openTag}${childLines[0]}</${el.type}>`
  return `${pad}${openTag}\n${childLines.map(l => `${'  '.repeat(depth + 1)}${l}`).join('\n')}\n${pad}</${el.type}>`
}

function usedComponents(spec: Spec): string[] {
  return [...new Set(Object.values(spec.elements).map(e => e.type))]
}

export function specToCode(spec: Spec, fw: Framework): string {
  const imports = usedComponents(spec).map(importLine[fw]).join('\n')
  const markup = renderElement(spec, spec.root, fw === 'react' ? 2 : 0)

  if (fw === 'react') {
    return `${imports}\n\nexport function Demo() {\n  return (\n${markup}\n  )\n}`
  }
  if (fw === 'svelte') {
    return `<script lang="ts">\n  ${imports}\n</script>\n\n${markup}`
  }
  return `---\n${imports}\n---\n\n${markup}`
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

export function specToFiles(spec: Spec, demoName = 'Demo'): Record<Framework, CodeFile> {
  return {
    react:  { language: 'tsx',    filename: `${demoName}.tsx`,    code: specToCode(spec, 'react') },
    svelte: { language: 'svelte', filename: `${demoName}.svelte`, code: specToCode(spec, 'svelte') },
    astro:  { language: 'astro',  filename: `${demoName}.astro`,  code: specToCode(spec, 'astro') },
  }
}
