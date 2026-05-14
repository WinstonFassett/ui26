import type { Framework } from "@/lib/spec-to-code";
import type { RenderedFiles } from "@/lib/prerender-source";
import { SHIKI_CLASSES } from "@/lib/shiki-classes";
import { cn } from "@/lib/utils";
import { CopyBtn } from "./CopyBtn";
import { FwTabs } from "./FwTabs";
import { PlayroomLink } from "./PlayroomLink";

export interface SourcePaneRegion {
  id: string;
  label: string;
  section: string;
  files: RenderedFiles;
}

export function SourcePane({
  region,
  fw,
  setFw,
  onClose,
  hideHeader,
  className,
}: {
  region: SourcePaneRegion;
  fw: Framework;
  setFw: (fw: Framework) => void;
  onClose?: () => void;
  hideHeader?: boolean;
  className?: string;
}) {
  const file = region.files[fw];

  return (
    <div
      className={cn(
        "flex flex-col bg-card border border-border h-full",
        className
      )}
    >
      {!hideHeader && (
        <div className="flex items-center gap-2 px-3.5 py-3 border-b border-border">
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[9px] uppercase tracking-widest text-accent mb-0.5">
              {region.section}
            </div>
            <div className="text-[13px] font-semibold text-foreground truncate">
              {region.label}
            </div>
          </div>
          <CopyBtn text={file.code} />
          {onClose && (
            <button
              type="button"
              aria-label="Close source panel"
              onClick={onClose}
              className="ks-rail-close inline-flex items-center justify-center w-7 h-7 border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/40"
            >
              ✕
            </button>
          )}
        </div>
      )}

      <FwTabs fw={fw} setFw={setFw} fileLabel={file.filename} />

      <div
        className={cn(SHIKI_CLASSES)}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: pre-rendered by server-side shiki at build time
        dangerouslySetInnerHTML={{ __html: file.html }}
      />

      <div className="flex items-center justify-between px-3.5 py-2 border-t border-border bg-card">
        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          ui26/{fw}
        </span>
        <div className="flex items-center gap-2">
          {hideHeader && <CopyBtn text={file.code} />}
          <PlayroomLink code={region.files.react.code} />
        </div>
      </div>
    </div>
  );
}
