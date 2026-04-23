import { useEffect, useMemo, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
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

export function Chrome() {
  const [code, setCode] = useState<string>(() => readFromHash() ?? defaultSnippet);
  const [widths, setWidths] = useState<Width[]>([...WIDTHS]);
  const [themes, setThemes] = useState<Theme[]>(["light", "dark"]);
  const iframesRef = useRef<Map<string, HTMLIFrameElement>>(new Map());
  const codeRef = useRef(code);
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
        <strong>ui26 playroom</strong>
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
        <div className="playroom-chips">
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
        <div className="playroom-chips">
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
      </header>

      <div className="playroom-body">
        <div className="playroom-editor">
          <CodeMirror
            value={code}
            height="100%"
            style={{ height: "100%" }}
            theme="dark"
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
