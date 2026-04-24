/*
 * ui26 theme collection.
 *
 * Each theme is its own file under ./themes/. Themes are plain data objects —
 * the registry ships dumb, copy-pasteable code. Adding a theme = drop a file
 * under ./themes/ and add one import line below.
 *
 * Consumers:
 *   - ThemeProvider.astro       — uses `themes` for the pre-paint allowlist
 *   - theme-picker.tsx          — uses `themes` for options + labels
 *   - scripts/build-tokens.ts   — emits registry/tokens.css from `themes`
 *   - pages/r/base.json.ts      — serves the shadcn-registry payload
 *
 * The first entry is the default theme — its light block doubles as `:root`
 * in the generated CSS so documents without a `data-theme` attribute render
 * correctly.
 */

export type Tokens = Record<string, string>;

export type Theme = {
  /** Stable identifier. Written to `<html data-theme="…">` and localStorage. */
  name: string;
  /** Human-facing label shown in the picker. */
  label: string;
  /** Optional one-line description; emitted as a CSS comment. */
  description?: string;
  /** Light palette + typography + shadow vocabulary. Default when `data-theme="<name>"`. */
  tokens: Tokens;
  /** Dark overrides — only keys that differ from `tokens` need to be listed. Cascades from the light block. */
  dark?: Tokens;
};

import editorial from './themes/editorial';
import tix from './themes/tix';
import shad from './themes/shad';
import linear from './themes/linear';
import brutalist from './themes/brutalist';

export const themes: readonly Theme[] = [
  editorial,
  tix,
  shad,
  linear,
  brutalist,
];
