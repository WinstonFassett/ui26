"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
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
} from "@/lib/spec-to-code";
import {
  BUTTON_VARIANT_DEMOS,
  BUTTON_SIZE_DEMOS,
  type ButtonDemo,
} from "./button-demos";

type Selection =
  | { kind: "variant"; demo: ButtonDemo }
  | { kind: "size"; demo: ButtonDemo }

function DemoTile({
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
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      className={cn(
        "flex flex-1 cursor-pointer flex-col items-center gap-2 px-3 py-4 text-center transition-colors",
        "border-b-2",
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  )
}

export function ButtonDocSample() {
  const [selection, setSelection] = useState<Selection>({
    kind: "variant",
    demo: BUTTON_VARIANT_DEMOS[0],
  })
  const [fw, setFw] = useState<Framework>("react")

  const fileMap = useMemo(() => specToFiles(selection.demo.spec, selection.demo.label), [selection])
  const data = useMemo(() => FRAMEWORKS.map((f) => fileMap[f]), [fileMap])
  const activeFile = fileMap[fw]

  return (
    <div className="not-content my-6 space-y-6">
      <div>
        <SectionLabel>Variants</SectionLabel>
        <div className="flex border border-border">
          {BUTTON_VARIANT_DEMOS.map((demo) => (
            <DemoTile
              key={demo.id}
              label={demo.label}
              active={selection.kind === "variant" && selection.demo.id === demo.id}
              onClick={() => setSelection({ kind: "variant", demo })}
            >
              <Button
                variant={demo.id as "default" | "secondary" | "outline" | "ghost" | "destructive"}
                size="sm"
                tabIndex={-1}
                className="pointer-events-none"
              >
                Aa
              </Button>
            </DemoTile>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Sizes</SectionLabel>
        <div className="flex border border-border">
          {BUTTON_SIZE_DEMOS.map((demo) => (
            <DemoTile
              key={demo.id}
              label={demo.label}
              active={selection.kind === "size" && selection.demo.id === demo.id}
              onClick={() => setSelection({ kind: "size", demo })}
            >
              <Button
                size={demo.id as "sm" | "default" | "lg" | "icon"}
                tabIndex={-1}
                className="pointer-events-none"
              >
                {demo.id === "icon" ? "⚡" : "Aa"}
              </Button>
            </DemoTile>
          ))}
        </div>
      </div>

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
    </div>
  )
}
