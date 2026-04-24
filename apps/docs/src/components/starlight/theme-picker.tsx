import { Laptop, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { themes } from "@registry/themes";

type Mode = "light" | "dark" | "auto";

declare global {
  interface Window {
    Ui26Theme: {
      THEMES: readonly string[];
      MODES: readonly Mode[];
      getName(): string;
      getMode(): Mode;
      setName(name: string): void;
      setMode(mode: Mode): void;
      subscribe(fn: (name: string, mode: Mode) => void): () => void;
    };
  }
}

const MODE_ICONS: Record<Mode, typeof Sun> = {
  light: Sun,
  dark: Moon,
  auto: Laptop,
};

const MODES: readonly Mode[] = ["light", "dark", "auto"];
const DEFAULT_NAME = themes[0]?.name ?? "editorial";

export function ThemePicker() {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  const [mode, setMode] = useState<Mode>("auto");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.Ui26Theme) return;
    setName(window.Ui26Theme.getName());
    setMode(window.Ui26Theme.getMode());
    setMounted(true);
    return window.Ui26Theme.subscribe((n, m) => {
      setName(n);
      setMode(m);
    });
  }, []);

  return (
    <div className="ui26-theme-picker flex items-center gap-2">
      <select
        aria-label="Select theme"
        className="rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground"
        onChange={(e) => window.Ui26Theme?.setName(e.target.value)}
        value={name}
      >
        {themes.map((t) => (
          <option key={t.name} value={t.name}>
            {t.label}
          </option>
        ))}
      </select>
      <div
        aria-label="Select mode"
        className="flex items-center rounded-md border border-border bg-background p-0.5"
        role="group"
      >
        {MODES.map((m) => {
          const Icon = MODE_ICONS[m];
          const active = mounted && mode === m;
          return (
            <button
              aria-label={m}
              aria-pressed={active}
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-sm transition-colors",
                active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              key={m}
              onClick={() => window.Ui26Theme?.setMode(m)}
              type="button"
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
