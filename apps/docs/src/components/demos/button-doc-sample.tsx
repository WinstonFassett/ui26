"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
} from "@/components/kibo-ui/code-block";
import { cn } from "@/lib/utils";
import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  FRAMEWORKS,
  FRAMEWORK_LABELS,
  genButtonFiles,
  type ButtonSizeDef,
  type ButtonVariantDef,
  type Framework,
} from "./button-samples";

type Selection =
  | { kind: "variant"; item: ButtonVariantDef }
  | { kind: "size"; item: ButtonSizeDef };

function VariantTile({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-1 flex-col items-center gap-2 px-3 py-4 text-center transition-colors",
        "border-b-2",
        active
          ? "border-accent text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground"
      )}
    >
      <div className="flex min-h-9 items-center justify-center">{children}</div>
      <span className="font-mono text-[9px] uppercase tracking-widest">
        {label}
      </span>
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  );
}

export function ButtonDocSample() {
  const [selection, setSelection] = useState<Selection>({
    kind: "variant",
    item: BUTTON_VARIANTS[0],
  });
  const [fw, setFw] = useState<Framework>("react");

  const { label, propStr } = useMemo(() => {
    return {
      label: selection.item.label,
      propStr: selection.item.props,
    };
  }, [selection]);

  const fileMap = useMemo(() => genButtonFiles(label, propStr), [label, propStr]);
  const data = useMemo(
    () => FRAMEWORKS.map((f) => fileMap[f]),
    [fileMap]
  );

  const activeFile = fileMap[fw];

  return (
    <div className="not-content my-6 space-y-6">
      {/* Variants grid */}
      <div>
        <SectionLabel>Variants</SectionLabel>
        <div className="flex border border-border">
          {BUTTON_VARIANTS.map((v) => (
            <VariantTile
              key={v.id}
              label={v.label}
              active={selection.kind === "variant" && selection.item.id === v.id}
              onClick={() => setSelection({ kind: "variant", item: v })}
            >
              <Button
                variant={v.id as "default" | "secondary" | "outline" | "ghost" | "destructive"}
                size="sm"
                tabIndex={-1}
                className="pointer-events-none"
              >
                Aa
              </Button>
            </VariantTile>
          ))}
        </div>
      </div>

      {/* Sizes grid */}
      <div>
        <SectionLabel>Sizes</SectionLabel>
        <div className="flex border border-border">
          {BUTTON_SIZES.map((s) => (
            <VariantTile
              key={s.id}
              label={s.label}
              active={selection.kind === "size" && selection.item.id === s.id}
              onClick={() => setSelection({ kind: "size", item: s })}
            >
              <Button
                size={s.id as "sm" | "default" | "lg" | "icon"}
                tabIndex={-1}
                className="pointer-events-none"
              >
                {s.id === "icon" ? "⚡" : "Aa"}
              </Button>
            </VariantTile>
          ))}
        </div>
      </div>

      {/* Code panel */}
      <CodeBlock data={data} value={activeFile.language} onValueChange={(lang) => {
        const fw = FRAMEWORKS.find((f) => fileMap[f].language === lang);
        if (fw) setFw(fw);
      }}>
        <CodeBlockHeader>
          <CodeBlockFiles>
            {(file) => (
              <button
                key={file.language}
                type="button"
                onClick={() => {
                  const f = FRAMEWORKS.find((fw) => fileMap[fw].language === file.language);
                  if (f) setFw(f);
                }}
                className={cn(
                  "px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider border-b-[1.5px] transition-colors",
                  file.language === activeFile.language
                    ? "border-accent text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {FRAMEWORK_LABELS[FRAMEWORKS.find((f) => fileMap[f].language === file.language) ?? "react"]}
              </button>
            )}
          </CodeBlockFiles>
          <div className="flex-1" />
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
  );
}
