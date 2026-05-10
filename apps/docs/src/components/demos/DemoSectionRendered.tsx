"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { RenderedFiles } from "@/lib/prerender-source";
import { useFw } from "@/components/livecode/fw-store";
import { FwTabs } from "@/components/livecode/FwTabs";
import { CopyBtn } from "@/components/livecode/CopyBtn";
import { PlayroomLink } from "@/components/livecode/PlayroomLink";
import { TILE_REGISTRY } from "./tile-registry";

interface RenderedDemo {
  id: string;
  label: string;
  files: RenderedFiles;
}

function DemoTile({
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
  );
}

const SHIKI_CLASSES = cn(
  "flex-1 overflow-auto bg-muted/40 px-4 py-3.5",
  "[&_.shiki]:bg-transparent! [&_pre]:m-0! [&_pre]:p-0! [&_code]:text-[12px]! [&_code]:leading-[1.6]! [&_code]:font-mono",
  "dark:[&_.shiki]:text-[var(--shiki-dark)]!",
  "dark:[&_.shiki_span]:text-[var(--shiki-dark)]!",
  "dark:[&_.shiki_span]:[font-style:var(--shiki-dark-font-style)]!",
  "dark:[&_.shiki_span]:[font-weight:var(--shiki-dark-font-weight)]!",
  "dark:[&_.shiki_span]:[text-decoration:var(--shiki-dark-text-decoration)]!"
);

export function DemoSectionRendered({
  title,
  relatedComponent,
  group,
  demos,
}: {
  title: string;
  relatedComponent: string;
  group: string;
  demos: RenderedDemo[];
}) {
  const [selected, setSelected] = useState(demos[0]);
  const [fw, setFw] = useFw();
  if (!demos.length) return null;

  const file = selected.files[fw];
  const renderTile = TILE_REGISTRY[relatedComponent]?.[group];

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
            {renderTile ? renderTile(demo) : <span className="text-sm">{demo.label}</span>}
          </DemoTile>
        ))}
      </div>
      <div className="mt-4 flex flex-col border border-border bg-card">
        <FwTabs fw={fw} setFw={setFw} fileLabel={file.filename} />
        <div
          className={SHIKI_CLASSES}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: pre-rendered by server-side shiki at build time
          dangerouslySetInnerHTML={{ __html: file.html }}
        />
        <div className="flex items-center justify-between px-3.5 py-2 border-t border-border">
          <CopyBtn text={file.code} />
          <PlayroomLink code={selected.files.react.code} />
        </div>
      </div>
    </div>
  );
}
