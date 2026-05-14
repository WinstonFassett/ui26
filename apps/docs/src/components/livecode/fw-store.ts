import { useEffect, useState } from "react";
import type { Framework } from "@/lib/spec-to-code";

const KEY = "ui26-framework";
const listeners = new Set<(fw: Framework) => void>();

function isFramework(v: unknown): v is Framework {
  return v === "react" || v === "svelte" || v === "astro" || v === "json-render";
}

export function getFw(): Framework {
  if (typeof localStorage === "undefined") return "react";
  const v = localStorage.getItem(KEY);
  return isFramework(v) ? v : "react";
}

export function setFw(fw: Framework) {
  if (typeof localStorage !== "undefined") localStorage.setItem(KEY, fw);
  listeners.forEach((l) => l(fw));
}

export function subscribe(listener: (fw: Framework) => void) {
  listeners.add(listener);
  if (typeof window !== "undefined") {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && isFramework(e.newValue)) listener(e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }
  return () => {
    listeners.delete(listener);
  };
}

/** SSR-safe hook: reads default 'react' on server, syncs from localStorage on mount, subscribes to changes. */
export function useFw(): [Framework, (fw: Framework) => void] {
  const [fw, setLocal] = useState<Framework>("react");

  useEffect(() => {
    setLocal(getFw());
    return subscribe(setLocal);
  }, []);

  return [fw, setFw];
}
