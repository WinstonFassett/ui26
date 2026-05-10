import { codeToHtml } from 'shiki'
import { specToFiles, type Framework } from './spec-to-code'
import type { Spec } from '@json-render/core'

export interface RenderedFile {
  code: string
  html: string
  filename: string
}

export interface RenderedFiles extends Record<Framework, RenderedFile> {
  json?: RenderedFile
}

const SHIKI_THEMES = { light: 'github-light', dark: 'github-dark-default' } as const

async function renderFile(code: string, lang: string, filename: string): Promise<RenderedFile> {
  return {
    code,
    filename,
    html: await codeToHtml(code, { lang, themes: SHIKI_THEMES }),
  }
}

export async function prerenderFiles(
  spec: Spec,
  componentName: string,
  id: string,
  options: { includeJson?: boolean } = {},
): Promise<RenderedFiles> {
  const files = specToFiles(spec, componentName, id)
  const entries = await Promise.all(
    (Object.entries(files) as [Framework, { code: string; filename: string; language: string }][]).map(
      async ([fw, file]) => [fw, await renderFile(file.code, file.language, file.filename)]
    )
  )
  const result = Object.fromEntries(entries) as RenderedFiles
  if (options.includeJson) {
    const jsonCode = JSON.stringify(spec, null, 2)
    result.json = await renderFile(jsonCode, 'json', 'spec.json')
  }
  return result
}
