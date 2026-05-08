import { useMemo } from "react";
import { CodeBlockContent } from "@/components/kibo-ui/code-block";
import { cn } from "@/lib/utils";
import {
  specToFiles,
  type Framework,
  type Spec,
} from "@/lib/spec-to-code";
import { CopyBtn } from "./CopyBtn";
import { FwTabs } from "./FwTabs";
import { PlayroomLink } from "./PlayroomLink";

export interface SourcePaneRegion {
  id: string;
  label: string;
  section: string;
  spec: Spec;
  /** PascalCase name for React function and filename stem. Defaults to id. */
  componentName?: string;
}

export function SourcePane({
  region,
  fw,
  setFw,
  className,
}: {
  region: SourcePaneRegion;
  fw: Framework;
  setFw: (fw: Framework) => void;
  className?: string;
}) {
  const files = useMemo(
    () => specToFiles(region.spec, region.componentName ?? region.id, region.id),
    [region],
  );
  const file = files[fw];

  return (
    <div
      className={cn(
        "flex flex-col bg-card border border-border h-full",
        className
      )}
    >
      <div className="flex items-center gap-2.5 px-3.5 py-3 border-b border-border">
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[9px] uppercase tracking-widest text-accent mb-0.5">
            {region.section}
          </div>
          <div className="text-[13px] font-semibold text-foreground truncate">
            {region.label}
          </div>
        </div>
        <CopyBtn text={file.code} />
      </div>

      <FwTabs fw={fw} setFw={setFw} fileLabel={file.filename} />

      <div
        className={cn(
          "flex-1 overflow-auto bg-muted/40 px-4 py-3.5",
          "[&_.shiki]:bg-transparent! [&_pre]:m-0! [&_pre]:p-0! [&_code]:text-[12px]! [&_code]:leading-[1.6]! [&_code]:font-mono",
          // Shiki multi-theme dark-mode color overrides (mirrors kibo CodeBlock).
          "dark:[&_.shiki]:text-[var(--shiki-dark)]!",
          "dark:[&_.shiki_span]:text-[var(--shiki-dark)]!",
          "dark:[&_.shiki_span]:[font-style:var(--shiki-dark-font-style)]!",
          "dark:[&_.shiki_span]:[font-weight:var(--shiki-dark-font-weight)]!",
          "dark:[&_.shiki_span]:[text-decoration:var(--shiki-dark-text-decoration)]!"
        )}
      >
        <CodeBlockContent
          language={file.language as "tsx" | "svelte" | "astro"}
          themes={{ light: "github-light-default", dark: "github-dark-default" }}
        >
          {file.code}
        </CodeBlockContent>
      </div>

      <div className="flex items-center justify-between px-3.5 py-2 border-t border-border bg-card">
        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          ui26/{fw}
        </span>
        {/* Playroom is React-only — always link to the React source for the active region. */}
        <PlayroomLink code={files.react.code} />
      </div>
    </div>
  );
}
