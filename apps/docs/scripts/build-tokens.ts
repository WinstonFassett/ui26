/*
 * Emits apps/docs/registry/tokens.css from the theme barrel.
 *
 * Run via `pnpm build:tokens` (also wired into `predev` and `prebuild`).
 * Run with `tsx` so bundler-style extensionless imports resolve.
 *
 * First theme in the barrel doubles as `:root` so elements without a
 * `data-theme` attribute render with the default palette.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { themes, type Theme, type Tokens } from '../registry/themes';

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

function emitVars(tokens: Tokens, indent = '  '): string {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(tokens)) {
    lines.push(`${indent}--${key}: ${value};`);
  }
  return lines.join('\n');
}

function emitTheme(theme: Theme, isDefault: boolean): string {
  const parts: string[] = [];

  if (theme.description) {
    parts.push(`/* ${theme.name} — ${theme.description} */`);
  }

  const lightSelector = isDefault
    ? `:root,\n[data-theme="${theme.name}"]`
    : `[data-theme="${theme.name}"]`;

  parts.push(`${lightSelector} {\n${emitVars(theme.tokens)}\n}`);

  if (theme.dark && Object.keys(theme.dark).length > 0) {
    parts.push(`[data-theme="${theme.name}-dark"] {\n${emitVars(theme.dark)}\n}`);
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
