// lz-string ships as CommonJS; default-import + property access works in both
// Vite client builds and Astro's SSR module runner (named imports break SSR).
import lzString from "lz-string";

export function encode(code: string): string {
  return lzString.compressToEncodedURIComponent(code);
}

export function decode(hash: string): string | null {
  if (!hash) return null;
  const trimmed = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!trimmed) return null;
  try {
    return lzString.decompressFromEncodedURIComponent(trimmed) || null;
  } catch {
    return null;
  }
}

export function readFromHash(): string | null {
  if (typeof window === "undefined") return null;
  return decode(window.location.hash);
}

export function writeToHash(code: string) {
  if (typeof window === "undefined") return;
  const next = "#" + encode(code);
  if (window.location.hash !== next) {
    history.replaceState(null, "", next);
  }
}
