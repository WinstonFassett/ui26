# Product

## Register

brand

## Users

Frontend developers who write TypeScript daily. They work across React, Svelte, and Astro. They are skeptical of bloat, opinionated about ownership, and already know what shadcn is. They want primitives that don't impose a runtime or aesthetic lock-in. They're reading docs at a desk, probably in a dark terminal environment, comparing options between projects.

## Product Purpose

ui26 is a cross-framework UI component library. Source-distributed — consumers own the code, shadcn-style, via `npx @winstonfassett/ui26 add <component>`. Components are built with tailwind-variants and ship with one theme config, three framework wrappers (React/Svelte/Astro). The docs site doubles as the registry server.

Success looks like: a developer installs a component, understands the theming system immediately, and never has to think about ui26 again — the component is just theirs.

## Brand Personality

Technical precision. Quiet confidence. No ceremony.

The brand doesn't shout. It demonstrates. Copy is short, declarative, and assumes the reader is competent. No exclamation marks. No "powerful" or "beautiful." Just what it does and how.

## Anti-references

- Shadcn's marketing site — too much copy, too much explanation of obvious things
- Generic SaaS component library landing pages (large gradient cards, hero metrics, "join 10,000 developers" social proof)
- Storybook docs aesthetic — clinical, grey, form-over-function
- Any site that uses gradient text, glassmorphism, or identical card grids

## Design Principles

1. **Practice what you preach.** The design system docs should use the design system's own aesthetic. The site is a live demo of what ui26 produces.
2. **Show, don't tell.** Interactive component previews before prose descriptions. Code before marketing.
3. **Expert confidence.** No hand-holding. Terse headlines. Trust the reader to be a professional.
4. **Structure over decoration.** Hierarchy through 1px borders and elevation tiers, never shadow or gloss. No rounded corners (rare 2px exception for code-copy). No drop shadows.
5. **Ownership without ceremony.** The install flow is the product. Get the developer to the `npx` command in one click.

## Accessibility & Inclusion

WCAG AA minimum. Support both light and dark themes (warm off-white light, near-black dark). Reduced-motion: no transitions beyond functional switch animation (0.15s). Unicode glyphs only — no icon font dependencies, no emoji.
