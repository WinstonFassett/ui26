import { test } from "node:test";
import { strict as assert } from "node:assert";
import { compile } from "./transform.ts";

// Stub React namespace — just enough to let React.createElement return a tagged object.
const React = {
  createElement: (type, props, ...children) => ({ type, props, children }),
  Fragment: Symbol("Fragment"),
  useState: (initial) => [initial, () => {}],
};
const scope = {
  react: { ...React, default: React },
  "@tvui/react": {
    Button: function Button(props) {
      return React.createElement("button", props, ...(props?.children ? [props.children] : []));
    },
  },
};

test("compiles simple JSX snippet with default export", () => {
  const src = `
    import { Button } from "@tvui/react";
    export default function App() {
      return <Button>Click</Button>;
    }
  `;
  const r = compile(src);
  assert.equal(r.ok, true);
  if (!r.ok) return;
  const App = r.factory(scope);
  assert.equal(typeof App, "function");
  const tree = App();
  assert.equal(tree.type.name, "Button");
});

test("compiles snippet using useState from react", () => {
  const src = `
    import { useState } from "react";
    export default function App() {
      const [n] = useState(7);
      return <span>{n}</span>;
    }
  `;
  const r = compile(src);
  assert.equal(r.ok, true);
  if (!r.ok) return;
  const App = r.factory(scope);
  const tree = App();
  assert.equal(tree.type, "span");
});

test("rejects unknown module at runtime", () => {
  const src = `
    import { Nope } from "no-such-module";
    export default function App() { return <Nope />; }
  `;
  const r = compile(src);
  assert.equal(r.ok, true);
  if (!r.ok) return;
  assert.throws(() => r.factory(scope), /unknown module/);
});

test("returns error object on syntax error", () => {
  const src = `export default function App( { return <div />; }`;
  const r = compile(src);
  assert.equal(r.ok, false);
});

test("strips TS types", () => {
  const src = `
    import { Button } from "@tvui/react";
    type X = { a: number };
    export default function App(): JSX.Element {
      const x: X = { a: 1 };
      return <Button>{x.a}</Button>;
    }
  `;
  const r = compile(src);
  assert.equal(r.ok, true);
});
