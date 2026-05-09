import { codeToHtml } from 'shiki'
import { specToFiles, type Framework } from './spec-to-code'
import type { Spec } from '@json-render/core'

export interface RenderedFile {
  code: string
  html: string
  filename: string
}

export type RenderedFiles = Record<Framework, RenderedFile>

export async function prerenderFiles(
  spec: Spec,
  componentName: string,
  id: string,
): Promise<RenderedFiles> {
  const files = specToFiles(spec, componentName, id)
  const entries = await Promise.all(
    (Object.entries(files) as [Framework, { code: string; filename: string; language: string }][]).map(
      async ([fw, file]) => [
        fw,
        {
          code: file.code,
          filename: file.filename,
          html: await codeToHtml(file.code, {
            lang: file.language,
            themes: { light: 'github-light', dark: 'github-dark-default' },
          }),
        } satisfies RenderedFile,
      ]
    )
  )
  return Object.fromEntries(entries) as RenderedFiles
}
