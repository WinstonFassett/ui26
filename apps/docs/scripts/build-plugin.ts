#!/usr/bin/env tsx
/**
 * Generates a compiled CSS plugin from all registry *.tv.ts files.
 * Phase 1: walk TV configs, build @apply blocks
 * Phase 2: run through Tailwind compile API to emit real CSS
 * Output: apps/docs/registry/plugin/ui26.css
 *
 * Run: pnpm build:plugin
 */

import { readdirSync, writeFileSync, mkdirSync, readFileSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { compile } from "tailwindcss";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const REGISTRY = join(ROOT, "registry");
const GLOBAL_CSS = join(ROOT, "src", "styles", "global.css");
const OUT = join(REGISTRY, "plugin", "ui26.css");

const NAME_MAP: Record<string, string> = {
  button: "btn",
  badge: "badge",
  input: "input",
  textarea: "textarea",
  label: "label",
  checkbox: "checkbox",
  separator: "separator",
  skeleton: "skeleton",
  slider: "slider",
  toggle: "toggle",
  heading: "heading",
  switchRoot: "switch",
  switchThumb: "switch-thumb",
  card: "card",
  cardHeader: "card-header",
  cardTitle: "card-title",
  cardDescription: "card-description",
  cardContent: "card-content",
  cardFooter: "card-footer",
  alert: "alert",
  alertTitle: "alert-title",
  alertDescription: "alert-description",
  avatarRoot: "avatar",
  avatarImage: "avatar-image",
  avatarFallback: "avatar-fallback",
  accordionItem: "accordion-item",
  accordionTrigger: "accordion-trigger",
  accordionContent: "accordion-content",
  accordionContentInner: "accordion-content-inner",
  breadcrumb: "breadcrumb",
  breadcrumbList: "breadcrumb-list",
  breadcrumbItem: "breadcrumb-item",
  breadcrumbLink: "breadcrumb-link",
  breadcrumbPage: "breadcrumb-page",
  breadcrumbSeparator: "breadcrumb-separator",
  breadcrumbEllipsis: "breadcrumb-ellipsis",
  pagination: "pagination",
  paginationContent: "pagination-content",
  paginationItem: "pagination-item",
  paginationLink: "pagination-link",
  paginationEllipsis: "pagination-ellipsis",
  radioGroup: "radio-group",
  radioGroupItem: "radio-group-item",
  field: "field",
  fieldContent: "field-content",
  fieldLabel: "field-label",
  fieldDescription: "field-description",
  fieldError: "field-error",
  fieldGroup: "field-group",
  fieldSet: "field-set",
  fieldLegend: "field-legend",
  fieldTitle: "field-title",
  fieldSeparator: "field-separator",
  progressRoot: "progress",
  progressIndicator: "progress-indicator",
  tabsList: "tabs-list",
  tabsTrigger: "tabs-trigger",
  tabsContent: "tabs-content",
  dialogOverlay: "dialog-overlay",
  dialogContent: "dialog",
  dialogTitle: "dialog-title",
  dialogDescription: "dialog-description",
  popoverContent: "popover",
  tooltipContent: "tooltip",
  dropdownContent: "dropdown",
  dropdownItem: "dropdown-item",
  dropdownLabel: "dropdown-label",
  dropdownSeparator: "dropdown-separator",
  stack: "stack",
  grid: "grid-layout",
};

// @apply rejects named groups/peers/containers — strip them (they're context markers, no CSS output)
const APPLY_UNSUPPORTED = /^(group|peer|@container)\//;

function normalizeClasses(val: string | string[]): string {
  return (Array.isArray(val) ? val : [val])
    .flatMap((s) => s.split(/\s+/))
    .filter((c) => c && !APPLY_UNSUPPORTED.test(c))
    .join(" ");
}

type TVFunc = {
  base?: string | string[];
  variants?: Record<string, Record<string, string | string[]>>;
  defaultVariants?: Record<string, string>;
};

function findTvFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    // skip the plugin output dir itself
    if (entry.isDirectory() && entry.name !== "plugin") {
      results.push(...findTvFiles(full));
    } else if (entry.name.endsWith(".tv.ts")) {
      results.push(full);
    }
  }
  return results;
}

function resolvePackageCss(id: string, searchDirs: string[]): string | null {
  // Handle bare specifiers like 'tw-animate-css' or 'tailwindcss/theme.css'
  const [pkg, ...rest] = id.split("/");
  const subpath = rest.length ? rest.join("/") : null;

  for (const dir of searchDirs) {
    const pkgDir = join(dir, "node_modules", pkg);
    try {
      const pkgJson = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8"));
      if (subpath) {
        return resolve(pkgDir, subpath);
      }
      // No subpath — use main or style field
      const entry = pkgJson.main || pkgJson.style;
      if (entry) return resolve(pkgDir, entry);
    } catch {}
  }
  return null;
}

const SEARCH_DIRS = [ROOT, join(ROOT, "../..")];

async function loadStylesheet(id: string, base: string) {
  let path: string;
  if (id.startsWith(".") || id.startsWith("/")) {
    path = resolve(base, id);
  } else {
    const resolved = resolvePackageCss(id, SEARCH_DIRS);
    path = resolved ?? resolve(base, id);
  }
  const content = readFileSync(path, "utf8");
  return { content, base: dirname(path) };
}

async function loadModule() {
  return { module: {}, base: ROOT };
}

async function buildPlugin() {
  // Phase 1: walk TV configs → @apply blocks
  const tvFiles = findTvFiles(REGISTRY).sort();
  const applyBlocks: Record<string, string> = {};
  const skipped: string[] = [];

  for (const file of tvFiles) {
    const mod = await import(pathToFileURL(file).href);

    for (const [exportName, value] of Object.entries(mod)) {
      if (typeof value !== "function") continue;

      const className = NAME_MAP[exportName];
      if (!className) {
        skipped.push(exportName);
        continue;
      }

      const tv = value as unknown as TVFunc;

      // Merge only non-visual defaults (size/spacing) into base — not color variants.
      // Color variants must be applied explicitly (DaisyUI-style: btn btn-primary).
      const SIZE_KEYS = new Set(["size", "gap", "radius", "orientation"]);
      const defaultSizeClasses: string[] = [];
      if (tv.variants && tv.defaultVariants) {
        for (const [key, defaultVal] of Object.entries(tv.defaultVariants as Record<string, string>)) {
          if (!SIZE_KEYS.has(key)) continue;
          const variantClasses = tv.variants[key]?.[defaultVal];
          if (variantClasses) defaultSizeClasses.push(normalizeClasses(variantClasses));
        }
      }

      if (tv.base) {
        const base = normalizeClasses(tv.base);
        applyBlocks[`.${className}`] = defaultSizeClasses.length
          ? `${base} ${defaultSizeClasses.join(" ")}`
          : base;
      }

      if (tv.variants) {
        for (const [_key, values] of Object.entries(tv.variants)) {
          for (const [variantValue, classes] of Object.entries(values)) {
            const modKey = `.${className}-${variantValue}`;
            const existing = applyBlocks[modKey] ?? "";
            const next = normalizeClasses(classes);
            applyBlocks[modKey] = existing ? `${existing} ${next}` : next;
          }
        }
      }
    }
  }

  if (skipped.length) {
    console.warn("⚠️  No name mapping for:", skipped.join(", "));
  }

  // Phase 2: build input CSS using global.css as the theme source + our @apply blocks
  const globalCss = readFileSync(GLOBAL_CSS, "utf8");

  // Strip @import lines that reference non-existent paths in our codegen context
  // (e.g. starlight packages). We only need the @theme inline block.
  const themeBlock = globalCss.match(/@theme inline \{[\s\S]*?\n\}/)?.[0] ?? "";

  const rules = Object.entries(applyBlocks)
    .map(([cls, classes]) => `${cls} { @apply ${classes}; }`)
    .join("\n");

  const inputCss = [
    `@import 'tailwindcss/theme.css';`,
    `@import 'tw-animate-css';`,
    themeBlock,
    `@layer components {`,
    rules,
    `}`,
  ].join("\n\n");

  const result = await compile(inputCss, {
    base: ROOT,
    loadStylesheet,
    loadModule,
  });

  // build() with no candidates — we only want the @layer components output
  const compiled = result.build([]);

  // Strip the tailwindcss banner + theme reset, keep only our component rules
  const componentStart = compiled.indexOf("@layer components");
  const componentCss =
    componentStart !== -1
      ? compiled.slice(componentStart)
      : compiled;

  const output = `/* AUTO-GENERATED — do not edit. Run: pnpm build:plugin */\n${componentCss}`;

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, output, "utf8");
  console.log(`✅ Written to ${OUT}`);
  console.log(`   ${Object.keys(applyBlocks).length} component classes`);
}

buildPlugin().catch((e) => {
  console.error(e);
  process.exit(1);
});
