"use client";

import { useMemo, useState } from "react";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockItem,
} from "@/components/kibo-ui/code-block";
import { cn } from "@/lib/utils";
import {
  FRAMEWORKS,
  FRAMEWORK_LABELS,
  specToFiles,
  type Framework,
  type Spec,
} from "@/lib/spec-to-code";

export interface Demo {
  id: string
  label: string
  spec: Spec
}

export function DemoTile({
  label,
  active,
  onClick,
  children,
}: {
  label: string
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      className={cn(
        "flex flex-1 cursor-pointer flex-col items-center gap-2 px-3 py-4 text-center transition-colors border-b-2",
        active
          ? "border-accent text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground"
      )}
    >
      <div className="flex min-h-9 items-center justify-center">{children}</div>
      <span className="font-mono text-[9px] uppercase tracking-widest">{label}</span>
    </div>
  )
}

export function DemoCodeBlock({ spec, demoName }: { spec: Spec; demoName: string }) {
  const [fw, setFw] = useState<Framework>("react")
  const fileMap = useMemo(() => specToFiles(spec, demoName), [spec, demoName])
  const data = useMemo(() => FRAMEWORKS.map((f) => fileMap[f]), [fileMap])
  const activeFile = fileMap[fw]

  return (
    <CodeBlock
      data={data}
      value={activeFile.language}
      onValueChange={(lang) => {
        const f = FRAMEWORKS.find((f) => fileMap[f].language === lang)
        if (f) setFw(f)
      }}
    >
      <CodeBlockHeader>
        <div className="flex grow items-center">
          {FRAMEWORKS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFw(f)}
              className={cn(
                "px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider border-b-[1.5px] transition-colors",
                f === fw
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {FRAMEWORK_LABELS[f]}
            </button>
          ))}
        </div>
        <span className="px-3 font-mono text-[10px] text-muted-foreground">
          {activeFile.filename}
        </span>
        <CodeBlockCopyButton />
      </CodeBlockHeader>
      <CodeBlockBody>
        {(file) => (
          <CodeBlockItem key={file.language} value={file.language} lineNumbers={false}>
            <CodeBlockContent language={file.language as "tsx" | "svelte" | "astro"}>
              {file.code}
            </CodeBlockContent>
          </CodeBlockItem>
        )}
      </CodeBlockBody>
    </CodeBlock>
  )
}

export function DemoSection({
  title,
  demos,
  renderTile,
}: {
  title: string
  demos: Demo[]
  renderTile: (demo: Demo) => React.ReactNode
}) {
  const [selected, setSelected] = useState(demos[0])

  return (
    <div className="not-content my-6">
      <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <div className="flex border border-border">
        {demos.map((demo) => (
          <DemoTile
            key={demo.id}
            label={demo.label}
            active={selected.id === demo.id}
            onClick={() => setSelected(demo)}
          >
            {renderTile(demo)}
          </DemoTile>
        ))}
      </div>
      <div className="mt-4">
        <DemoCodeBlock spec={selected.spec} demoName={selected.label} />
      </div>
    </div>
  )
}
