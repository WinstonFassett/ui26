import { useEffect, useMemo, useRef, useState } from "react";
import CodeMirror, { oneDark } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { snippets, defaultSnippet } from "./snippets";
import { readFromHash, writeToHash } from "./url-state";

const WIDTHS = [360, 768, 1280] as const;
type Width = (typeof WIDTHS)[number];
type Theme = "light" | "dark";

const PREVIEW_URL = "/playroom/preview";

function postCode(frame: HTMLIFrameElement | null | undefined, code: string, theme: Theme) {
  frame?.contentWindow?.postMessage({ type: "code", code, theme }, "*");
}

function GearIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path
        d="M7.5 5.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM1 7.5a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0zm6.5-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
      <path
        d="M6.268 1.222a.5.5 0 0 1 .965 0l.287 1.006a5.52 5.52 0 0 1 1.3.537l.96-.46a.5.5 0 0 1 .607.153l.683.683a.5.5 0 0 1 .153.607l-.46.96c.22.404.396.832.537 1.3l1.006.287a.5.5 0 0 1 0 .965l-1.006.287a5.52 5.52 0 0 1-.537 1.3l.46.96a.5.5 0 0 1-.153.607l-.683.683a.5.5 0 0 1-.607.153l-.96-.46a5.52 5.52 0 0 1-1.3.537l-.287 1.006a.5.5 0 0 1-.965 0l-.287-1.006a5.52 5.52 0 0 1-1.3-.537l-.96.46a.5.5 0 0 1-.607-.153l-.683-.683a.5.5 0 0 1-.153-.607l.46-.96a5.52 5.52 0 0 1-.537-1.3L1.222 8.232a.5.5 0 0 1 0-.965l1.006-.287a5.52 5.52 0 0 1 .537-1.3l-.46-.96a.5.5 0 0 1 .153-.607l.683-.683a.5.5 0 0 1 .607-.153l.96.46a5.52 5.52 0 0 1 1.3-.537L6.268 1.222z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Chrome() {
  const [code, setCode] = useState<string>(() => readFromHash() ?? defaultSnippet);
  const [widths, setWidths] = useState<Width[]>([768]);
  const [themes, setThemes] = useState<Theme[]>(["dark"]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const iframesRef = useRef<Map<string, HTMLIFrameElement>>(new Map());
  const codeRef = useRef(code);
  const settingsRef = useRef<HTMLDivElement>(null);
  codeRef.current = code;

  useEffect(() => {
    const t = setTimeout(() => writeToHash(code), 200);
    return () => clearTimeout(t);
  }, [code]);

  useEffect(() => {
    for (const [key, frame] of iframesRef.current.entries()) {
      const theme = key.split(":")[1] as Theme;
      postCode(frame, code, theme);
    }
  }, [code]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!event.data || event.data.type !== "ready") return;
      for (const [key, frame] of iframesRef.current.entries()) {
        if (frame.contentWindow === event.source) {
          const theme = key.split(":")[1] as Theme;
          postCode(frame, codeRef.current, theme);
        }
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (!settingsOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [settingsOpen]);

  const cells = useMemo(() => {
    const out: { key: string; w: Width; t: Theme }[] = [];
    for (const t of themes) for (const w of widths) out.push({ key: `${w}:${t}`, w, t });
    return out;
  }, [widths, themes]);

  const snippetOnPick = (name: string) => {
    const s = snippets.find((s) => s.name === name);
    if (s) setCode(s.code);
  };

  return (
    <div className="playroom-root">
      <header className="playroom-header">
        <strong className="playroom-title">ui26</strong>
        <select
          className="playroom-select"
          value=""
          onChange={(e) => {
            if (e.target.value) snippetOnPick(e.target.value);
            e.target.value = "";
          }}
        >
          <option value="">Load snippet…</option>
          {snippets.map((s) => (
            <option key={s.name} value={s.name}>
              {s.group} / {s.name}
            </option>
          ))}
        </select>

        <div className="playroom-header-spacer" />

        <div className="playroom-settings-anchor" ref={settingsRef}>
          <button
            className="playroom-settings-btn"
            aria-label="Settings"
            aria-expanded={settingsOpen}
            onClick={() => setSettingsOpen((v) => !v)}
          >
            <GearIcon />
          </button>

          {settingsOpen && (
            <div className="playroom-settings-panel">
              <div className="playroom-settings-section">
                <div className="playroom-settings-label">Viewports</div>
                <div className="playroom-settings-chips">
                  {WIDTHS.map((w) => (
                    <label key={w} className="playroom-chip">
                      <input
                        type="checkbox"
                        checked={widths.includes(w)}
                        onChange={(e) =>
                          setWidths((prev) =>
                            e.target.checked
                              ? ([...prev, w].sort((a, b) => a - b) as Width[])
                              : prev.filter((x) => x !== w),
                          )
                        }
                      />
                      {w}px
                    </label>
                  ))}
                </div>
              </div>

              <div className="playroom-settings-section">
                <div className="playroom-settings-label">Themes</div>
                <div className="playroom-settings-chips">
                  {(["light", "dark"] as const).map((t) => (
                    <label key={t} className="playroom-chip">
                      <input
                        type="checkbox"
                        checked={themes.includes(t)}
                        onChange={(e) =>
                          setThemes((prev) =>
                            e.target.checked
                              ? ([...prev, t] as Theme[])
                              : prev.filter((x) => x !== t),
                          )
                        }
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="playroom-body">
        <div className="playroom-editor">
          <CodeMirror
            value={code}
            height="100%"
            style={{ height: "100%" }}
            theme={oneDark}
            extensions={[javascript({ jsx: true, typescript: true })]}
            onChange={setCode}
          />
        </div>
        <div className="playroom-previews">
          {cells.map(({ key, w, t }) => (
            <div key={key} className="playroom-cell">
              <div className="playroom-cell-label">
                {w}px · {t}
              </div>
              <iframe
                ref={(el) => {
                  if (el) iframesRef.current.set(key, el);
                  else iframesRef.current.delete(key);
                }}
                src={PREVIEW_URL}
                onLoad={(e) => {
                  postCode(e.currentTarget, codeRef.current, t);
                }}
                style={{ width: w }}
                className="playroom-iframe"
                title={`${w}px ${t}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
