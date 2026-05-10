"use client";

import { useEffect, useState } from "react";
import type { Framework } from "@/lib/spec-to-code";
import type { RenderedFiles } from "@/lib/prerender-source";
import { SHIKI_CLASSES } from "@/lib/shiki-classes";
import { useFw } from "@/components/livecode/fw-store";
import { FwTabs } from "@/components/livecode/FwTabs";
import { CopyBtn } from "@/components/livecode/CopyBtn";
import { PlayroomLink } from "@/components/livecode/PlayroomLink";

export function DocCodeBlock({ files }: { files: RenderedFiles }) {
  const [fw, setFwGlobal] = useFw();
  const [jsonActive, setJsonActive] = useState(false);

  useEffect(() => { setJsonActive(false); }, [fw]);

  function handleFwChange(f: Framework) {
    setJsonActive(false);
    setFwGlobal(f);
  }

  const file = jsonActive && files.json ? files.json : files[fw];

  return (
    <div className="flex flex-col border border-border bg-card">
      <FwTabs
        fw={fw}
        setFw={handleFwChange}
        fileLabel={file.filename}
        hasJson={!!files.json}
        jsonActive={jsonActive}
        onJson={() => setJsonActive(true)}
      />
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
