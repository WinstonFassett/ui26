"use client";

import type { RenderedFiles } from "@/lib/prerender-source";
import { SHIKI_CLASSES } from "@/lib/shiki-classes";
import { useFw } from "@/components/livecode/fw-store";
import { FwTabs } from "@/components/livecode/FwTabs";
import { CopyBtn } from "@/components/livecode/CopyBtn";
import { PlayroomLink } from "@/components/livecode/PlayroomLink";

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
