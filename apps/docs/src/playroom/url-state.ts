import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";

export function encode(code: string): string {
  return compressToEncodedURIComponent(code);
}

export function decode(hash: string): string | null {
  if (!hash) return null;
  const trimmed = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!trimmed) return null;
  try {
    return decompressFromEncodedURIComponent(trimmed) || null;
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
