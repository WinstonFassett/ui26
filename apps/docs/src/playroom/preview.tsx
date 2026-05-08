import { useEffect, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { compile } from "./transform";
import { moduleScope } from "./namespace";

type Msg =
  | { type: "code"; code: string; themeName: string; mode: "light" | "dark" }
  | { type: "ready" };

export function Preview() {
  const hostRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<Root | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hostRef.current) return;
    const root = createRoot(hostRef.current);
    rootRef.current = root;

    const render = (code: string) => {
      const result = compile(code);
      if (!result.ok) {
        setError(result.error);
        root.render(null);
        return;
      }
      try {
        const exported = result.factory(moduleScope);
        const Component: React.ComponentType =
          typeof exported === "function"
            ? (exported as React.ComponentType)
            : () => exported as React.ReactNode;
        setError(null);
        root.render(<Component />);
      } catch (err) {
        setError((err as Error).message);
        root.render(null);
      }
    };

    const onMessage = (event: MessageEvent<Msg>) => {
      const msg = event.data;
      if (!msg || typeof msg !== "object") return;
      if (msg.type === "code") {
        document.documentElement.dataset.theme =
          msg.mode === "dark" ? `${msg.themeName}-dark` : msg.themeName;
        render(msg.code);
      }
    };

    window.addEventListener("message", onMessage);
    window.parent.postMessage({ type: "ready" } satisfies Msg, "*");

    return () => {
      window.removeEventListener("message", onMessage);
      root.unmount();
    };
  }, []);

  return (
    <>
      <div ref={hostRef} />
      {error && (
        <pre className="fixed inset-x-0 bottom-0 m-0 max-h-1/2 overflow-auto border-t border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
          {error}
        </pre>
      )}
    </>
  );
}
