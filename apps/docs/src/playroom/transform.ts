import { transform } from "sucrase";

export type CompileResult =
  | { ok: true; factory: (scope: Record<string, unknown>) => unknown }
  | { ok: false; error: string };

export function compile(source: string): CompileResult {
  let js: string;
  try {
    const result = transform(source, {
      transforms: ["typescript", "jsx", "imports"],
      jsxRuntime: "classic",
      production: true,
    });
    js = result.code;
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }

  const body = `
    "use strict";
    const module = { exports: {} };
    const exports = module.exports;
    const require = (id) => {
      if (Object.prototype.hasOwnProperty.call(__scope, id)) return __scope[id];
      throw new Error("Playroom: unknown module '" + id + "'");
    };
    const React = require("react").default ?? require("react");
    ${js}
    // Pick the entry component:
    //   1. default export if set
    //   2. otherwise the lone named function export (covers \`export function Demo()\`)
    //   3. otherwise the whole exports object (caller decides)
    const exp = module.exports;
    if (exp.default !== undefined) return exp.default;
    const fnKeys = Object.keys(exp).filter((k) => typeof exp[k] === "function");
    if (fnKeys.length === 1) return exp[fnKeys[0]];
    return exp;
  `;

  let fn: (scope: Record<string, unknown>) => unknown;
  try {
    fn = new Function("__scope", body) as typeof fn;
  } catch (err) {
    return { ok: false, error: "Compile failed: " + (err as Error).message };
  }

  return {
    ok: true,
    factory: (scope) => fn(scope),
  };
}
