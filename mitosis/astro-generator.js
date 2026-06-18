const { parseJsx } = require('@builder.io/mitosis');
const fs = require('fs');
const path = require('path');

// Map state.x -> x, props.x -> x in expressions
function rewriteExpr(code) {
  return code
    .replace(/\bstate\./g, '')
    .replace(/\bprops\./g, '');
}

// Convert a binding key (onClick -> onclick for Astro script, class -> class:list candidate)
function attrName(key) {
  if (key === 'class') return 'class';
  if (key.startsWith('on')) return key.toLowerCase();
  return key;
}

function blockToAstro(node, indent = '', opts = {}) {
  if (!node) return '';

  // Text interpolation
  if (node.bindings?._text) {
    return `{${rewriteExpr(node.bindings._text.code)}}`;
  }
  if (node.properties?._text) {
    return node.properties._text;
  }

  // slot
  if (node.name === 'slot') {
    return `<slot />`;
  }

  // For loop — pass forItemName into children so they can reference the loop var
  if (node.name === 'For') {
    const each = rewriteExpr(node.bindings.each.code);
    const itemName = node.scope.forName;
    const childOpts = { ...opts, forItemName: itemName };
    const children = node.children.map(c => blockToAstro(c, indent + '  ', childOpts)).join('\n' + indent + '  ');
    return `{${each}.map((${itemName}) => (\n${indent}  ${children}\n${indent}))}`;
  }

  // Show
  if (node.name === 'Show') {
    const when = rewriteExpr(node.bindings.when.code);
    const children = node.children.map(c => blockToAstro(c, indent + '  ', opts)).join('\n' + indent + '  ');
    return `{${when} && (\n${indent}  ${children}\n${indent})}`;
  }

  // Fragment
  if (node.name === 'Fragment' || node.name === 'RootFragment') {
    return node.children.map(c => blockToAstro(c, indent, opts)).join('\n' + indent);
  }

  // Regular element
  let attrs = '';

  for (const [key, val] of Object.entries(node.properties || {})) {
    if (key.startsWith('_')) continue;
    attrs += ` ${key}="${val}"`;
  }

  // For role="tab", inject data-value={item.value} for the script to read.
  // Pass the for-scope item name down via the options context.
  if (node.properties?.role === 'tab' && opts?.forItemName) {
    attrs += ` data-value={${opts.forItemName}.value}`;
  }

  const hasEvents = Object.keys(node.bindings || {}).some(k => k.startsWith('on'));

  const booleanAttrs = new Set(['disabled', 'open', 'checked', 'readonly', 'required', 'multiple', 'hidden']);

  for (const [key, binding] of Object.entries(node.bindings || {})) {
    if (key === '_text' || key === 'ref' || key === 'css') continue;
    if (key.startsWith('on')) continue; // events go in <script>, not inline

    const expr = rewriteExpr(binding.code);

    // If expression references state vars (anything that was state.x), emit static default instead
    // because state is runtime-only and can't be used in Astro SSR template
    if (/\bactiveTab\b/.test(expr)) {
      // emit static default for state-dependent attrs; script will update them
      if (key === 'data-state') attrs += ` data-state="inactive"`;
      else if (key === 'aria-selected') attrs += ` aria-selected="false"`;
      // skip other state-dependent bindings in SSR template
      continue;
    }

    if (key === 'class') {
      attrs += ` class={${expr}}`;
    } else if (booleanAttrs.has(key)) {
      attrs += ` ${key}={${expr} || undefined}`;
    } else {
      attrs += ` ${key}={${expr}}`;
    }
  }

  // data-* and aria-* from bindings that Astro handles fine as expressions
  const selfClosing = ['input', 'img', 'br', 'hr', 'meta', 'link'].includes(node.name);
  const children = (node.children || []).map(c => blockToAstro(c, indent + '  ', opts)).join('\n' + indent + '  ');

  if (selfClosing && !children) {
    return `<${node.name}${attrs} />`;
  }

  if (!children) {
    return `<${node.name}${attrs}></${node.name}>`;
  }

  return `<${node.name}${attrs}>\n${indent}  ${children}\n${indent}</${node.name}>`;
}

function componentToAstro(component) {
  const { name, imports, state, children } = component;

  const hasState = Object.keys(state || {}).length > 0;
  const hasEvents = hasEventHandlers(children);

  // --- frontmatter ---
  const importLines = (imports || []).map(imp => {
    const names = Object.values(imp.imports).join(', ');
    return `import { ${names} } from '${imp.path}';`;
  });

  // Props interface — derive from state initial values and usage
  const propNames = collectProps(children);
  const propsDestructure = propNames.length > 0
    ? `const { ${propNames.map(p => p.name).join(', ')} } = Astro.props;`
    : `// no props`;

  const frontmatter = [
    ...importLines,
    '',
    `interface Props {`,
    ...propNames.map(p => `  ${p.name}${p.optional ? '?' : ''}: ${p.type};`),
    `}`,
    '',
    propsDestructure,
  ].join('\n');

  // template
  const template = children.map(c => blockToAstro(c)).join('\n');

  // script block for stateful components
  let scriptBlock = '';
  if (hasState && hasEvents) {
    scriptBlock = generateScript(component);
  }

  return [
    '---',
    frontmatter,
    '---',
    '',
    template,
    scriptBlock ? '' : '',
    scriptBlock,
  ].filter(l => l !== undefined).join('\n').trimEnd() + '\n';
}

// Walk nodes to collect props referenced as props.x
function collectProps(nodes, found = new Set()) {
  if (!nodes) return [];
  for (const node of nodes) {
    for (const binding of Object.values(node.bindings || {})) {
      const matches = (binding.code || '').matchAll(/props\.(\w+)/g);
      for (const m of matches) found.add(m[1]);
    }
    for (const val of Object.values(node.properties || {})) {
      // static properties don't reference props
    }
    collectProps(node.children || [], found);
  }
  return [...found].map(name => ({ name, optional: true, type: inferPropType(name) }));
}

function inferPropType(name) {
  if (name === 'variant' || name === 'size') return 'string';
  if (name === 'disabled') return 'boolean';
  if (name === 'type') return 'string';
  if (name === 'active') return 'boolean';
  if (name === 'open') return 'boolean';
  if (name === 'triggers' || name === 'tabs') return 'any[]';
  if (name === 'defaultValue') return 'string';
  return 'any';
}

function hasEventHandlers(nodes) {
  if (!nodes) return false;
  for (const node of nodes) {
    if (Object.keys(node.bindings || {}).some(k => k.startsWith('on'))) return true;
    if (hasEventHandlers(node.children)) return true;
  }
  return false;
}

// Collect all event bindings: { node, event, handlerCode, forScope }
function collectEvents(nodes, events = [], forScope = null) {
  if (!nodes) return events;
  for (const node of nodes) {
    const scope = node.scope?.forName || forScope;
    for (const [key, binding] of Object.entries(node.bindings || {})) {
      if (key.startsWith('on')) {
        events.push({
          element: node.name,
          event: key.slice(2).toLowerCase(),
          handler: rewriteExpr(binding.code),
          role: node.properties?.role,
          forScope: scope,
        });
      }
    }
    collectEvents(node.children || [], events, scope);
  }
  return events;
}

function generateScript(component) {
  const { state } = component;

  // State vars that reference props can't use props directly in <script> (SSR boundary).
  // Use DOM-readable defaults instead (first active tab, etc.)
  const stateVars = Object.entries(state || {})
    .filter(([, v]) => v.type === 'property')
    .map(([k, v]) => {
      const expr = rewriteExpr(v.code);
      // If it references props (triggers, defaultValue etc), derive from DOM instead
      if (/\btriggers\b|\bdefaultValue\b|\btabs\b/.test(expr)) {
        return `  let ${k} = document.querySelector('[role="tab"]')?.dataset.value ?? '';`;
      }
      return `  let ${k} = ${expr};`;
    })
    .join('\n');

  const methods = Object.entries(state || {})
    .filter(([, v]) => v.type === 'method')
    .map(([, v]) => `  function ${rewriteExpr(v.code)}`)
    .join('\n');

  const events = collectEvents(component.children);
  const wiringLines = [];

  for (const ev of events) {
    if (ev.role === 'tab' && ev.event === 'click') {
      // Tabs pattern: delegate on tablist, derive value from data-value or button index
      wiringLines.push(
        `  document.querySelectorAll('[role="tablist"] [role="tab"]').forEach(btn => {`,
        `    btn.addEventListener('click', () => {`,
        `      const value = btn.dataset.value ?? btn.textContent?.trim() ?? '';`,
        `      activate(value);`,
        `      document.querySelectorAll('[role="tab"]').forEach(b => {`,
        `        const active = b === btn;`,
        `        b.setAttribute('data-state', active ? 'active' : 'inactive');`,
        `        b.setAttribute('aria-selected', String(active));`,
        `      });`,
        `      document.querySelectorAll('[role="tabpanel"]').forEach(panel => {`,
        `        panel.hidden = panel.dataset.value !== value;`,
        `      });`,
        `    });`,
        `  });`,
      );
    } else {
      wiringLines.push(`  // unhandled: ${ev.element}[${ev.event}] -> ${ev.handler}`);
    }
  }

  const parts = [stateVars, methods, wiringLines.join('\n')].filter(Boolean);
  return `<script>\n${parts.join('\n')}\n</script>`;
}

// --- Build runner ---
function build() {
  const srcDir = path.join(__dirname, 'src');
  const outDir = path.join(__dirname, 'output/astro/src');
  fs.mkdirSync(outDir, { recursive: true });

  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.lite.tsx'));
  let count = 0;

  for (const file of files) {
    const src = fs.readFileSync(path.join(srcDir, file), 'utf8');
    try {
      const component = parseJsx(src);
      const astroSrc = componentToAstro(component);
      const outName = file.replace('.lite.tsx', '.astro');
      fs.writeFileSync(path.join(outDir, outName), astroSrc);
      count++;
    } catch (e) {
      console.error(`Error processing ${file}:`, e.message);
    }
  }

  console.log(`Astro: generated ${count} components.`);
}

build();
