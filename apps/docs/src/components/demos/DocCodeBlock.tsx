"use client";

import { cn } from "@/lib/utils";
import type { RenderedFiles } from "@/lib/prerender-source";
import { useFw } from "@/components/livecode/fw-store";
import { FwTabs } from "@/components/livecode/FwTabs";
import { CopyBtn } from "@/components/livecode/CopyBtn";
import { PlayroomLink } from "@/components/livecode/PlayroomLink";

const SHIKI_CLASSES = cn(
  "flex-1 overflow-auto bg-muted/40 px-4 py-3.5",
  "[&_.shiki]:bg-transparent! [&_pre]:m-0! [&_pre]:p-0! [&_code]:text-[12px]! [&_code]:leading-[1.6]! [&_code]:font-mono",
  "dark:[&_.shiki]:text-[var(--shiki-dark)]!",
  "dark:[&_.shiki_span]:text-[var(--shiki-dark)]!",
  "dark:[&_.shiki_span]:[font-style:var(--shiki-dark-font-style)]!",
  "dark:[&_.shiki_span]:[font-weight:var(--shiki-dark-font-weight)]!",
  "dark:[&_.shiki_span]:[text-decoration:var(--shiki-dark-text-decoration)]!"
);

export function DocCodeBlock({ files }: { files: RenderedFiles }) {
  const [fw, setFw] = useFw();
  const file = files[fw];

  return (
    <div className="flex flex-col border border-border bg-card">
      <FwTabs fw={fw} setFw={setFw} fileLabel={file.filename} />
      <div
        className={SHIKI_CLASSES}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: pre-rendered by server-side shiki at build time
        dangerouslySetInnerHTML={{ __html: file.html }}
      />
      <div className="flex items-center justify-between px-3.5 py-2 border-t border-border">
        <CopyBtn text={file.code} />
        <PlayroomLink code={files.react.code} />
      </div>
    </div>
  );
}
