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
 *
 * Token values can be:
 *   - a plain string           → mode-invariant, emitted in the light block
 *   - a { light, dark } pair   → light value in the light block, dark value
 *                                in the dark block (skipped if light === dark)
 * So one `tokens` object is the whole truth. No separate dark-override field.
 */

/** A value that differs between light and dark modes. */
export type ColorPair = { light: string; dark: string };

/** A single token value: either mode-invariant or a light/dark pair. */
export type TokenValue = string | ColorPair;

export type Tokens = Record<string, TokenValue>;

export type Theme = {
  /** Stable identifier. Written to `<html data-theme="…">` and localStorage. */
  name: string;
  /** Human-facing label shown in the picker. */
  label: string;
  /** Optional one-line description; emitted as a CSS comment. */
  description?: string;
  /**
   * Optional named palette. When present, tokens typically reference palette
   * entries by identity (`primary: palette.ink`). Exported on the Theme so
   * downstream code can introspect — e.g. `editorial.palette?.gold` — without
   * parsing CSS.
   */
  palette?: Record<string, TokenValue>;
  /** Structural tokens. Values may reference palette entries or be literals. */
  tokens: Tokens;
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
