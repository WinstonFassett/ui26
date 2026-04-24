/*
 * Emits apps/docs/registry/tokens.css from the theme barrel.
 *
 * Run via `pnpm build:tokens` (also wired into `predev` and `prebuild`).
 * Run with `tsx` so bundler-style extensionless imports resolve.
 *
 * First theme in the barrel doubles as `:root` so elements without a
 * `data-theme` attribute render with the default palette.
 *
 * Each theme has one `tokens` object. Scalar string values go in the light
 * block only; { light, dark } pairs split across light and dark blocks.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { themes, type ColorPair, type Theme, type TokenValue, type Tokens } from '../registry/themes';

const OUT_URL = new URL('../registry/tokens.css', import.meta.url);

const HEADER = `/* ui26 design tokens — GENERATED from registry/themes/*.ts.
 *
 * Do not edit by hand. Run \`pnpm build:tokens\` in apps/docs to regenerate,
 * or edit a theme file under registry/themes/ and save. The barrel at
 * registry/themes.ts lists which themes are active.
 *
 * Themes are compound keys on \`<html data-theme>\`:
 *   (none) / "<first-theme>"  → default light (matches \`:root\`)
 *   "<name>"                   → that theme's light block
 *   "<name>-dark"              → that theme's dark overrides (cascades from light)
 */
`;

function isColorPair(value: TokenValue): value is ColorPair {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as ColorPair).light === 'string' &&
    typeof (value as ColorPair).dark === 'string'
  );
}

function splitTokens(tokens: Tokens): {
  light: Record<string, string>;
  dark: Record<string, string>;
} {
  const light: Record<string, string> = {};
  const dark: Record<string, string> = {};
  for (const [key, value] of Object.entries(tokens)) {
    if (isColorPair(value)) {
      light[key] = value.light;
      if (value.dark !== value.light) dark[key] = value.dark;
    } else {
      light[key] = value;
    }
  }
  return { light, dark };
}

function emitVars(vars: Record<string, string>, indent = '  '): string {
  return Object.entries(vars)
    .map(([key, value]) => `${indent}--${key}: ${value};`)
    .join('\n');
}

function emitTheme(theme: Theme, isDefault: boolean): string {
  const { light, dark } = splitTokens(theme.tokens);
  const parts: string[] = [];

  if (theme.description) {
    parts.push(`/* ${theme.name} — ${theme.description} */`);
  }

  const lightSelector = isDefault
    ? `:root,\n[data-theme="${theme.name}"]`
    : `[data-theme="${theme.name}"]`;

  parts.push(`${lightSelector} {\n${emitVars(light)}\n}`);

  if (Object.keys(dark).length > 0) {
    parts.push(`[data-theme="${theme.name}-dark"] {\n${emitVars(dark)}\n}`);
  }

  return parts.join('\n\n');
}

async function main() {
  const blocks = themes.map((theme, i) => emitTheme(theme, i === 0));
  const css = `${HEADER}\n${blocks.join('\n\n')}\n`;
  await writeFile(fileURLToPath(OUT_URL), css, 'utf8');
  console.log(`wrote ${fileURLToPath(OUT_URL)} (${themes.length} themes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
