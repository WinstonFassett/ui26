import { useEffect, useState } from "react";
import type { Framework } from "@/lib/spec-to-code";

const KEY = "ui26-framework";
const listeners = new Set<(fw: Framework) => void>();
const jsonListeners = new Set<(active: boolean) => void>();

let _jsonActive = false;

function isFramework(v: unknown): v is Framework {
  return v === "react" || v === "svelte" || v === "astro";
}

export function getFw(): Framework {
  if (typeof localStorage === "undefined") return "react";
  const v = localStorage.getItem(KEY);
  return isFramework(v) ? v : "react";
}

export function setFw(fw: Framework) {
  if (typeof localStorage !== "undefined") localStorage.setItem(KEY, fw);
  listeners.forEach((l) => l(fw));
  // switching framework deactivates JSON
  if (_jsonActive) setJsonActive(false);
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

export function setJsonActive(active: boolean) {
  _jsonActive = active;
  jsonListeners.forEach((l) => l(active));
}

export function subscribeJson(listener: (active: boolean) => void) {
  jsonListeners.add(listener);
  return () => { jsonListeners.delete(listener); };
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

export function useJsonActive(): [boolean, (active: boolean) => void] {
  const [active, setLocal] = useState(false);

  useEffect(() => {
    setLocal(_jsonActive);
    return subscribeJson(setLocal);
  }, []);

  return [active, setJsonActive];
}
