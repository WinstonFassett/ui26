#!/usr/bin/env node
const { spawnSync } = require("node:child_process");
const { readFileSync } = require("node:fs");
const path = require("node:path");

const DEFAULT_REGISTRY = "https://ui26.dev";
const registry = (process.env.UI26_REGISTRY || DEFAULT_REGISTRY).replace(/\/$/, "");

function detectFramework() {
  if (process.env.UI26_FRAMEWORK) return process.env.UI26_FRAMEWORK;
  try {
    const pkg = JSON.parse(readFileSync(path.resolve("package.json"), "utf8"));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    if (deps.astro) return "astro";
    if (deps.svelte || deps["@sveltejs/kit"]) return "svelte";
    if (deps.react) return "react";
  } catch {}
  return null;
}

function usage() {
  console.error("Usage: ui26 add <component> [<component> ...]");
  console.error("Env:   UI26_REGISTRY (default https://ui26.dev)");
  console.error("       UI26_FRAMEWORK  (auto-detected from package.json)");
  process.exit(1);
}

const [cmd, ...rest] = process.argv.slice(2);
if (cmd !== "add" || rest.length === 0) usage();

const flags = rest.filter((a) => a.startsWith("-"));
const names = rest.filter((a) => !a.startsWith("-"));
if (names.length === 0) usage();

const fw = detectFramework();
if (!fw) {
  console.error("Could not detect framework. Set UI26_FRAMEWORK=react|svelte|astro");
  process.exit(1);
}

const urls = names.map((n) => `${registry}/r/${fw}/${n}.json`);
const installer = fw === "svelte" ? "shadcn-svelte@latest" : "shadcn@latest";
const result = spawnSync("npx", ["-y", installer, "add", ...flags, ...urls], {
  stdio: "inherit",
});
process.exit(result.status ?? 0);
